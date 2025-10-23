const axios = require('axios');

// AI Service Configuration
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5000';
const HF_API_KEY = process.env.HF_API_KEY;

// Advanced AI Analysis Functions
class AIAssistant {
  constructor() {
    this.skillsDatabase = {
      'Programming Languages': ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'Go', 'Rust', 'Swift', 'Kotlin'],
      'Frameworks': ['React', 'Node.js', 'Express', 'Django', 'Spring', 'Angular', 'Vue.js', 'Laravel', 'Flask'],
      'Databases': ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'DynamoDB', 'Cassandra'],
      'Cloud': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
      'Data Science': ['Python', 'R', 'SQL', 'Pandas', 'NumPy', 'TensorFlow', 'PyTorch', 'Scikit-learn'],
      'DevOps': ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions', 'Terraform', 'Ansible'],
      'Mobile': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin', 'Ionic'],
      'AI/ML': ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'NLTK', 'SpaCy']
    };
  }

  // 1. Smart Job Matching & Scoring
  async analyzeJobMatch(jobDescription, userProfile) {
    try {
      const analysis = {
        compatibilityScore: this.calculateCompatibilityScore(jobDescription, userProfile),
        skillGaps: this.identifySkillGaps(jobDescription, userProfile),
        strengths: this.identifyStrengths(jobDescription, userProfile),
        recommendations: this.generateRecommendations(jobDescription, userProfile),
        successProbability: this.calculateSuccessProbability(jobDescription, userProfile),
        salaryAnalysis: this.analyzeSalaryExpectations(jobDescription, userProfile)
      };
      return analysis;
    } catch (error) {
      console.error('Job match analysis error:', error);
      return this.getFallbackAnalysis();
    }
  }

  // 2. Intelligent Resume Optimization
  async optimizeResume(resumeData, jobDescription) {
    try {
      const optimization = {
        atsScore: this.calculateATSScore(resumeData, jobDescription),
        keywordDensity: this.analyzeKeywordDensity(resumeData, jobDescription),
        achievements: this.suggestAchievementQuantification(resumeData),
        formatRecommendations: this.getFormatRecommendations(jobDescription),
        skillEmphasis: this.getSkillEmphasisSuggestions(resumeData, jobDescription),
        improvements: this.getResumeImprovements(resumeData, jobDescription)
      };
      return optimization;
    } catch (error) {
      console.error('Resume optimization error:', error);
      return this.getFallbackResumeAnalysis();
    }
  }

  // 3. Advanced Cover Letter Generation
  async generateCoverLetter(jobDescription, userProfile, style = 'professional') {
    try {
      const coverLetter = {
        content: await this.createCoverLetterContent(jobDescription, userProfile, style),
        variations: await this.generateCoverLetterVariations(jobDescription, userProfile),
        industrySpecific: await this.getIndustrySpecificTemplate(jobDescription, userProfile),
        keywords: this.extractKeywordsForCoverLetter(jobDescription),
        tone: this.analyzeCompanyTone(jobDescription)
      };
      return coverLetter;
    } catch (error) {
      console.error('Cover letter generation error:', error);
      return this.getFallbackCoverLetter();
    }
  }

  // 4. Interview Preparation
  async prepareInterview(jobDescription, userProfile) {
    try {
      const preparation = {
        mockQuestions: await this.generateMockQuestions(jobDescription, userProfile),
        starExamples: await this.generateSTARExamples(userProfile),
        technicalQuestions: await this.generateTechnicalQuestions(jobDescription),
        companyResearch: await this.getCompanyResearch(jobDescription),
        talkingPoints: await this.generateTalkingPoints(jobDescription, userProfile),
        followUpQuestions: await this.generateFollowUpQuestions(jobDescription)
      };
      return preparation;
    } catch (error) {
      console.error('Interview preparation error:', error);
      return this.getFallbackInterviewPrep();
    }
  }

  // 5. Career Path Intelligence
  async analyzeCareerPath(userProfile, currentJob) {
    try {
      const careerAnalysis = {
        progressionMap: await this.createCareerProgressionMap(userProfile, currentJob),
        skillRoadmap: await this.createSkillDevelopmentRoadmap(userProfile, currentJob),
        salaryProjections: await this.calculateSalaryProjections(userProfile, currentJob),
        industryTrends: await this.analyzeIndustryTrends(userProfile, currentJob),
        nextSteps: await this.suggestNextCareerSteps(userProfile, currentJob),
        opportunities: await this.identifyCareerOpportunities(userProfile, currentJob)
      };
      return careerAnalysis;
    } catch (error) {
      console.error('Career path analysis error:', error);
      return this.getFallbackCareerAnalysis();
    }
  }

  // 6. Application Strategy
  async createApplicationStrategy(userProfile, targetJobs) {
    try {
      const strategy = {
        timing: await this.analyzeBestApplicationTiming(targetJobs),
        prioritization: await this.prioritizeApplications(targetJobs, userProfile),
        followUpPlan: await this.createFollowUpPlan(targetJobs),
        tracking: await this.setupApplicationTracking(targetJobs),
        optimization: await this.optimizeApplicationApproach(userProfile, targetJobs)
      };
      return strategy;
    } catch (error) {
      console.error('Application strategy error:', error);
      return this.getFallbackStrategy();
    }
  }

  // 7. Market Intelligence
  async getMarketIntelligence(jobDescription, userProfile) {
    try {
      const intelligence = {
        marketAnalysis: await this.analyzeJobMarket(jobDescription),
        competitorAnalysis: await this.analyzeCompetitors(jobDescription, userProfile),
        salaryBenchmarking: await this.benchmarkSalary(jobDescription, userProfile),
        companyInsights: await this.getCompanyInsights(jobDescription),
        demandAnalysis: await this.analyzeSkillDemand(jobDescription, userProfile)
      };
      return intelligence;
    } catch (error) {
      console.error('Market intelligence error:', error);
      return this.getFallbackMarketAnalysis();
    }
  }

  // 8. Personalized Learning
  async createLearningPlan(userProfile, targetJobs) {
    try {
      const learningPlan = {
        skillGaps: await this.identifyLearningGaps(userProfile, targetJobs),
        resources: await this.recommendLearningResources(userProfile, targetJobs),
        timeline: await this.createLearningTimeline(userProfile, targetJobs),
        certifications: await this.suggestCertifications(userProfile, targetJobs),
        projects: await this.suggestProjects(userProfile, targetJobs),
        progress: await this.setupProgressTracking(userProfile, targetJobs)
      };
      return learningPlan;
    } catch (error) {
      console.error('Learning plan error:', error);
      return this.getFallbackLearningPlan();
    }
  }

  // 9. Networking Intelligence
  async getNetworkingInsights(userProfile, targetJobs) {
    try {
      const networking = {
        connections: await this.recommendConnections(userProfile, targetJobs),
        events: await this.suggestEvents(userProfile, targetJobs),
        linkedinOptimization: await this.optimizeLinkedInProfile(userProfile, targetJobs),
        referralOpportunities: await this.findReferralOpportunities(userProfile, targetJobs),
        networkingStrategy: await this.createNetworkingStrategy(userProfile, targetJobs)
      };
      return networking;
    } catch (error) {
      console.error('Networking insights error:', error);
      return this.getFallbackNetworkingInsights();
    }
  }

  // 10. Application Analytics
  async analyzeApplicationPerformance(userProfile, applications) {
    try {
      const analytics = {
        successRate: await this.calculateSuccessRate(applications),
        responseTime: await this.analyzeResponseTimes(applications),
        feedback: await this.collectFeedback(applications),
        patterns: await this.identifySuccessPatterns(applications),
        improvements: await this.suggestImprovements(applications, userProfile),
        metrics: await this.generatePerformanceMetrics(applications, userProfile)
      };
      return analytics;
    } catch (error) {
      console.error('Application analytics error:', error);
      return this.getFallbackAnalytics();
    }
  }

  // Helper Methods
  calculateCompatibilityScore(jobDescription, userProfile) {
    const jobSkills = this.extractSkillsFromJob(jobDescription);
    const userSkills = userProfile.skills || [];
    const matchingSkills = jobSkills.filter(skill => userSkills.includes(skill));
    return Math.round((matchingSkills.length / jobSkills.length) * 100);
  }

  identifySkillGaps(jobDescription, userProfile) {
    const jobSkills = this.extractSkillsFromJob(jobDescription);
    const userSkills = userProfile.skills || [];
    return jobSkills.filter(skill => !userSkills.includes(skill));
  }

  identifyStrengths(jobDescription, userProfile) {
    const jobSkills = this.extractSkillsFromJob(jobDescription);
    const userSkills = userProfile.skills || [];
    return jobSkills.filter(skill => userSkills.includes(skill));
  }

  generateRecommendations(jobDescription, userProfile) {
    const skillGaps = this.identifySkillGaps(jobDescription, userProfile);
    return skillGaps.map(skill => ({
      skill,
      priority: 'high',
      resources: this.getSkillResources(skill),
      timeline: '2-4 weeks'
    }));
  }

  calculateSuccessProbability(jobDescription, userProfile) {
    const compatibilityScore = this.calculateCompatibilityScore(jobDescription, userProfile);
    const experienceMatch = this.analyzeExperienceMatch(jobDescription, userProfile);
    const locationMatch = this.analyzeLocationMatch(jobDescription, userProfile);
    
    return Math.round((compatibilityScore * 0.4 + experienceMatch * 0.3 + locationMatch * 0.3));
  }

  analyzeSalaryExpectations(jobDescription, userProfile) {
    const jobSalary = this.extractSalaryFromJob(jobDescription);
    const userExpectation = userProfile.expectedSalary || 0;
    
    return {
      jobSalary,
      userExpectation,
      match: Math.abs(jobSalary - userExpectation) < (jobSalary * 0.2),
      recommendation: jobSalary > userExpectation ? 'Negotiate higher' : 'Consider if other benefits compensate'
    };
  }

  calculateATSScore(resumeData, jobDescription) {
    const jobKeywords = this.extractKeywordsFromJob(jobDescription);
    const resumeKeywords = this.extractKeywordsFromResume(resumeData);
    const matchingKeywords = jobKeywords.filter(keyword => resumeKeywords.includes(keyword));
    return Math.round((matchingKeywords.length / jobKeywords.length) * 100);
  }

  analyzeKeywordDensity(resumeData, jobDescription) {
    const jobKeywords = this.extractKeywordsFromJob(jobDescription);
    const resumeText = resumeData.text || '';
    
    return jobKeywords.map(keyword => ({
      keyword,
      count: (resumeText.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length,
      density: ((resumeText.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length / resumeText.split(' ').length) * 100
    }));
  }

  suggestAchievementQuantification(resumeData) {
    const achievements = resumeData.achievements || [];
    return achievements.map(achievement => ({
      original: achievement,
      quantified: this.quantifyAchievement(achievement),
      impact: this.calculateImpact(achievement)
    }));
  }

  getFormatRecommendations(jobDescription) {
    const industry = this.detectIndustry(jobDescription);
    const formats = {
      'tech': 'ATS-friendly, skills-focused',
      'finance': 'Traditional, achievement-oriented',
      'creative': 'Visual, portfolio-integrated',
      'healthcare': 'Professional, certification-focused'
    };
    return formats[industry] || 'ATS-friendly, achievement-oriented';
  }

  getSkillEmphasisSuggestions(resumeData, jobDescription) {
    const jobSkills = this.extractSkillsFromJob(jobDescription);
    const resumeSkills = resumeData.skills || [];
    
    return jobSkills.map(skill => ({
      skill,
      currentEmphasis: resumeSkills.includes(skill) ? 'present' : 'missing',
      recommendation: resumeSkills.includes(skill) ? 'emphasize more' : 'add to resume',
      priority: this.getSkillPriority(skill, jobDescription)
    }));
  }

  getResumeImprovements(resumeData, jobDescription) {
    const improvements = [];
    
    if (resumeData.summary && resumeData.summary.length < 50) {
      improvements.push('Expand professional summary');
    }
    
    if (!resumeData.achievements || resumeData.achievements.length === 0) {
      improvements.push('Add quantified achievements');
    }
    
    if (!resumeData.skills || resumeData.skills.length < 5) {
      improvements.push('Add more relevant skills');
    }
    
    return improvements;
  }

  async createCoverLetterContent(jobDescription, userProfile, style) {
    const companyName = this.extractCompanyName(jobDescription);
    const position = this.extractPosition(jobDescription);
    const keyRequirements = this.extractKeyRequirements(jobDescription);
    
    const templates = {
      professional: `Dear Hiring Manager,\n\nI am writing to express my strong interest in the ${position} position at ${companyName}. With my background in ${userProfile.experience || 'relevant field'} and passion for ${this.extractCompanyValues(jobDescription)}, I am confident that I would be a valuable addition to your team.\n\nMy experience includes ${userProfile.achievements || 'key accomplishments'}, and I am particularly excited about the opportunity to contribute to ${this.extractCompanyGoals(jobDescription)}.\n\nI would welcome the opportunity to discuss how my skills and experience align with your needs.\n\nSincerely,\n${userProfile.name}`,
      
      casual: `Hi there!\n\nI'm really excited about the ${position} role at ${companyName}. Your company's focus on ${this.extractCompanyValues(jobDescription)} really resonates with me, and I think my experience in ${userProfile.experience || 'relevant field'} would be a great fit.\n\nI've been following ${companyName}'s work and I'm impressed by ${this.extractCompanyAchievements(jobDescription)}. I'd love to be part of that success!\n\nLooking forward to hearing from you!\n\nBest,\n${userProfile.name}`,
      
      creative: `🚀 Ready to Launch with ${companyName}!\n\nHey ${companyName} team,\n\nI'm ${userProfile.name}, and I'm absolutely thrilled about the ${position} opportunity! Your mission to ${this.extractCompanyMission(jobDescription)} is exactly what I want to be part of.\n\nWith my background in ${userProfile.experience || 'relevant field'}, I bring fresh ideas and ${userProfile.achievements || 'proven results'}. I'm not just looking for a job – I'm looking for a mission I can believe in, and ${companyName} is it!\n\nLet's make something amazing together! 🎯\n\n${userProfile.name}`
    };
    
    return templates[style] || templates.professional;
  }

  async generateCoverLetterVariations(jobDescription, userProfile) {
    return {
      formal: await this.createCoverLetterContent(jobDescription, userProfile, 'professional'),
      casual: await this.createCoverLetterContent(jobDescription, userProfile, 'casual'),
      creative: await this.createCoverLetterContent(jobDescription, userProfile, 'creative')
    };
  }

  async getIndustrySpecificTemplate(jobDescription, userProfile) {
    const industry = this.detectIndustry(jobDescription);
    const templates = {
      'tech': 'Focus on technical skills, projects, and innovation',
      'finance': 'Emphasize analytical skills, attention to detail, and results',
      'healthcare': 'Highlight patient care, compliance, and medical knowledge',
      'education': 'Showcase teaching experience, curriculum development, and student outcomes'
    };
    return templates[industry] || 'Professional, achievement-oriented approach';
  }

  extractKeywordsForCoverLetter(jobDescription) {
    const keywords = this.extractKeywordsFromJob(jobDescription);
    return keywords.slice(0, 10); // Top 10 most important keywords
  }

  analyzeCompanyTone(jobDescription) {
    const text = jobDescription.toLowerCase();
    if (text.includes('innovative') || text.includes('cutting-edge')) return 'innovative';
    if (text.includes('traditional') || text.includes('established')) return 'traditional';
    if (text.includes('startup') || text.includes('fast-paced')) return 'dynamic';
    return 'professional';
  }

  async generateMockQuestions(jobDescription, userProfile) {
    const questions = [
      "Tell me about yourself and why you're interested in this role.",
      "What experience do you have with the technologies mentioned in the job description?",
      "How do you handle tight deadlines and multiple projects?",
      "Describe a challenging project you worked on and how you overcame obstacles.",
      "Where do you see yourself in 5 years?",
      "What questions do you have about the company and this role?"
    ];
    
    return questions.map(q => ({
      question: q,
      category: this.categorizeQuestion(q),
      difficulty: this.assessQuestionDifficulty(q),
      tips: this.getAnswerTips(q)
    }));
  }

  async generateSTARExamples(userProfile) {
    const examples = userProfile.achievements || [];
    return examples.map(achievement => ({
      situation: this.extractSituation(achievement),
      task: this.extractTask(achievement),
      action: this.extractAction(achievement),
      result: this.extractResult(achievement)
    }));
  }

  async generateTechnicalQuestions(jobDescription) {
    const skills = this.extractSkillsFromJob(jobDescription);
    const questions = [];
    
    skills.forEach(skill => {
      if (this.skillsDatabase['Programming Languages'].includes(skill)) {
        questions.push(`Explain the difference between ${skill} and other programming languages.`);
      }
      if (this.skillsDatabase['Frameworks'].includes(skill)) {
        questions.push(`How would you implement a feature using ${skill}?`);
      }
      if (this.skillsDatabase['Databases'].includes(skill)) {
        questions.push(`Describe your experience with ${skill} and its advantages.`);
      }
    });
    
    return questions.slice(0, 5); // Top 5 technical questions
  }

  async getCompanyResearch(jobDescription) {
    const companyName = this.extractCompanyName(jobDescription);
    return {
      companyName,
      industry: this.detectIndustry(jobDescription),
      size: this.estimateCompanySize(jobDescription),
      culture: this.analyzeCompanyCulture(jobDescription),
      recentNews: 'Research recent company news and developments',
      values: this.extractCompanyValues(jobDescription),
      mission: this.extractCompanyMission(jobDescription)
    };
  }

  async generateTalkingPoints(jobDescription, userProfile) {
    return [
      `Your experience with ${userProfile.experience || 'relevant technologies'}`,
      `How your skills align with ${this.extractKeyRequirements(jobDescription)}`,
      `Your interest in ${this.extractCompanyValues(jobDescription)}`,
      `Questions about the team and company culture`,
      `Your career goals and how they align with the role`
    ];
  }

  async generateFollowUpQuestions(jobDescription) {
    return [
      "What does success look like in this role?",
      "What are the biggest challenges facing the team?",
      "How does the company support professional development?",
      "What's the team structure and reporting relationship?",
      "What are the next steps in the interview process?"
    ];
  }

  // Utility Methods
  extractSkillsFromJob(jobDescription) {
    const skills = [];
    Object.values(this.skillsDatabase).forEach(category => {
      category.forEach(skill => {
        if (jobDescription.toLowerCase().includes(skill.toLowerCase())) {
          skills.push(skill);
        }
      });
    });
    return [...new Set(skills)];
  }

  extractKeywordsFromJob(jobDescription) {
    const commonKeywords = ['experience', 'skills', 'knowledge', 'ability', 'proficiency', 'expertise'];
    const words = jobDescription.toLowerCase().split(/\W+/);
    return words.filter(word => word.length > 3 && !commonKeywords.includes(word));
  }

  extractKeywordsFromResume(resumeData) {
    const text = resumeData.text || '';
    const words = text.toLowerCase().split(/\W+/);
    return words.filter(word => word.length > 3);
  }

  extractCompanyName(jobDescription) {
    const lines = jobDescription.split('\n');
    return lines[0] || 'Company';
  }

  extractPosition(jobDescription) {
    const lines = jobDescription.split('\n');
    return lines[1] || 'Position';
  }

  extractKeyRequirements(jobDescription) {
    const requirements = [];
    const lines = jobDescription.split('\n');
    lines.forEach(line => {
      if (line.toLowerCase().includes('required') || line.toLowerCase().includes('must have')) {
        requirements.push(line);
      }
    });
    return requirements;
  }

  extractCompanyValues(jobDescription) {
    const values = [];
    const text = jobDescription.toLowerCase();
    if (text.includes('innovation')) values.push('innovation');
    if (text.includes('collaboration')) values.push('collaboration');
    if (text.includes('excellence')) values.push('excellence');
    if (text.includes('integrity')) values.push('integrity');
    return values;
  }

  extractCompanyGoals(jobDescription) {
    const goals = [];
    const text = jobDescription.toLowerCase();
    if (text.includes('growth')) goals.push('growth');
    if (text.includes('expansion')) goals.push('expansion');
    if (text.includes('innovation')) goals.push('innovation');
    return goals;
  }

  extractCompanyAchievements(jobDescription) {
    const achievements = [];
    const text = jobDescription.toLowerCase();
    if (text.includes('award')) achievements.push('awards');
    if (text.includes('recognition')) achievements.push('recognition');
    if (text.includes('success')) achievements.push('success');
    return achievements;
  }

  extractCompanyMission(jobDescription) {
    const text = jobDescription.toLowerCase();
    if (text.includes('mission')) return 'company mission';
    if (text.includes('vision')) return 'company vision';
    return 'company goals';
  }

  detectIndustry(jobDescription) {
    const text = jobDescription.toLowerCase();
    if (text.includes('software') || text.includes('developer') || text.includes('engineer')) return 'tech';
    if (text.includes('finance') || text.includes('banking') || text.includes('investment')) return 'finance';
    if (text.includes('healthcare') || text.includes('medical') || text.includes('hospital')) return 'healthcare';
    if (text.includes('education') || text.includes('teaching') || text.includes('school')) return 'education';
    return 'general';
  }

  estimateCompanySize(jobDescription) {
    const text = jobDescription.toLowerCase();
    if (text.includes('startup') || text.includes('small team')) return 'startup';
    if (text.includes('enterprise') || text.includes('large')) return 'enterprise';
    return 'medium';
  }

  analyzeCompanyCulture(jobDescription) {
    const text = jobDescription.toLowerCase();
    if (text.includes('remote') || text.includes('flexible')) return 'remote-friendly';
    if (text.includes('collaborative') || text.includes('team')) return 'collaborative';
    if (text.includes('fast-paced') || text.includes('dynamic')) return 'fast-paced';
    return 'traditional';
  }

  categorizeQuestion(question) {
    if (question.includes('experience') || question.includes('background')) return 'experience';
    if (question.includes('challenge') || question.includes('difficult')) return 'behavioral';
    if (question.includes('future') || question.includes('goals')) return 'career';
    return 'general';
  }

  assessQuestionDifficulty(question) {
    if (question.includes('challenge') || question.includes('difficult')) return 'hard';
    if (question.includes('experience') || question.includes('background')) return 'medium';
    return 'easy';
  }

  getAnswerTips(question) {
    const tips = {
      'experience': 'Use specific examples and quantify your achievements',
      'behavioral': 'Use the STAR method (Situation, Task, Action, Result)',
      'career': 'Be honest about your goals and show enthusiasm',
      'general': 'Be concise, relevant, and show your personality'
    };
    return tips[this.categorizeQuestion(question)] || 'Be specific and relevant';
  }

  extractSituation(achievement) {
    return 'Describe the context and background';
  }

  extractTask(achievement) {
    return 'What was your responsibility or goal?';
  }

  extractAction(achievement) {
    return 'What specific actions did you take?';
  }

  extractResult(achievement) {
    return 'What was the outcome and impact?';
  }

  getSkillResources(skill) {
    const resources = {
      'JavaScript': ['MDN Web Docs', 'JavaScript.info', 'FreeCodeCamp'],
      'Python': ['Python.org', 'Real Python', 'Coursera Python Course'],
      'React': ['React Docs', 'React Tutorial', 'React Patterns'],
      'Node.js': ['Node.js Docs', 'Express.js Guide', 'Node.js Best Practices']
    };
    return resources[skill] || ['Online tutorials', 'Documentation', 'Practice projects'];
  }

  getSkillPriority(skill, jobDescription) {
    const text = jobDescription.toLowerCase();
    if (text.includes(skill.toLowerCase())) return 'high';
    return 'medium';
  }

  quantifyAchievement(achievement) {
    // Simple quantification logic
    if (achievement.includes('increased') || achievement.includes('improved')) {
      return achievement + ' (add specific numbers)';
    }
    return achievement + ' (quantify with metrics)';
  }

  calculateImpact(achievement) {
    if (achievement.includes('increased') || achievement.includes('improved')) return 'high';
    if (achievement.includes('managed') || achievement.includes('led')) return 'medium';
    return 'low';
  }

  analyzeExperienceMatch(jobDescription, userProfile) {
    const jobExperience = this.extractExperienceFromJob(jobDescription);
    const userExperience = userProfile.experience || 0;
    return Math.min(100, (userExperience / jobExperience) * 100);
  }

  analyzeLocationMatch(jobDescription, userProfile) {
    const jobLocation = this.extractLocationFromJob(jobDescription);
    const userLocation = userProfile.location || '';
    return jobLocation.toLowerCase().includes(userLocation.toLowerCase()) ? 100 : 50;
  }

  extractExperienceFromJob(jobDescription) {
    const text = jobDescription.toLowerCase();
    const experienceMatch = text.match(/(\d+)\s*years?/);
    return experienceMatch ? parseInt(experienceMatch[1]) : 2;
  }

  extractLocationFromJob(jobDescription) {
    const text = jobDescription.toLowerCase();
    const locationMatch = text.match(/(remote|hybrid|onsite|location)/);
    return locationMatch ? locationMatch[0] : 'onsite';
  }

  extractSalaryFromJob(jobDescription) {
    const text = jobDescription.toLowerCase();
    const salaryMatch = text.match(/\$(\d+(?:,\d{3})*(?:\.\d{2})?)/);
    return salaryMatch ? parseInt(salaryMatch[1].replace(/,/g, '')) : 0;
  }

  // Fallback Methods
  getFallbackAnalysis() {
    return {
      compatibilityScore: 75,
      skillGaps: ['Additional skills needed'],
      strengths: ['Your existing skills'],
      recommendations: ['Continue learning'],
      successProbability: 70,
      salaryAnalysis: { match: true, recommendation: 'Good fit' }
    };
  }

  getFallbackResumeAnalysis() {
    return {
      atsScore: 80,
      keywordDensity: [{ keyword: 'example', count: 1, density: 0.1 }],
      achievements: [{ original: 'Example achievement', quantified: 'Quantified achievement', impact: 'high' }],
      formatRecommendations: 'ATS-friendly format',
      skillEmphasis: [{ skill: 'example', currentEmphasis: 'present', recommendation: 'emphasize', priority: 'high' }],
      improvements: ['Add more achievements']
    };
  }

  getFallbackCoverLetter() {
    return {
      content: 'Professional cover letter template',
      variations: { formal: 'Formal version', casual: 'Casual version', creative: 'Creative version' },
      industrySpecific: 'Industry-specific template',
      keywords: ['example', 'keywords'],
      tone: 'professional'
    };
  }

  getFallbackInterviewPrep() {
    return {
      mockQuestions: [{ question: 'Tell me about yourself', category: 'general', difficulty: 'easy', tips: 'Be concise and relevant' }],
      starExamples: [{ situation: 'Context', task: 'Goal', action: 'Actions', result: 'Outcome' }],
      technicalQuestions: ['Technical question example'],
      companyResearch: { companyName: 'Company', industry: 'tech', culture: 'collaborative' },
      talkingPoints: ['Your experience', 'Your skills', 'Your interest'],
      followUpQuestions: ['What are the next steps?']
    };
  }

  getFallbackCareerAnalysis() {
    return {
      progressionMap: 'Career progression path',
      skillRoadmap: 'Skill development plan',
      salaryProjections: 'Salary growth projections',
      industryTrends: 'Industry trend analysis',
      nextSteps: 'Next career steps',
      opportunities: 'Career opportunities'
    };
  }

  getFallbackStrategy() {
    return {
      timing: 'Best application timing',
      prioritization: 'Application prioritization',
      followUpPlan: 'Follow-up strategy',
      tracking: 'Application tracking',
      optimization: 'Application optimization'
    };
  }

  getFallbackMarketAnalysis() {
    return {
      marketAnalysis: 'Job market analysis',
      competitorAnalysis: 'Competitor analysis',
      salaryBenchmarking: 'Salary benchmarking',
      companyInsights: 'Company insights',
      demandAnalysis: 'Skill demand analysis'
    };
  }

  getFallbackLearningPlan() {
    return {
      skillGaps: ['Skills to learn'],
      resources: ['Learning resources'],
      timeline: 'Learning timeline',
      certifications: ['Recommended certifications'],
      projects: ['Project suggestions'],
      progress: 'Progress tracking'
    };
  }

  getFallbackNetworkingInsights() {
    return {
      connections: ['Connection recommendations'],
      events: ['Event suggestions'],
      linkedinOptimization: 'LinkedIn optimization tips',
      referralOpportunities: ['Referral opportunities'],
      networkingStrategy: 'Networking strategy'
    };
  }

  getFallbackAnalytics() {
    return {
      successRate: 'Application success rate',
      responseTime: 'Response time analysis',
      feedback: 'Feedback collection',
      patterns: 'Success patterns',
      improvements: 'Improvement suggestions',
      metrics: 'Performance metrics'
    };
  }
}

const aiAssistant = new AIAssistant();

// API Endpoints
const getAIHealth = async (req, res) => {
  try {
    res.json({
      status: 'AI Assistant is running',
      features: [
        'Smart Job Matching',
        'Resume Optimization',
        'Cover Letter Generation',
        'Interview Preparation',
        'Career Intelligence',
        'Application Strategy',
        'Market Intelligence',
        'Personalized Learning',
        'Networking Insights',
        'Application Analytics'
      ],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: 'AI service health check failed' });
  }
};

const analyzeJobMatch = async (req, res) => {
  try {
    const { jobDescription, userProfile } = req.body;
    const analysis = await aiAssistant.analyzeJobMatch(jobDescription, userProfile);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'Job match analysis failed' });
  }
};

const optimizeResume = async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;
    const optimization = await aiAssistant.optimizeResume(resumeData, jobDescription);
    res.json(optimization);
  } catch (error) {
    res.status(500).json({ error: 'Resume optimization failed' });
  }
};

const generateCoverLetter = async (req, res) => {
  try {
    const { jobDescription, userProfile, style } = req.body;
    const coverLetter = await aiAssistant.generateCoverLetter(jobDescription, userProfile, style);
    res.json(coverLetter);
  } catch (error) {
    res.status(500).json({ error: 'Cover letter generation failed' });
  }
};

const prepareInterview = async (req, res) => {
  try {
    const { jobDescription, userProfile } = req.body;
    const preparation = await aiAssistant.prepareInterview(jobDescription, userProfile);
    res.json(preparation);
  } catch (error) {
    res.status(500).json({ error: 'Interview preparation failed' });
  }
};

const analyzeCareerPath = async (req, res) => {
  try {
    const { userProfile, currentJob } = req.body;
    const careerAnalysis = await aiAssistant.analyzeCareerPath(userProfile, currentJob);
    res.json(careerAnalysis);
  } catch (error) {
    res.status(500).json({ error: 'Career path analysis failed' });
  }
};

const createApplicationStrategy = async (req, res) => {
  try {
    const { userProfile, targetJobs } = req.body;
    const strategy = await aiAssistant.createApplicationStrategy(userProfile, targetJobs);
    res.json(strategy);
  } catch (error) {
    res.status(500).json({ error: 'Application strategy creation failed' });
  }
};

const getMarketIntelligence = async (req, res) => {
  try {
    const { jobDescription, userProfile } = req.body;
    const intelligence = await aiAssistant.getMarketIntelligence(jobDescription, userProfile);
    res.json(intelligence);
  } catch (error) {
    res.status(500).json({ error: 'Market intelligence failed' });
  }
};

const createLearningPlan = async (req, res) => {
  try {
    const { userProfile, targetJobs } = req.body;
    const learningPlan = await aiAssistant.createLearningPlan(userProfile, targetJobs);
    res.json(learningPlan);
  } catch (error) {
    res.status(500).json({ error: 'Learning plan creation failed' });
  }
};

const getNetworkingInsights = async (req, res) => {
  try {
    const { userProfile, targetJobs } = req.body;
    const networking = await aiAssistant.getNetworkingInsights(userProfile, targetJobs);
    res.json(networking);
  } catch (error) {
    res.status(500).json({ error: 'Networking insights failed' });
  }
};

const analyzeApplicationPerformance = async (req, res) => {
  try {
    const { userProfile, applications } = req.body;
    const analytics = await aiAssistant.analyzeApplicationPerformance(userProfile, applications);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Application analytics failed' });
  }
};

module.exports = {
  getAIHealth,
  analyzeJobMatch,
  optimizeResume,
  generateCoverLetter,
  prepareInterview,
  analyzeCareerPath,
  createApplicationStrategy,
  getMarketIntelligence,
  createLearningPlan,
  getNetworkingInsights,
  analyzeApplicationPerformance
};
