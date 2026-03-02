# QuickHire Job Board Server

## Setup
1. Install dependencies: `npm install`
2. Copy env: `cp .env.example .env`
3. Run in development: `npm run dev`
4. Run in production: `npm start`

## Scripts
- `npm run dev` - run with nodemon
- `npm start` - run with node

## API Endpoints
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs` (admin token)
- `DELETE /api/jobs/:id` (admin token)
- `POST /api/applications`
