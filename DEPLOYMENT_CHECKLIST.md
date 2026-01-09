# Deployment Checklist for meowdo.netlify.app

## ✅ Pre-Deployment Checklist

- [x] CORS configured in `backend/server.js` with Netlify domain
- [ ] Backend deployed to Render/Railway/Cyclic
- [ ] Frontend deployed to Netlify
- [ ] Environment variables configured

## Step 1: Deploy/Update Backend

### If Backend is NOT Deployed Yet:

1. **Choose a Platform** (Render recommended for free tier):
   - Go to [render.com](https://render.com) and sign up/login
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**:
   - **Name**: `todo-backend` (or any name)
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main` (or your main branch)
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

3. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable":
   - `MONGODB_URI` = `your_mongodb_atlas_connection_string`
   - `PORT` = `10000` (for Render)
   - `NODE_ENV` = `production`

4. **Deploy**:
   - Click "Create Web Service"
   - Wait 5-10 minutes for first deployment
   - **Copy your backend URL** (e.g., `https://todo-backend-xxxx.onrender.com`)

### If Backend is Already Deployed:

1. **Update CORS** (if not already done):
   - The `backend/server.js` file is already updated with your Netlify domain
   - Commit and push changes:
     ```bash
     git add backend/server.js
     git commit -m "Update CORS for Netlify domain"
     git push
     ```
   - Your backend service should auto-redeploy

2. **Verify Backend is Running**:
   - Visit: `https://your-backend-url.onrender.com/api/folders`
   - Should return `[]` (empty array) or folders if any exist

## Step 2: Configure Netlify Environment Variables

1. **Go to Netlify Dashboard**:
   - Visit [app.netlify.com](https://app.netlify.com)
   - Select your site: `meowdo`

2. **Navigate to Environment Variables**:
   - Click "Site settings" (gear icon)
   - Go to "Environment variables" in left sidebar
   - Click "Add a variable"

3. **Add the Variable**:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-url.onrender.com/api`
     - ⚠️ **Important**: Replace `your-backend-url` with your actual backend URL
     - ⚠️ **Important**: Must end with `/api`
   - **Scopes**: Select "All scopes" (or "Production" if you want)
   - Click "Save"

4. **Example**:
   ```
   REACT_APP_API_URL = https://todo-backend-abc123.onrender.com/api
   ```

## Step 3: Redeploy Frontend

After setting the environment variable, you need to trigger a new build:

### Option A: Trigger Redeploy via Netlify Dashboard
1. Go to "Deploys" tab
2. Click "Trigger deploy" → "Clear cache and deploy site"

### Option B: Push a New Commit
```bash
git add .
git commit -m "Update for production deployment"
git push
```

### Option C: Wait for Auto-Deploy
- If you just pushed the CORS changes, Netlify might auto-deploy
- Check the "Deploys" tab to see status

## Step 4: Verify Deployment

1. **Test Your Frontend**:
   - Visit: https://meowdo.netlify.app/
   - Open browser DevTools (F12) → Console tab
   - Check for any CORS errors

2. **Test API Connection**:
   - Try creating a folder
   - Try creating a task
   - Check if data persists (refresh page)

3. **Common Issues**:
   - **CORS Error**: Backend CORS not updated or backend not redeployed
   - **404 on API calls**: `REACT_APP_API_URL` not set correctly in Netlify
   - **Empty response**: MongoDB connection issue, check backend logs

## Step 5: Check Backend Logs

If something isn't working:

1. **Render**: Go to your service → "Logs" tab
2. **Railway**: Go to your service → "Deployments" → View logs
3. **Cyclic**: Check deployment logs in dashboard

Look for:
- ✅ "MongoDB Connected" - Database connection successful
- ✅ "Server running on port XXXX" - Server started
- ❌ Any error messages

## Quick Reference

### Your URLs:
- **Frontend**: https://meowdo.netlify.app/
- **Backend**: `https://your-backend-url.onrender.com` (replace with yours)
- **Backend API**: `https://your-backend-url.onrender.com/api`

### Environment Variables Needed:

**Backend (Render/Railway/Cyclic)**:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
PORT=10000
NODE_ENV=production
```

**Frontend (Netlify)**:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

## Need Help?

- Check backend logs for errors
- Check Netlify build logs (Deploys → Click on deploy → View build log)
- Verify environment variables are set correctly
- Test backend API directly: `https://your-backend-url.onrender.com/api/folders`
