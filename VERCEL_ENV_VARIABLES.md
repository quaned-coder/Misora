# Your Vercel Environment Variables

Copy these **exact values** into Vercel's Environment Variables section:

---

## Variable 1: DATABASE_URL

**Key**: `DATABASE_URL`

**Value**: 
```
postgresql://postgres:Pas-fh0ca1l!@db.gcalxocbkiweibnjvuvz.supabase.co:5432/postgres
```

**Environments**: ✅ Production, ✅ Preview, ✅ Development

---

## Variable 2: NEXTAUTH_SECRET

**Key**: `NEXTAUTH_SECRET`

**Value**:
```
AVxXN4GMYVyAdkgqk2R/DIYIYpc2q7onhm1lpNVZrP0=
```

**Environments**: ✅ Production, ✅ Preview, ✅ Development

---

## Variable 3: NEXTAUTH_URL

**Key**: `NEXTAUTH_URL`

**Value**: 
- **First deploy**: Leave EMPTY or use `https://misora.vercel.app` (placeholder)
- **After first deploy**: Update to your actual Vercel URL (e.g., `https://misora-xyz123.vercel.app`)

**Environments**: ✅ Production, ✅ Preview, ✅ Development

**Important**: After Vercel gives you your deployment URL, come back and update this value!

---

## Quick Steps in Vercel:

1. Go to your project → **Settings** → **Environment Variables**
2. Click **"Add New"** for each variable above
3. Paste the Key and Value
4. Check all three environment boxes (Production, Preview, Development)
5. Click **"Save"**
6. **Redeploy** your project (or it will auto-redeploy)

---

## After First Deploy:

1. Vercel will give you a URL like: `https://misora-abc123.vercel.app`
2. Go back to Environment Variables
3. Update `NEXTAUTH_URL` to that exact URL
4. Redeploy

---

## Testing:

After deployment, visit your Vercel URL and:
- Try signing up a new account
- Try signing in
- If you get errors, check the Vercel logs (Deployments → Click deployment → Logs)
