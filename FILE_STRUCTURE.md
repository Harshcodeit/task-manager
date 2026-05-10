# Complete Project File Listing

This document provides a complete overview of all files in the Task Manager MERN application.

## Root Directory Files

```
Task Manager/
├── README.md                 # Main project documentation
├── QUICKSTART.md            # Quick setup guide
├── DEPLOYMENT.md            # Deployment instructions
├── ARCHITECTURE.md          # Architecture and development guide
└── FILE_STRUCTURE.md        # This file
```

## Backend Structure

```
backend/
├── package.json             # Dependencies and scripts
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── Procfile                 # Render deployment file
└── src/
    ├── server.js            # Main Express application
    │
    ├── config/
    │   └── database.js      # MongoDB connection setup
    │
    ├── models/
    │   ├── User.js          # User schema (registration, authentication)
    │   └── Task.js          # Task schema (CRUD operations)
    │
    ├── controllers/
    │   ├── authController.js # Register, login, get current user
    │   └── taskController.js # Get, create, update, delete tasks
    │
    ├── middleware/
    │   └── auth.js          # JWT token verification middleware
    │
    └── routes/
        ├── authRoutes.js    # /api/auth endpoints
        └── taskRoutes.js    # /api/tasks endpoints
```

### Backend File Descriptions

#### `package.json`

- Lists all Node.js dependencies
- Defines npm scripts (dev, start)
- Specifies Node version

#### `src/server.js`

- Main Express application file
- Sets up middleware (CORS, JSON parsing)
- Connects to MongoDB
- Mounts routes
- Error handling

#### `src/config/database.js`

- MongoDB connection function
- Handles connection errors
- Used by server.js on startup

#### `src/models/User.js`

- Mongoose User schema
- Email validation
- Password hashing with bcryptjs
- Password comparison method
- Timestamps (createdAt, updatedAt)

#### `src/models/Task.js`

- Mongoose Task schema
- References User via userId
- Title (required), description, completed status
- Timestamps for tracking

#### `src/controllers/authController.js`

- `register()`: Create new user, hash password, return JWT
- `login()`: Verify credentials, return JWT
- `getMe()`: Return current user data (protected)

#### `src/controllers/taskController.js`

- `getTasks()`: Get all tasks for user
- `getTask()`: Get single task (verify ownership)
- `createTask()`: Create new task for user
- `updateTask()`: Update task (verify ownership)
- `deleteTask()`: Delete task (verify ownership)

#### `src/middleware/auth.js`

- `protect()`: Middleware to verify JWT token
- Extracts token from Authorization header
- Verifies signature
- Sets req.user with decoded token data

#### `src/routes/authRoutes.js`

- `POST /api/auth/register`: Register new user
- `POST /api/auth/login`: Login user
- `GET /api/auth/me`: Get current user (protected)

#### `src/routes/taskRoutes.js`

- `GET /api/tasks`: Get all user tasks (protected)
- `POST /api/tasks`: Create task (protected)
- `GET /api/tasks/:id`: Get single task (protected)
- `PUT /api/tasks/:id`: Update task (protected)
- `DELETE /api/tasks/:id`: Delete task (protected)

## Frontend Structure

```
frontend/
├── package.json             # Dependencies and scripts
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration (Tailwind)
├── index.html               # HTML entry point
│
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # Main app component with routing
    ├── index.css            # Tailwind CSS imports
    │
    ├── pages/
    │   ├── LoginPage.jsx    # User login form page
    │   ├── RegisterPage.jsx # User registration form page
    │   └── DashboardPage.jsx# Main task management page
    │
    ├── components/
    │   ├── Navbar.jsx       # Navigation bar with logout
    │   ├── TaskForm.jsx     # Form to create/edit tasks
    │   └── TaskList.jsx     # Display and manage tasks
    │
    ├── context/
    │   └── AuthContext.jsx  # Authentication state management
    │
    ├── api/
    │   └── client.js        # Axios instance with interceptors
    │
    └── utils/
        └── auth.js          # LocalStorage auth utilities
```

### Frontend File Descriptions

#### `package.json`

- Lists React and dependencies
- Defines npm scripts (dev, build, preview)
- Vite as build tool

#### `vite.config.js`

- Vite configuration
- React plugin setup
- Development server port (5173)
- API proxy for /api routes

#### `tailwind.config.js`

- Tailwind CSS configuration
- Content paths for JIT compilation

#### `postcss.config.js`

- PostCSS configuration for Tailwind

#### `index.html`

- HTML entry point
- Root div for React mounting
- Script tag for main.jsx

#### `src/main.jsx`

- React DOM rendering
- AuthProvider wrapper
- Mounts App component

#### `src/App.jsx`

- Main application component
- React Router setup with routes
- ProtectedRoute component for authenticated pages
- Routes: /login, /register, /dashboard, /
- Loading state handling

#### `src/index.css`

- Tailwind CSS imports
- @tailwind base, components, utilities

#### `src/pages/LoginPage.jsx`

- Login form component
- Email and password inputs
- Form submission handling
- Error display
- Link to register page
- Uses AuthContext.login()

#### `src/pages/RegisterPage.jsx`

- Registration form component
- Name, email, password, password confirmation
- Form validation (matching passwords, length)
- Error display
- Link to login page
- Uses AuthContext.register()

#### `src/pages/DashboardPage.jsx`

- Main dashboard page (protected route)
- Task list display
- Add task form
- Filter buttons (all, pending, completed)
- Task management (toggle, edit, delete)
- Loading states
- Error handling

#### `src/components/Navbar.jsx`

- Navigation bar
- App logo/title
- User greeting
- Logout button
- Links to login/register (when not authenticated)

#### `src/components/TaskForm.jsx`

- Form for creating/editing tasks
- Title input (required)
- Description textarea (optional)
- Submit button
- Loading state handling
- Clears form after submission

#### `src/components/TaskList.jsx`

- Displays list of tasks
- Checkbox to mark complete/incomplete
- Edit functionality (inline editing)
- Delete button with confirmation
- Shows task creation date
- Displays "no tasks" message when empty
- Edit mode with save/cancel
- Strikethrough for completed tasks

#### `src/context/AuthContext.jsx`

- AuthProvider component
- Auth state: user, loading, error
- useEffect to check auth on mount
- Methods: register(), login(), logout()
- Persists token in localStorage
- Provides auth context to all components

#### `src/api/client.js`

- Axios instance creation
- Base URL configuration from env
- Request interceptor (adds token to headers)
- Auth API methods: register, login, getMe
- Task API methods: getTasks, getTask, createTask, updateTask, deleteTask

#### `src/utils/auth.js`

- `isAuthenticated()`: Check if token exists
- `getToken()`: Retrieve token from storage
- `setToken()`: Save token to storage
- `removeToken()`: Delete token from storage

## Configuration Files Explained

### Environment Variables

#### Backend `.env`

```
MONGODB_URI          # MongoDB connection string
JWT_SECRET           # Secret for JWT signing
PORT                 # Server port
NODE_ENV             # Environment (development/production)
FRONTEND_URL         # Frontend URL for CORS
```

#### Frontend `.env`

```
VITE_API_URL         # Backend API URL
```

## How Files Work Together

### Authentication Flow

1. **User Registration**
   - Frontend: RegisterPage.jsx → AuthContext.register()
   - AuthContext: Calls authAPI.register()
   - API: client.js → POST /api/auth/register
   - Backend: authRoutes → authController.register()
   - Database: User.js saves hashed password
   - Response: JWT token sent back
   - Frontend: Token saved to localStorage via AuthContext

2. **Page Load Auth Check**
   - Frontend: App.jsx mounts
   - AuthContext: useEffect fires on mount
   - Checks localStorage for token
   - If exists: Calls authAPI.getMe()
   - Backend: protect middleware verifies token
   - Returns user data or clears token if invalid
   - AuthContext: Updates user state, loading → false

3. **Task Creation**
   - Frontend: TaskForm → DashboardPage.handleAddTask()
   - API: client.js adds token to headers
   - Backend: protect middleware verifies token
   - Controller: Creates task linked to user ID
   - Database: Task saved to MongoDB
   - Response: New task returned
   - Frontend: Task added to state, UI updates

## Development Workflow

1. Start Backend
   - Terminal 1: `cd backend && npm run dev`
   - Server runs on http://localhost:5000

2. Start Frontend
   - Terminal 2: `cd frontend && npm run dev`
   - App runs on http://localhost:5173

3. Make Changes
   - Backend: Auto-reloads via nodemon
   - Frontend: Auto-reloads via Vite HMR

4. Test
   - Frontend: Open in browser
   - Backend: Check logs in terminal
   - Database: Check MongoDB Atlas UI

## Build and Deployment

### Backend Build

```bash
cd backend
npm install
# Creates .env with production variables
npm start  # Uses Node to run server.js
```

### Frontend Build

```bash
cd frontend
npm install
npm run build  # Creates dist/ folder
# Upload dist/ to Vercel
```

## File Size Overview

### Backend Total

- Code: ~5 KB (excluding node_modules)
- Dependencies: ~100 MB (node_modules)

### Frontend Total

- Code: ~20 KB (excluding node_modules)
- Dependencies: ~500 MB (node_modules)
- Built: ~50 KB (minified)

## Modification Guide

### To Add a New Feature

1. **Database Model**: Add fields to `models/User.js` or `models/Task.js`
2. **API Route**: Add endpoint to `routes/authRoutes.js` or `routes/taskRoutes.js`
3. **Controller**: Implement logic in `controllers/`
4. **Frontend API**: Add method to `api/client.js`
5. **Component**: Create/update component in `components/`
6. **Page/Context**: Add page in `pages/` or update `context/AuthContext.jsx`
7. **Testing**: Test in frontend and verify database changes

### Example: Add Task Priority

1. Update `models/Task.js`: Add `priority` field
2. Update `controllers/taskController.js`: Include priority in create/update
3. Update `routes/taskRoutes.js`: (no changes needed)
4. Update `api/client.js`: (no changes needed, already flexible)
5. Update `components/TaskForm.jsx`: Add priority input
6. Update `components/TaskList.jsx`: Display priority
7. Update `pages/DashboardPage.jsx`: Handle priority filtering

## Next Steps

1. Read **QUICKSTART.md** to run the project locally
2. Read **DEPLOYMENT.md** to deploy to production
3. Read **ARCHITECTURE.md** for deep dive into patterns
4. Modify and extend features as needed
5. Deploy and monitor your app

## File Dependencies

```
App.jsx → Routes to Pages
LoginPage/RegisterPage → AuthContext
DashboardPage → TaskList, TaskForm, TaskContext, TaskAPI
TaskList → TaskAPI for actions
TaskForm → TaskAPI for submissions
AuthContext → AuthAPI
API Client → Axios (with token interceptor)
All Pages → Navbar
```

## Maintenance

- Update dependencies: `npm outdated`, `npm update`
- Security: `npm audit`, `npm audit fix`
- Code quality: Add ESLint, Prettier
- Testing: Add Jest, Vitest, Cypress
- Monitoring: Add error tracking, logging
