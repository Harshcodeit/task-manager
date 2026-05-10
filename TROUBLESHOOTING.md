# Troubleshooting & FAQ

## Common Issues

### Backend Issues

#### 1. "Cannot find module 'dotenv'"

**Error:** `Cannot find module 'dotenv'` when starting backend

**Solution:**

```bash
cd backend
npm install
```

#### 2. MongoDB Connection Error

**Error:** `MongoServerError: connect ECONNREFUSED` or `connection refused`

**Solutions:**

- **For MongoDB Atlas (Cloud):**
  1. Check your connection string in `.env`
  2. Verify database name is included: `mongodb+srv://user:pass@cluster.mongodb.net/taskmanager`
  3. Check IP whitelist: Go to MongoDB Atlas → Network Access
  4. Add your IP or use `0.0.0.0/0` for development
  5. Verify username and password are correct

- **For Local MongoDB:**
  1. Start MongoDB service:
     - Windows: Run `mongod` in terminal
     - Mac: `brew services start mongodb-community`
     - Linux: `sudo systemctl start mongod`
  2. Verify connection string: `mongodb://localhost:27017/taskmanager`

#### 3. Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**

```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux - Find and kill process
lsof -ti:5000 | xargs kill -9

# Or use a different port
PORT=5001 npm run dev
```

#### 4. CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solutions:**

1. Check `FRONTEND_URL` in `.env` matches your frontend URL
2. For local: `http://localhost:5173` (no trailing slash)
3. Restart backend after changing `.env`
4. Clear browser cache and localStorage

#### 5. JWT Token Issues

**Error:** `401 Unauthorized` or `Not authorized to access this route`

**Solutions:**

1. Clear localStorage and login again
2. Check `JWT_SECRET` is set in `.env`
3. Verify token is being sent in headers: Open DevTools → Network → copy request header
4. Check token doesn't have extra spaces or quotes
5. Verify user ID in token matches database

#### 6. Cannot POST/PUT to API

**Error:** `404 Not Found` or `Cannot POST /api/tasks`

**Solutions:**

1. Verify backend is running: Visit `http://localhost:5000/api/health`
2. Check route spelling in `routes/` files
3. Verify middleware order in `server.js` (routes after middleware)
4. Check `protect` middleware is applied to protected routes
5. Verify request body is valid JSON

### Frontend Issues

#### 1. "npm: command not found"

**Error:** `npm: command not found` or similar

**Solution:**

- Install Node.js from https://nodejs.org/
- Restart terminal after installation
- Verify: `node --version && npm --version`

#### 2. Blank Page or 404

**Error:** Navigate to app and see blank page or 404

**Solutions:**

1. Check frontend is running: `npm run dev` should show URL
2. Check browser console for errors: F12 → Console tab
3. Verify Vite is running on correct port: Should be `http://localhost:5173`
4. Clear browser cache and hard refresh (Ctrl+Shift+R)
5. Check `index.html` exists in frontend root

#### 3. Cannot Login/Register

**Error:** Login/register button doesn't work or shows error

**Solutions:**

1. Check backend is running: `npm start` or `npm run dev`
2. Check API URL in browser DevTools → Network tab
   - Should be calling `http://localhost:5000/api/auth/login`
   - Check response for error message
3. Verify `.env` is not committed (should be in `.gitignore`)
4. Check email/password are not blank
5. Verify MongoDB has data: Check MongoDB Atlas collections

#### 4. Tasks Not Showing After Login

**Error:** Dashboard loads but no tasks visible

**Solutions:**

1. Check browser console for errors
2. Verify you're logged in (check token in localStorage)
3. Check DevTools Network tab for API response
4. Create a new task to verify functionality
5. Check MongoDB Atlas collections → Task collection has data

#### 5. Token Not Persisting

**Error:** Refresh page and get logged out

**Solutions:**

1. Check localStorage is enabled: DevTools → Application → Local Storage
2. Verify token is being saved: Check localStorage for "token" key
3. Verify AuthContext.login() calls localStorage.setItem()
4. Check browser privacy settings not blocking localStorage
5. Try clearing all cookies and login again

#### 6. Styling Not Applied

**Error:** No colors, no buttons look right, UI is broken

**Solutions:**

1. Verify Tailwind CSS is installed: `npm install` in frontend
2. Check `index.css` imports Tailwind directives
3. Verify `tailwind.config.js` has correct paths
4. Restart dev server: Stop with Ctrl+C and `npm run dev`
5. Clear browser cache: Ctrl+Shift+Delete

#### 7. API Calls Failing

**Error:** Network errors, CORS errors, 500 errors

**Solutions:**

1. Check backend logs in terminal (first clue)
2. Open DevTools → Network tab → check failed request
3. Click on failed request → Response tab to see error message
4. Verify request method (GET, POST, PUT, DELETE)
5. Verify request headers have `Authorization: Bearer <token>`

### Database Issues

#### 1. Can't Connect to MongoDB Atlas

**Error:** `Authentication failed` or `connection refused`

**Solutions:**

1. Verify connection string format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   ```
2. Check special characters in password are URL-encoded
3. Verify username and password
4. Check IP whitelist in MongoDB Atlas (Network Access)
5. Test connection with MongoDB Compass locally

#### 2. Data Not Persisting

**Error:** Create task, but it disappears after refresh

**Solutions:**

1. Check backend logs for save errors
2. Verify MongoDB connection is working
3. Check data in MongoDB Atlas UI (Database → Collections)
4. Verify userId is being set when creating tasks
5. Use DevTools Network tab to see API response

#### 3. Cannot Create/Edit/Delete

**Error:** Buttons don't work or show errors

**Solutions:**

1. Check you're authenticated (token in localStorage)
2. Check backend logs for specific error
3. Verify user ID in database matches token
4. Check request body is valid JSON
5. Verify backend `.env` MONGODB_URI is correct

## FAQ

### Q: How do I reset my password?

**A:** Currently not implemented. You would need to:

1. Delete user from MongoDB Atlas
2. Register new account with same email
3. Or add password reset feature (enhancement)

### Q: How do I export my tasks?

**A:** Not currently implemented. Options:

1. Export from MongoDB Atlas
2. Add CSV export feature
3. Use MongoDB data export tools

### Q: Can multiple users access the same task?

**A:** No, currently tasks are private to each user. To enable sharing:

1. Add `sharedWith` array to Task model
2. Update task controller to check permissions
3. Add sharing UI in frontend

### Q: How do I backup my data?

**A:**

1. **MongoDB Atlas**: Go to Backup → Enable automated backups (paid)
2. **Manual**: Export data from MongoDB Atlas
3. **Code**: Keep code in GitHub for backup

### Q: Can I run backend on different port?

**A:** Yes, set `PORT` in `.env`:

```
PORT=3000
npm run dev
```

Update frontend `.env`:

```
VITE_API_URL=http://localhost:3000/api
```

### Q: Can I use different database?

**A:** Yes, but requires changes:

1. Replace Mongoose with different ORM
2. Update connection logic in `config/database.js`
3. Rewrite models for new database
4. Update API calls if needed

### Q: How do I add more features?

**A:** See ARCHITECTURE.md "Future Enhancements" section. General steps:

1. Add to database schema
2. Add API endpoint
3. Add frontend component
4. Integrate in pages
5. Test thoroughly

### Q: Is this production-ready?

**A:** Mostly yes, but consider:

1. Add input validation (some done, could be more)
2. Add rate limiting
3. Add request logging
4. Add error tracking
5. Add tests
6. Review security checklist in ARCHITECTURE.md

### Q: How do I deploy?

**A:** See DEPLOYMENT.md for complete instructions:

1. Backend → Render (free tier available)
2. Frontend → Vercel (free tier)
3. Database → MongoDB Atlas (free tier)

### Q: What if I get "Cannot find module" error?

**A:** Run `npm install` in the directory where error occurred:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Q: How do I debug?

**A:**

1. **Backend**: Check terminal logs and use `console.log()`
2. **Frontend**: DevTools (F12) → Console tab
3. **Network**: DevTools → Network tab → check API calls
4. **Database**: MongoDB Atlas UI → Collections
5. **State**: React DevTools extension

### Q: Why is my app slow?

**A:**

1. Check MongoDB Atlas free tier limits
2. Add API caching
3. Optimize database queries (add indexes)
4. Use lazy loading in React
5. Implement pagination for large task lists

### Q: Can I use this for production?

**A:** Yes, but should:

1. Add HTTPS (automatic on Render/Vercel)
2. Use strong JWT secret
3. Enable rate limiting
4. Add request validation
5. Monitor logs and errors
6. Setup automated backups
7. Add security headers
8. Use environment variables for all secrets

### Q: How do I contribute improvements?

**A:**

1. Create a branch
2. Make changes
3. Test thoroughly
4. Commit with clear messages
5. Push and create pull request
6. Or use as learning starting point

## Performance Tips

### Slow API Responses

1. Check server logs for errors
2. Check MongoDB Atlas metrics
3. Add database indexes (already done for email)
4. Implement pagination for large task lists
5. Use MongoDB projection to fetch only needed fields

### Slow Frontend

1. Check browser DevTools Performance tab
2. Check network requests (Network tab)
3. Look for large bundle sizes: `npm run build`
4. Add React.memo() for expensive components
5. Implement lazy loading for routes

### Slow Database Queries

1. Check MongoDB Atlas metrics
2. Add indexes for frequently queried fields
3. Use MongoDB compass to analyze slow queries
4. Consider database upgrade from free tier

## Security Tips

1. **Never commit `.env`** - Add to .gitignore
2. **Use strong JWT secret** - At least 32 characters
3. **Use HTTPS** - Always in production (automatic on Render/Vercel)
4. **Validate inputs** - Already done, but could be more strict
5. **Sanitize outputs** - React does this automatically
6. **Rate limiting** - Add to backend (not implemented)
7. **CORS** - Restrict to only your frontend
8. **Dependencies** - Run `npm audit` regularly

## Getting Help

If stuck:

1. Check error message carefully - it often tells you the issue
2. Search the code for similar patterns
3. Check browser DevTools (F12)
4. Check backend terminal logs
5. Read error response in Network tab
6. Check MongoDB Atlas data
7. Review relevant documentation file
8. Look at similar implementations in codebase

## Still Stuck?

1. Check all of above first
2. Try clearing everything and starting fresh:
   ```bash
   rm -rf node_modules .env
   npm install
   cp .env.example .env
   # Edit .env
   npm run dev
   ```
3. Check Node/npm versions: `node --version && npm --version`
4. Try different port if port conflicts
5. Restart computer as last resort

Remember: Most issues are configuration-related. Check `.env` files and console logs first!
