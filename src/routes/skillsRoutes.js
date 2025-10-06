// src/routes/skillsRoutes.js
import express from "express";
import Internship from "../models/Internship.js";

const router = express.Router();

// Common tech skills for fallback data
const COMMON_SKILLS = [
  'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Java', 'TypeScript', 
  'HTML', 'CSS', 'Git', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'Express',
  'Vue.js', 'Angular', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
  'TensorFlow', 'PyTorch', 'Machine Learning', 'Data Science', 'DevOps',
  'Kubernetes', 'Redis', 'GraphQL', 'REST API', 'Microservices', 'Firebase',
  'React Native', 'Flutter', 'Unity', 'C++', 'C#', 'Scala', 'R', 'MATLAB'
];

/**
 * GET /api/skills/trends
 * Analyzes skill demand across job postings and returns normalized scores
 */
router.get("/trends", async (req, res) => {
  try {
    console.log("🔍 Fetching skills trends from database...");
    
    // Get all internships/jobs from database
    const jobs = await Internship.find({}).select('title description');
    
    if (jobs.length === 0) {
      console.log("📋 No jobs found in database, generating sample data");
      return res.json({
        skills: generateFallbackSkillsData(),
        total_jobs: 0,
        data_source: "sample"
      });
    }

    console.log(`📊 Analyzing ${jobs.length} job postings for skill trends`);

    // Extract and count skills from job postings
    const skillCounts = {};
    let totalSkillMentions = 0;

    // Process each job posting
    jobs.forEach(job => {
      const jobText = `${job.title} ${job.description}`.toLowerCase();
      
      // Check for each common skill
      COMMON_SKILLS.forEach(skill => {
        const skillLower = skill.toLowerCase();
        
        // Count occurrences of skill in job text
        const regex = new RegExp(`\\b${skillLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        const matches = jobText.match(regex);
        
        if (matches) {
          skillCounts[skill] = (skillCounts[skill] || 0) + matches.length;
          totalSkillMentions += matches.length;
        }
      });
    });

    // Calculate percentages and normalize scores
    const skillTrends = {};
    Object.keys(skillCounts).forEach(skill => {
      const count = skillCounts[skill];
      const percentage = totalSkillMentions > 0 ? (count / totalSkillMentions) * 100 : 0;
      
      // Normalize to a scale of 0-100 for better visualization
      skillTrends[skill] = Math.round(count * (100 / jobs.length));
    });

    // Sort skills by demand and get top skills
    const sortedSkills = Object.entries(skillTrends)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 30) // Top 30 skills
      .reduce((obj, [skill, score]) => {
        obj[skill] = Math.max(score, 1); // Minimum score of 1 for visualization
        return obj;
      }, {});

    console.log(`✅ Found trends for ${Object.keys(sortedSkills).length} skills`);

    res.json({
      skills: sortedSkills,
      total_jobs: jobs.length,
      data_source: "database",
      last_updated: new Date().toISOString()
    });

  } catch (error) {
    console.error("❌ Error fetching skills trends:", error.message);
    
    // Return fallback data on error
    res.status(200).json({
      skills: generateFallbackSkillsData(),
      total_jobs: 0,
      data_source: "fallback",
      error: "Database temporarily unavailable"
    });
  }
});

/**
 * GET /api/skills/search?q=query
 * Search for skills matching a query (for autocomplete)
 */
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q?.toLowerCase() || '';
    
    if (!query || query.length < 2) {
      return res.json({ skills: COMMON_SKILLS.slice(0, 10) });
    }

    // Filter skills that match the query
    const matchingSkills = COMMON_SKILLS.filter(skill => 
      skill.toLowerCase().includes(query)
    ).slice(0, 15);

    res.json({ skills: matchingSkills });
  } catch (error) {
    console.error("❌ Error searching skills:", error.message);
    res.status(500).json({ error: "Search failed" });
  }
});

/**
 * Generate realistic fallback skills data for demo/testing
 */
function generateFallbackSkillsData() {
  const skillDemandData = {
    'JavaScript': 95,
    'Python': 88,
    'React': 82,
    'SQL': 79,
    'Node.js': 71,
    'Java': 68,
    'HTML': 65,
    'CSS': 63,
    'Git': 61,
    'TypeScript': 58,
    'AWS': 55,
    'MongoDB': 52,
    'Express': 48,
    'Docker': 45,
    'PostgreSQL': 42,
    'Vue.js': 38,
    'Angular': 36,
    'PHP': 34,
    'Go': 31,
    'Ruby': 28,
    'GraphQL': 25,
    'Redis': 23,
    'Kubernetes': 21,
    'TensorFlow': 18,
    'PyTorch': 16,
    'Machine Learning': 35,
    'Data Science': 29,
    'DevOps': 33,
    'REST API': 41,
    'Firebase': 19
  };

  return skillDemandData;
}

/**
 * GET /api/skills/heatmap
 * Returns skill demand data formatted specifically for heatmap visualization
 */
router.get("/heatmap", async (req, res) => {
  try {
    console.log("🔥 Generating heatmap data for skills demand...");
    
    // Get all internships/jobs from database
    const jobs = await Internship.find({}).select('title description company location datePosted');
    
    let skillCounts = {};
    let categories = ['Overall Demand', 'Tech Companies', 'Recent Postings'];
    let skills = [];
    
    if (jobs.length === 0) {
      console.log("📋 No jobs found, using fallback heatmap data");
      return res.json(generateFallbackHeatmapData());
    }

    console.log(`📊 Processing ${jobs.length} job postings for heatmap`);

    // Initialize skill counts for different categories
    const overallCounts = {};
    const techCompanyCounts = {};
    const recentCounts = {};
    
    // Tech company keywords to identify tech-focused companies
    const techCompanyKeywords = ['tech', 'software', 'data', 'ai', 'app', 'digital', 'cloud', 'dev', 'labs', 'systems'];
    
    // Recent threshold (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Process each job posting
    jobs.forEach(job => {
      const jobText = `${job.title} ${job.description}`.toLowerCase();
      const companyName = (job.company || '').toLowerCase();
      const isRecentPosting = job.datePosted && new Date(job.datePosted) > thirtyDaysAgo;
      const isTechCompany = techCompanyKeywords.some(keyword => 
        companyName.includes(keyword) || jobText.includes(keyword + ' company')
      );
      
      // Check for each skill
      COMMON_SKILLS.forEach(skill => {
        const skillLower = skill.toLowerCase();
        const regex = new RegExp(`\\b${skillLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        const matches = jobText.match(regex);
        
        if (matches) {
          // Overall demand
          overallCounts[skill] = (overallCounts[skill] || 0) + matches.length;
          
          // Tech company demand
          if (isTechCompany) {
            techCompanyCounts[skill] = (techCompanyCounts[skill] || 0) + matches.length;
          }
          
          // Recent postings demand
          if (isRecentPosting) {
            recentCounts[skill] = (recentCounts[skill] || 0) + matches.length;
          }
        }
      });
    });

    // Get top skills based on overall demand
    const topSkills = Object.entries(overallCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20) // Top 20 skills for better visualization
      .map(([skill]) => skill);

    // Build matrix data [skill][category]
    const matrix = topSkills.map(skill => [
      Math.max(overallCounts[skill] || 0, 1), // Overall demand
      Math.max(techCompanyCounts[skill] || 0, 1), // Tech companies
      Math.max(recentCounts[skill] || 0, 1) // Recent postings
    ]);

    console.log(`✅ Generated heatmap for ${topSkills.length} skills across ${categories.length} categories`);

    res.json({
      skills: topSkills,
      categories: categories,
      matrix: matrix,
      metadata: {
        total_jobs: jobs.length,
        data_source: "database",
        last_updated: new Date().toISOString(),
        tech_companies_found: Object.keys(techCompanyCounts).length,
        recent_jobs: jobs.filter(job => job.datePosted && new Date(job.datePosted) > thirtyDaysAgo).length
      }
    });

  } catch (error) {
    console.error("❌ Error generating heatmap data:", error.message);
    
    // Return fallback heatmap data on error
    res.status(200).json({
      ...generateFallbackHeatmapData(),
      error: "Database temporarily unavailable"
    });
  }
});

/**
 * Generate realistic fallback heatmap data
 */
function generateFallbackHeatmapData() {
  const skills = [
    'JavaScript', 'Python', 'React', 'SQL', 'Node.js', 'Java', 'HTML', 'CSS',
    'TypeScript', 'AWS', 'Git', 'MongoDB', 'Express', 'Docker', 'Vue.js',
    'Angular', 'PHP', 'PostgreSQL', 'GraphQL', 'Machine Learning'
  ];
  
  const categories = ['Overall Demand', 'Tech Companies', 'Recent Postings'];
  
  // Generate realistic sample data
  const matrix = skills.map(skill => {
    const baseValue = Math.floor(Math.random() * 50) + 20; // 20-70 range
    return [
      baseValue, // Overall
      Math.floor(baseValue * 0.7), // Tech companies (slightly lower)
      Math.floor(baseValue * 0.4) // Recent (much lower)
    ];
  });
  
  return {
    skills,
    categories,
    matrix,
    metadata: {
      total_jobs: 150,
      data_source: "fallback",
      last_updated: new Date().toISOString()
    }
  };
}

export default router;
