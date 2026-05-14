# Deployment Guide

This guide will walk you through deploying the Task Manager app to production.

## Prerequisites

- GitHub account
- Render account (render.com)
- Vercel account (vercel.com)
- MongoDB Atlas account (cloud.mongodb.com)

## Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and log in
3. Create a new project
4. Create a new cluster (M0 free tier is fine)
5. Click "Connect" and choose "Drivers"
6. Copy the connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
   ```
7. Replace `username` and `password` with your database credentials
8. Add `/taskmanager` to specify the database name

## Step 2: Prepare Your Code

### Backend

1. Create a GitHub repository for your project
2. Add the following to your `backend/.env.example`:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

3. Create a production `.env` file (DO NOT commit this):

   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=generate_a_strong_secret_key
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

4. Commit and push to GitHub

### Frontend

1. Update `frontend/.env.example`:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

2. For production, create `.env.production`:

   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

3. Commit and push to GitHub

## Step 3: Deploy Backend to Render

1. Go to [Render.com](https://render.com)
2. Sign in with your GitHub account
3. Click "New +" → "Web Service"
4. Select your backend repository
5. Fill in the configuration:
   - **Name**: `task-manager-backend`
   - **Environment**: `Node`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Region**: Choose closest to you
6. Click "Advanced" and add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong random secret (generate one: use a tool or create: `crypto.randomBytes(32).toString('hex')`)
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: Your Vercel frontend URL (add later after frontend is deployed)

7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. Copy your backend URL (e.g., `https://task-manager-backend-xxx.onrender.com`)

**Note**: On Render's free tier, the server sleeps after 15 minutes of inactivity. It will wake up on first request but take a few seconds.

## Step 4: Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New..." → "Project"
4. Select your repository (frontend)
5. Configure the project:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Click "Environment Variables" and add:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://task-manager-backend-xxx.onrender.com/api`)

7. Click "Deploy"
8. Wait for deployment (2-5 minutes)
9. You'll get a production URL (e.g., `https://task-manager-xxxx.vercel.app`)

## Step 5: Update Backend Environment

1. Go back to Render dashboard
2. Select your backend service
3. Go to "Environment"
4. Update `FRONTEND_URL` with your Vercel URL
5. Save and the service will redeploy

## Step 6: Test Your Deployment

1. Go to your Vercel frontend URL
2. Register a new account
3. Create a task
4. Verify everything works

## Monitoring and Troubleshooting

### Backend Issues

Check Render logs:

1. Go to your Render dashboard
2. Click on your backend service
3. Go to "Logs" tab
4. Check for error messages

### Frontend Issues

Check Vercel logs:

1. Go to your Vercel dashboard
2. Click on your project
3. Go to "Deployments" tab
4. Click latest deployment
5. Check "Logs"

### Common Issues

**CORS Error:**

- Verify `FRONTEND_URL` matches your Vercel URL (including https://)
- Check backend logs for CORS errors

**Cannot Connect to MongoDB:**

- Test your MongoDB URI with MongoDB Compass
- Check IP whitelist in MongoDB Atlas (Network Access)
- Verify credentials are correct

**Tasks Not Loading:**

- Check `VITE_API_URL` in frontend environment variables
- Ensure it's the full API URL with `/api` at the end
- Check browser console for network errors

## Scaling Tips

### For Production

1. **Use Environment Variables**: Never hardcode secrets
2. **Enable HTTPS**: Both Render and Vercel provide free HTTPS
3. **Set Proper CORS**: Only allow your frontend domain
4. **Database Backups**: Enable automatic backups in MongoDB Atlas
5. **Monitoring**: Set up alerts for backend errors

### Upgrade Plan Options

- **Render**: Upgrade from free tier ($7/month minimum)
- **Vercel**: Included free tier, upgrade for more advanced features
- **MongoDB Atlas**: Upgrade from free tier for better performance

## Continuous Deployment

Both Render and Vercel support automatic deployment:

- Every push to main branch automatically deploys
- Check deployment settings in each platform

## Backup and Recovery

### MongoDB Backups

1. Go to MongoDB Atlas
2. Select your cluster
3. Go to "Backup" tab
4. Enable automatic backups (available on paid tier)

### Code Backups

GitHub is your code backup. Use meaningful commit messages:

```bash
git commit -m "Add task filtering feature"
git push origin main
```

## Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Connection string obtained
- [ ] Backend deployed to Render
- [ ] Backend URL obtained
- [ ] Frontend environment variable updated
- [ ] Frontend deployed to Vercel
- [ ] Backend environment variable updated with frontend URL
- [ ] Tested registration and login
- [ ] Tested creating/editing/deleting tasks
- [ ] Verified database stores data
- [ ] Set up monitoring/alerts
- [ ] Documented deployment instructions

## Need Help?

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

## Security Best Practices

1. **Never commit .env files**: Add to .gitignore
2. **Use strong JWT secrets**: At least 32 characters
3. **Use strong database passwords**: At least 16 characters
4. **Enable HTTPS**: Always use HTTPS in production
5. **Update dependencies**: Run `npm audit` regularly
6. **Validate inputs**: Already done in this app
7. **Use environment variables**: For all secrets and configuration
