# Frontend-Backend Connection Troubleshooting

## Current Configuration

### Frontend API Configuration
- **File**: `frontend/src/services/api.js`
- **API URL**: `process.env.REACT_APP_API_URL || 'http://localhost:5000/api'`
- **Default (local)**: `http://localhost:5000/api`
- **Production**: Must be set in Netlify environment variables

### Backend Configuration
- **Backend URL**: `https://todo-backend-weqm.onrender.com`
- **API Endpoint**: `https://todo-backend-weqm.onrender.com/api`
- **CORS**: Configured for `https://meowdo.netlify.app`

## Step-by-Step Fix

### Step 1: Verify Backend is Running

1. **Test Backend Health:**
   - Visit: `https://todo-backend-weqm.onrender.com/api/health`
   - Should return: `{"status":"ok","message":"Server is running",...}`
   - If not working, check Render dashboard

2. **Test Backend API:**
   - Visit: `https://todo-backend-weqm.onrender.com/api/folders`
   - Should return: `[]` (empty array) or folders data

### Step 2: Set Netlify Environment Variable

**CRITICAL STEP** - This is likely the issue:

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site: `meowdo`
3. Go to **Site settings** → **Environment variables**
4. Click **"Add a variable"**
5. Add:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://todo-backend-weqm.onrender.com/api`
     - ⚠️ **MUST end with `/api`**
     - ⚠️ Use your actual Render backend URL
   - **Scopes**: Select "All scopes" or "Production"
6. Click **"Save"**

### Step 3: Rebuild Frontend

**After setting environment variable, you MUST rebuild:**

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait 3-5 minutes for build to complete

**Important**: Environment variables are only available during build time. You must rebuild after setting/changing them.

### Step 4: Verify Connection

1. Visit https://meowdo.netlify.app
2. Open browser console (F12)
3. Check for:
   - ✅ `API Request: GET /folders` - Connection working!
   - ❌ `Failed to fetch` - Connection issue
   - ❌ `CORS error` - CORS configuration issue
   - ❌ `404 Not Found` - Wrong API URL

### Step 5: Check Browser Console

In browser console, you should see:
```
API Request: GET /folders
```

If you see errors:
- **Network Error**: Backend not running or wrong URL
- **CORS Error**: Frontend URL not in backend CORS whitelist
- **404 Error**: API URL incorrect (missing `/api`)

## Common Issues

### Issue 1: Environment Variable Not Set
**Symptom**: Frontend uses `http://localhost:5000/api` (default)
**Solution**: Set `REACT_APP_API_URL` in Netlify environment variables

### Issue 2: Environment Variable Set But Not Rebuilt
**Symptom**: Variable is set but frontend still uses old value
**Solution**: Trigger new deploy after setting variable

### Issue 3: Wrong API URL Format
**Symptom**: 404 errors or connection refused
**Solution**: 
- Must be: `https://todo-backend-weqm.onrender.com/api`
- NOT: `https://todo-backend-weqm.onrender.com` (missing `/api`)

### Issue 4: CORS Error
**Symptom**: Browser console shows CORS error
**Solution**: 
- Check `backend/server.js` CORS origins
- Must include: `https://meowdo.netlify.app`
- Redeploy backend after updating CORS

### Issue 5: Backend Not Running
**Symptom**: "Failed to fetch" or connection timeout
**Solution**:
- Check Render dashboard → Service status
- Check Render logs for errors
- Verify MongoDB connection

## Quick Test

### Test 1: Backend Health
```bash
# In browser or curl:
https://todo-backend-weqm.onrender.com/api/health
```
Expected: `{"status":"ok",...}`

### Test 2: Backend API
```bash
https://todo-backend-weqm.onrender.com/api/folders
```
Expected: `[]` or folder data

### Test 3: Frontend API Call
1. Open https://meowdo.netlify.app
2. Open browser console (F12)
3. Try creating a folder
4. Check console for API requests

## Debugging Steps

1. **Check Environment Variable:**
   - Netlify → Site settings → Environment variables
   - Verify `REACT_APP_API_URL` is set correctly

2. **Check Build Logs:**
   - Netlify → Deploys → Click latest deploy
   - Look for build errors
   - Check if environment variable is available

3. **Check Browser Console:**
   - Open DevTools (F12) → Console tab
   - Look for API request logs
   - Check for error messages

4. **Check Network Tab:**
   - DevTools → Network tab
   - Try creating a folder
   - Check the request URL
   - Should be: `https://todo-backend-weqm.onrender.com/api/folders`

## Expected Behavior

When working correctly:
- ✅ Browser console shows: `API Request: GET /folders`
- ✅ Creating folder works without errors
- ✅ Data persists (refresh page, folder still there)
- ✅ No CORS errors
- ✅ No network errors

## Your Current Setup

- **Frontend**: https://meowdo.netlify.app
- **Backend**: https://todo-backend-weqm.onrender.com
- **API URL**: Should be `https://todo-backend-weqm.onrender.com/api`
- **Environment Variable**: Must be set in Netlify

## Next Steps

1. ✅ Verify backend is running (test health endpoint)
2. ✅ Set `REACT_APP_API_URL` in Netlify
3. ✅ Rebuild frontend (trigger deploy)
4. ✅ Test connection (check browser console)
5. ✅ Verify CORS is configured correctly
