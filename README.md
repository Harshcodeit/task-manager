# Task Manager MERN App

A full-stack Task Manager application built with MongoDB, Express, React, and Node.js. Perfect for learning the MERN stack!

## Features

- 🔐 User Authentication (Registration & Login)
- 🔑 JWT-based authentication
- ✅ Create, Read, Update, Delete Tasks
- ✔️ Mark tasks as completed
- 📱 Fully responsive UI with Tailwind CSS
- 🎨 Clean and modern interface
- 🛡️ Protected routes and API endpoints
- ⚡ Fast and efficient with Vite

## Tech Stack

**Backend:**

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcryptjs for password hashing

**Frontend:**

- React 18 with Vite
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling

## Project Structure

```
Task Manager/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── client.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── TaskForm.jsx
    │   │   └── TaskList.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   └── DashboardPage.jsx
    │   ├── utils/
    │   │   └── auth.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── .env.example
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (for cloud database)

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB URI and JWT secret:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   JWT_SECRET=your_secure_secret_key
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Update `.env` if needed (default points to localhost:5000):

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks

- `GET /api/tasks` - Get all tasks (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## Usage

1. **Register**: Click "Register" and create a new account
2. **Login**: Login with your credentials
3. **Create Task**: Enter task title and description, click "Add Task"
4. **Manage Tasks**:
   - Check the checkbox to mark as completed
   - Click "Edit" to modify the task
   - Click "Delete" to remove the task
5. **Filter Tasks**: Use the filter buttons to view all, pending, or completed tasks
6. **Logout**: Click "Logout" in the navbar

## Deployment

### Deploy Backend to Render

1. Push your backend code to GitHub
2. Go to [Render.com](https://render.com)
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Set up environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secure JWT secret
   - `NODE_ENV`: Set to `production`
   - `FRONTEND_URL`: Your deployed frontend URL
6. Set build command: `npm install`
7. Set start command: `npm start`
8. Click "Deploy"

### Deploy Frontend to Vercel

1. Push your frontend code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Click "Add New..." and select "Project"
4. Import your GitHub repository
5. Set up environment variables:
   - `VITE_API_URL`: Your deployed backend API URL (e.g., https://your-backend.onrender.com/api)
6. Click "Deploy"

### Environment Variables for Production

**Backend (.env):**

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=use_a_strong_random_secret_here
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

**Frontend (.env.production):**

```
VITE_API_URL=https://your-backend.onrender.com/api
```

## Key Learning Points

1. **Authentication Flow**: How JWT tokens work and are used for authorization
2. **Database Design**: MongoDB schema design with relationships
3. **Password Security**: Hashing passwords with bcryptjs
4. **API Design**: RESTful API principles
5. **Frontend State Management**: Using Context API for authentication
6. **Component Architecture**: React functional components and hooks
7. **Error Handling**: Proper error handling in both frontend and backend
8. **Protected Routes**: Implementing route protection in React

## Common Issues & Solutions

### CORS Issues

- Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check that both frontend and backend are running

### MongoDB Connection Error

- Verify your MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas (allow 0.0.0.0/0 for development)
- Ensure database name exists in the URI

### Token Not Working

- Clear browser localStorage and try logging in again
- Check that token is being sent in Authorization header
- Verify `JWT_SECRET` is the same on backend

### Port Already in Use

- Backend: `PORT=5001 npm run dev`
- Frontend: `npm run dev -- --port 5174`

## Next Steps for Enhancement

- Add task categories/labels
- Implement task priority levels
- Add due dates to tasks
- Create task statistics dashboard
- Add task sharing between users
- Implement email notifications
- Add dark mode toggle
- Implement task pagination
- Add search functionality

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues, please check the error messages carefully and refer to the troubleshooting section above.
