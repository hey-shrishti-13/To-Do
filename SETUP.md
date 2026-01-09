# Setup Guide - Full Stack To-Do Application

## Step-by-Step Setup Instructions

### 1. Install Node.js
- Download and install Node.js from [nodejs.org](https://nodejs.org/) (v18 or higher)
- Verify installation: `node --version` and `npm --version`

### 2. Install MongoDB Atlas (Free)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (choose FREE tier)
4. Create a database user:
   - Go to Database Access → Add New Database User
   - Choose Password authentication
   - Save the username and password
5. Whitelist your IP:
   - Go to Network Access → Add IP Address
   - Click "Add Current IP Address" or use `0.0.0.0/0` for development
6. Get your connection string:
   - Go to Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `todoapp`

### 3. Clone and Setup Project

```bash
# Navigate to your project directory
cd To-Do

# Install all dependencies
npm run install-all
```

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cd backend
   copy env.example .env
   ```
   (On Windows CMD, use `copy` instead of `cp`)

2. Edit `backend/.env` and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority
   PORT=5000
   ```

### 5. Create Uploads Directory

```bash
cd backend
mkdir uploads
```

### 6. Run the Application

**Option A: Run both frontend and backend together**
```bash
npm run dev
```

**Option B: Run separately**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

### 7. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Troubleshooting

### MongoDB Connection Issues
- Ensure your IP is whitelisted in MongoDB Atlas
- Check that your password doesn't contain special characters (or URL encode them)
- Verify the connection string format

### Port Already in Use
- Change PORT in `backend/.env` if 5000 is taken
- React defaults to port 3000, it will prompt to use another port if needed

### Module Not Found Errors
- Run `npm run install-all` again
- Delete `node_modules` folders and reinstall:
  ```bash
  rm -rf node_modules backend/node_modules frontend/node_modules
  npm run install-all
  ```

## Next Steps

Once the app is running locally, you can:
1. Create folders to organize your tasks
2. Add tasks with descriptions and media
3. Mark tasks as complete
4. Search and sort your tasks
5. Use the trash feature to restore or permanently delete items

## Deployment

See the main README.md for Netlify deployment instructions.
