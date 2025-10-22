
import express from "express";
import Internship from "../models/Internship.js";
import axios from "axios";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST route to create a new internship
router.post("/", async (req, res) => {
  try {
    const { title, company, location, description } = req.body;

    const newInternship = new Internship({
      title,
      company,
      location,
      description,
    });

    const savedInternship = await newInternship.save();
    res.status(201).json({
      message: "Internship created successfully",
      internship: savedInternship,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET route to retrieve all internships from database
router.get("/", async (req, res) => {
  try {
    const internships = await Internship.find();
    res.status(200).json(internships);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/internships/jooble - fetch from Jooble and store
router.get("/jooble", async (req, res) => {
  const { keyword = "internship", location = "", page = 1, limit = 20, pages = 1 } = req.query;
  const apiKey = process.env.JOOBLE_API_KEY;
  if (!apiKey) return res.status(500).json({ message: "JOOBLE_API_KEY not set" });

  const fetchPage = async (pageNum) => {
    const url = `https://jooble.org/api/${apiKey}`;
    const body = { keywords: String(keyword), location: String(location), page: Number(pageNum), size: Number(limit) };
    const { data } = await axios.post(url, body, { headers: { "Content-Type": "application/json" } });
    if (!data || !Array.isArray(data.jobs)) return [];
    return data.jobs.map((j) => ({
      title: j.title || j.position || "Untitled Internship",
      company: j.company || j.companyName || "Company",
      location: j.location || j.city || "",
      description: j.snippet || j.description || "",
      url: j.link || j.url || "",
      datePosted: j.updated || j.postDate ? new Date(j.updated || j.postDate) : undefined,
      externalId: j.id ? String(j.id) : (j.link || j.url || ""),
      source: "jooble",
    }));
  };

  try {
    const totalPages = Math.max(1, Math.min(10, Number(pages)));
    const startPage = Math.max(1, Number(page));
    let all = [];
    for (let p = startPage; p < startPage + totalPages; p++) {
      try {
        const items = await fetchPage(p);
        all = all.concat(items);
      } catch (e) {
        console.error("❌ Jooble fetch error (page", p, "):", e.response?.data || e.message);
      }
    }

    // Upsert into MongoDB, avoid duplicates by (source, externalId) or url
    const ops = all.map((item) => ({
      updateOne: {
        filter: item.externalId ? { source: "jooble", externalId: item.externalId } : { url: item.url },
        update: { $setOnInsert: item },
        upsert: true,
      },
    }));
    if (ops.length) {
      await Internship.bulkWrite(ops, { ordered: false });
    }

    res.json(all);
  } catch (err) {
    console.error("❌ Jooble import error:", err.response?.data || err.message);
    res.status(500).json({ message: "Failed to fetch from Jooble", error: err.message });
  }
});

// GET /api/internships/aggregate - combine Jooble and JSearch with better error handling
router.get("/aggregate", async (req, res) => {
  const { keyword = "internship", location = "", limit = 30, pages = 5 } = req.query;
  console.log(`🔍 Fetching aggregated internships: keyword=${keyword}, location=${location}, pages=${pages}`);

  try {
    let allInternships = [];
    
    // Try to fetch from database first
    const existingInternships = await Internship.find().limit(50);
    if (existingInternships.length > 0) {
      const dbInternships = existingInternships.map(internship => ({
        job_id: internship._id.toString(),
        title: internship.title,
        company: internship.company,
        location: internship.location,
        description: internship.description,
        apply_link: internship.url || "#",
        type: "Internship",
        is_remote: (internship.location || "").toLowerCase().includes("remote"),
        duration_months: null,
        stipend: null,
        posted_at: internship.datePosted || internship.createdAt,
        source: internship.source || "database"
      }));
      allInternships = allInternships.concat(dbInternships);
    }

    // Fetch from Jooble API directly
    try {
      const joobleApiKey = process.env.JOOBLE_API_KEY;
      if (joobleApiKey) {
        console.log(`🎯 Fetching from Jooble API with key: ${joobleApiKey.substring(0, 8)}...`);
        
        for (let page = 1; page <= Math.min(pages, 5); page++) {
          try {
            const joobleUrl = `https://jooble.org/api/${joobleApiKey}`;
            const joobleBody = { 
              keywords: `${keyword} developer software engineering tech`, 
              location: location || "", 
              page: page,
              size: limit 
            };
            
            const joobleResponse = await axios.post(joobleUrl, joobleBody, { 
              headers: { "Content-Type": "application/json" },
              timeout: 8000
            });
            
            if (joobleResponse.data && Array.isArray(joobleResponse.data.jobs)) {
              const joobleJobs = joobleResponse.data.jobs.map(job => ({
                job_id: `jooble_${job.id || Math.random().toString(36).substr(2, 9)}`,
                title: job.title || job.position || "Internship Opportunity",
                company: job.company || job.companyName || "Company",
                location: job.location || job.city || "Location TBD",
                description: job.snippet || job.description || "Great internship opportunity",
                apply_link: job.link || job.url || "#",
                type: "Internship",
                is_remote: (job.location || "").toLowerCase().includes("remote"),
                duration_months: null,
                stipend: null,
                posted_at: job.updated || job.postDate || new Date().toISOString(),
                source: "jooble"
              }));
              allInternships = allInternships.concat(joobleJobs);
              console.log(`✅ Fetched ${joobleJobs.length} internships from Jooble page ${page}`);
            }
          } catch (pageError) {
            console.log(`⚠️ Jooble page ${page} failed:`, pageError.message);
          }
        }
      }
    } catch (joobleError) {
      console.log(`⚠️ Jooble API error:`, joobleError.message);
    }

    // Fetch from JSearch API directly
    try {
      const rapidApiKey = process.env.RAPIDAPI_KEY;
      if (rapidApiKey) {
        console.log(`🎯 Fetching from JSearch API`);
        
        const jsearchResponse = await axios.get('https://jsearch.p.rapidapi.com/search', {
          params: {
            query: `${keyword} internship software developer engineering`,
            page: '1',
            num_pages: Math.min(pages, 3).toString(),
            date_posted: 'all',
            employment_types: 'INTERN,FULLTIME'
          },
          headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
          },
          timeout: 10000
        });
        
        if (jsearchResponse.data && Array.isArray(jsearchResponse.data.data)) {
          const jsearchJobs = jsearchResponse.data.data.map(job => ({
            job_id: job.job_id || `jsearch_${Math.random().toString(36).substr(2, 9)}`,
            title: job.job_title || "Internship Position",
            company: job.employer_name || "Company",
            location: job.job_location || `${job.job_city || ""} ${job.job_state || ""} ${job.job_country || ""}`.trim(),
            description: job.job_description || "Exciting internship opportunity",
            apply_link: job.job_apply_link || "#",
            type: job.job_employment_type || "Internship",
            is_remote: job.job_is_remote === true,
            duration_months: null,
            stipend: job.job_min_salary || null,
            posted_at: job.job_posted_at_datetime_utc || new Date().toISOString(),
            source: "jsearch"
          }));
          allInternships = allInternships.concat(jsearchJobs);
          console.log(`✅ Fetched ${jsearchJobs.length} internships from JSearch`);
        }
      }
    } catch (jsearchError) {
      console.log(`⚠️ JSearch API error:`, jsearchError.message);
    }

    // Remove duplicates and filter
    const uniqueInternships = [];
    const seenIds = new Set();
    
    allInternships.forEach(internship => {
      const key = `${internship.title.toLowerCase()}_${internship.company.toLowerCase()}`;
      if (!seenIds.has(key)) {
        seenIds.add(key);
        uniqueInternships.push(internship);
      }
    });

    // Sort by posted date (newest first)
    uniqueInternships.sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at));

    // Fallback data if no results
    if (uniqueInternships.length === 0) {
      console.log(`⚠️ No internships found, returning fallback data`);
      const fallbackInternships = [
        { job_id: "fallback-1", title: "Software Engineering Intern", company: "TechCorp", location: "San Francisco, CA", description: "Work with our engineering team on cutting-edge projects using React, Node.js, and cloud technologies.", apply_link: "https://example.com/apply/swe-intern", type: "Internship", is_remote: false, duration_months: 3, stipend: 25000, posted_at: new Date().toISOString(), source: "fallback" },
        { job_id: "fallback-2", title: "Frontend Developer Intern", company: "DesignHub", location: "Remote", description: "Build beautiful user interfaces with React, TypeScript, and modern CSS frameworks.", apply_link: "https://example.com/apply/frontend-intern", type: "Internship", is_remote: true, duration_months: 4, stipend: 20000, posted_at: new Date().toISOString(), source: "fallback" },
        { job_id: "fallback-3", title: "Data Science Intern", company: "DataWiz", location: "New York, NY", description: "Analyze large datasets using Python, SQL, and machine learning techniques.", apply_link: "https://example.com/apply/data-intern", type: "Internship", is_remote: false, duration_months: 6, stipend: 22000, posted_at: new Date().toISOString(), source: "fallback" },
        { job_id: "fallback-4", title: "Product Management Intern", company: "StartupXYZ", location: "Austin, TX", description: "Help shape product strategy and work with cross-functional teams.", apply_link: "https://example.com/apply/pm-intern", type: "Internship", is_remote: false, duration_months: 3, stipend: 18000, posted_at: new Date().toISOString(), source: "fallback" },
        { job_id: "fallback-5", title: "Marketing Intern", company: "BrandCo", location: "Remote", description: "Support digital marketing campaigns and content creation initiatives.", apply_link: "https://example.com/apply/marketing-intern", type: "Internship", is_remote: true, duration_months: 4, stipend: 15000, posted_at: new Date().toISOString(), source: "fallback" }
      ];
      return res.json(fallbackInternships);
    }

    console.log(`✅ Returning ${uniqueInternships.length} unique internships`);
    res.json(uniqueInternships.slice(0, 100)); // Limit to 100 results
    
  } catch (error) {
    console.error('❌ Aggregate internships error:', error.message);
    // Always return some data, never empty
    const errorFallback = [
      { job_id: "error-fallback-1", title: "Software Development Intern", company: "TechStart", location: "Seattle, WA", description: "Join our development team and work on exciting projects.", apply_link: "https://example.com/apply", type: "Internship", is_remote: false, duration_months: 3, stipend: 20000, posted_at: new Date().toISOString(), source: "fallback" }
    ];
    res.json(errorFallback);
  }
});

// Aggregate internships from JSearch and save to DB
router.post('/aggregate', async (req, res) => {
  const { keyword, pages = 1 } = req.body;
  try {
    const internships = await fetchFromJsearch({
      query: keyword || 'Software Developer Intern',
      num_pages: pages,
    });

    if (!internships || internships.length === 0) {
      return res.status(200).json({ message: 'No new internships found from JSearch.' });
    }

    const formattedInternships = internships.map(job => ({
      job_id: job.job_id,
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city || 'N/A',
      description: job.job_description,
      apply_link: job.job_apply_link,
      posted_at: job.job_posted_at_datetime_utc,
      job_source: 'JSearch API',
    }));

    for (const intern of formattedInternships) {
      await Internship.updateOne({ job_id: intern.job_id }, { $set: intern }, { upsert: true });
    }

    res.status(200).json({ message: `Successfully aggregated and saved ${formattedInternships.length} internships.` });
  } catch (error) {
    console.error('Aggregation Error:', error.message);
    res.status(500).json({ message: 'Failed to aggregate internships.' });
  }
});

// Get internships for the roulette feature
router.get('/roulette', auth, async (req, res) => {
  try {
    // First, try to fetch fresh data
    const freshInternships = await fetchFromJsearch({
      query: 'Software Engineer Intern',
      num_pages: 1,
    });

    if (freshInternships && freshInternships.length > 0) {
      return res.json(freshInternships.slice(0, 10)); // Return top 10 fresh results
    }

    // Fallback: If API fails or returns no results, return sample data
    const fallbackInternships = [
      {
        _id: 'fallback-1',
        title: 'Software Engineer Intern',
        company: 'TechCorp',
        location: 'San Francisco, CA',
        description: 'Join our engineering team and work on cutting-edge software projects.',
        url: 'https://techcorp.com/careers',
        datePosted: new Date(),
        score: 85
      },
      {
        _id: 'fallback-2',
        title: 'Frontend Developer Intern',
        company: 'WebFlow',
        location: 'Remote',
        description: 'Build modern web applications using React and TypeScript.',
        url: 'https://webflow.com/jobs',
        datePosted: new Date(),
        score: 82
      }
    ];
    
    res.json(fallbackInternships);
  } catch (error) {
    console.error('Roulette internships error:', error);
    res.status(500).json({ error: 'Failed to fetch internships for roulette' });
  }
});

export default router;
