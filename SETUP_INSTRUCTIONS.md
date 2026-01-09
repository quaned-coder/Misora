# Setup Instructions - Create Tables in SQL Editor

Since the connection is having issues, let's create the tables directly in Supabase SQL Editor:

## Steps:

1. **Go to Supabase SQL Editor**:
   - https://supabase.com/dashboard/project/gcalxocbkiweibnjvuvz/sql/new

2. **Copy the SQL from `prisma/create_tables.sql`**:
   - Open the file: `prisma/create_tables.sql`
   - Copy all the SQL code

3. **Paste into SQL Editor** and click "Run"

4. **Verify tables were created**:
   - Run this query to see your tables:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('User', 'SkinProfile', 'Product', 'StackItem');
   ```

5. **After tables are created**, we'll update Prisma to use the direct connection for queries (not migrations)

## Alternative: Try Direct Connection Again

After creating tables, we can try the direct connection string again - it might work for queries even if migrations don't work.
