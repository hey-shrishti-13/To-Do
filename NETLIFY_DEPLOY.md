# How to Update Your Live Site on Netlify

Your changes are committed locally but need to be pushed to GitHub and deployed to Netlify.

## Option 1: Push to GitHub (Recommended)

If your repository is connected to GitHub:

1. **Push your changes:**
   ```bash
   git push origin main
   ```
   
   If you haven't set up the remote yet:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

2. **Netlify will auto-deploy:**
   - If Netlify is connected to your GitHub repo, it will automatically rebuild
   - Check Netlify dashboard → Deploys tab
   - Wait 3-5 minutes for build to complete

## Option 2: Manual Deploy in Netlify

If you can't push to GitHub right now:

1. **Go to Netlify Dashboard:**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Select your site: `meowdo`

2. **Trigger Manual Deploy:**
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Clear cache and deploy site"
   - This will rebuild from your last GitHub commit

3. **Or Deploy from Local Build:**
   ```bash
   cd frontend
   npm run build
   ```
   - Then drag and drop the `frontend/build` folder to Netlify

## Option 3: Set Up GitHub Remote (If Not Done)

1. **Create GitHub Repository:**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it (e.g., "To-Do" or "meowdo")
   - Don't initialize with README (you already have one)
   - Click "Create repository"

2. **Connect and Push:**
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

3. **Connect Netlify to GitHub:**
   - In Netlify dashboard → Site settings → Build & deploy
   - Connect to GitHub if not already connected
   - Select your repository
   - Netlify will auto-deploy on every push

## Verify Deployment

After deployment:
1. Visit https://meowdo.netlify.app
2. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Check browser console (F12) for any errors

## Troubleshooting

**Changes not showing?**
- Hard refresh browser (clear cache)
- Check Netlify build logs for errors
- Verify build completed successfully

**Build failing?**
- Check Netlify build logs
- Verify environment variables are set
- Check for any build errors in logs
