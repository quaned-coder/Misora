# MISORA - Skincare Product Tracker

A web app for discovering skincare products, building personal routine stacks, and tracking what works for your skin.

## Features

- 🔍 Browse and search skincare products
- 📚 Build and manage your personal product stack
- ⭐ Rate products (Works, Meh, Bad)
- 👤 Create and manage your skin profile
- 🔐 Email/password authentication
- 👨‍💼 Admin panel for adding products

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **NextAuth** - Authentication
- **Tailwind CSS** - Styling
- **SQLite** - Database (easy to switch to PostgreSQL)

## Getting Started

### Prerequisites

You'll need Node.js installed (v18 or higher).

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your `NEXTAUTH_SECRET` (you can generate one with `openssl rand -base64 32`).

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. (Optional) Create an admin user:
   - You can manually set a user as admin in the database using Prisma Studio:
   ```bash
   npm run db:studio
   ```
   - Or use the database directly to set `isAdmin: true` for a user

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:studio` - Open Prisma Studio to view/edit database
- `npm run db:push` - Push schema changes to database

## Project Structure

```
/app
  /api          - API routes
  /auth         - Authentication pages
  /browse       - Product directory
  /stack        - User's product stack
  /profile      - Skin profile management
  /admin        - Admin panel
/components    - React components
/lib           - Utilities and Prisma client
/prisma        - Database schema
```
