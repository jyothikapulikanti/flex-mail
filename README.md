# 📧 Flexi-Mail

A modern cloud-based email management platform built with React, Node.js, Express, and MongoDB. Flexi-Mail provides secure communication with advanced email productivity features such as draft management, sent-mail editing, spam controls, auto-delete rules, and real-time email tracking.

---

## 🚀 Features

### 🔐 Authentication

* User Registration
* Secure Login System
* Session Persistence
* Protected User Data

### 📩 Email Management

* Compose and Send Emails
* Inbox Management
* Sent Mail Tracking
* Draft Saving & Editing
* Trash Folder
* Promotions Folder
* Spam Folder

### ⭐ Productivity Features

* Reply to Emails
* Mark Emails as Read
* Star Important Emails
* Search Emails Instantly
* Folder-Based Organization

### ✨ Advanced Features

* Edit Sent Email Within Allowed Time Window
* Real-Time Edit Countdown Timer
* Auto-Delete Email Rules
* Spam Detection & Management
* Email Status Tracking
* User-Specific Mailbox Management

### 🌐 REST API Support

* User Authentication APIs
* Email CRUD Operations
* Folder Management APIs
* Email Tracking APIs
* Spam Management APIs

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript (ES6+)
* Vite
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* bcrypt
* Custom Authentication APIs

---

## 📂 Project Structure

```text
Flexi-Mail
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/flexi-mail.git
cd flexi-mail
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend/Flex-mail
npm install
npm run dev
```

---

## 🔧 Environment Variables

Create a `.env` file inside the backend directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | /api/auth/signup |
| POST   | /api/auth/login  |

### Emails

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | /api/emails          |
| POST   | /api/emails          |
| DELETE | /api/emails/:id      |
| PUT    | /api/emails/:id/read |
| PUT    | /api/emails/:id/star |
| PUT    | /api/emails/:id/move |
| PUT    | /api/emails/:id/edit |

---

## 📈 Project Highlights

* Built a full-stack email management system from scratch.
* Implemented secure authentication and user management.
* Developed advanced "Edit Sent Email" functionality with live countdown tracking.
* Designed folder-based email categorization including Inbox, Sent, Drafts, Spam, Trash, and Promotions.
* Engineered multiple REST APIs for email operations and account management.
* Created responsive and user-friendly email workflows.
* Integrated MongoDB for scalable cloud-based data storage.

---

## 🔮 Future Enhancements

* Email Scheduling
* File Attachments
* Dark/Light Theme Toggle
* Push Notifications
* AI Spam Classification
* Smart Email Categorization
* Real-Time Messaging Support

---

## 👨‍💻 Team

**Project Name:** Flexi-Mail

**Duration:** 3 Months

**Team Size:** 3 Members

Developed as a full-stack web application project to explore modern cloud-based communication systems and scalable email workflows.

---

## 📜 License

This project is developed for educational and learning purposes.

👩‍💻 Developers

P. Jyothika

L. Harshitha

V. Sahithi
