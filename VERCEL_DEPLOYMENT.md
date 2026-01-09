# Step-by-Step Vercel Deployment Guide

## Required Environment Variables

Your MISORA app needs these 3 environment variables in Vercel:

1. **DATABASE_URL** - Your Supabase PostgreSQL connection string
2. **NEXTAUTH_SECRET** - A random secret for authentication (I'll generate this)
3. **NEXTAUTH_URL** - Your Vercel deployment URL (auto-set after first deploy)

---

## Step 1: Generate NEXTAUTH_SECRET

I'll generate this for you in the terminal. Copy the value it gives you.

---

## Step 2: Deploy to Vercel

### A. Sign Up / Sign In
1. Go to **https://vercel.com**
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"** (easiest since your code is on GitHub)

### B. Import Your Repository
1. Click **"Add New..."** → **"Project"**
2. Find **"Misora"** in your repositories list
3. Click **"Import"**

### C. Configure Project Settings
1. **Project Name**: `Misora` (or whatever you want)
2. **Framework Preset**: Should auto-detect "Next.js" ✅
3. **Root Directory**: `./` (leave as default)
4. **Build Command**: `npm run build` (should be auto-filled)
5. **Output Directory**: `.next` (should be auto-filled)
6. **Install Command**: `npm install` (should be auto-filled)

### D. Add Environment Variables ⚠️ IMPORTANT
**Before clicking "Deploy", click "Environment Variables"**

Add these 3 variables:

#### Variable 1: DATABASE_URL
- **Key**: `DATABASE_URL`
- **Value**: Your Supabase connection string
  - Format: `postgresql://postgres:[PASSWORD]@db.gcalxocbkiweibnjvuvz.supabase.co:5432/postgres`
  - Replace `[PASSWORD]` with your actual password: `Pas-fh0ca1l!`
  - Final: `postgresql://postgres:Pas-fh0ca1l!@db.gcalxocbkiweibnjvuvz.supabase.co:5432/postgres`
- **Environment**: Check all three: ✅ Production, ✅ Preview, ✅ Development

#### Variable 2: NEXTAUTH_SECRET
- **Key**: `NEXTAUTH_SECRET`
- **Value**: (I'll generate this for you - see terminal output)
- **Environment**: Check all three: ✅ Production, ✅ Preview, ✅ Development

#### Variable 3: NEXTAUTH_URL
- **Key**: `NEXTAUTH_URL`
- **Value**: Leave this **EMPTY for now** - we'll set it after first deploy
- **Environment**: Check all three: ✅ Production, ✅ Preview, ✅ Development
- **Note**: After first deploy, Vercel will give you a URL like `https://misora-xyz.vercel.app`. Then come back and update this variable to that URL.

### E. Deploy!
1. Click **"Deploy"** button
2. Wait for build to complete (2-5 minutes)
3. Once deployed, you'll get a URL like: `https://misora-xyz.vercel.app`

### F. Update NEXTAUTH_URL (After First Deploy)
1. Go to your project on Vercel
2. **Settings** → **Environment Variables**
3. Find `NEXTAUTH_URL`
4. Click **Edit**
5. Set value to your Vercel URL: `https://misora-xyz.vercel.app`
6. **Redeploy** (Vercel will auto-redeploy when you save, or click "Redeploy")

---

## Step 3: Verify Database Connection

After deployment, test if the app can connect to Supabase:

1. Visit your Vercel URL
2. Try to sign up or sign in
3. If you get database errors, check:
   - Environment variables are set correctly
   - Supabase allows connections from Vercel (should work by default)
   - Connection string is correct

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Common issues:
  - Missing environment variables
  - TypeScript errors
  - Missing dependencies

### Database Connection Errors
- Verify `DATABASE_URL` is correct
- Check Supabase dashboard to ensure database is running
- Try using Supabase's connection pooling URL (port 6543 instead of 5432)

### Authentication Not Working
- Make sure `NEXTAUTH_SECRET` is set
- Make sure `NEXTAUTH_URL` matches your Vercel URL exactly
- Clear browser cookies and try again

---

## Next Steps After Deployment

1. **Test the app** on your Vercel URL
2. **Add custom domain** (optional):
   - Settings → Domains → Add Domain
   - Follow DNS instructions
3. **Monitor logs**:
   - Vercel dashboard → Logs tab
4. **Set up automatic deployments**:
   - Already done! Every push to `main` branch auto-deploys

---

## Quick Reference: Your Values

- **GitHub Repo**: `https://github.com/quaned-coder/Misora`
- **Supabase Database**: `db.gcalxocbkiweibnjvuvz.supabase.co`
- **Database Password**: `Pas-fh0ca1l!`
- **NEXTAUTH_SECRET**: (see terminal output below)
