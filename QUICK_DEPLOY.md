# Quick Deploy Guide - Next Steps

## Current Status
✅ CORS is configured for https://meowdo.netlify.app/
✅ All code is ready for deployment

## Immediate Next Steps

### 1. Commit Your Changes

```bash
git add .
git commit -m "Configure CORS for Netlify deployment"
git push
```

### 2. Deploy Backend (If Not Already Deployed)

**Option A: Render (Recommended - Free)**
1. Go to https://render.com
2. Sign up/Login → "New +" → "Web Service"
3. Connect GitHub repo
4. Settings:
   - **Name**: `todo-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Environment Variables:
   - `MONGODB_URI` = your MongoDB connection string
   - `PORT` = `10000`
   - `NODE_ENV` = `production`
6. Deploy and **copy the URL** (e.g., `https://todo-backend-xxx.onrender.com`)

### 3. Configure Netlify Environment Variable

1. Go to https://app.netlify.com
2. Select site: **meowdo**
3. Site settings → Environment variables
4. Add:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-url.onrender.com/api`
     - Replace `your-backend-url` with your actual Render URL
     - Must end with `/api`
5. Save

### 4. Trigger Netlify Redeploy

In Netlify dashboard:
- Go to "Deploys" tab
- Click "Trigger deploy" → "Clear cache and deploy site"

### 5. Test

Visit https://meowdo.netlify.app/ and test:
- Create a folder
- Create a task
- Check browser console (F12) for errors

## Your Backend URL Format

After deploying to Render, your backend URL will look like:
```
https://todo-backend-abc123.onrender.com
```

So your `REACT_APP_API_URL` in Netlify should be:
```
https://todo-backend-abc123.onrender.com/api
```

## Troubleshooting

**CORS Error?**
- Make sure backend is redeployed with updated `server.js`
- Check backend logs in Render dashboard

**API Not Found?**
- Verify `REACT_APP_API_URL` is set correctly in Netlify
- Must end with `/api`
- Rebuild frontend after setting variable

**MongoDB Error?**
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0`)
- Verify connection string in backend environment variables
