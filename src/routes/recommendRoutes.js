// src/routes/recommendRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import Internship from "../models/Internship.js";

const router = express.Router();

// Simple scoring function
function scoreInternship(internship, user, enableLogging = false) {
  const skills = new Set((user.skills || []).map((s) => String(s).toLowerCase()));
  const prefs = user.preferences || {};
  const prefKeywords = new Set((prefs.keywords || []).map((s) => s.toLowerCase()));
  const prefLocations = new Set((prefs.locations || []).map((s) => s.toLowerCase()));

  const text = [internship.title, internship.company, internship.location, internship.description]
    .filter(Boolean).join(" ").toLowerCase();

  let score = 0;
  let scoreBreakdown = { skills: 0, keywords: 0, location: 0, recency: 0 };
  
  // skill matches
  for (const s of skills) {
    if (s && text.includes(s)) {
      score += 10;
      scoreBreakdown.skills += 10;
      if (enableLogging) console.log(`  ✅ Skill match: "${s}" (+10)`);
    }
  }
  
  // preference keywords
  for (const k of prefKeywords) {
    if (k && text.includes(k)) {
      score += 6;
      scoreBreakdown.keywords += 6;
      if (enableLogging) console.log(`  ✅ Keyword match: "${k}" (+6)`);
    }
  }
  
  // location bonus
  for (const loc of prefLocations) {
    if (loc && String(internship.location || "").toLowerCase().includes(loc)) {
      score += 8;
      scoreBreakdown.location += 8;
      if (enableLogging) console.log(`  ✅ Location match: "${loc}" (+8)`);
    }
  }
  
  // recency bonus
  const days = internship.datePosted ? Math.max(1, (Date.now() - new Date(internship.datePosted).getTime()) / (1000*60*60*24)) : 30;
  const recencyBonus = Math.max(0, 15 - Math.min(15, Math.floor(days / 2)));
  score += recencyBonus;
  scoreBreakdown.recency = recencyBonus;
  
  if (enableLogging && score > 0) {
    console.log(`  📊 ${internship.title} at ${internship.company}: ${score} points`);
    console.log(`     Breakdown: Skills(${scoreBreakdown.skills}) + Keywords(${scoreBreakdown.keywords}) + Location(${scoreBreakdown.location}) + Recency(${scoreBreakdown.recency})`);
  }
  
  return score;
}

// GET /api/recommendations/recommended (updated path to match frontend)
router.get("/recommended", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('⚠️ User not found for recommendations');
      return res.json(generateFallbackRecommendations());
    }

    console.log(`📊 Generating recommendations for user: ${user.name || user.email}`);
    console.log(`📊 User skills: ${JSON.stringify(user.skills || [])}`);
    console.log(`📊 User preferences: ${JSON.stringify(user.preferences || {})}`);

    const internships = await Internship.find().limit(500);
    console.log(`📋 Found ${internships.length} internships in database`);
    
    // If no internships in database, provide sample data
    if (!internships.length) {
      console.log('📋 No internships in database, generating sample recommendations');
      return res.json(generatePersonalizedFallbackRecommendations(user));
    }

    const scored = internships.map((it, index) => {
      const score = scoreInternship(it, user, index < 5); // Enable logging for first 5 internships
      return {
        ...it.toObject(),
        score: score
      };
    }).sort((a, b) => b.score - a.score).slice(0, 25);
    
    console.log(`🎯 Top 5 recommendations:`);
    scored.slice(0, 5).forEach((rec, i) => {
      console.log(`  ${i+1}. ${rec.title} at ${rec.company} (Score: ${rec.score})`);
    });

    // persist last N recommendations
    const history = scored.slice(0, 10).map((r) => ({ 
      internshipId: r._id?.toString() || r.url || r.title, 
      score: r.score 
    }));
    user.recommendationHistory = (user.recommendationHistory || []).slice(0, 40);
    user.recommendationHistory.unshift(...history);
    await user.save();

    res.json(scored);
  } catch (err) {
    console.error("❌ Recommendation error:", err.message);
    // On error, return fallback data instead of failing completely
    res.json(generateFallbackRecommendations());
  }
});

// Generate fallback recommendations when database is empty or unavailable
function generateFallbackRecommendations() {
  return [
    {
      _id: 'fallback-1',
      title: 'Frontend Developer Intern',
      company: 'TechFlow',
      location: 'Remote',
      description: 'Build modern web applications using React, TypeScript, and Tailwind CSS. Work with experienced developers on real projects.',
      url: 'https://techflow.com/careers',
      datePosted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      score: 85
    },
    {
      _id: 'fallback-2', 
      title: 'Full Stack Developer Intern',
      company: 'InnovateLab',
      location: 'San Francisco, CA',
      description: 'Join our engineering team working on Node.js APIs and React frontends. Learn full-stack development with mentorship.',
      url: 'https://innovatelab.com/jobs',
      datePosted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      score: 82
    },
    {
      _id: 'fallback-3',
      title: 'Data Science Intern',
      company: 'DataWorks',
      location: 'New York, NY', 
      description: 'Work with Python, pandas, and machine learning models. Analyze datasets and create insights for business decisions.',
      url: 'https://dataworks.com/careers',
      datePosted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      score: 78
    },
    {
      _id: 'fallback-4',
      title: 'UI/UX Design Intern',
      company: 'DesignHub',
      location: 'Austin, TX',
      description: 'Create beautiful user interfaces and experiences. Work with Figma, conduct user research, and prototype new features.',
      url: 'https://designhub.com/careers',
      datePosted: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      score: 75
    },
    {
      _id: 'fallback-5',
      title: 'Mobile App Developer Intern',
      company: 'AppCraft',
      location: 'Seattle, WA',
      description: 'Develop mobile apps using React Native and Flutter. Work on iOS and Android platforms with cross-functional teams.',
      url: 'https://appcraft.com/jobs',
      datePosted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      score: 73
    }
  ];
}

function generatePersonalizedFallbackRecommendations(user) {
  const recommendations = generateFallbackRecommendations();
  
  // Personalize based on user skills if available
  if (user.skills && user.skills.length > 0) {
    const userSkills = user.skills.map(s => s.toLowerCase());
    
    // Boost scores for matching skills
    recommendations.forEach(rec => {
      const recText = `${rec.title} ${rec.description}`.toLowerCase();
      let bonus = 0;
      
      userSkills.forEach(skill => {
        if (recText.includes(skill)) {
          bonus += 5;
        }
      });
      
      rec.score = Math.min(95, rec.score + bonus);
    });
    
    // Sort by updated scores
    recommendations.sort((a, b) => b.score - a.score);
  }
  
  return recommendations;
}

export default router;


