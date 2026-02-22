#  Eventful

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Supported-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

Eventful is a professional event management platform that allows event creators to create, manage, and track events, sell tickets, and verify attendees using QR codes. It also provides eventees latest events and access to these events.

It provides a complete event lifecycle system including event creation, ticket purchasing, QR-based entry validation, and advanced analytics.

---

# 🚀 Features

## 👤 Authentication & Authorization

- Secure user registration and login
- JWT-based authentication
- Role-based access:
  - Creator
  - Eventee

---

## 🎯 Event Management (Creator)

- Create events
- Upload event images
- Edit events
- Delete events
- View created events
- Pagination support

---

## 🎫 Ticket System

- Browse events
- Purchase tickets
- Unique QR code per ticket
- View purchased tickets
- Track ticket status

---

## 📱 QR Code Check-in

- Unique QR per ticket
- Scan and verify tickets
- Prevent duplicate usage
- Track attendance automatically

---

## 📊 Advanced Creator Analytics

Creators can see:

### Global Stats
- Total events created
- Total tickets sold
- Total attendees
- Total checked-in attendees

### Per Event Stats
- Tickets sold per event
- Attendance per event
- Checked-in attendees per event
- Attendance rate

---

## 🧠 Dashboard System

### Creator Dashboard
- View events
- View analytics
- Track performance

### Eventee Dashboard
- Browse events
- View tickets
- Access QR codes

---

# 🏗️ Tech Stack

## Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Paystack Integration (for test payment)

## Frontend
- EJS
- Bootstrap 5
- HTML
- CSS
- JavaScript

## Authentication
- JWT
- Cookies

---

# 📁 Project Structure
src/
├── controllers/
├── services/
├── models/
├── routes/
├── middlewares/
├── views/
├── config/
├── public/
├── jobs/
├── utils/
├── types/
└── app.ts
└── server.ts

root/
package.json
tsconfig.json


---

# ⚙️ Installation

## Clone repository

```bash
git clone https://github.com/osborn94/eventful.git
cd eventful
```

# Install dependencies

- npm install

# Configure Environment Variables

- PORT=
- MONGO_URI=
- JWT_SECRET=
- NODE_ENV=
- JWT_SECRET=
- PAYSTACK_SECRET_KEY=
- PAYSTACK_PUBLIC_KEY=
- PAYSTACK_CALLBACK_URL=
- EMAIL_USER=
- EMAIL_PASS=

# Run the application

Development mode:

- npm run dev

Production mode:

- npm run build
- npm start

# 🔐 Authentication Flow

- User registers
- JWT token is generated
- Token stored in cookie
- Middleware verifies token
- User gains access based on role

# 🎟️ Ticket Flow

- Eventee selects event
- Purchases ticket
- QR code generated automatically
- Ticket stored in database
- QR scanned at event entrance
- Attendance recorded

# 📊 Analytics Logic

Analytics are calculated using database aggregation:

- Total tickets sold
- Tickets per event
- Checked-in tickets
- Attendance rate

# 🌐 Routes Overview

# Auth Routes
- GET  /login
- POST /login
- GET  /register
- POST /register
- POST /logout

# Event Routes
- GET  /events
- GET  /events/new
- POST /events
- GET  /events/:slug

# Ticket Routes
- GET  /tickets
- POST /tickets/purchase/:eventId
- GET  /tickets/:id

# Dashboard Routes
- GET /dashboard
- GET /dashboard/creator
- GET /dashboard/eventee

# 🧪 Testing

Manual testing includes:

- Authentication testing
- Ticket purchase testing
- QR scanning validation
- Analytics verification

# 🚀 Deployment

Supported deployment platforms:
- Render
- Railway
- DigitalOcean
- AWS

Production checklist:

- Enable HTTPS
- Environment variables configured
- Database secured

# 👨‍💻 Author

Israel Osborn Odafe

Software Engineer
Backend Developer (Node.js, Express, MongoDB)
