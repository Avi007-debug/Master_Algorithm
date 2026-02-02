# Deployment Guide

**Recommended Setup:** Vercel (Frontend) + Render (Backend)

Complete guide to deploying the Algorithm Visualization Platform using free hosting.

---

## 🚀 Quick Deploy (15 Minutes)

### **Best Free Setup: Vercel + Render**

**Frontend on Vercel** (Free)
- Global CDN
- Automatic HTTPS
- Auto-deploy on git push
- Unlimited bandwidth

**Backend on Render** (Free tier available)
- Supports C compilation
- Automatic HTTPS
- 750 hours/month free
- Easy setup

**Total Cost:** $0/month (free tier)

---

## 📦 Step-by-Step Deployment

### Part 1: Deploy Frontend to Vercel (5 minutes)

#### Prerequisites
- GitHub account
- Code pushed to GitHub repository

#### Steps

**1. Sign up for Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Sign Up" → Choose "Continue with GitHub"
- Authorize Vercel to access your repositories

**2. Import Your Project**
- Click "Add New..." → "Project"
- Select your `ALGO-VISUALIZATION` repository
- Click "Import"

**3. Configure Build Settings**
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**4. Add Environment Variables**
Click "Environment Variables" and add:
```
Name: VITE_API_URL
Value: https://your-backend-name.onrender.com/api
```
*(We'll get the backend URL in Part 2, you can add this later)*

**5. Deploy**
- Click "Deploy"
- Wait 2-3 minutes for build to complete
- Copy your frontend URL (e.g., `https://algo-viz.vercel.app`)

**6. Update Environment Variable**
After backend is deployed:
- Go to Project Settings → Environment Variables
- Update `VITE_API_URL` with your Render backend URL
- Redeploy: Deployments → Click ⋯ → Redeploy

---

### Part 2: Deploy Backend to Render (10 minutes)

#### Prerequisites
- GitHub repository
- Render account

#### Steps

**1. Sign up for Render**
- Go to [render.com](https://render.com)
- Click "Get Started" → "Sign Up with GitHub"
- Authorize Render

**2. Create New Web Service**
- Dashboard → Click "New +"
- Select "Web Service"
- Click "Connect" next to your repository
- If repo not listed, click "Configure Account" to grant access

**3. Configure Service**

**Basic Settings:**
- **Name:** `algo-viz-backend` (or your preferred name)
- **Region:** Oregon (US West) or closest to you
- **Branch:** `main`
- **Root Directory:** `backend`

**Build Settings:**
- **Runtime:** Node
- **Build Command:**
  ```bash
  npm install && make all
  ```
- **Start Command:**
  ```bash
  npm start
  ```

**4. Add Environment Variables**
Scroll to "Environment Variables" section and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `ALLOWED_ORIGINS` | `https://algo-viz.vercel.app` |
| `ALGORITHM_TIMEOUT` | `5000` |
| `MAX_INPUT_SIZE` | `1000` |
| `MAX_INPUT_COUNT` | `100` |

*(Replace `algo-viz.vercel.app` with your actual Vercel URL from Part 1)*

**5. Select Plan**
- Choose **"Free"** plan
- Note: Free tier sleeps after 15 min of inactivity
- First request after sleep takes ~30 seconds to wake up
- For always-on, upgrade to Starter ($7/month)

**6. Create Web Service**
- Click "Create Web Service"
- Wait 5-10 minutes for build to complete
- Watch the build logs for any errors

**7. Verify Deployment**
Once deployed, test your backend:
- Copy your Render URL (e.g., `https://algo-viz-backend.onrender.com`)
- Test health endpoint:
  ```bash
  curl https://your-backend.onrender.com/health
  ```
- Should return: `{"status":"ok","timestamp":"..."}`

**8. Update Frontend Environment Variable**
- Go back to Vercel
- Project Settings → Environment Variables
- Update `VITE_API_URL` to: `https://your-backend.onrender.com/api`
- Go to Deployments → Click ⋯ on latest → Redeploy

---

## ✅ Verification

### Test Your Deployment

**1. Check Backend Health**
```bash
curl https://your-backend.onrender.com/health
```
Expected: `{"status":"ok","timestamp":"2026-02-02T..."}`

**2. Test an Algorithm**
```bash
curl -X POST https://your-backend.onrender.com/api/run/bubble_sort \
  -H "Content-Type: application/json" \
  -d '{"inputs":["5","2","8","1","9"]}'
```
Expected: JSON array with visualization steps

**3. Test Frontend**
- Visit your Vercel URL
- Select an algorithm (e.g., Bubble Sort)
- Enter input values
- Click "Visualize"
- Should see step-by-step visualization

---

## 🔧 Environment Variables Reference

### Frontend (.env)
```bash
VITE_API_URL=https://your-backend.onrender.com/api
```

### Backend (.env on Render)
```bash
NODE_ENV=production
PORT=3001
ALLOWED_ORIGINS=https://your-frontend.vercel.app
ALGORITHM_TIMEOUT=5000
MAX_INPUT_SIZE=1000
MAX_INPUT_COUNT=100
```

---

## 🚨 Troubleshooting

### Frontend Issues

**Problem:** "Failed to fetch" or CORS errors

**Solutions:**
1. Check `ALLOWED_ORIGINS` in Render includes your Vercel URL
2. Ensure no trailing slash in `VITE_API_URL`
3. Check browser console for specific error
4. Verify backend is running: test `/health` endpoint

**Problem:** Build fails on Vercel

**Solutions:**
1. Check build logs in Vercel dashboard
2. Verify `frontend/package.json` has all dependencies
3. Ensure root directory is set to `frontend`
4. Try clearing Vercel cache: Settings → Clear Cache

### Backend Issues

**Problem:** Build fails on Render

**Solutions:**
1. Check build logs - look for gcc errors
2. Verify `backend/Makefile` exists
3. Ensure all C source files are in `backend/src/`
4. Check that `build` command is: `npm install && make all`

**Problem:** "Algorithm not found"

**Solutions:**
1. Build command must include `make all`
2. Check build logs - ensure all 57 executables compiled
3. Verify build directory exists with executables

**Problem:** First request very slow (30+ seconds)

**Explanation:** Free tier sleeps after 15 min inactivity

**Solutions:**
1. Accept the delay (free tier limitation)
2. Upgrade to Render Starter plan ($7/month) for always-on
3. Keep service awake with uptime monitor (see below)

**Problem:** Backend crashes or restarts

**Solutions:**
1. Check Render logs for errors
2. Increase instance size if out of memory
3. Check for infinite loops in C programs

---

## 💡 Pro Tips

### Keep Free Tier Awake (Optional)

If you want to avoid the 30s wake-up delay on Render free tier, use an uptime monitor:

**Option 1: Cron-job.org (Free)**
1. Go to [cron-job.org](https://cron-job.org)
2. Create free account
3. Create new cron job:
   - URL: `https://your-backend.onrender.com/health`
   - Schedule: Every 14 minutes
   - This keeps your backend awake 24/7

**Option 2: UptimeRobot (Free)**
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Add New Monitor
3. Monitor Type: HTTP(s)
4. URL: `https://your-backend.onrender.com/health`
5. Monitoring Interval: 5 minutes

⚠️ **Note:** This uses your free tier hours. 750 hours/month ≈ 31 days, so you're fine.

### Custom Domain (Optional)

**Vercel (Frontend):**
1. Go to Project Settings → Domains
2. Add your domain (e.g., `algos.yourdomain.com`)
3. Update DNS records as instructed
4. SSL automatically configured

**Render (Backend):**
1. Go to Settings → Custom Domain
2. Add domain (e.g., `api.yourdomain.com`)
3. Update DNS with CNAME
4. SSL automatically configured

### Auto-Deploy on Git Push

Both Vercel and Render automatically deploy when you push to your main branch.

**Workflow:**
```bash
# Make changes
git add .
git commit -m "Update algorithm"
git push origin main

# Vercel and Render automatically detect and deploy
# Wait 2-3 minutes
# Changes live!
```

### Monitoring & Logs

**Vercel Logs:**
- Dashboard → Your Project → Deployments
- Click on deployment to see build logs
- Runtime logs available in Functions tab

**Render Logs:**
- Dashboard → Your Service → Logs
- Real-time streaming logs
- Filter by date/time
- Download logs for debugging

---

## 📊 Cost Breakdown

| Service | Free Tier | Paid Plan | Recommended |
|---------|-----------|-----------|-------------|
| **Vercel (Frontend)** | ✅ Free forever<br>100GB bandwidth<br>Unlimited sites | $20/mo Pro | Free ✅ |
| **Render (Backend)** | ✅ Free<br>750 hrs/month<br>Sleeps after 15min | $7/mo Starter<br>Always-on | Free ✅ |
| **Total** | **$0/month** | $27/mo | **$0** ✅ |

**Upgrade When:**
- Backend uptime critical → Render Starter ($7/mo)
- Need team features → Vercel Pro ($20/mo)
- High traffic → Both paid tiers

---

## 🔄 Updating Your Deployment

### Update Frontend
```bash
cd frontend
# Make changes to React components
git add .
git commit -m "Update UI"
git push origin main
# Vercel auto-deploys in 2-3 minutes
```

### Update Backend
```bash
cd backend
# Make changes to C files or server.js
make clean && make all  # Test locally
git add .
git commit -m "Update algorithm"
git push origin main
# Render auto-builds and deploys in 5-10 minutes
```

### Update Environment Variables

**Vercel:**
1. Project Settings → Environment Variables
2. Edit or add variables
3. Redeploy: Deployments → ⋯ → Redeploy

**Render:**
1. Service → Environment
2. Add/Edit variables
3. Saves automatically
4. May need to manually deploy: Manual Deploy → Deploy latest commit

---

## 🎯 Complete Setup Checklist

### Pre-Deployment
- [ ] Code pushed to GitHub (main branch)
- [ ] All 57 algorithms compile locally (`make all`)
- [ ] Frontend builds successfully (`npm run build`)
- [ ] No errors in code
- [ ] `.env.example` files exist

### Vercel (Frontend)
- [ ] Account created and linked to GitHub
- [ ] Project imported and configured
- [ ] Root directory set to `frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variable `VITE_API_URL` added
- [ ] First deployment successful
- [ ] Site accessible at Vercel URL

### Render (Backend)
- [ ] Account created and linked to GitHub
- [ ] Web service created
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install && make all`
- [ ] Start command: `npm start`
- [ ] All environment variables added
- [ ] Free plan selected
- [ ] Build completed successfully (check logs)
- [ ] Health endpoint responding
- [ ] All 57 algorithms compiled (check logs)

### Final Verification
- [ ] Backend `/health` returns `{"status":"ok"}`
- [ ] Test algorithm via curl works
- [ ] Frontend loads without errors
- [ ] Can select and run an algorithm
- [ ] Visualization displays correctly
- [ ] No CORS errors in browser console
- [ ] Update `VITE_API_URL` in Vercel if needed
- [ ] Redeploy frontend after backend URL confirmed

---

## 📞 Getting Help

**Vercel Issues:**
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Discord](https://vercel.com/discord)

**Render Issues:**
- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
- [Support](https://render.com/support)

**Project-Specific:**
- Check [SETUP.md](SETUP.md) for local development
- See [FUTURE_IMPROVEMENTS.md](FUTURE_IMPROVEMENTS.md) for known issues
- Review [FILE_GUIDE.md](FILE_GUIDE.md) for code structure

---

## 🔐 Security Notes

### Environment Variables
- Never commit `.env` files to git
- Use environment variables for all secrets
- Both platforms encrypt environment variables
- Vercel/Render have secure variable management

### CORS Configuration
- Always specify exact domains in `ALLOWED_ORIGINS`
- Never use `*` in production
- Update CORS when adding new frontends

### Input Validation
- Backend validates all inputs (already implemented)
- 5-second execution timeout prevents infinite loops
- Buffer limits prevent memory issues

---

## Alternative Deployment Options

### If You Need More Control: VPS

**DigitalOcean Droplet** ($6/month)
- Full control over environment
- No sleep/wake delays
- Suitable for production with steady traffic

See previous version of this file for VPS deployment instructions, or deploy with Docker.

### If Backend Build Fails on Render

**Railway** (Alternative)
- Better build support for C programs
- $5 free credit/month
- Similar to Render but different build system

