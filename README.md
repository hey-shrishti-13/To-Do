# Full Stack To-Do Application

A modern, feature-rich To-Do application built with Node.js, Express, MongoDB, and React.

## Features

- ✅ Add, edit, and delete tasks
- ✅ Mark tasks as complete/uncomplete
- ✅ Create folders to organize tasks
- ✅ Label tasks and folders
- ✅ Search functionality
- ✅ Sort by date or name
- ✅ Add media files to tasks
- ✅ Trash system with restore and permanent delete
- ✅ Beautiful, modern UI

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Frontend**: React
- **Deployment**: Netlify (Free Tier)

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (free tier) or local MongoDB installation
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd To-Do
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up MongoDB**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get your connection string
   - Create a `.env` file in the `backend` folder:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=5000
     ```

4. **Run the application**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and frontend (port 3000).

## Deployment to Netlify

### Option 1: Deploy Frontend Only (Recommended for Free Tier)

Since Netlify's free tier is best for static sites, deploy the frontend separately:

1. **Deploy Backend to a Free Service**
   - Option A: Use [Render](https://render.com) (free tier available)
     - Connect your GitHub repo
     - Create a new Web Service
     - Set root directory to `backend`
     - Add environment variables (MONGODB_URI, PORT)
   - Option B: Use [Railway](https://railway.app) (free tier available)
   - Option C: Use [Cyclic](https://cyclic.sh) (free tier available)

2. **Build and Deploy Frontend to Netlify**
   ```bash
   cd frontend
   npm run build
   ```
   
   - Go to [Netlify](https://www.netlify.com)
   - Sign up/login (free)
   - Drag and drop the `frontend/build` folder, OR
   - Connect your Git repository and set:
     - Build command: `cd frontend && npm install && npm run build`
     - Publish directory: `frontend/build`

3. **Set up Environment Variables in Netlify**
   - Go to Site settings > Environment variables
   - Add `REACT_APP_API_URL` with your deployed backend URL
     - Example: `https://your-backend.onrender.com/api` or `https://your-backend.cyclic.app/api`

### Option 2: Full Stack on Netlify (Advanced)

For full-stack deployment on Netlify, convert backend to serverless functions:
1. Convert Express routes to Netlify Functions
2. Use Netlify's serverless functions for API endpoints
3. This requires more setup but keeps everything on Netlify

**Recommended Approach**: Use Render/Railway for backend (free) + Netlify for frontend (free)

## Project Structure

```
To-Do/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded media files
│   └── server.js        # Express server
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── App.js       # Main app component
│   └── package.json
└── package.json         # Root package.json
```

## API Endpoints

### Folders
- `GET /api/folders` - Get all folders
- `POST /api/folders` - Create folder
- `PUT /api/folders/:id` - Update folder
- `DELETE /api/folders/:id` - Delete folder

### Tasks
- `GET /api/tasks` - Get all tasks (with query params: search, sortBy, order, folderId)
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Trash
- `GET /api/trash` - Get all trash items
- `POST /api/trash/:id/restore` - Restore item
- `DELETE /api/trash/:id` - Permanently delete item
- `DELETE /api/trash` - Empty trash

## Free Tools Used

- **MongoDB Atlas**: Free tier (512MB storage)
- **Netlify**: Free tier (100GB bandwidth, 300 build minutes/month)
- **Node.js**: Open source
- **React**: Open source

## License

MIT
