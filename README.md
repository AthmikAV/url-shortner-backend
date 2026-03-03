🚀 URL Shortener Backend

A scalable and secure URL Shortener backend built with Node.js, Express, PostgreSQL, and Drizzle ORM.

This project allows authenticated users to generate short links, redirect to original URLs, and manage their created links.

📌 Features

🔐 JWT Authentication (Cookie-based)

👤 User Registration & Login

🔗 Create Short URLs (Custom or Auto-generated)

↪ Redirect to Original URL

🛡 Input Validation using Zod

🗄 PostgreSQL with Drizzle ORM

⚡ Unique short code enforcement

🧾 Proper error handling

📦 Clean project architecture

🛠 Tech Stack

Backend Framework: Express.js

Database: PostgreSQL

ORM: Drizzle ORM

Authentication: JSON Web Token

Validation: Zod

📂 Project Structure
url-shortener-backend/
│
├── models/ # Database schema definitions
├── routes/ # Express route handlers
├── services/ # Business logic layer
├── middlewares/ # Authentication & error handling
├── drizzle/ # Migration files
├── index.js # App entry point
├── drizzle.config.js # Drizzle configuration
└── README.md
🗄 Database Schema
Users Table

id (UUID, PK)

first_name

last_name

email (Unique)

password (Hashed)

created_at

updated_at

URLs Table

id (UUID, PK)

code (Unique short code)

target_url

user_id (Foreign Key → users.id)

created_at

updated_at

🔐 Authentication Flow

User registers

Password is hashed

JWT token is generated

Token stored in HTTP-only cookie

Middleware verifies token for protected routes

📡 API Endpoints
🔹 Auth Routes
Method Endpoint Description
POST /auth/signup Register user
POST /auth/login Login user
POST /auth/logout Logout user
🔹 URL Routes
Method Endpoint Description
POST /urls Create short URL (Protected)
GET /:shortCode Redirect to original URL
GET /urls/me Get all URLs of logged-in user
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone <your-repo-url>
cd url-shortener-backend
2️⃣ Install Dependencies
npm install
3️⃣ Setup Environment Variables

Create .env file:

PORT=8000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
4️⃣ Run Database Migrations
npx drizzle-kit generate
npx drizzle-kit migrate
5️⃣ Start Server
npm run dev

Server runs on:

http://localhost:8000
🛡 Error Handling Strategy

Unique constraint errors handled (PostgreSQL code 23505)

Foreign key errors handled (23503)

Centralized error middleware

Consistent JSON response structure

🧪 Example Request (Create Short URL)
{
"url": "https://www.google.com",
"shortCode": "google"
}
🧠 Key Backend Concepts Implemented

Stateless Authentication

Cookie-based JWT handling

Middleware-based route protection

Relational database design

Service layer architecture

Input validation

Proper async error handling

🚀 Future Improvements

Click analytics

Rate limiting

Expiration links

QR code generation

Deployment (Docker + Cloud)

👨‍💻 Author

Athmik A V
Backend Developer | Full Stack Enthusiast

⭐ Why This Project Matters

This project demonstrates:

Backend architecture understanding

Authentication & Authorization

Real-world database relationships

Error handling best practices

Production-ready structure
