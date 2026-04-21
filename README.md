# 🧠 Mindfull — Mental Wellness for Every Mind

> A calm, focused wellness platform helping Gen Z and young adults build emotional resilience through mindfulness tools.

![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=flat-square&logo=express)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=flat-square&logo=nodedotjs)
![JWT](https://img.shields.io/badge/JWT-Auth-F6C025?style=flat-square&logo=jsonwebtokens)

---

## Overview

Mindfull is a wellness-focused web platform built with the MERN stack, designed to help Gen Z and young adults prioritize their mental health. Through mood tracking, guided journaling, and a self-care toolkit, Mindfull encourages daily emotional check-ins, promotes self-awareness, and fosters long-term resilience — all within a calm and user-friendly experience.

---

## ✨ Features

- **Mood Tracking** — Log daily moods with visual history and emotional trend insights.
- **Guided Journaling** — Prompt-based journal entries to encourage meaningful daily reflection.
- **Self-Care Toolkit** — Curated breathing exercises, mindfulness resources, and wellness prompts.
- **Emotional Awareness** — Personalized daily check-ins designed to build resilience over time.
- **Secure Authentication** — JWT-based login and registration with bcrypt password hashing.

---

## 🚀 Tech Stack

### Frontend
- **React.js** — component-based UI
- **React Router v6** — client-side navigation
- **Axios** — HTTP requests to the backend API
- **Context API / Redux** — global state management

### Backend
- **Node.js + Express.js** — RESTful API server
- **MongoDB + Mongoose** — NoSQL database and ODM
- **JSON Web Tokens (JWT)** — secure user authentication
- **bcrypt** — password hashing

---

## 📂 Project Structure

```
Mindfull/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-level pages
│       ├── context/         # Global state (Context API)
│       ├── utils/           # Helper functions
│       └── App.jsx
│
└── server/                  # Node + Express backend
    ├── models/              # Mongoose schemas
    ├── routes/              # API route definitions
    ├── controllers/         # Business logic
    ├── middleware/          # Auth & error middleware
    └── server.js
```

---

## 🛠️ Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | v18 or higher |
| npm | v9 or higher |
| MongoDB | Atlas URI or local instance |

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mindfull.git
cd mindfull
```

### 2. Configure environment variables

Create a `.env` file inside the `server/` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 3. Run the backend

```bash
cd server
npm install
npm run dev
```

The API will be running at **http://localhost:5000**

### 4. Run the frontend

```bash
cd client
npm install
npm start
```

The app will be available at **http://localhost:3000**

---

## 📡 API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/mood` | Get mood history |
| POST | `/api/mood` | Log a mood entry |
| GET | `/api/journal` | Get all journal entries |
| POST | `/api/journal` | Create a journal entry |

---


## 🤝 Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change, then submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

*Mindfull — wellness for every mind. 🌱*
