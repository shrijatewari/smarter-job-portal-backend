#!/bin/bash

# Test script for Profile and Recommendation API endpoints
# Make sure backend is running on localhost:4000

echo "🧪 Testing Profile and Recommendation APIs"
echo "=========================================="

# Get JWT token by logging in
echo "1. Logging in to get JWT token..."
RESPONSE=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sucharita.dey2003@gmail.com","password":"shri1806"}')

TOKEN=$(echo "$RESPONSE" | jq -r '.token')

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
  echo "❌ Failed to get token. Response: $RESPONSE"
  exit 1
fi

echo "✅ Token obtained: ${TOKEN:0:20}..."

# Test GET /api/profile/me
echo -e "\n2. Testing GET /api/profile/me..."
curl -s -H "Authorization: Bearer $TOKEN" \
  http://localhost:4000/api/profile/me | jq '.'

# Test PUT /api/profile/me (update profile)
echo -e "\n3. Testing PUT /api/profile/me (update profile)..."
curl -s -X PUT http://localhost:4000/api/profile/me \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "headline": "Computer Science Student",
    "bio": "Passionate about web development and AI",
    "location": "Bengaluru, India",
    "skills": ["React", "Node.js", "Python", "SQL"],
    "preferences": {
      "keywords": ["React", "Frontend", "JavaScript"],
      "locations": ["Remote", "Bengaluru"],
      "minStipend": 15000
    }
  }' | jq '.'

# Test POST /api/profile/me/save (save internship)
echo -e "\n4. Testing POST /api/profile/me/save..."
curl -s -X POST http://localhost:4000/api/profile/me/save \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "internshipId": "test-123",
    "title": "Frontend Developer Intern",
    "company": "TechCorp",
    "url": "https://example.com/job/123"
  }' | jq '.'

# Test POST /api/profile/me/apply (record application)
echo -e "\n5. Testing POST /api/profile/me/apply..."
curl -s -X POST http://localhost:4000/api/profile/me/apply \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "internshipId": "test-456",
    "title": "Data Science Intern",
    "company": "DataCorp"
  }' | jq '.'

# Test GET /api/internships/recommended
echo -e "\n6. Testing GET /api/internships/recommended..."
curl -s -H "Authorization: Bearer $TOKEN" \
  http://localhost:4000/api/internships/recommended | jq '.'

echo -e "\n✅ All tests completed!"
echo "Check the responses above for any errors."
