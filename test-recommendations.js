// test-recommendations.js - Test the recommendation system
import mongoose from 'mongoose';
import User from './src/models/User.js';
import Internship from './src/models/Internship.js';

// Simple scoring function (copied from recommendRoutes.js for testing)
function scoreInternship(internship, user) {
  const skills = new Set((user.skills || []).map((s) => String(s).toLowerCase()));
  const prefs = user.preferences || {};
  const prefKeywords = new Set((prefs.keywords || []).map((s) => s.toLowerCase()));
  const prefLocations = new Set((prefs.locations || []).map((s) => s.toLowerCase()));

  const text = [internship.title, internship.company, internship.location, internship.description]
    .filter(Boolean).join(" ").toLowerCase();

  let score = 0;
  
  // skill matches
  console.log(`\n📊 Testing "${internship.title}" at ${internship.company}:`);
  for (const s of skills) {
    if (s && text.includes(s)) {
      score += 10;
      console.log(`  ✅ Skill match: "${s}" (+10)`);
    }
  }
  
  // preference keywords
  for (const k of prefKeywords) {
    if (k && text.includes(k)) {
      score += 6;
      console.log(`  ✅ Keyword match: "${k}" (+6)`);
    }
  }
  
  // location bonus
  for (const loc of prefLocations) {
    if (loc && String(internship.location || "").toLowerCase().includes(loc)) {
      score += 8;
      console.log(`  ✅ Location match: "${loc}" (+8)`);
    }
  }
  
  // recency bonus
  const days = internship.datePosted ? Math.max(1, (Date.now() - new Date(internship.datePosted).getTime()) / (1000*60*60*24)) : 30;
  const recencyBonus = Math.max(0, 15 - Math.min(15, Math.floor(days / 2)));
  score += recencyBonus;
  
  console.log(`  📊 Final score: ${score} (Recency bonus: ${recencyBonus})`);
  return score;
}

async function testRecommendationSystem() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://shrijatewari_db_user:V4CEXRuGN3mHrmNx@job-and-internship-port.jl0daej.mongodb.net/jobportal?retryWrites=true&w=majority&appName=Job-And-Internship-Portal";
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Create or find a test user with skills and preferences
    let testUser = await User.findOne({ email: 'test@example.com' });
    
    if (!testUser) {
      console.log('📝 Creating test user...');
      testUser = new User({
        name: 'Test User',
        email: 'test@example.com',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'HTML', 'CSS'],
        preferences: {
          keywords: ['developer', 'frontend', 'fullstack'],
          locations: ['remote', 'san francisco'],
          categories: ['technology', 'software']
        }
      });
      await testUser.save();
    } else {
      // Update user with test skills and preferences
      testUser.skills = ['JavaScript', 'React', 'Node.js', 'Python', 'HTML', 'CSS'];
      testUser.preferences = {
        keywords: ['developer', 'frontend', 'fullstack'],
        locations: ['remote', 'san francisco'],
        categories: ['technology', 'software']
      };
      await testUser.save();
    }

    console.log(`\n👤 Test User Profile:`);
    console.log(`   Skills: ${testUser.skills.join(', ')}`);
    console.log(`   Preference Keywords: ${testUser.preferences.keywords.join(', ')}`);
    console.log(`   Preferred Locations: ${testUser.preferences.locations.join(', ')}`);

    // Get internships from database
    const internships = await Internship.find().limit(10);
    console.log(`\n📋 Found ${internships.length} internships in database`);

    if (internships.length === 0) {
      console.log('❌ No internships found. Make sure to run the seeding script first!');
      process.exit(1);
    }

    // Score internships
    const scored = internships.map((internship) => ({
      ...internship.toObject(),
      score: scoreInternship(internship, testUser)
    })).sort((a, b) => b.score - a.score);

    console.log(`\n🎯 Top 5 Recommendations:`);
    scored.slice(0, 5).forEach((rec, i) => {
      console.log(`\n${i + 1}. ${rec.title} at ${rec.company}`);
      console.log(`   Location: ${rec.location}`);
      console.log(`   Score: ${rec.score} points`);
      console.log(`   Description: ${rec.description.substring(0, 100)}...`);
    });

    console.log(`\n✅ Recommendation system test completed successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error testing recommendations:', error);
    process.exit(1);
  }
}

// Run the test
testRecommendationSystem();