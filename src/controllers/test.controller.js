// src/controllers/test.controller.js
import Question from "../models/Question.js";
import UserTest from "../models/UserTest.js";
import User from "../models/User.js";

// Get questions for a test
export const getQuestions = async (req, res) => {
  try {
    const { category, difficulty, limit = 10 } = req.query;

    // Validate required parameters
    if (!category || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Category and difficulty are required"
      });
    }

    // Validate category
    const validCategories = ["DSA", "DBMS", "OOPS", "CN", "OS", "Web Development", "System Design", "Algorithms"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category"
      });
    }

    // Validate difficulty
    const validDifficulties = ["Very Easy", "Easy", "Medium", "Hard", "Very Hard"];
    if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: "Invalid difficulty level"
      });
    }

    // Validate limit
    const questionLimit = parseInt(limit);
    if (isNaN(questionLimit) || questionLimit < 1 || questionLimit > 50) {
      return res.status(400).json({
        success: false,
        message: "Limit must be between 1 and 50"
      });
    }

    // Get random questions
    const questions = await Question.aggregate([
      {
        $match: {
          category: category,
          difficulty: difficulty,
          isActive: true
        }
      },
      { $sample: { size: questionLimit } },
      {
        $project: {
          _id: 1,
          questionText: 1,
          options: 1,
          timer: 1,
          category: 1,
          difficulty: 1,
          tags: 1
        }
      }
    ]);

    if (questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions found for the specified category and difficulty"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        questions,
        totalQuestions: questions.length,
        category,
        difficulty,
        testId: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }
    });

  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Submit test results
export const submitTest = async (req, res) => {
  try {
    const { userId, testId, category, difficulty, answers, timeSpent } = req.body;

    // Validate required fields
    if (!userId || !category || !difficulty || !answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId, category, difficulty, answers"
      });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Get question details for scoring
    const questionIds = answers.map(answer => answer.questionId);
    const questions = await Question.find({
      _id: { $in: questionIds },
      category,
      difficulty,
      isActive: true
    });

    if (questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Questions not found"
      });
    }

    // Create a map for quick lookup
    const questionMap = new Map();
    questions.forEach(q => {
      questionMap.set(q._id.toString(), q);
    });

    // Calculate score and prepare attempted questions
    let correctAnswers = 0;
    const attemptedQuestions = [];

    answers.forEach(answer => {
      const question = questionMap.get(answer.questionId);
      if (!question) return;

      const isCorrect = question.correctAnswer === answer.userAnswer;
      if (isCorrect) correctAnswers++;

      attemptedQuestions.push({
        questionId: answer.questionId,
        userAnswer: answer.userAnswer,
        isCorrect,
        timeSpent: answer.timeSpent || 0
      });
    });

    const totalQuestions = questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Create test result
    const testResult = new UserTest({
      userId,
      category,
      difficulty,
      score,
      totalQuestions,
      correctAnswers,
      attemptedQuestions,
      timeSpent: timeSpent || 0,
      testSessionId: testId
    });

    await testResult.save();

    // Get detailed results with explanations
    const detailedResults = questions.map(question => {
      const userAnswer = answers.find(a => a.questionId === question._id.toString());
      return {
        questionId: question._id,
        questionText: question.questionText,
        options: question.options,
        correctAnswer: question.correctAnswer,
        userAnswer: userAnswer ? userAnswer.userAnswer : null,
        isCorrect: question.correctAnswer === (userAnswer ? userAnswer.userAnswer : null),
        solutionExplanation: question.solutionExplanation
      };
    });

    res.status(200).json({
      success: true,
      data: {
        testId: testResult._id,
        score,
        totalQuestions,
        correctAnswers,
        percentageScore: score,
        category,
        difficulty,
        timeSpent: timeSpent || 0,
        completedAt: testResult.completedAt,
        results: detailedResults
      }
    });

  } catch (error) {
    console.error("Error submitting test:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Get user's test history
export const getUserTestHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { category, limit = 10, page = 1 } = req.query;

    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Build query
    const query = { userId };
    if (category) {
      query.category = category;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get test history
    const tests = await UserTest.find(query)
      .sort({ completedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-attemptedQuestions') // Exclude detailed answers for list view
      .lean();

    // Get total count for pagination
    const totalTests = await UserTest.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        tests,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalTests / parseInt(limit)),
          totalTests,
          hasNext: skip + tests.length < totalTests,
          hasPrev: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    console.error("Error fetching test history:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Get detailed test result
export const getTestResult = async (req, res) => {
  try {
    const { testId } = req.params;
    const { userId } = req.query;

    // Validate required parameters
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    // Get test result
    const testResult = await UserTest.findOne({
      _id: testId,
      userId
    }).populate('attemptedQuestions.questionId', 'questionText options correctAnswer solutionExplanation');

    if (!testResult) {
      return res.status(404).json({
        success: false,
        message: "Test result not found"
      });
    }

    res.status(200).json({
      success: true,
      data: testResult
    });

  } catch (error) {
    console.error("Error fetching test result:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Get test statistics for user
export const getUserTestStats = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Get aggregated statistics
    const stats = await UserTest.aggregate([
      { $match: { userId: user._id } },
      {
        $group: {
          _id: null,
          totalTests: { $sum: 1 },
          averageScore: { $avg: "$score" },
          bestScore: { $max: "$score" },
          categories: { $addToSet: "$category" },
          difficulties: { $addToSet: "$difficulty" },
          totalTimeSpent: { $sum: "$timeSpent" }
        }
      }
    ]);

    // Get category-wise statistics
    const categoryStats = await UserTest.aggregate([
      { $match: { userId: user._id } },
      {
        $group: {
          _id: "$category",
          testsCount: { $sum: 1 },
          averageScore: { $avg: "$score" },
          bestScore: { $max: "$score" }
        }
      },
      { $sort: { testsCount: -1 } }
    ]);

    // Get recent tests
    const recentTests = await UserTest.find({ userId: user._id })
      .sort({ completedAt: -1 })
      .limit(5)
      .select('category difficulty score completedAt')
      .lean();

    const result = {
      overall: stats[0] || {
        totalTests: 0,
        averageScore: 0,
        bestScore: 0,
        categories: [],
        difficulties: [],
        totalTimeSpent: 0
      },
      categoryStats,
      recentTests
    };

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("Error fetching test statistics:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
