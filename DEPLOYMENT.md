# Deployment Guide

## Free Deployment Strategy

This guide shows how to deploy the To-Do app using completely free services.

## Architecture

- **Frontend**: Netlify (Free Tier)
- **Backend**: Render/Railway/Cyclic (Free Tier)
- **Database**: MongoDB Atlas (Free Tier)

## Step 1: Deploy Backend

### Option A: Render (Recommended)

1. **Sign up** at [render.com](https://render.com) (free)
2. **Create a New Web Service**
   - Connect your GitHub repository
   - Name: `todo-backend`
   - Environment: `Node`
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && node server.js`
   - Root Directory: `backend`

3. **Add Environment Variables**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: `10000` (Render uses this port)
   - `NODE_ENV`: `production`

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your service URL (e.g., `https://todo-backend.onrender.com`)

### Option B: Railway

1. **Sign up** at [railway.app](https://railway.app) (free with $5 credit)
2. **New Project** → Deploy from GitHub
3. **Select your repository**
4. **Configure**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. **Add Environment Variables**:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: Railway auto-assigns, but you can set it
6. **Deploy** and copy your service URL

### Option C: Cyclic

1. **Sign up** at [cyclic.sh](https://cyclic.sh) (free)
2. **Connect GitHub** repository
3. **Set Root Directory** to `backend`
4. **Add Environment Variables**:
   - `MONGODB_URI`: Your MongoDB connection string
5. **Deploy** automatically happens

## Step 2: Update CORS in Backend

After deploying backend, update `backend/server.js` to allow your frontend domain:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-netlify-app.netlify.app'
  ],
  credentials: true
}));
```

Or for development, you can temporarily use:
```javascript
app.use(cors());
```

## Step 3: Deploy Frontend to Netlify

### Method 1: Drag and Drop

1. **Build the frontend**:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Go to Netlify**:
   - Visit [netlify.com](https://netlify.com)
   - Sign up/login (free)
   - Drag and drop the `frontend/build` folder

3. **Configure**:
   - Site name: Choose a name
   - Site URL: `https://your-site.netlify.app`

### Method 2: Git Integration (Recommended)

1. **Push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to Netlify Dashboard
   - Click "New site from Git"
   - Connect to GitHub
   - Select your repository

3. **Build Settings**:
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/build`
   - Base directory: (leave empty)

4. **Environment Variables**:
   - Go to Site settings → Environment variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.onrender.com/api`
     - Replace with your actual backend URL

5. **Deploy**:
   - Click "Deploy site"
   - Wait for build to complete

## Step 4: Update MongoDB Atlas Network Access

1. Go to MongoDB Atlas Dashboard
2. Network Access → Add IP Address
3. Add `0.0.0.0/0` to allow all IPs (or add specific IPs for security)

## Step 5: Test Deployment

1. Visit your Netlify URL
2. Try creating a folder
3. Try creating a task
4. Verify everything works

## Troubleshooting

### Backend Issues

**CORS Errors**:
- Ensure CORS is configured in `backend/server.js`
- Add your Netlify domain to allowed origins
- Example: Update `corsOptions.origin` array in `backend/server.js`:
  ```javascript
  origin: [
    'http://localhost:3000',
    'https://your-netlify-app.netlify.app'
  ]
  ```

**MongoDB Connection**:
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check environment variables are set correctly
- Verify connection string format

**Port Issues**:
- Render uses port `10000` or `PORT` env variable
- Railway auto-assigns ports
- Cyclic handles ports automatically

### Frontend Issues

**API Not Found**:
- Verify `REACT_APP_API_URL` is set correctly in Netlify
- Ensure it includes `/api` at the end
- Rebuild after changing environment variables

**Build Failures**:
- Check Node version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs in Netlify dashboard

## Free Tier Limits

### Netlify
- 100 GB bandwidth/month
- 300 build minutes/month
- Unlimited sites

### Render
- 750 hours/month (free tier)
- Sleeps after 15 minutes of inactivity
- Auto-wakes on first request (may take 30-60 seconds)

### Railway
- $5 free credit/month
- Pay-as-you-go after credit expires

### MongoDB Atlas
- 512 MB storage
- Shared cluster
- Sufficient for small to medium apps

## Cost Summary

**Total Cost: $0/month** ✅

All services used are free tier, perfect for personal projects and learning!
