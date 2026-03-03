# 🚀 URL Shortener Backend

A scalable and secure URL Shortener backend built with Node.js, Express,
PostgreSQL, and Drizzle ORM.

This project allows authenticated users to generate short links,
redirect to original URLs, and manage their created links.

---

## 📌 Features

- JWT Authentication (HTTP-only cookies)
- User Registration & Login
- Create Short URLs (Custom or Auto-generated)
- Redirect to Original URL
- Input Validation using Zod
- PostgreSQL with Drizzle ORM
- Unique short code enforcement
- Centralized error handling
- Clean and scalable project structure

---

## 🛠 Tech Stack

- Backend: Node.js + Express
- Database: PostgreSQL
- ORM: Drizzle ORM
- Authentication: JWT
- Validation: Zod

---

## 📂 Project Structure

url-shortener-backend/ │ ├── models/ ├── routes/ ├── services/ ├──
middlewares/ ├── drizzle/ ├── index.js ├── drizzle.config.js └──
README.md

---

## 🗄 Database Schema

### Users Table

- id (UUID, Primary Key)
- first_name
- last_name
- email (Unique)
- password (Hashed)
- created_at
- updated_at

### URLs Table

- id (UUID, Primary Key)
- code (Unique short code)
- target_url
- user_id (Foreign Key → users.id)
- created_at
- updated_at

---

## 🔐 Authentication Flow

1.  User registers
2.  Password is hashed using bcrypt
3.  JWT token is generated
4.  Token stored in HTTP-only cookie
5.  Middleware verifies token for protected routes

---

## 📡 API Endpoints

### Auth Routes

POST /auth/signup → Register user\
POST /auth/login → Login user\
POST /auth/logout → Logout user

### URL Routes

POST /urls → Create short URL (Protected)\
GET /:shortCode → Redirect to original URL\
GET /urls/me → Get all URLs of logged-in user

---

## ⚙️ Installation & Setup

1.  Clone Repository git clone `<your-repo-url>`{=html} cd
    url-shortener-backend

2.  Install Dependencies npm install

3.  Setup Environment Variables (.env)

    PORT=8000\
    DATABASE_URL=your_postgres_connection_string\
    JWT_SECRET=your_secret_key

4.  Run Migrations npx drizzle-kit generate\
    npx drizzle-kit migrate

5.  Start Server npm run dev

Server runs at: http://localhost:8000

---

## 🧠 Backend Concepts Implemented

- Stateless Authentication
- Cookie-based JWT handling
- Middleware-based route protection
- Relational database design
- Service layer architecture
- Async error handling

---

## 🚀 Future Improvements

- Click analytics
- Rate limiting
- Expiration links
- QR code generation
- Docker deployment

---

## 👨‍💻 Author

Athmik A V\
Backend Developer \| Full Stack Enthusiast
