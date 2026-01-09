# Quick Start - Deployment Checklist

## 🚀 Fast Track to Live Site

### Step 1: MongoDB Atlas (5 minutes)
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create FREE cluster
3. Create database user (save username/password)
4. Whitelist IP: `0.0.0.0/0`
5. Get connection string (replace `<password>` and `<dbname>`)

### Step 2: Render Backend (10 minutes)
1. Sign up at [render.com](https://render.com)
2. New → Web Service → Connect GitHub repo
3. Settings:
   - Root Directory: `backend`
   - Runtime: **Node** (NOT Docker)
   - Build: `npm install`
   - Start: `npm start` (or `node server.js`)
4. Environment Variables:
   - `MONGODB_URI` = your connection string
   - `PORT` = `10000`
   - `NODE_ENV` = `production`
5. Deploy → Copy backend URL

### Step 3: Netlify Frontend (5 minutes)
1. Sign up at [netlify.com](https://www.netlify.com)
2. Add site → Import from GitHub
3. Build settings:
   - Build: `cd frontend && npm install && npm run build`
   - Publish: `frontend/build`
4. Environment Variable:
   - `REACT_APP_API_URL` = `https://your-backend-url.onrender.com/api`
5. Deploy

### Step 4: Test (2 minutes)
1. Visit Netlify URL
2. Try creating a folder
3. Check browser console (F12) for errors

## ✅ Verification

- [ ] Backend health: `https://your-backend.onrender.com/api/health` works
- [ ] Frontend loads without errors
- [ ] Can create folders
- [ ] Can create tasks
- [ ] No CORS errors in console

## 🔗 Your URLs

- Frontend: `https://meowdo.netlify.app`
- Backend: `https://todo-backend-xxxx.onrender.com`
- API: `https://todo-backend-xxxx.onrender.com/api`

---

**Full detailed guide**: See `DEPLOYMENT_GUIDE.md`
