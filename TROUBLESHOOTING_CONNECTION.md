# Troubleshooting Supabase Connection

## Check These in Supabase Dashboard:

1. **Database Status**:
   - Go to: https://supabase.com/dashboard/project/gcalxocbkiweibnjvuvz
   - Check if database shows "Active" (green status)
   - If it says "Paused" or "Provisioning", wait a few minutes

2. **Connection Pooling**:
   - Go to Settings → Database
   - Check if "Connection Pooling" is enabled
   - If yes, you might need to use the pooled connection string

3. **Network Restrictions**:
   - Go to Settings → Database
   - Check "Connection string" section
   - Look for any IP restrictions or firewall settings

4. **Try Direct Connection**:
   - In Supabase Dashboard → SQL Editor
   - Try running a simple query: `SELECT 1;`
   - If this works, the database is accessible

## Alternative: Use Supabase Connection Pooling

If direct connection doesn't work, try the pooled connection string format:

```
postgresql://postgres.gcalxocbkiweibnjvuvz:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

You'll need to:
1. Find your region in Supabase settings
2. Use the pooled connection string format

## Quick Test

Try connecting via Supabase's built-in SQL Editor first to confirm the database is working.
