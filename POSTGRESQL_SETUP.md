# PostgreSQL Setup Guide

## Option 1: Supabase (Recommended - Free & Easy)

### Steps:

1. **Sign up at [supabase.com](https://supabase.com)**
   - Click "Start your project"
   - Sign in with GitHub (easiest)

2. **Create a new project**:
   - Click "New Project"
   - Choose an organization (or create one)
   - Project name: `Misora` (or whatever you prefer)
   - Database password: **Save this password!** You'll need it
   - Region: Choose closest to you
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Get your connection string**:
   - Go to Project Settings → Database
   - Scroll to "Connection string"
   - Copy the "URI" connection string
   - It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`
   - Replace `[YOUR-PASSWORD]` with the password you saved

4. **Update your `.env` file**:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

5. **Run migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

---

## Option 2: Neon (Free PostgreSQL)

### Steps:

1. **Sign up at [neon.tech](https://neon.tech)**
   - Click "Sign Up" (GitHub login available)

2. **Create a new project**:
   - Click "Create Project"
   - Name: `Misora`
   - Region: Choose closest
   - Click "Create Project"

3. **Get connection string**:
   - Copy the connection string shown (starts with `postgresql://`)
   - It's already formatted correctly

4. **Update `.env`** and run migrations** (same as Supabase steps 4-5)

---

## Option 3: Railway (Free PostgreSQL)

### Steps:

1. **Sign up at [railway.app](https://railway.app)**
   - Sign in with GitHub

2. **Create PostgreSQL database**:
   - Click "New Project"
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway creates it automatically

3. **Get connection string**:
   - Click on the PostgreSQL service
   - Go to "Variables" tab
   - Copy the `DATABASE_URL` value

4. **Update `.env`** and run migrations** (same as above)

---

## After Setup

1. **Update your `.env` file** with the PostgreSQL connection string

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Create and run migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```
   This will:
   - Create migration files
   - Apply them to your PostgreSQL database
   - Seed your database structure

4. **Verify it works**:
   ```bash
   npm run dev
   ```
   - Try signing up a new user
   - Check that data is saved

5. **View your database** (optional):
   - **Supabase**: Go to Table Editor in dashboard
   - **Neon**: Use their SQL Editor
   - **Railway**: Use their database viewer
   - Or use Prisma Studio: `npx prisma studio`

---

## Important Notes

- **Keep your password safe!** Don't commit it to GitHub
- **Connection strings are sensitive** - never commit `.env` files
- **Free tiers have limits** but are usually enough for development/small apps
- **Supabase** also provides storage, auth, and other features you might use later

---

## Troubleshooting

**Error: "relation does not exist"**
- Run migrations: `npx prisma migrate dev`

**Error: "connection refused"**
- Check your connection string
- Make sure database is running (for cloud services, it should always be)
- Check firewall/network settings

**Error: "password authentication failed"**
- Double-check your password in the connection string
- Make sure you replaced `[YOUR-PASSWORD]` with actual password
