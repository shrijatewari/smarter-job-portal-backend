// src/routes/rouletteRoutes.js
import express from 'express';
import Internship from '../models/Internship.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/internships/random
 * Returns 5 random internships for the roulette feature
 */
router.get('/random', auth, async (req, res) => {
  try {
    console.log('🎲 Fetching random internships for roulette...');
    
    // Get user to exclude already saved internships
    const user = await User.findById(req.user.id);
    const excludeIds = user?.savedInternships?.map(saved => 
      saved.internshipId || saved
    ) || [];
    
    // Get random internships excluding already saved ones
    const internships = await Internship.aggregate([
      {
        $match: {
          _id: { $nin: excludeIds }
        }
      },
      {
        $sample: { size: 5 }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          company: 1,
          location: 1,
          description: 1,
          url: 1,
          datePosted: 1,
          source: 1,
          // Extract skills from description or use a default set
          skills: {
            $ifNull: [
              '$skills',
              []
            ]
          },
          // Extract stipend info from description if available
          stipend: {
            $ifNull: [
              '$stipend',
              'Stipend not specified'
            ]
          }
        }
      }
    ]);

    // If we don't get enough internships, get some fallback ones
    if (internships.length < 5) {
      console.log(`⚠️  Only found ${internships.length} new internships, fetching additional ones...`);
      
      const additionalCount = 5 - internships.length;
      const additionalInternships = await Internship.aggregate([
        { $sample: { size: additionalCount } },
        {
          $project: {
            _id: 1,
            title: 1,
            company: 1,
            location: 1,
            description: 1,
            url: 1,
            datePosted: 1,
            source: 1,
            skills: { $ifNull: ['$skills', []] },
            stipend: { $ifNull: ['$stipend', 'Stipend not specified'] }
          }
        }
      ]);
      
      internships.push(...additionalInternships);
    }

    // Extract skills from descriptions for display
    const processedInternships = internships.map(internship => {
      const text = `${internship.title} ${internship.description || ''}`.toLowerCase();
      const commonSkills = [
        'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Java', 'TypeScript',
        'HTML', 'CSS', 'Git', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL'
      ];
      
      const extractedSkills = commonSkills.filter(skill => 
        text.includes(skill.toLowerCase())
      ).slice(0, 4); // Limit to 4 skills for display

      return {
        ...internship,
        skills: extractedSkills.length > 0 ? extractedSkills : ['General'],
        description: internship.description ? 
          internship.description.substring(0, 200) + '...' : 
          'Exciting internship opportunity awaits!'
      };
    });

    console.log(`✅ Found ${processedInternships.length} internships for roulette`);
    
    res.json({
      internships: processedInternships,
      total: processedInternships.length
    });

  } catch (error) {
    console.error('❌ Error fetching random internships:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch internships', 
      message: error.message 
    });
  }
});

/**
 * POST /api/preferences/save
 * Saves user swipe preferences (right = save, left = pass)
 */
router.post('/save', auth, async (req, res) => {
  try {
    const { internshipId, direction } = req.body;
    const userId = req.user.id;

    console.log(`💾 User ${userId} swiped ${direction} on internship ${internshipId}`);

    if (!internshipId || !direction) {
      return res.status(400).json({ 
        error: 'Missing required fields: internshipId and direction' 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify internship exists
    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({ error: 'Internship not found' });
    }

    let response = { direction, internshipId };

    if (direction === 'right') {
      // Save the internship using proper SavedSchema format
      const alreadySaved = user.savedInternships.some(saved => 
        (saved.internshipId || saved.toString()) === internshipId
      );
      
      if (!alreadySaved) {
        const savedInternship = {
          internshipId: internshipId,
          title: internship.title,
          company: internship.company,
          url: internship.url || '',
          savedAt: new Date()
        };
        
        user.savedInternships.push(savedInternship);
        await user.save();
        
        console.log(`💚 Internship saved for user ${userId}`);
        response.saved = true;
        response.message = 'Internship saved successfully!';
      } else {
        response.saved = false;
        response.message = 'Internship already saved';
      }
    } else if (direction === 'left') {
      // Just log the pass
      console.log(`👈 User passed on internship: ${internship.title} at ${internship.company}`);
      response.message = 'Preference recorded';
    }

    // Simple analytics logging
    const userSkills = user.skills || [];
    const internshipText = `${internship.title} ${internship.description || ''}`.toLowerCase();
    const matchedSkills = userSkills.filter(skill => 
      internshipText.includes(skill.toLowerCase())
    );

    if (direction === 'right' && matchedSkills.length > 0) {
      console.log(`📊 Analytics: User swiped right on ${internship.location} + ${matchedSkills.join(', ')} internship`);
    }

    res.json(response);

  } catch (error) {
    console.error('❌ Error saving preference:', error.message);
    res.status(500).json({ 
      error: 'Failed to save preference', 
      message: error.message 
    });
  }
});

/**
 * GET /api/users/:id/saved-internships
 * Returns full details of internships saved by the user
 */
router.get('/:id/saved-internships', auth, async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Ensure user can only access their own saved internships
    if (userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    console.log(`📋 Fetching saved internships for user ${userId}`);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.savedInternships || user.savedInternships.length === 0) {
      return res.json({ 
        savedInternships: [], 
        total: 0,
        message: 'No saved internships yet. Start swiping to build your collection!' 
      });
    }

    // Extract internship IDs from savedInternships
    const internshipIds = user.savedInternships.map(saved => 
      saved.internshipId || saved
    );
    
    // Fetch full details of saved internships
    const savedInternships = await Internship.find({
      _id: { $in: internshipIds }
    }).sort({ datePosted: -1 });

    // Process the internships for display
    const processedSavedInternships = savedInternships.map(internship => {
      const text = `${internship.title} ${internship.description || ''}`.toLowerCase();
      const commonSkills = [
        'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Java', 'TypeScript',
        'HTML', 'CSS', 'Git', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL'
      ];
      
      const extractedSkills = commonSkills.filter(skill => 
        text.includes(skill.toLowerCase())
      );

      return {
        _id: internship._id,
        title: internship.title,
        company: internship.company,
        location: internship.location,
        description: internship.description ? 
          internship.description.substring(0, 300) + '...' : 
          'Exciting internship opportunity!',
        url: internship.url,
        datePosted: internship.datePosted,
        skills: extractedSkills.length > 0 ? extractedSkills.slice(0, 6) : ['General'],
        stipend: internship.stipend || 'Stipend not specified',
        source: internship.source || 'portal',
        savedAt: new Date().toISOString() // When it was saved (approximation)
      };
    });

    console.log(`✅ Found ${processedSavedInternships.length} saved internships`);

    res.json({
      savedInternships: processedSavedInternships,
      total: processedSavedInternships.length
    });

  } catch (error) {
    console.error('❌ Error fetching saved internships:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch saved internships', 
      message: error.message 
    });
  }
});

/**
 * DELETE /api/users/:id/saved-internships/:internshipId
 * Removes an internship from user's saved list
 */
router.delete('/:id/saved-internships/:internshipId', auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const internshipId = req.params.internshipId;
    
    // Ensure user can only remove their own saved internships
    if (userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    console.log(`🗑️  Removing internship ${internshipId} from user ${userId}'s saved list`);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove from savedInternships array - handle both ID-only and object formats
    const initialLength = user.savedInternships.length;
    user.savedInternships = user.savedInternships.filter(saved => {
      // Handle both direct ID and object with internshipId property
      const savedId = saved.internshipId || saved.toString();
      return savedId !== internshipId;
    });

    if (user.savedInternships.length < initialLength) {
      await user.save();
      console.log(`✅ Successfully removed internship ${internshipId}`);
      
      res.json({
        message: 'Internship removed successfully',
        removedId: internshipId,
        remainingCount: user.savedInternships.length
      });
    } else {
      res.status(404).json({ error: 'Internship not found in saved list' });
    }

  } catch (error) {
    console.error('❌ Error removing saved internship:', error.message);
    res.status(500).json({ 
      error: 'Failed to remove internship', 
      message: error.message 
    });
  }
});

export default router;
