// Seed script to populate sample internships
import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: false },
  datePosted: { type: Date },
  source: { type: String, default: "manual" },
  externalId: { type: String }
}, { timestamps: true });

const Internship = mongoose.model("Internship", internshipSchema);

const sampleInternships = [
  {
    title: "Frontend Developer Intern",
    company: "TechCorp",
    location: "San Francisco, CA",
    description: "Join our frontend team to build amazing user interfaces using React, JavaScript, and modern CSS. You'll work on cutting-edge web applications and learn from experienced developers.",
    url: "https://techcorp.com/careers/frontend-intern",
    datePosted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    source: "manual",
    externalId: "tc-frontend-001"
  },
  {
    title: "Full Stack Developer Intern",
    company: "StartupX",
    location: "Remote",
    description: "Work with our engineering team on both frontend and backend development. Technologies include React, Node.js, Python, and PostgreSQL. Perfect for someone looking to gain full-stack experience.",
    url: "https://startupx.com/jobs/fullstack-intern",
    datePosted: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    source: "manual",
    externalId: "sx-fullstack-001"
  },
  {
    title: "Data Science Intern",
    company: "DataFlow Inc",
    location: "New York, NY",
    description: "Analyze large datasets using Python, pandas, and machine learning algorithms. You'll work on real business problems and create insights that drive decision making.",
    url: "https://dataflow.com/careers/data-science-intern",
    datePosted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    source: "manual",
    externalId: "df-datascience-001"
  },
  {
    title: "Mobile App Developer Intern",
    company: "MobileTech",
    location: "Austin, TX",
    description: "Develop mobile applications for iOS and Android using React Native and Flutter. Learn mobile development best practices and publish apps to app stores.",
    url: "https://mobiletech.com/careers/mobile-intern",
    datePosted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    source: "manual",
    externalId: "mt-mobile-001"
  },
  {
    title: "Backend Engineer Intern",
    company: "CloudWorks",
    location: "Seattle, WA",
    description: "Build scalable backend services using Node.js, Python, and AWS. Work on microservices architecture and learn about distributed systems and cloud computing.",
    url: "https://cloudworks.com/careers/backend-intern",
    datePosted: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    source: "manual",
    externalId: "cw-backend-001"
  },
  {
    title: "UI/UX Design Intern",
    company: "DesignStudio",
    location: "Los Angeles, CA",
    description: "Create beautiful and intuitive user interfaces and experiences. Work with Figma, Adobe Creative Suite, and collaborate with developers to bring designs to life.",
    url: "https://designstudio.com/careers/uiux-intern",
    datePosted: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    source: "manual",
    externalId: "ds-uiux-001"
  },
  {
    title: "DevOps Intern",
    company: "InfraTech",
    location: "Denver, CO",
    description: "Learn about infrastructure automation, CI/CD pipelines, and cloud deployment. Work with Docker, Kubernetes, Jenkins, and AWS to streamline development processes.",
    url: "https://infratech.com/careers/devops-intern",
    datePosted: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    source: "manual",
    externalId: "it-devops-001"
  },
  {
    title: "Machine Learning Intern",
    company: "AIVision",
    location: "Boston, MA",
    description: "Work on computer vision and natural language processing projects. Use TensorFlow, PyTorch, and scikit-learn to build and deploy ML models.",
    url: "https://aivision.com/careers/ml-intern",
    datePosted: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    source: "manual",
    externalId: "av-ml-001"
  },
  {
    title: "Cybersecurity Intern",
    company: "SecureNet",
    location: "Washington, DC",
    description: "Learn about network security, penetration testing, and security analysis. Work with security tools and help protect systems from cyber threats.",
    url: "https://securenet.com/careers/cybersec-intern",
    datePosted: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
    source: "manual",
    externalId: "sn-cyber-001"
  },
  {
    title: "Product Management Intern",
    company: "ProductCo",
    location: "Remote",
    description: "Learn product strategy, user research, and feature planning. Work with engineering and design teams to define and build products that users love.",
    url: "https://productco.com/careers/pm-intern",
    datePosted: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    source: "manual",
    externalId: "pc-pm-001"
  }
];

async function seedInternships() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/smarter-job-portal";
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing internships
    await Internship.deleteMany({ source: 'manual' });
    console.log('🧹 Cleared existing manual internships');

    // Insert sample internships
    const result = await Internship.insertMany(sampleInternships);
    console.log(`✅ Inserted ${result.length} sample internships`);

    // Display inserted internships
    console.log('\n📋 Sample Internships:');
    result.forEach((internship, index) => {
      console.log(`${index + 1}. ${internship.title} at ${internship.company} (${internship.location})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding internships:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedInternships();
