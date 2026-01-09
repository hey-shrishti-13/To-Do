# Troubleshooting Guide

## Common Issues and Solutions

### 1. Error Creating Folder

**Symptoms:**
- Error message when trying to create a folder
- Folder not appearing after creation
- Network errors in browser console

**Solutions:**

#### Check Backend Connection
1. Open browser console (F12)
2. Look for API errors
3. Check if backend URL is correct:
   - Local: `http://localhost:5000/api`
   - Production: Should match your `REACT_APP_API_URL` environment variable

#### Verify Backend is Running
1. Test health endpoint: `http://localhost:5000/api/health` (or your backend URL)
2. Should return: `{"status":"ok","message":"Server is running",...}`
3. If not working, check backend logs

#### Check Environment Variables

**For Local Development:**
- Backend `.env` file should have:
  ```
  MONGODB_URI=your_mongodb_connection_string
  PORT=5000
  ```

**For Production (Netlify):**
- In Netlify dashboard → Site settings → Environment variables
- Add: `REACT_APP_API_URL` = `https://your-backend-url.onrender.com/api`
- Must include `/api` at the end
- Rebuild after adding environment variable

#### Check MongoDB Connection
1. Verify MongoDB Atlas connection string is correct
2. Check IP whitelist in MongoDB Atlas (should include `0.0.0.0/0` for Render)
3. Check backend logs for "MongoDB Connected" message

#### Check CORS Settings
- Backend `server.js` should include your frontend URL in CORS origins
- For production: `https://meowdo.netlify.app`
- For local: `http://localhost:3000`

### 2. Network Errors

**CORS Error:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** Update `backend/server.js` CORS configuration to include your frontend URL

**404 Not Found:**
```
GET http://localhost:5000/api/folders 404
```
**Solution:** 
- Check backend is running on correct port
- Verify API routes are properly set up
- Check `REACT_APP_API_URL` environment variable

**Connection Refused:**
```
Failed to fetch
```
**Solution:**
- Backend server is not running
- Start backend: `cd backend && npm run dev`
- Check if port 5000 is available

### 3. MongoDB Connection Issues

**Error:** `MongoDB connection error`

**Solutions:**
1. Check connection string format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
   ```
2. Verify username and password are correct
3. Check MongoDB Atlas IP whitelist
4. Ensure database name is correct (`todoapp`)

### 4. Environment Variable Issues

**Problem:** Frontend can't connect to backend

**Check:**
1. Local development: API defaults to `http://localhost:5000/api`
2. Production: Must set `REACT_APP_API_URL` in Netlify
3. After setting environment variable, rebuild frontend

### 5. Debugging Steps

1. **Check Browser Console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for error messages
   - Check Network tab for failed requests

2. **Check Backend Logs:**
   - Local: Check terminal where backend is running
   - Production: Check Render/Railway logs

3. **Test API Directly:**
   - Use browser or Postman to test:
   - `GET https://your-backend-url/api/health`
   - `GET https://your-backend-url/api/folders`
   - `POST https://your-backend-url/api/folders` with JSON body

4. **Verify Data Flow:**
   - Check if request reaches backend (check logs)
   - Check if MongoDB query succeeds
   - Check if response is sent correctly

### 6. Common Error Messages

**"Error creating folder: Network Error"**
- Backend not running or unreachable
- Check backend URL in environment variables

**"Error creating folder: 400 Bad Request"**
- Invalid data sent to backend
- Check folder name is provided
- Check request format

**"Error creating folder: 500 Internal Server Error"**
- Backend error (check backend logs)
- Usually MongoDB connection issue
- Check backend environment variables

### 7. Quick Checks

✅ Backend server is running
✅ MongoDB connection is established
✅ CORS is configured correctly
✅ Environment variables are set
✅ Frontend can reach backend URL
✅ Browser console shows detailed errors

### 8. Getting Help

If issues persist:
1. Check browser console for detailed error messages
2. Check backend logs for server-side errors
3. Verify all environment variables are set correctly
4. Test API endpoints directly with Postman or curl
5. Check network tab in browser DevTools for request/response details
