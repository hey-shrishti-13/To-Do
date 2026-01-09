# Quick Start Guide

## For Windows Users

### 1. Run Setup Script
Double-click `setup.bat` or run in command prompt:
```cmd
setup.bat
```

### 2. Configure MongoDB
1. Edit `backend\.env` file
2. Add your MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
   PORT=5000
   ```

### 3. Start the App
```cmd
npm run dev
```

The app will open at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Manual Setup (All Platforms)

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Create Environment File
```bash
# Windows
copy backend\env.example backend\.env

# Mac/Linux
cp backend/env.example backend/.env
```

### 3. Configure MongoDB
Edit `backend/.env` and add your MongoDB connection string.

### 4. Create Uploads Directory
```bash
# Windows
mkdir backend\uploads

# Mac/Linux
mkdir -p backend/uploads
```

### 5. Start Development
```bash
npm run dev
```

## Getting MongoDB Atlas (Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create a cluster (free tier)
4. Create database user
5. Whitelist IP (use `0.0.0.0/0` for development)
6. Get connection string from "Connect" → "Connect your application"
7. Copy to `backend/.env`

## Need Help?

- See `SETUP.md` for detailed instructions
- See `DEPLOYMENT.md` for deployment guide
- Check `README.md` for full documentation
