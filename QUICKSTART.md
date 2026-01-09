# Quick Start Guide

## Quick Setup

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
1. Edit `backend/.env` file
2. Add your MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
   PORT=5000
   ```

### 4. Create Uploads Directory
```bash
# Windows
mkdir backend\uploads

# Mac/Linux
mkdir -p backend/uploads
```

### 5. Start the App
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
