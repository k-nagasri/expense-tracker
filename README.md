# 💰 MERN Expense Tracker

A full-stack Expense Tracker web application built using the MERN stack (MongoDB, Express, React, Node.js).  
The application allows users to securely manage income and expense transactions while viewing real-time financial analytics.

---

## 🛠 Tech Stack

**Frontend**
- React
- CSS
- React Icons

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## ✨ Features

- User Registration & Login
- Protected Routes (Authenticated Access Control)
- Add, Edit and Delete Transactions
- Income & Expense Tracking
- Date-Based Filtering
- Type of transaction based filtering
- Sorted Transaction History
- Real-Time Expense Analytics Dashboard
- Category-Based Breakdown

---

## 📊 Analytics Capabilities

- Total Income Calculation
- Total Expense Calculation
- Percentage Income and Expense Calculations
- Category-wise Expense Distribution
- Filter Transactions by Date Range
- Dynamic Data Rendering

---

## 📁 Project Structure

```
expense-tracker/
│
├── client/              # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── models/              # Mongoose Models
├── routes/              # API Routes
├── dbConnect.js         # MongoDB Connection
├── server.js            # Express Server
├── package.json         # Backend Dependencies
└── README.md
```

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/k-nagasri/expense-tracker.git
cd expense-tracker
```

### 2️⃣ Install Backend Dependencies

```bash
npm install
```

### 3️⃣ Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

### 4️⃣ Create Environment File

Create a `.env` file in the root directory:

```
MONGO_URL=your_mongodb_connection_string
```

### 5️⃣ Build & Run Application

```bash
npm run build
npm start
```

Application will run on:

```
http://localhost:5000
```

---

## 🎯 Project Highlights

- Full MERN Stack Implementation
- RESTful API Architecture
- Clean Folder Structure
- Production-Ready Deployment Setup
- Environment Variable Configuration
- GitHub Version Control Best Practices

---

## 👩‍💻 Author

**Kuncharapu Naga sri Harsha**

---

## ⭐ If You Like This Project

Consider giving it a star on GitHub!
