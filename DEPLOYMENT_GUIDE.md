# Complete Deployment Guide - Step by Step

Follow these exact steps to deploy your To-Do app and make it fully functional.

## Prerequisites Checklist

- [ ] GitHub account and repository
- [ ] MongoDB Atlas account (free)
- [ ] Render account (free) - for backend
- [ ] Netlify account (free) - for frontend

---

## Step 1: Set Up MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and sign up (free tier)
3. Complete the registration

### 1.2 Create a Cluster
1. After login, click "Build a Database"
2. Choose **FREE** (M0) tier
3. Select a cloud provider and region (closest to you)
4. Click "Create"

### 1.3 Create Database User
1. Go to **Database Access** (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and password (SAVE THESE!)
5. Set privileges to "Atlas admin" or "Read and write to any database"
6. Click "Add User"

### 1.4 Whitelist IP Address
1. Go to **Network Access** (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (adds `0.0.0.0/0`)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to **Database** → Click "Connect" on your cluster
2. Choose "Connect your application"
3. Driver: **Node.js**, Version: **5.5 or later**
4. Copy the connection string
5. **IMPORTANT:** Replace `<password>` with your database user password
6. **IMPORTANT:** Replace `<dbname>` with `todoapp` (or keep default)
7. Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority`
8. **SAVE THIS CONNECTION STRING** - You'll need it for Render

---

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to [Render](https://render.com)
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended) or email

### 2.2 Create New Web Service
1. In Render dashboard, click "New +"
2. Select "Web Service"
3. Connect your GitHub repository
   - If not connected, click "Configure account" and authorize
   - Select your repository: `To-Do` (or your repo name)
4. Click "Connect"

### 2.3 Configure Backend Service
Fill in these **exact** settings:

- **Name**: `todo-backend` (or any name you prefer)
- **Region**: Choose closest to you
- **Branch**: `main` (or your main branch)
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Instance Type**: **Free**

### 2.4 Add Environment Variables
Click "Advanced" → "Add Environment Variable", add these:

1. **MONGODB_URI**
   - Key: `MONGODB_URI`
   - Value: Your MongoDB connection string from Step 1.5
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority`

2. **PORT**
   - Key: `PORT`
   - Value: `10000`
   - (Render uses port 10000 for free tier)

3. **NODE_ENV**
   - Key: `NODE_ENV`
   - Value: `production`

### 2.5 Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for first deployment
3. Watch the logs for:
   - ✅ "MongoDB Connected" - Database connected successfully
   - ✅ "Server running on port 10000" - Server started
   - ❌ Any errors (check MongoDB connection string if errors)

### 2.6 Get Your Backend URL
1. After deployment completes, you'll see your service URL
2. Example: `https://todo-backend-xxxx.onrender.com`
3. **COPY THIS URL** - You'll need it for Netlify
4. Test it: Visit `https://todo-backend-xxxx.onrender.com/api/health`
   - Should return: `{"status":"ok","message":"Server is running",...}`

---

## Step 3: Update Backend CORS (If Needed)

### 3.1 Verify CORS Configuration
Your `backend/server.js` should already have:
```javascript
origin: [
  'http://localhost:3000',
  'https://meowdo.netlify.app'
]
```

### 3.2 If Your Netlify URL is Different
1. Edit `backend/server.js`
2. Update the CORS origins array with your Netlify URL
3. Commit and push:
   ```bash
   git add backend/server.js
   git commit -m "Update CORS for production"
   git push
   ```
4. Render will auto-redeploy

---

## Step 4: Deploy Frontend to Netlify

### 4.1 Push Code to GitHub
Make sure all your code is pushed:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 4.2 Create Netlify Account
1. Go to [Netlify](https://www.netlify.com)
2. Click "Sign up" (free)
3. Sign up with GitHub (recommended)

### 4.3 Deploy from GitHub
1. In Netlify dashboard, click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Authorize Netlify if needed
4. Select your repository: `To-Do` (or your repo name)

### 4.4 Configure Build Settings
Set these **exact** values:

- **Base directory**: (leave empty)
- **Build command**: `cd frontend && npm install && npm run build`
- **Publish directory**: `frontend/build`
- **Node version**: `18` (or latest)

### 4.5 Add Environment Variable
**CRITICAL STEP** - Before deploying:

1. Click "Show advanced" → "New variable"
2. Add environment variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://todo-backend-xxxx.onrender.com/api`
     - Replace `todo-backend-xxxx` with your actual Render backend URL
     - **MUST end with `/api`**
   - **Scopes**: Select "All scopes" (or "Production")
3. Click "Add variable"

### 4.6 Deploy
1. Click "Deploy site"
2. Wait 3-5 minutes for build to complete
3. Your site will be live at: `https://random-name-xxxx.netlify.app`

### 4.7 Update Site Name (Optional)
1. Go to Site settings → General
2. Click "Change site name"
3. Change to: `meowdo` (or your preferred name)
4. Your site will be: `https://meowdo.netlify.app`

---

## Step 5: Verify Everything is Connected

### 5.1 Test Backend
1. Visit: `https://todo-backend-xxxx.onrender.com/api/health`
   - Should return: `{"status":"ok",...}`
2. Visit: `https://todo-backend-xxxx.onrender.com/api/folders`
   - Should return: `[]` (empty array)

### 5.2 Test Frontend
1. Visit your Netlify URL: `https://meowdo.netlify.app`
2. Open browser console (F12)
3. Check for errors
4. Try creating a folder:
   - Click "New folder"
   - Enter a name
   - Click "Create Folder"
   - Should work without errors

### 5.3 Check Connections
In browser console, you should see:
- `API Request: GET /folders`
- `API Request: POST /folders` (when creating)
- No CORS errors
- No network errors

---

## Step 6: Troubleshooting

### Issue: Backend shows "Application loading"
**Solution:** 
- Render free tier services sleep after 15 minutes
- First request takes 30-60 seconds to wake up
- This is normal for free tier

### Issue: CORS Error
**Solution:**
1. Check `backend/server.js` CORS origins include your Netlify URL
2. Update and redeploy backend

### Issue: "Failed to fetch" or Network Error
**Solution:**
1. Check `REACT_APP_API_URL` in Netlify environment variables
2. Must be: `https://your-backend-url.onrender.com/api`
3. Rebuild frontend after setting variable

### Issue: MongoDB Connection Error
**Solution:**
1. Check MongoDB connection string in Render environment variables
2. Verify password is correct (no special characters need URL encoding)
3. Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
4. Check backend logs in Render dashboard

### Issue: Frontend can't connect to backend
**Solution:**
1. Verify `REACT_APP_API_URL` is set correctly in Netlify
2. Must include `/api` at the end
3. Trigger new deploy in Netlify after setting variable
4. Check browser console for exact error

---

## Step 7: Final Checklist

Before considering deployment complete:

- [ ] MongoDB Atlas cluster is running
- [ ] Database user is created
- [ ] IP whitelist includes `0.0.0.0/0`
- [ ] Backend deployed to Render
- [ ] Backend shows "Live" status
- [ ] Backend health endpoint works
- [ ] Frontend deployed to Netlify
- [ ] `REACT_APP_API_URL` environment variable is set
- [ ] Frontend can create folders
- [ ] Frontend can create tasks
- [ ] No errors in browser console
- [ ] Dark mode toggle works
- [ ] All features functional

---

## Your Live URLs

After deployment, you'll have:

- **Frontend**: `https://meowdo.netlify.app` (or your Netlify URL)
- **Backend**: `https://todo-backend-xxxx.onrender.com` (your Render URL)
- **Backend API**: `https://todo-backend-xxxx.onrender.com/api`
- **Health Check**: `https://todo-backend-xxxx.onrender.com/api/health`

---

## Quick Reference

### Environment Variables Summary

**Render (Backend):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
PORT=10000
NODE_ENV=production
```

**Netlify (Frontend):**
```
REACT_APP_API_URL=https://todo-backend-xxxx.onrender.com/api
```

### Important Notes

1. **Backend URL Format**: Always use `/api` at the end for Netlify variable
2. **MongoDB Password**: If password has special characters, URL encode them
3. **Render Free Tier**: Services sleep after inactivity, first request may be slow
4. **Netlify Rebuild**: Always rebuild after changing environment variables

---

## Support

If you encounter issues:
1. Check browser console (F12) for errors
2. Check Render logs for backend errors
3. Check Netlify build logs for frontend errors
4. Verify all environment variables are set correctly
5. Test API endpoints directly in browser

Your app should now be fully functional and live! 🎉
