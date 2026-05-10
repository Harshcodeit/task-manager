# Quick Start Guide for Task Manager

## One-Command Setup (Requires Node.js installed)

### Windows

#### Terminal 1 - Backend:

```cmd
cd backend
npm install
copy .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

#### Terminal 2 - Frontend:

```cmd
cd frontend
npm install
copy .env.example .env
npm run dev
```

### Mac/Linux

#### Terminal 1 - Backend:

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

#### Terminal 2 - Frontend:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string from "Connect" button
5. Paste into backend `.env` as `MONGODB_URI`

### Option 2: MongoDB Community (Local)

1. Install MongoDB: https://docs.mongodb.com/manual/installation/
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/taskmanager`

## Testing the App

1. Open http://localhost:5173 in your browser
2. Click "Register"
3. Create account with:
   - Name: Your Name
   - Email: test@example.com
   - Password: password123
4. After login, click "Add Task"
5. Create a task with title "Test Task"
6. Try editing, completing, and deleting tasks

## Verify Everything Works

- Backend API: Visit http://localhost:5000/api/health
  - Should return: `{"message":"Server is running"}`
- Frontend: http://localhost:5173
  - Should show login page if not authenticated

## Troubleshooting

### Port 5000 already in use (Backend)

```
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Port 5173 already in use (Frontend)

```
npm run dev -- --port 5174
```

### Cannot connect to MongoDB

1. Check MongoDB URI in `.env`
2. Verify database is running (if local)
3. Check IP whitelist in MongoDB Atlas (if cloud)

### CORS Error

- Ensure `FRONTEND_URL` in backend `.env` is correct
- For local development: `http://localhost:5173`

## Project Structure Overview

```
Task Manager/
├── backend/              # Express server + MongoDB
│   ├── src/
│   │   ├── server.js     # Main app file
│   │   ├── models/       # Database schemas
│   │   ├── controllers/  # Business logic
│   │   ├── routes/       # API endpoints
│   │   └── middleware/   # Auth, logging, etc.
│   └── package.json
└── frontend/             # React + Vite app
    ├── src/
    │   ├── pages/        # Login, Register, Dashboard
    │   ├── components/   # Navbar, TaskForm, TaskList
    │   ├── api/          # Axios client
    │   └── context/      # Auth state
    ├── package.json
    └── index.html
```

## Key Commands

### Backend

- `npm install` - Install dependencies
- `npm run dev` - Start dev server (with auto-reload)
- `npm start` - Start production server

### Frontend

- `npm install` - Install dependencies
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Documentation

### Auth Endpoints

```
POST /api/auth/register
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }

POST /api/auth/login
  {
    "email": "john@example.com",
    "password": "password123"
  }

GET /api/auth/me (requires token)
```

### Task Endpoints (all require authentication token)

```
GET /api/tasks                    - Get all tasks
POST /api/tasks                   - Create task
PUT /api/tasks/:id                - Update task
DELETE /api/tasks/:id             - Delete task
GET /api/tasks/:id                - Get single task
```

## Features Included

✅ User Registration & Login
✅ JWT Authentication
✅ Create Tasks
✅ Edit Tasks
✅ Delete Tasks
✅ Mark Tasks Complete
✅ Filter Tasks
✅ Responsive Design
✅ Error Handling
✅ Loading States
✅ Protected Routes

## Next Steps

1. Follow DEPLOYMENT.md for deploying to production
2. Customize colors in tailwind.config.js
3. Add more features (priorities, categories, etc.)
4. Set up automated testing
5. Monitor production logs

## Get Help

Check README.md for detailed information about:

- Complete project structure
- Detailed deployment instructions
- Troubleshooting guide
- Learning resources
- Enhancement ideas
