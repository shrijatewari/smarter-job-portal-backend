// src/routes/ai.js
import express from "express";
import axios from "axios";
import multer from "multer";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") return cb(null, true);
    cb(new Error("Only PDF resumes are supported"));
  },
});
const HF_API_KEY = process.env.HF_API_KEY;
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5002';

if (!HF_API_KEY) {
  console.warn("⚠️ HF_API_KEY not set in .env - will use fallback methods");
}

// --- Hugging Face headers ---
const hfHeaders = {
  Authorization: `Bearer ${HF_API_KEY}`,
  "Content-Type": "application/json",
};

// --- Helper: robust HF POST with retries/backoff ---
async function hfPost(modelUrl, body, { timeout = 120000, maxRetries = 3 } = {}) {
  let attempt = 0;
  let lastErr;
  while (attempt < maxRetries) {
    try {
      const res = await axios.post(
        modelUrl,
        {
          ...body,
          options: { wait_for_model: true, ...(body?.options || {}) },
        },
        { headers: hfHeaders, timeout }
      );
      if (res.data && res.data.error) throw new Error(res.data.error);
      return res;
    } catch (err) {
      lastErr = err;
      const status = err.response?.status;
      const data = err.response?.data;
      const msg = data?.error || err.message || "HF request failed";
      // 503 during model load or rate limit; retry with backoff
      if (status === 503 || /loading|rate|too many/i.test(msg)) {
        const waitMs = Math.min(2000 * Math.pow(2, attempt), 10000);
        await new Promise((r) => setTimeout(r, waitMs));
        attempt += 1;
        continue;
      }
      // network timeouts also retry once or twice
      if (/timeout|network|ECONNRESET|ETIMEDOUT/i.test(msg) && attempt < maxRetries - 1) {
        const waitMs = Math.min(2000 * Math.pow(2, attempt), 8000);
        await new Promise((r) => setTimeout(r, waitMs));
        attempt += 1;
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
}

// --- Helper: parse HF responses ---
function parseHFResponse(data) {
  if (Array.isArray(data)) {
    if (data[0]?.summary_text) return data[0].summary_text;
    if (data[0]?.generated_text) return data[0].generated_text;
  }
  if (data?.summary_text) return data.summary_text;
  if (data?.generated_text) return data.generated_text;
  if (typeof data === "string") return data;
  return "No output generated.";
}

// --- Helper: convert embedding-like structures to a 1D vector ---
function toOneDimensionalEmbedding(raw) {
  if (!raw) return null;
  if (Array.isArray(raw) && raw.every((v) => typeof v === "number" && isFinite(v))) {
    return raw;
  }
  if (
    Array.isArray(raw) &&
    raw.length > 0 &&
    Array.isArray(raw[0]) &&
    raw[0].every((v) => typeof v === "number" && isFinite(v))
  ) {
    const dim = raw[0].length;
    const sum = new Array(dim).fill(0);
    let count = 0;
    for (const row of raw) {
      if (!Array.isArray(row) || row.length !== dim) continue;
      for (let i = 0; i < dim; i++) sum[i] += row[i] || 0;
      count++;
    }
    return count ? sum.map((v) => v / count) : null;
  }
  if (
    Array.isArray(raw) &&
    raw.length > 0 &&
    Array.isArray(raw[0]) &&
    Array.isArray(raw[0][0])
  ) {
    const first = toOneDimensionalEmbedding(raw[0]);
    return first;
  }
  return null;
}

// --- Helper: safe cosine similarity ---
function safeCosineSimilarity(vecA, vecB) {
  if (!Array.isArray(vecA) || !Array.isArray(vecB)) return null;
  if (vecA.length !== vecB.length || vecA.length === 0) return null;
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    const a = Number(vecA[i]);
    const b = Number(vecB[i]);
    if (!isFinite(a) || !isFinite(b)) return null;
    dot += a * b;
    magA += a * a;
    magB += b * b;
  }
  if (magA === 0 || magB === 0) return null;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// --- Helper: call ML microservice ---
async function callMLService(endpoint, data, timeout = 10000) {
  try {
    console.log(`🤖 Calling ML service: ${endpoint}`);
    const response = await axios.post(`${ML_SERVICE_URL}${endpoint}`, data, {
      timeout,
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error(`❌ ML service error for ${endpoint}:`, error.message);
    throw new Error(`ML service unavailable: ${error.message}`);
  }
}

// --- Helper: check ML service health ---
async function checkMLServiceHealth() {
  try {
    const response = await axios.get(`${ML_SERVICE_URL}/health`, { timeout: 3000 });
    return response.data.status === 'healthy';
  } catch (error) {
    console.error('❌ ML service health check failed:', error.message);
    return false;
  }
}

// --- Middleware: log requests ---
router.use((req, res, next) => {
  console.log("➡ Incoming request:", req.method, req.originalUrl);
  console.log("Request body:", req.body);
  next();
});

// ====================== 1️⃣ Summarization ======================
router.post("/summarize", async (req, res) => {
  const { jobDescription } = req.body;
  if (!jobDescription) return res.status(400).json({ error: "jobDescription is required" });

  try {
    const response = await hfPost(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        inputs: jobDescription,
        parameters: { max_length: 200, min_length: 60, do_sample: false },
      },
      { timeout: 120000, maxRetries: 3 }
    );

    if (response.data.error) return res.status(503).json({ error: response.data.error });

    const summary = parseHFResponse(response.data);
    const keywords = Array.from(new Set(summary.replace(/[.,]/g, "").split(" ").slice(0, 10)));

    res.json({ summary, keywords });
  } catch (err) {
    const details = {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    };
    console.error("❌ Summarization Error:", details);
    res.status(500).json({ error: "Summarization Error", details });
  }
});

// ====================== 2️⃣ Tailored Cover Letter (LEGACY - DISABLED) ======================
// This legacy endpoint has been replaced by the enhanced version below
// router.post("/cover-letter", upload.single("resume"), async (req, res) => {
//   const { jobDescription, resumeText: resumeTextFromBody } = req.body;
//
//   if (!jobDescription) return res.status(400).json({ error: "jobDescription is required" });
//
//   try {
//     let resumeText = (resumeTextFromBody || "").toString();
//     // ... entire legacy implementation commented out ...
//   } catch (err) {
//     // ... error handling ...
//   }
// });


// ====================== 3️⃣ Fit Score ======================
router.post("/fit-score", async (req, res) => {
  const { resumeSkills, jobSkills } = req.body;

  if (!Array.isArray(resumeSkills) || !Array.isArray(jobSkills))
    return res.status(400).json({ error: "resumeSkills and jobSkills must be arrays" });
  if (!resumeSkills.length || !jobSkills.length)
    return res.status(400).json({ error: "resumeSkills and jobSkills cannot be empty" });

  try {
    // Prefer sentence-similarity input shape
    const response = await hfPost(
      "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
      {
        inputs: {
          source_sentence: resumeSkills.join(", "),
          sentences: [jobSkills.join(", ")],
        },
      },
      { timeout: 90000, maxRetries: 3 }
    );

    // If pipeline returns a list of scores
    if (Array.isArray(response.data) && typeof response.data[0] === "number") {
      const similarity = response.data[0];
      return res.json({ fitScore: Math.round(Math.max(0, Math.min(1, similarity)) * 100) });
    }

    // Fallback: embeddings vector(s)
    let vec1;
    let vec2;
    if (Array.isArray(response.data) && response.data.length >= 2) {
      vec1 = toOneDimensionalEmbedding(response.data[0]);
      vec2 = toOneDimensionalEmbedding(response.data[1]);
    } else if (response.data?.embeddings && Array.isArray(response.data.embeddings)) {
      vec1 = toOneDimensionalEmbedding(response.data.embeddings[0]);
      vec2 = toOneDimensionalEmbedding(response.data.embeddings[1]);
    }
    const similarity = safeCosineSimilarity(vec1, vec2);
    if (similarity == null) {
      // Local fallback: Jaccard similarity over sets
      const setA = new Set(resumeSkills.map((s) => String(s).toLowerCase().trim()));
      const setB = new Set(jobSkills.map((s) => String(s).toLowerCase().trim()));
      const inter = new Set([...setA].filter((x) => setB.has(x)));
      const union = new Set([...setA, ...setB]);
      const jaccard = union.size ? inter.size / union.size : 0;
      return res.json({ fitScore: Math.round(jaccard * 100), source: "fallback" });
    }
    res.json({ fitScore: Math.round(similarity * 100) });
  } catch (err) {
    const details = {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    };
    console.error("❌ Fit Score Error:", details);
    res.status(500).json({ error: "Fit Score Error", details });
  }
});

// ====================== 4️⃣ Skill Extraction (LEGACY - DISABLED) ======================
// This legacy endpoint has been replaced by the enhanced version below
// router.post("/extract-skills", async (req, res) => {
//   const { jobDescription } = req.body;
//   if (!jobDescription) return res.status(400).json({ error: "jobDescription is required" });
//   // ... legacy implementation disabled to avoid conflicts
// });

// ====================== 🚀 ENHANCED ML MICROSERVICE ENDPOINTS ======================

// Health check for ML service
router.get('/ml-health', async (req, res) => {
  try {
    const isHealthy = await checkMLServiceHealth();
    if (isHealthy) {
      const healthData = await axios.get(`${ML_SERVICE_URL}/health`);
      res.json({
        status: 'healthy',
        ml_service: healthData.data,
        message: 'ML microservice is running'
      });
    } else {
      res.status(503).json({
        status: 'unhealthy',
        message: 'ML microservice is not responding',
        fallback: 'Using Hugging Face API endpoints'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Enhanced job summarization (uses ML service first, HF as fallback)
router.post('/summarize-job', async (req, res) => {
  const { job_description } = req.body;
  
  if (!job_description) {
    return res.status(400).json({ error: 'job_description is required' });
  }

  try {
    // Try ML service first
    const mlResult = await callMLService('/summarize-job', { job_description });
    console.log('✅ ML service summarization successful');
    
    res.json({
      summary: mlResult.summary,
      source: 'ml-microservice',
      status: 'success'
    });
    
  } catch (mlError) {
    console.warn('⚠️ ML service failed, falling back to HF API');
    
    // Fallback to existing HF implementation
    try {
      if (!HF_API_KEY) {
        throw new Error('No HF_API_KEY available for fallback');
      }
      
      const response = await hfPost(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
          inputs: job_description,
          parameters: { max_length: 200, min_length: 60, do_sample: false },
        },
        { timeout: 120000, maxRetries: 3 }
      );

      if (response.data.error) {
        return res.status(503).json({ error: response.data.error });
      }

      const summary = parseHFResponse(response.data);
      
      res.json({
        summary,
        source: 'huggingface-api',
        status: 'success'
      });
      
    } catch (hfError) {
      console.error('❌ Both ML service and HF API failed');
      
      // Final fallback: simple extraction
      const sentences = job_description.split('. ').slice(0, 3);
      const fallbackSummary = sentences.join('. ') + '.';
      
      res.json({
        summary: fallbackSummary,
        source: 'fallback',
        status: 'success',
        warning: 'Used fallback summarization due to service unavailability'
      });
    }
  }
});

// Enhanced resume skill extraction (uses ML service first)
router.post("/extract-resume-skills", async (req, res) => {
  const { resume_text } = req.body;
  
  if (!resume_text) {
    return res.status(400).json({ error: 'resume_text is required' });
  }

  try {
    // Try ML service first
    const mlResult = await callMLService('/extract-resume-skills', { resume_text });
    console.log('✅ ML service skill extraction successful');
    
    res.json({
      skills: mlResult.skills,
      source: 'ml-microservice',
      status: 'success'
    });
    
  } catch (mlError) {
    console.warn('⚠️ ML service failed, falling back to HF API');
    
    // Fallback to existing HF implementation (modified to use resume_text)
    try {
      if (!HF_API_KEY) {
        throw new Error('No HF_API_KEY available for fallback');
      }
      
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/dslim/bert-base-NER",
        { inputs: resume_text },
        { headers: hfHeaders, timeout: 60000 }
      );

      if (response.data.error) {
        return res.status(503).json({ error: response.data.error });
      }

      const flatten = (arr) => (Array.isArray(arr) ? arr.flat ? arr.flat(Infinity) : arr.reduce((acc, it) => acc.concat(it), []) : []);
      const entities = Array.isArray(response.data) ? flatten(response.data) : [];
      const tokens = entities
        .filter((e) => e && typeof e === "object")
        .map((e) => (e.word || e.token || "").replace(/^##/, ""))
        .filter(Boolean);

      const stop = new Set(["the","and","or","to","a","of","in","for","with","on","at","by","an","be","as","is"]);
      const skills = Array.from(new Set(tokens.filter((t) => t.length > 1 && !stop.has(t.toLowerCase()))));

      res.json({
        skills: skills.slice(0, 10), // Limit to top 10
        source: 'huggingface-api',
        status: 'success'
      });
      
    } catch (hfError) {
      console.error('❌ Both ML service and HF API failed');
      
      // Final fallback: simple regex-based skill extraction
      const commonSkills = [
        'python', 'javascript', 'java', 'react', 'node.js', 'sql',
        'html', 'css', 'aws', 'docker', 'git', 'api', 'mongodb'
      ];
      
      const text = resume_text.toLowerCase();
      const foundSkills = commonSkills.filter(skill => text.includes(skill));
      
      res.json({
        skills: foundSkills.slice(0, 5),
        source: 'fallback',
        status: 'success',
        warning: 'Used fallback skill extraction due to service unavailability'
      });
    }
  }
});

// AI-powered cover letter generation (uses ML service)
router.post('/cover-letter', upload.single('resume'), async (req, res) => {
  // Accept both formats for backward compatibility
  const job_description = req.body.job_description || req.body.jobDescription;
  const resumeTextFromBody = req.body.resume_text || req.body.resumeText;

  if (!job_description) {
    return res.status(400).json({ error: 'job_description is required' });
  }

  try {
    let resumeText = (resumeTextFromBody || "").toString();

    // Handle PDF resume upload
    if (!resumeText && req.file) {
      const data = await pdf(req.file.buffer);
      resumeText = (data.text || "").replace(/\s+/g, " ").trim();
    }

    if (!resumeText) {
      return res.status(400).json({ 
        error: 'Resume text is required (provide PDF file or resume_text field)' 
      });
    }

    // Try ML service first
    try {
      const mlResult = await callMLService('/generate-cover-letter', {
        resume_text: resumeText,
        job_description
      });
      
      console.log('✅ ML service cover letter generation successful');
      
      res.json({
        cover_letter: mlResult.cover_letter,
        source: 'ml-microservice',
        status: 'success'
      });
      
    } catch (mlError) {
      console.warn('⚠️ ML service failed, falling back to HF API or template');
      
      // Fallback to existing HF-based cover letter generation
      const prompt = `You are an expert career coach. Using the provided resume and job description, write a concise, professional, tailored cover letter (200-350 words) highlighting the strongest fit.\n\nResume:\n${resumeText.slice(0, 2000)}\n\nJob Description:\n${job_description}`;

      const modelCandidates = [
        "https://api-inference.huggingface.co/models/google/flan-t5-base",
        "https://api-inference.huggingface.co/models/google/flan-t5-small",
      ];
      
      let coverLetter = null;
      
      if (HF_API_KEY) {
        for (const modelUrl of modelCandidates) {
          try {
            const response = await hfPost(
              modelUrl,
              {
                inputs: prompt,
                parameters: { max_new_tokens: 300, temperature: 0.3 },
              },
              { timeout: 120000, maxRetries: 3 }
            );
            if (response.data?.error) throw new Error(response.data.error);
            coverLetter = parseHFResponse(response.data);
            if (coverLetter && typeof coverLetter === "string") break;
          } catch (e) {
            continue;
          }
        }
      }
      
      if (!coverLetter) {
        // Template-based fallback
        const resumeSkills = resumeText.match(/\b[a-zA-Z][a-zA-Z+.#\-]{1,}\b/g) || [];
        const topSkills = Array.from(new Set(resumeSkills.map(s => s.toLowerCase()))).slice(0, 5);
        
        coverLetter = [
          "Dear Hiring Manager,",
          "",
          `I am excited to apply for the position described. With experience in ${topSkills.slice(0, 3).join(', ')}, I believe I would be a strong fit for your team.`,
          "",
          "My background includes relevant experience that aligns with your requirements. I am particularly interested in this role because it matches my skills and career goals.",
          "",
          "I would welcome the opportunity to discuss how my experience can contribute to your team's success.",
          "",
          "Sincerely,",
          "[Your Name]"
        ].join("\n");
      }

      res.json({
        cover_letter: coverLetter,
        source: coverLetter.includes('[Generated locally') ? 'fallback' : 'huggingface-api',
        status: 'success'
      });
    }
    
  } catch (error) {
    console.error('❌ Cover letter generation error:', error);
    res.status(500).json({
      error: 'Cover letter generation failed',
      details: error.message
    });
  }
});

// Enhanced fit score calculation (uses ML service) - new endpoint
router.post('/predict-fit', async (req, res) => {
  const { resume_text, job_description } = req.body;
  
  if (!resume_text || !job_description) {
    return res.status(400).json({ 
      error: 'Both resume_text and job_description are required' 
    });
  }

  try {
    // Try ML service first
    const mlResult = await callMLService('/predict-fit', {
      resume_text,
      job_description
    });
    
    console.log('✅ ML service fit score calculation successful');
    
    res.json({
      fit_score: Math.round(mlResult.fit_score * 100), // Convert to percentage
      source: 'ml-microservice',
      status: 'success'
    });
    
  } catch (mlError) {
    console.warn('⚠️ ML service failed, using fallback calculation');
    
    // Fallback: simple text similarity
    try {
      const resumeWords = new Set(resume_text.toLowerCase().split(/\W+/).filter(w => w.length > 2));
      const jobWords = new Set(job_description.toLowerCase().split(/\W+/).filter(w => w.length > 2));
      
      const intersection = new Set([...resumeWords].filter(x => jobWords.has(x)));
      const union = new Set([...resumeWords, ...jobWords]);
      
      const jaccardSimilarity = union.size > 0 ? intersection.size / union.size : 0;
      
      res.json({
        fit_score: Math.round(jaccardSimilarity * 100),
        source: 'fallback',
        status: 'success',
        warning: 'Used fallback similarity calculation'
      });
      
    } catch (error) {
      res.status(500).json({
        error: 'Fit score calculation failed',
        details: error.message
      });
    }
  }
});

export default router;
