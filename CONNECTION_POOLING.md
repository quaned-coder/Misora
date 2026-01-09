# Supabase Connection Pooling

Since the direct connection isn't working from your local machine, we need to use **Connection Pooling**.

## Steps to Get Pooled Connection String:

1. **Go to Supabase Dashboard**:
   - https://supabase.com/dashboard/project/gcalxocbkiweibnjvuvz

2. **Navigate to Settings → Database**

3. **Look for "Connection Pooling" section**:
   - You should see different connection modes
   - Look for "Transaction" or "Session" mode connection strings
   - These use port **6543** instead of 5432

4. **Copy the pooled connection string**:
   - It should look like: `postgresql://postgres.gcalxocbkiweibnjvuvz:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`
   - Replace `[PASSWORD]` with your password: `Pas-fh0ca1l!`
   - The region might be something like `us-west-1`, `us-east-1`, etc.

## Alternative: Find Your Region

If you can't find the pooled connection string:

1. Check your project settings for the region
2. Or look at your project URL - it might indicate the region
3. Common formats:
   - `aws-0-us-west-1.pooler.supabase.com:6543`
   - `aws-0-us-east-1.pooler.supabase.com:6543`
   - `aws-0-eu-west-1.pooler.supabase.com:6543`

## Try This Format:

```
postgresql://postgres.gcalxocbkiweibnjvuvz:Pas-fh0ca1l!@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

(Replace `us-west-1` with your actual region)

## What to Share:

Please share:
1. The pooled connection string from Supabase (if you can find it)
2. Or your project's region (if visible in settings)
