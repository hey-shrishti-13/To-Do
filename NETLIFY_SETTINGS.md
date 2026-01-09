# Netlify Build Settings - Exact Values

Fill in these **exact** values in your Netlify build settings:

## Build Settings

### Branch to deploy
```
main
```
(Or whatever your main branch is called - usually `main` or `master`)

### Base directory
```
(leave empty)
```
OR if Netlify requires a value:
```
.
```

### Build command
```
cd frontend && npm install && npm run build
```

### Publish directory
```
frontend/build
```

### Functions directory
```
netlify/functions
```
(Leave as default, you're not using Netlify functions)

## Environment Variables

Click "Add a variable" and add:

**Key:** `REACT_APP_API_URL`  
**Value:** `https://todo-backend-weqm.onrender.com/api`  
(Replace with your actual Render backend URL - must end with `/api`)

**Scopes:** Select "All scopes" or "Production"

## Summary

- **Branch:** `main`
- **Base directory:** (empty or `.`)
- **Build command:** `cd frontend && npm install && npm run build`
- **Publish directory:** `frontend/build`
- **Functions directory:** `netlify/functions` (default)
- **Environment variable:** `REACT_APP_API_URL` = `https://your-backend-url.onrender.com/api`

## Important Notes

1. **Build command** must include `cd frontend` because your React app is in the `frontend` folder
2. **Publish directory** must be `frontend/build` (where React builds the production files)
3. **Environment variable** is critical - without it, your frontend won't connect to the backend
4. After setting environment variable, you must **rebuild** the site

## After Saving Settings

1. Click "Save" or "Deploy site"
2. Netlify will start building
3. Wait 3-5 minutes
4. Check "Deploys" tab for build status
5. Once complete, visit your site URL
