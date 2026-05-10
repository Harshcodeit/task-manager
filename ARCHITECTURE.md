# Architecture & Development Guide

## Project Architecture

This MERN stack project follows a clean, modular architecture optimized for learning and scalability.

## Backend Architecture (MVC Pattern)

```
Models (Data Layer)
    ↓
Controllers (Business Logic)
    ↓
Routes (API Endpoints)
    ↓
Middleware (Authentication, Error Handling)
    ↓
Server (Express App)
```

### Models (`src/models/`)

- **User.js**: User schema with password hashing
- **Task.js**: Task schema linked to User

### Controllers (`src/controllers/`)

- **authController.js**: Registration, login, user retrieval
- **taskController.js**: CRUD operations for tasks

### Middleware (`src/middleware/`)

- **auth.js**: JWT verification for protected routes

### Routes (`src/routes/`)

- **authRoutes.js**: Authentication endpoints
- **taskRoutes.js**: Task management endpoints

### Config (`src/config/`)

- **database.js**: MongoDB connection logic

## Frontend Architecture (React Pattern)

```
Pages (Full Page Components)
    ↓
Components (Reusable UI Components)
    ↓
Context (State Management)
    ↓
API Client (HTTP Requests)
    ↓
Utils (Helper Functions)
```

### Pages (`src/pages/`)

- **LoginPage.jsx**: User login
- **RegisterPage.jsx**: User registration
- **DashboardPage.jsx**: Main task management interface

### Components (`src/components/`)

- **Navbar.jsx**: Navigation and logout
- **TaskForm.jsx**: Create/edit task form
- **TaskList.jsx**: Display and manage tasks

### Context (`src/context/`)

- **AuthContext.jsx**: Authentication state and methods

### API (`src/api/`)

- **client.js**: Axios instance with interceptors

### Utils (`src/utils/`)

- **auth.js**: Local storage auth helpers

## Data Flow

### Registration Flow

1. User enters name, email, password in RegisterPage
2. Submits form → AuthContext.register()
3. API call to POST `/api/auth/register`
4. Backend hashes password and creates User in MongoDB
5. Returns JWT token
6. Frontend saves token to localStorage
7. AuthContext updates user state
8. Redirects to dashboard

### Task Creation Flow

1. User enters task title/description in TaskForm
2. Submits form → DashboardPage.handleAddTask()
3. API call to POST `/api/tasks`
4. Axios interceptor adds JWT token to Authorization header
5. Backend verify token in protect middleware
6. Creates Task linked to user ID
7. Returns created task
8. Frontend updates tasks array
9. UI re-renders with new task

### Authentication On Page Load

1. App component mounts
2. AuthProvider useEffect checks for token in localStorage
3. If token exists, calls GET `/api/auth/me`
4. Backend verifies token and returns user data
5. AuthContext updates user state
6. Loading state changes to false
7. App shows appropriate UI based on auth state

## Key Concepts

### JWT Authentication

- Token contains encrypted user ID
- Expires in 30 days
- Sent in every request header: `Authorization: Bearer <token>`
- Backend verifies token before allowing access

### Password Hashing

- Passwords hashed with bcryptjs salt (10 rounds)
- Never stored as plain text
- Compared using bcrypt.compare() on login

### Protected Routes

- React Router checks isAuthenticated before rendering
- Backend middleware verifies JWT on protected endpoints
- Unauthorized requests return 401 status

### State Management

- AuthContext provides user, loading, isAuthenticated globally
- Component state used for local UI state (loading, errors)
- localStorage persists auth token across page reloads

## Security Features

1. **Password Hashing**: bcryptjs with 10 salt rounds
2. **JWT Tokens**: Secure, expiring tokens
3. **Protected Routes**: Client-side (React) and server-side (Express)
4. **CORS**: Limited to frontend URL
5. **Input Validation**: Required fields checked
6. **Error Handling**: Generic error messages to prevent info leaks
7. **User Isolation**: Users can only access their own tasks

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Collection

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  userId: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

## API Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... }  or  "user": { ... }  or  "task": { ... }
}
```

### Error Response

```json
{
  "message": "Error description"
}
```

## Environment Variables

### Backend

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for signing tokens
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment type (development/production)
- `FRONTEND_URL`: Allowed frontend URL for CORS

### Frontend

- `VITE_API_URL`: Backend API URL (default: http://localhost:5000/api)

## Common Patterns Used

### Async/Await Error Handling

```javascript
try {
  const data = await apiCall();
  // Handle success
} catch (error) {
  // Handle error
} finally {
  // Cleanup (e.g., stop loading)
}
```

### State Updates

```javascript
const [state, setState] = useState(initialValue);
// Update state
setState(newValue);
```

### Effect Cleanup

```javascript
useEffect(() => {
  // Setup
  return () => {
    // Cleanup (optional)
  };
}, [dependencies]);
```

### Protected Component

```javascript
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <LoadingComponent />;

  return isAuthenticated ? children : <Navigate to="/login" />;
};
```

## Testing Scenarios

### Register New User

1. Go to /register
2. Fill in name, email, password
3. Should create account and redirect to dashboard

### Login Existing User

1. Go to /login
2. Use registered credentials
3. Should login and show dashboard

### Create Task

1. On dashboard, fill in task title
2. Click "Add Task"
3. Task should appear in list

### Update Task

1. Click "Edit" on task
2. Modify title/description
3. Click "Save"
4. Changes should update in UI and database

### Delete Task

1. Click "Delete" on task
2. Confirm deletion
3. Task should disappear from list

### Session Persistence

1. Create task
2. Refresh page
3. Task should still be visible
4. User should still be logged in

## Performance Considerations

1. **Lazy Loading**: Pages loaded on demand with React Router
2. **Component Memoization**: Could use React.memo() for optimization
3. **API Caching**: Could implement caching for better UX
4. **Database Indexing**: User email and userId are indexed
5. **Bundle Size**: Vite provides optimal bundling

## Future Enhancements

### Feature Additions

- Task categories/tags
- Task due dates
- Task priority levels
- Task search functionality
- Bulk operations
- Task sharing between users
- Email notifications
- Recurring tasks
- Attachment support

### Performance

- Implement pagination for tasks
- Add API response caching
- Lazy load task images/attachments
- Implement infinite scroll

### UI/UX

- Dark mode support
- Task statistics dashboard
- Drag-and-drop reordering
- Advanced filtering
- Task templates

### Backend

- Rate limiting
- Request logging
- Database query optimization
- Soft deletes for tasks
- Audit logs

## Deployment Considerations

- Set NODE_ENV=production on backend
- Build frontend with `npm run build`
- Use environment variables for secrets
- Enable HTTPS in production
- Set up monitoring and alerts
- Regular database backups
- Monitor API response times

## Code Quality

### Current Standards

- Clean, readable code with comments
- Error handling in all async operations
- Input validation on backend
- Modular component structure
- Separated concerns (models, controllers, routes)

### Recommendations

- Add unit tests (Jest, Vitest)
- Add integration tests (Supertest)
- Add e2e tests (Cypress, Playwright)
- Setup pre-commit hooks (husky)
- Add ESLint and Prettier
- Add TypeScript for type safety

## Security Checklist

- [x] Passwords hashed
- [x] JWT authentication
- [x] Protected API routes
- [x] CORS enabled
- [x] Input validation
- [x] Error handling (no info leaks)
- [ ] Rate limiting
- [ ] Request logging
- [ ] HTTPS in production
- [ ] Regular security updates
- [ ] SQL injection prevention (using MongoDB)
- [ ] XSS protection (React automatic)

## Debugging Tips

### Backend Debugging

1. Check server logs in terminal
2. Use console.log() for debugging
3. Test API endpoints with Postman/Thunder Client
4. Check MongoDB Atlas data in UI
5. Enable verbose logging for requests

### Frontend Debugging

1. Use browser DevTools (F12)
2. Check Network tab for API calls
3. Check Console for errors
4. Check localStorage for token
5. Use React DevTools extension
6. Test components in isolation

### Common Issues

- **401 Unauthorized**: Token missing or invalid
- **CORS Error**: Frontend URL not in backend CORS list
- **Task not appearing**: Check user ID matches in database
- **Login fails**: Check password hashing
- **API not responding**: Check backend is running on correct port
