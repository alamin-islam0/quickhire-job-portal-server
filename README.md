# QuickHire Job Portal Server

Backend API for the QuickHire job portal.

## What this API includes
- Jobs API (list, details, create, delete)
- Applications API (submit + admin list)
- Admin token protection for write/admin routes
- MongoDB persistence via Mongoose

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- Zod validation

## Local Setup
1. Go to project:
   - `cd quickhire-job-board-server`
2. Install dependencies:
   - `npm install`
3. Create env file:
   - `cp .env.example .env`
4. Set env values in `.env`:
   - `PORT=5000`
   - `MONGODB_URI=mongodb+srv://USER-NAME:PASSWORD@mypanel.2nu9rfb.mongodb.net/quickshare_data?appName=MyPanel`
   - `ADMIN_TOKEN=quickhire_admin_2026_secure`
5. Run server:
   - `npm run dev`

Server runs on: `http://localhost:5000`

## Admin Token (Required)
Use this exact value for admin protected endpoints:

`ADMIN_TOKEN=quickhire_admin_2026_secure`

Send it as header:

`x-admin-token: quickhire_admin_2026_secure`

## API Endpoints
- `GET /health`
- `GET /api`
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs` (admin)
- `DELETE /api/jobs/:id` (admin)
- `POST /api/applications`
- `GET /api/applications` (admin)

## Seed Demo Data
- `npm run seed`
