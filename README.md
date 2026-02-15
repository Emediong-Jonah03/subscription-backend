Subscription Tracker API
A robust Node.js backend API for managing user subscriptions with features like subscription creation, tracking, renewal management, and secure authentication.

Features
🔐 User Authentication - Sign up, sign in, and secure session management with JWT tokens
📱 Subscription Management - Create, read, update, and cancel subscriptions
🛡️ Security - Rate limiting, bot detection, and password hashing with bcryptjs
🔒 Authorization - Protected routes with JWT middleware
📊 Database - MongoDB integration with Mongoose ODM
🚀 Error Handling - Comprehensive error middleware with detailed error messages
Tech Stack
Runtime: Node.js
Framework: Express.js
Database: MongoDB with Mongoose
Authentication: JWT (JSON Web Tokens)
Security: Bcryptjs, Helmet, CORS, Arcjet (rate limiting & bot detection)
Development: Nodemon, ESLint
Other: Cookie Parser, Morgan

Installation
Clone the repository
git clone <repository-url>
cd subscription-tracker

install dependecies
npm install

Set up environment variables
Create .env.development.local and .env.production.local files in the root directory:

PORT=5000
hostname=localhost
NODE_ENV=development
DB_URI=mongodb://localhost:27017/subscription-tracker
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
ARCJET_API_KEY=your_arcjet_api_key
ARCJET_ENV=development

Running the Application
Development mode (with auto-reload):
npm run dev
npm start

The API will be available at http://localhost:5000

API Endpoints
Authentication
POST /api/v1/auth/sign-up - Register a new user
POST /api/v1/auth/sign-in - Login user
POST /api/v1/auth/sign-out - Logout user
Users
GET /api/v1/users - Get all users (requires auth)
GET /api/v1/users/:id - Get user by ID (requires auth)
POST /api/v1/users - Create new user
PUT /api/v1/users/:id - Update user
DELETE /api/v1/users/:id - Delete user
Subscriptions
POST /api/v1/subscriptions - Create subscription (requires auth)
GET /api/v1/subscriptions - Get all subscriptions
GET /api/v1/subscriptions/:id - Get subscription by ID
GET /api/v1/subscriptions/user/:id - Get user's subscriptions
GET /api/v1/subscriptions/upcoming-renewal - Get upcoming renewals
PUT /api/v1/subscriptions/:id - Update subscription
PUT /api/v1/subscriptions/:id/cancel - Cancel subscription
DELETE /api/v1/subscriptions/:id - Delete subscription
Project Structure
Authentication
The API uses JWT-based authentication. Include the token in the Authorization header:

Error Handling
The API includes comprehensive error handling for:

Invalid MongoDB ObjectIds (CastError)
Duplicate field values
Validation errors
Authentication failures
Security Features
Rate Limiting - Token bucket algorithm (5 requests per 10 seconds)
Bot Detection - Arcjet shield protection
CORS - Cross-origin request handling
Helmet - HTTP security headers
Password Hashing - bcryptjs with salt rounds
License
This project is private.

Claude Haiku 4.5 • 1x

subscription-tracker/
├── config/              # Configuration files
│   ├── arcjet.js       # Arcjet security setup
│   └── env.js          # Environment variables
├── controllers/         # Business logic
│   ├── auth.controller.js
│   └── users.controller.js
├── middleware/          # Express middleware
│   ├── arcjet.middleware.js
│   ├── autho.middleware.js
│   └── error.middleware.js
├── models/              # Mongoose schemas
│   ├── user.model.js
│   └── subscription.model.js
├── routes/              # API routes
│   ├── auth.route.js
│   ├── user.route.js
│   └── subscription.route.js
├── database/            # Database connection
│   └── mongodb.js
├── app.js              # Express app setup
└── package.json        # Dependencies

Authorization: Bearer <your_jwt_token>