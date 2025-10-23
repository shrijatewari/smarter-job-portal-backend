const mongoose = require('mongoose');

// Connect to MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster.mongodb.net/smarter-job-portal';

async function seedProduction() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Import the Question model
    const Question = require('./smarter-job-portal-backend/src/models/Question');
    
    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Sample questions for testing
    const sampleQuestions = [
      {
        category: "DSA",
        difficulty: "Very Easy",
        questionText: "What is the time complexity of accessing an element in an array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: "O(1)",
        solutionExplanation: "Array access is O(1) because we can directly access any element using its index.",
        timer: 30,
        tags: ["arrays", "time-complexity"]
      },
      {
        category: "DSA",
        difficulty: "Easy",
        questionText: "Which data structure follows LIFO principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correctAnswer: "Stack",
        solutionExplanation: "Stack follows Last In First Out (LIFO) principle.",
        timer: 45,
        tags: ["stack", "data-structures"]
      },
      {
        category: "DBMS",
        difficulty: "Very Easy",
        questionText: "What does SQL stand for?",
        options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
        correctAnswer: "Structured Query Language",
        solutionExplanation: "SQL stands for Structured Query Language, used to manage relational databases.",
        timer: 30,
        tags: ["sql", "database"]
      }
    ];

    // Insert sample questions
    await Question.insertMany(sampleQuestions);
    console.log(`Inserted ${sampleQuestions.length} sample questions`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedProduction();
