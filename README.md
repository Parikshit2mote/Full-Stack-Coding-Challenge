# RateMyStore

RateMyStore is a full stack web application that allows users to browse, rate, and review stores. It features user authentication, role-based dashboards (Admin, Store Owner, User), and a modern UI built with React and Material-UI.

## Features
- User registration and login
- Role-based dashboards (Admin, Store Owner, User)
- Store listing and search
- Store rating and review system
- Admin management of users and stores
- Responsive design

## Tech Stack
- **Frontend:** React, Material-UI
- **Backend:** Node.js, Express, MySQL

## Getting Started

### Prerequisites
- Node.js and npm installed
- MySQL server running

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd Full-Stack-Coding-Challenge
   ```
2. Install dependencies:
   ```sh
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   cd ..
   ```
3. Set up your MySQL database using `backend/schema.sql` and configure your database credentials in `backend/config/db.js`.

### Running the App
From the project root, run:
```sh
npm start
```
This will start both the backend and frontend servers concurrently.
- Backend: [http://localhost:5000](http://localhost:5000)
- Frontend: [http://localhost:3000](http://localhost:3000)

### Deployment
- **Frontend:** Can be deployed to GitHub Pages, Vercel, or Netlify.
- **Backend:** Can be deployed to Render, Railway, or Heroku.

## Folder Structure
```
Full Stack Coding Challenge/
  backend/      # Express API
  frontend/     # React app
```

