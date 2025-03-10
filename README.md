# 🚀 Job Search Platform

A full-stack web application that allows users to search for jobs, save them to their profile, and add notes/comments to track their application process. ✨

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contact](#contact)

## 🌟 Overview

This Job Search Platform is designed to streamline the job hunting process. Users can search for job listings, save interesting positions to their profile, and add comments or notes to track their application progress. Let's make job hunting fun! 🎯

## ✅ Features

- **🔍 Job Search**: Search for jobs with customizable queries (e.g., "developer in Austin")
- **📑 Job Listings**: View detailed job information including title, company, location, salary, and description
- **🔐 User Authentication**: Secure login system for personalized experience
- **💾 Save Jobs**: Authenticated users can save jobs to their profile for later review
- **🗑️ Job Management**: Delete saved jobs that are no longer of interest
- **📝 Application Tracking**: Add comments/notes to saved jobs to track application status and details
- **📱 Responsive Design**: Fully responsive interface that works on desktop and mobile devices

## 💻 Technologies Used

### Frontend
- ⚛️ React with TypeScript
- 🔄 Apollo Client for GraphQL integration
- 🎨 Bootstrap for responsive styling

### Backend
- 🟢 Node.js
- 🚂 Express.js
- 📊 GraphQL API
- 🍃 MongoDB with Mongoose ODM
- 🔒 JWT Authentication

## 🏗️ Project Structure

```
job-search-platform/
├── client/                  # Frontend React application
│   ├── public/              # Static files
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Main page components
│       ├── utils/           # Helper functions, queries & mutations
│       └── models/          # TypeScript interfaces
├── server/                  # Backend application
│   ├── models/              # Mongoose models
│   ├── schemas/             # GraphQL schemas
│   ├── controllers/         # API controllers
│   └── utils/               # Helper utilities
└── README.md                # Project documentation
```

## 🔧 Installation

1. Clone the repository:
   ```
   git clone [repository-url]
   ```

2. Install server dependencies:
   ```
   cd job-search-platform
   npm install
   ```

3. Install client dependencies:
   ```
   cd client
   npm install
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JOB_API_KEY=your_job_api_key
   ```

5. Start the development server:
   ```
   npm run develop
   ```

## 📘 Usage

1. Create an account or log in to access all features ✅
2. Use the search function to find jobs by keyword and location 🔍
3. Save interesting jobs to your profile 💾
4. Add comments and track application status for saved jobs 📝
5. Access your saved jobs anytime from your profile 👤

## 🔌 API Integration

The application integrates with a third-party job search API to fetch real-time job listings. The API integration is handled through a proxy server to secure API keys. 🔒

## 📸 Screenshots

[Include screenshots of your application here]

## 🚀 Future Enhancements

- 📧 Email notifications for job application deadlines
- 📄 Resume upload and management
- 📊 Application status tracking (Applied, Interview, Offer, etc.)
- ⚖️ Job comparison feature
- 🔗 Integration with LinkedIn and other professional networks

## 📞 Contact

[Harry P Oyarvide] - [poyarvide87@gmail.com]

Project Link: [https://github.com/HPOGFD/JobSearchAPI.git] 🌐

## 🎉 Happy Job Hunting!