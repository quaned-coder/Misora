# Getting Your Supabase Database Connection String

## Steps to Get Connection String:

1. **Go to your Supabase project**: https://supabase.com/dashboard/project/gcalxocbkiweibnjvuvz

2. **Navigate to Settings**:
   - Click on the gear icon (⚙️) in the left sidebar
   - Or go to: Project Settings

3. **Go to Database section**:
   - Click on "Database" in the settings menu

4. **Find Connection String**:
   - Scroll down to "Connection string" section
   - Look for "URI" (not "Session mode" or "Transaction mode")
   - It should look like: `postgresql://postgres:[YOUR-PASSWORD]@db.gcalxocbkiweibnjvuvz.supabase.co:5432/postgres`

5. **Get your database password**:
   - If you forgot it, you can reset it in the same Database settings page
   - Look for "Database password" section
   - You can reset it if needed

6. **Replace `[YOUR-PASSWORD]`** in the connection string with your actual password

## Alternative: Direct Connection String Format

If you have your password, the connection string should be:
```
postgresql://postgres:YOUR_PASSWORD@db.gcalxocbkiweibnjvuvz.supabase.co:5432/postgres
```

Replace `YOUR_PASSWORD` with the password you set when creating the Supabase project.

## Quick Access Link

Your project dashboard: https://supabase.com/dashboard/project/gcalxocbkiweibnjvuvz
