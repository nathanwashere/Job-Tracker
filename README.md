# Job Tracker

A full-stack web application for organizing and tracking job applications.  
Built with the **MERN stack** (MongoDB, Express, React, Node.js) and deployed with **Vercel** (frontend) and **Render** (backend).

---

## 🚀 Features
- 🔐 **Authentication** – Secure JWT-based login & signup with cookies  
- 📌 **Job Management (CRUD)** – Create, Read, Update, and Delete job applications  
- 🛡️ **Protected Routes** – Only authenticated users can access dashboard and jobs  
- 📊 **Dashboard** – Track and manage multiple applications in one place  
- 🌐 **Deployment** – Frontend on Vercel, backend on Render  

---

## 🛠️ Tech Stack
**Frontend**
- React (Vite)
- React Router  
- ESLint (linting & best practices)

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (stored in cookies)

**Deployment**
- Vercel (frontend)  
- Render (backend)

---

## ⚡ Getting Started

### Prerequisites
- Node.js (>= 18)
- MongoDB Atlas or local MongoDB

### 1. Clone Repository
```bash
git clone https://github.com/your-username/job-tracker.git
cd job-tracker
```
### 2. 🔧 Backend Setup

Navigate into the backend folder, install dependencies, create a `.env` file, and start the server:

```bash
cd backend
npm install

# Create a .env file with the following variables:
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=3000

# Run the server
npm start
```
### 3. 🎨 Frontend

The frontend is built with **React (Vite)** and styled with modern React libraries.  
It communicates with the backend API and handles routing and authentication via JWT cookies.
```bash
Run locally with:
npm install
npm run dev
```
Available at **http://localhost:5173**
