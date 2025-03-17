# NextArt - Modern Web Template for Various Purposes

This is a modern web template that can be used for various purposes and applications, built with Next.js 15.2.1 and React 19.

## Tech Stack

- Next.js 15.2.1
- React 19
- TypeScript
- DrizzleORM
- better-sqlite3
- TailwindCSS
- DaisyUI
- Firebase
- JWT Authentication (jose)
- bcrypt for password hashing
- UUID

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

This project uses Turso as the database. Set up the following environment variables:

```env
NODE_ENV=development


TURSO_DATABASE_URL=libsql://nextart-bigzero55.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDE2Nzk1MTEsImlkIjoiZWU1MTYxZjItZTU3ZC00ZTNmLThjN2QtN2EzYTg0ZTI3YmI1In0.-v1fqi5RMxhDzAtJTj9a_IYiSEzJgS162Ns-n8vECMpwhsnoW-r9Zynk2xGJxiViH8SnPAbYF7QtgYYzLtNQAQ
```
## Database Migrations

To manage database migrations:

```bash
# Generate migrations
npm run migrate:generate

# Push migrations to database
npm run migrate:push

# Apply migrations
npm run migrate:up
```

## Project Structure

You can start editing the pages by modifying files in the `app` directory. The pages auto-update as you edit the files.

## Development Features

- Modern development with Turbopack
- Type safety with TypeScript
- Database ORM with DrizzleORM
- Secure authentication system with Firebase
- Responsive UI with TailwindCSS and DaisyUI
- Data validation with Zod

## Learn More

To learn more about the technologies used in this template:

- [Next.js Documentation](https://nextjs.org/docs)
- [DrizzleORM Documentation](https://orm.drizzle.team/docs/overview)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## Deployment

You can deploy this application on any platform that supports Next.js applications.

For optimal performance, we recommend using Vercel:
[Deploy with Vercel](https://vercel.com/new)
