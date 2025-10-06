// seed-jobs-with-skills.js
import mongoose from 'mongoose';
import Internship from './src/models/Internship.js';

const skillsBasedJobs = [
  {
    title: "Frontend Developer Intern",
    company: "TechFlow",
    location: "Remote",
    description: "Join our frontend team to build modern web applications using React, JavaScript, TypeScript, HTML, CSS, and Tailwind CSS. Experience with Git version control and REST APIs required. Knowledge of Redux and React hooks preferred.",
    url: "https://techflow.com/careers/frontend-intern",
    datePosted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    source: "manual",
    externalId: "tf-frontend-001"
  },
  {
    title: "Full Stack Developer Intern",
    company: "StartupLab",
    location: "San Francisco, CA",
    description: "Work on full-stack development using Node.js, Express, React, MongoDB, and PostgreSQL. Strong JavaScript and Python skills required. Experience with Docker, AWS, and Git essential. Knowledge of GraphQL and REST API development.",
    url: "https://startuplab.com/careers/fullstack",
    datePosted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    source: "manual",
    externalId: "sl-fullstack-001"
  },
  {
    title: "Data Science Intern",
    company: "DataCorp",
    location: "New York, NY",
    description: "Analyze large datasets using Python, pandas, numpy, scikit-learn, and TensorFlow. Strong SQL skills for database queries. Experience with machine learning algorithms and data visualization using matplotlib and seaborn. R and MATLAB knowledge a plus.",
    url: "https://datacorp.com/careers/datascience",
    datePosted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    source: "manual",
    externalId: "dc-datascience-001"
  },
  {
    title: "Backend Engineer Intern",
    company: "CloudWorks",
    location: "Seattle, WA",
    description: "Build scalable backend services using Node.js, Python, Java, and Go. Work with PostgreSQL, MongoDB, and Redis databases. Deploy applications using Docker, Kubernetes, and AWS. Strong understanding of REST APIs and microservices architecture required.",
    url: "https://cloudworks.com/careers/backend",
    datePosted: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    source: "manual",
    externalId: "cw-backend-001"
  },
  {
    title: "Mobile App Developer Intern",
    company: "AppCraft",
    location: "Austin, TX",
    description: "Develop mobile applications using React Native, Flutter, Swift, and Kotlin. Experience with JavaScript, TypeScript, and Dart programming languages. Knowledge of Firebase, REST APIs, and mobile app deployment to App Store and Google Play.",
    url: "https://appcraft.com/careers/mobile",
    datePosted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    source: "manual",
    externalId: "ac-mobile-001"
  },
  {
    title: "DevOps Engineer Intern",
    company: "InfraTech",
    location: "Denver, CO",
    description: "Learn DevOps practices using Docker, Kubernetes, Jenkins, and AWS. Automate deployments with Python scripts and Bash. Work with monitoring tools and CI/CD pipelines. Experience with Git, Linux, and cloud platforms essential.",
    url: "https://infratech.com/careers/devops",
    datePosted: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    source: "manual",
    externalId: "it-devops-001"
  },
  {
    title: "ML Engineer Intern",
    company: "AIVision",
    location: "Boston, MA",
    description: "Work on machine learning projects using Python, TensorFlow, PyTorch, and scikit-learn. Strong background in statistics and mathematics. Experience with data preprocessing, model training, and deployment on AWS or Google Cloud. Knowledge of Docker and Git required.",
    url: "https://aivision.com/careers/ml",
    datePosted: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    source: "manual",
    externalId: "av-ml-001"
  },
  {
    title: "UI/UX Design Intern",
    company: "DesignHub",
    location: "Los Angeles, CA",
    description: "Create user interfaces and experiences using Figma, Adobe Creative Suite, and prototyping tools. Basic knowledge of HTML, CSS, and JavaScript helpful for design implementation. Understanding of user research methodologies and design systems.",
    url: "https://designhub.com/careers/uiux",
    datePosted: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    source: "manual",
    externalId: "dh-uiux-001"
  },
  {
    title: "Cybersecurity Intern",
    company: "SecureNet",
    location: "Washington, DC",
    description: "Learn cybersecurity fundamentals including network security, penetration testing, and security analysis. Experience with Python scripting, Linux systems, and security tools. Knowledge of SQL for database security and understanding of encryption methods.",
    url: "https://securenet.com/careers/cybersec",
    datePosted: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    source: "manual",
    externalId: "sn-cyber-001"
  },
  {
    title: "Game Developer Intern",
    company: "GameStudio",
    location: "Remote",
    description: "Develop games using Unity, C#, and JavaScript. Experience with game engines and 3D graphics programming. Strong problem-solving skills and understanding of game mechanics. Knowledge of version control with Git and collaborative development practices.",
    url: "https://gamestudio.com/careers/gamedev",
    datePosted: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    source: "manual",
    externalId: "gs-gamedev-001"
  },
  {
    title: "PHP Web Developer Intern",
    company: "WebSolutions",
    location: "Chicago, IL",
    description: "Build web applications using PHP, MySQL, HTML, CSS, and JavaScript. Experience with Laravel or Symfony frameworks preferred. Understanding of MVC architecture and RESTful API development. Knowledge of Git version control essential.",
    url: "https://websolutions.com/careers/php",
    datePosted: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    source: "manual",
    externalId: "ws-php-001"
  },
  {
    title: "Ruby on Rails Developer Intern",
    company: "RailsCorp",
    location: "Portland, OR",
    description: "Develop web applications using Ruby on Rails framework. Strong understanding of MVC patterns, PostgreSQL database, and RESTful APIs. Experience with Git, HTML, CSS, and JavaScript. Knowledge of testing frameworks like RSpec preferred.",
    url: "https://railscorp.com/careers/rails",
    datePosted: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    source: "manual",
    externalId: "rc-rails-001"
  },
  {
    title: "Vue.js Frontend Intern",
    company: "VueWorks",
    location: "Remote",
    description: "Build modern SPAs using Vue.js, JavaScript, TypeScript, and CSS. Experience with Vue ecosystem including Vuex and Vue Router. Understanding of component-based architecture and responsive design. Git version control and REST API integration required.",
    url: "https://vueworks.com/careers/vue",
    datePosted: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
    source: "manual",
    externalId: "vw-vue-001"
  },
  {
    title: "Angular Developer Intern",
    company: "NgTech",
    location: "Miami, FL",
    description: "Develop enterprise applications using Angular, TypeScript, and RxJS. Strong understanding of component architecture and services. Experience with Angular CLI, HTML5, CSS3, and JavaScript ES6+. Knowledge of Node.js and Express for full-stack development.",
    url: "https://ngtech.com/careers/angular",
    datePosted: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    source: "manual",
    externalId: "nt-angular-001"
  },
  {
    title: "GraphQL API Developer Intern",
    company: "APIFirst",
    location: "Remote",
    description: "Build GraphQL APIs using Node.js, Apollo Server, and PostgreSQL. Strong JavaScript knowledge and understanding of schema design. Experience with REST APIs, database modeling, and Git. Knowledge of React for frontend integration preferred.",
    url: "https://apifirst.com/careers/graphql",
    datePosted: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    source: "manual",
    externalId: "af-graphql-001"
  }
];

async function seedJobsWithSkills() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/smarter-job-portal";
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing jobs with skills
    await Internship.deleteMany({ source: 'manual' });
    console.log('🧹 Cleared existing manual internships');

    // Insert skills-based jobs
    const result = await Internship.insertMany(skillsBasedJobs);
    console.log(`✅ Inserted ${result.length} skills-based internships`);

    // Display inserted jobs
    console.log('\n📋 Skills-Based Internships:');
    result.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} at ${job.company}`);
      // Extract skills mentioned in description
      const skills = extractSkillsFromText(job.description);
      console.log(`   Skills: ${skills.slice(0, 5).join(', ')}${skills.length > 5 ? '...' : ''}`);
    });

    console.log('\n🔍 Skills Analysis:');
    const allSkills = {};
    result.forEach(job => {
      const skills = extractSkillsFromText(job.description + ' ' + job.title);
      skills.forEach(skill => {
        allSkills[skill] = (allSkills[skill] || 0) + 1;
      });
    });

    const topSkills = Object.entries(allSkills)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);

    console.log('Top 10 Skills Found:');
    topSkills.forEach(([skill, count], index) => {
      console.log(`${index + 1}. ${skill}: ${count} jobs`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding jobs:', error);
    process.exit(1);
  }
}

function extractSkillsFromText(text) {
  const commonSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Java', 'TypeScript', 
    'HTML', 'CSS', 'Git', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'Express',
    'Vue.js', 'Angular', 'PHP', 'Ruby', 'Go', 'GraphQL', 'REST API', 'Firebase',
    'TensorFlow', 'PyTorch', 'Machine Learning', 'scikit-learn', 'pandas',
    'Kubernetes', 'Redis', 'Unity', 'C#', 'Swift', 'Kotlin', 'Flutter'
  ];

  const foundSkills = [];
  const lowerText = text.toLowerCase();
  
  commonSkills.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  });

  return foundSkills;
}

// Run the seeding function
seedJobsWithSkills();