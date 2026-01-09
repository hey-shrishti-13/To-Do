# GitHub Setup Guide

Your local git repository has been initialized! Now let's push it to GitHub so you can connect it to Render.

## Step 1: Create GitHub Repository

1. **Go to GitHub**: https://github.com
2. **Sign in** (or create account if you don't have one - it's free)
3. **Click the "+" icon** in the top right → "New repository"
4. **Repository settings**:
   - Repository name: `todo-app` (or any name you like)
   - Description: "Full Stack To-Do Application"
   - Visibility: **Public** (free) or Private (if you have GitHub Pro)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. **Click "Create repository"**

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

### Option A: Using HTTPS (Recommended)

```bash
# Navigate to your project directory
cd c:\projects\To-Do

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/todo-app.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Option B: Using SSH

If you have SSH keys set up:

```bash
cd c:\projects\To-Do
git remote add origin git@github.com:YOUR_USERNAME/todo-app.git
git branch -M main
git push -u origin main
```

## Step 3: Verify Push

1. Go to your GitHub repository page
2. You should see all your files there
3. The repository is now ready to connect to Render!

## Step 4: Connect to Render

Now follow the deployment guide in `DEPLOYMENT.md`:

1. Go to [render.com](https://render.com)
2. Sign up/login (free)
3. Click "New +" → "Web Service"
4. Connect your GitHub account (if not already connected)
5. Select your `todo-app` repository
6. Configure:
   - **Name**: `todo-backend`
   - **Environment**: `Node`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
7. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: `10000` (or leave default)
   - `NODE_ENV`: `production`
8. Click "Create Web Service"

## Troubleshooting

### Authentication Issues

If `git push` asks for credentials:
- **HTTPS**: Use a Personal Access Token instead of password
  - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Generate new token with `repo` scope
  - Use this token as your password when pushing

### Branch Name Issues

If you get "branch name" errors:
```bash
git branch -M main
git push -u origin main
```

### Remote Already Exists

If you get "remote origin already exists":
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/todo-app.git
```

## Next Steps

After pushing to GitHub:
1. ✅ Connect to Render (see Step 4 above)
2. ✅ Deploy frontend to Netlify (see `DEPLOYMENT.md`)
3. ✅ Update environment variables
4. ✅ Test your deployed app!

## Quick Commands Reference

```bash
# Check git status
git status

# See remote repositories
git remote -v

# Push changes (after initial setup)
git add .
git commit -m "Your commit message"
git push

# Pull latest changes
git pull
```

Your repository is ready! 🚀
