# Deploying MISORA to Your Domain

This guide covers how to deploy your Next.js app to production and connect it to your custom domain.

## Important: Database Migration Required

⚠️ **Before deploying**, you need to switch from SQLite to a production database (PostgreSQL, MySQL, etc.). SQLite doesn't work well in serverless/cloud environments.

### Quick Database Migration Steps:

1. **Update Prisma schema** to use PostgreSQL:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Get a PostgreSQL database**:
   - **Free options**: Supabase, Neon, Railway, Render
   - **Paid options**: AWS RDS, Google Cloud SQL, Azure Database

3. **Update your `.env`** with the PostgreSQL connection string

4. **Run migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

---

## Option 1: Vercel (Recommended - Made by Next.js Team)

### Why Vercel?
- Built specifically for Next.js
- Free tier available
- Automatic deployments from GitHub
- Easy custom domain setup
- Built-in SSL certificates

### Steps:

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/Misora.git
   git push -u origin main
   ```

2. **Sign up at [vercel.com](https://vercel.com)**

3. **Import your GitHub repository**:
   - Click "Add New Project"
   - Select your Misora repository
   - Vercel will auto-detect Next.js settings

4. **Configure Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add:
     - `DATABASE_URL` (your PostgreSQL connection string)
     - `NEXTAUTH_SECRET` (generate with: `openssl rand -base64 32`)
     - `NEXTAUTH_URL` (your domain, e.g., `https://misora.com`)

5. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy automatically

6. **Add Custom Domain**:
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `misora.com` or `www.misora.com`)
   - Follow DNS configuration instructions:
     - Add a CNAME record pointing to `cname.vercel-dns.com`
     - Or add an A record (for apex domain)
   - Vercel automatically provisions SSL certificates

### DNS Configuration:
- **For subdomain** (e.g., `app.misora.com`):
  - Type: `CNAME`
  - Name: `app`
  - Value: `cname.vercel-dns.com`

- **For root domain** (e.g., `misora.com`):
  - Type: `A`
  - Name: `@`
  - Value: `76.76.21.21` (Vercel's IP - check their docs for current IPs)

---

## Option 2: Netlify

### Steps:

1. **Push code to GitHub** (same as above)

2. **Sign up at [netlify.com](https://netlify.com)**

3. **Import repository**:
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repo

4. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`

5. **Environment variables**:
   - Site settings → Environment variables
   - Add: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

6. **Custom domain**:
   - Domain settings → Add custom domain
   - Configure DNS as instructed

---

## Option 3: Railway

### Steps:

1. **Sign up at [railway.app](https://railway.app)**

2. **Create new project** → "Deploy from GitHub repo"

3. **Add PostgreSQL database**:
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway provides the connection string automatically

4. **Configure environment variables**:
   - Add `DATABASE_URL` (from Railway's PostgreSQL service)
   - Add `NEXTAUTH_SECRET` and `NEXTAUTH_URL`

5. **Custom domain**:
   - Settings → Networking → Custom Domain
   - Add your domain and configure DNS

---

## Option 4: Render

### Steps:

1. **Sign up at [render.com](https://render.com)**

2. **Create new Web Service**:
   - Connect GitHub repository
   - Build command: `npm install && npm run build`
   - Start command: `npm start`

3. **Add PostgreSQL database**:
   - Create new PostgreSQL database
   - Use the provided connection string

4. **Environment variables**:
   - Add in the Environment tab

5. **Custom domain**:
   - Settings → Custom Domains → Add

---

## Option 5: Self-Hosted (VPS)

If you want full control, you can host on a VPS (DigitalOcean, Linode, AWS EC2, etc.):

### Steps:

1. **Set up server** (Ubuntu recommended):
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PostgreSQL
   sudo apt-get install postgresql

   # Install PM2 (process manager)
   npm install -g pm2
   ```

2. **Clone and build**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Misora.git
   cd Misora
   npm install
   npm run build
   ```

3. **Set up environment variables**:
   ```bash
   nano .env
   # Add your variables
   ```

4. **Run with PM2**:
   ```bash
   pm2 start npm --name "misora" -- start
   pm2 save
   pm2 startup
   ```

5. **Set up Nginx reverse proxy**:
   ```nginx
   server {
       listen 80;
       server_name misora.com www.misora.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Set up SSL with Let's Encrypt**:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d misora.com -d www.misora.com
   ```

---

## Pre-Deployment Checklist

- [ ] Switch database from SQLite to PostgreSQL
- [ ] Update `DATABASE_URL` in environment variables
- [ ] Generate `NEXTAUTH_SECRET`: `openssl rand -base64 32`
- [ ] Set `NEXTAUTH_URL` to your production domain
- [ ] Test all features locally
- [ ] Update `next.config.js` if needed for production
- [ ] Ensure `.env` is in `.gitignore` (never commit secrets!)
- [ ] Set up proper error logging/monitoring

---

## Recommended: Vercel + Supabase

**Best combination for beginners:**

1. **Hosting**: Vercel (free tier, perfect for Next.js)
2. **Database**: Supabase (free PostgreSQL tier)
3. **File Storage**: For profile images, use:
   - Supabase Storage (free tier)
   - Or Cloudinary (free tier)
   - Or AWS S3

### Quick Supabase Setup:

1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database
4. Use it as your `DATABASE_URL`

---

## File Uploads in Production

Your current setup stores files in `public/uploads/`. This won't work on serverless platforms. Options:

1. **Use a cloud storage service**:
   - Supabase Storage
   - AWS S3
   - Cloudinary
   - Uploadcare

2. **Update your upload code** to use the cloud service instead of local filesystem

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Prisma Deployment**: https://www.prisma.io/docs/guides/deployment
