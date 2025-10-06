# Smarter Job Portal - Backend

🚀 A comprehensive backend API for the Smarter Job Portal, featuring AI-powered recommendations, internship roulette, and advanced analytics.

## ✨ Features

- **🔐 Authentication System**
  - Local authentication with JWT tokens
  - OAuth integration (Google & GitHub)
  - Secure password hashing with bcrypt
  
- **🎲 Internship Roulette**
  - Tinder-like swipe functionality for internships
  - Smart exclusion of already saved internships
  - Analytics tracking for user preferences
  
- **🤖 AI-Powered Recommendations**
  - Machine learning-based job matching
  - Skill-based recommendation engine
  - User preference learning system
  
- **📊 Analytics & Insights**
  - Skills demand heatmap generation
  - User behavior tracking
  - Application statistics
  
- **💾 Data Management**
  - MongoDB integration
  - User profiles with extended fields
  - Internship data processing and storage

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT + Passport.js (OAuth)
- **Security:** bcryptjs, CORS
- **External APIs:** JSearch API integration
- **ML Service:** Python-based recommendation engine

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shrijatewari/smarter-job-portal-backend.git
   cd smarter-job-portal-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/smarter-job-portal
   
   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key
   
   # OAuth Credentials
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   
   # External APIs
   JSEARCH_API_KEY=your-jsearch-api-key
   
   # URLs
   FRONTEND_URL=http://localhost:3000
   BACKEND_URL=http://localhost:4000
   
   # ML Service
   ML_SERVICE_URL=http://localhost:5000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/signup` - Alternative signup endpoint
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### OAuth
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/github` - GitHub OAuth login
- `GET /api/auth/callback/google` - Google OAuth callback
- `GET /api/auth/callback/github` - GitHub OAuth callback

### Internships
- `GET /api/internships` - Get all internships
- `GET /api/internships/random` - Get random internships for roulette
- `GET /api/internships/:id` - Get specific internship
- `POST /api/internships/search` - Search internships

### Roulette System
- `POST /api/preferences/save` - Save swipe preferences
- `GET /api/users/:id/saved-internships` - Get saved internships
- `DELETE /api/users/:id/saved-internships/:internshipId` - Remove saved internship

### Recommendations
- `GET /api/recommendations/recommended` - Get AI-powered recommendations
- `POST /api/recommendations/feedback` - Submit recommendation feedback

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard analytics
- `GET /api/analytics/skills` - Get skills analytics
- `GET /api/skills/heatmap` - Get skills demand heatmap

### Profile Management
- `POST /api/profile/me/save` - Save internship to profile
- `POST /api/profile/me/apply` - Record job application
- `GET /api/profile/me` - Get full user profile

## 🏗 Project Structure

```
src/
├── models/           # MongoDB schemas
│   ├── User.js       # User model with extended fields
│   ├── Internship.js # Internship model
│   └── Application.js # Application tracking
├── routes/           # API routes
│   ├── auth.js       # Authentication routes
│   ├── oauth.js      # OAuth routes
│   ├── rouletteRoutes.js # Roulette functionality
│   ├── recommendRoutes.js # AI recommendations
│   ├── analyticsRoutes.js # Analytics endpoints
│   └── skillsRoutes.js    # Skills processing
├── middleware/       # Custom middleware
│   └── auth.js       # JWT authentication
├── services/         # External services
│   ├── passport.js   # Passport configuration
│   └── mlService.js  # ML service integration
└── index.js         # Application entry point
```

## 🔧 Development

### Running Tests
```bash
npm test
```

### Code Linting
```bash
npm run lint
```

### Database Seeding
```bash
npm run seed
```

## 🌟 Key Features Implementation

### Internship Roulette
- Implements Tinder-like swiping for job discovery
- Smart filtering to exclude already saved positions
- Analytics tracking for user preferences and behavior
- Seamless integration with user profiles

### AI Recommendations
- Machine learning-powered job matching
- Skill-based scoring algorithm  
- User behavior learning system
- Real-time recommendation updates

### Skills Heatmap
- Dynamic skills demand analysis
- Industry trend visualization
- Real-time data processing
- Interactive filtering capabilities

## 🚦 API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "timestamp": "2024-10-06T15:20:00Z"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2024-10-06T15:20:00Z"
}
```

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- Rate limiting on sensitive endpoints
- OAuth integration for secure third-party login

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shrija Tewari**
- GitHub: [@shrijatewari](https://github.com/shrijatewari)
- Email: shrijatewari@gmail.com

## 🙏 Acknowledgments

- JSearch API for job data
- MongoDB for robust data storage
- Express.js community for excellent documentation
- All contributors who helped improve this project

---

⭐ **Star this repository if you found it helpful!**