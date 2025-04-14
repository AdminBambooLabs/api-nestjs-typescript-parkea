# Tickets API

A NestJS application connected to PostgreSQL via Prisma using Supabase. This application provides a CRUD API for managing parking tickets.

## Features

- Complete CRUD operations for tickets
- PostgreSQL database with Prisma ORM
- Supabase integration
- Swagger API documentation

## Database Schema

The `Ticket` entity has the following fields:

- `id`: UUID (primary key)
- `plate`: string
- `vehicleType`: enum (car | motorcycle | transport)
- `status`: enum (open | canceled | closed | finished)
- `paymentType`: enum (pix | cash | card)
- `priceTable`: enum (hourly | diarist | monthly)
- `checkin`: Date
- `checkout`: Date (optional)
- `discount`: number (optional)
- `total`: number (optional)
- `createdAt`: Date
- `updatedAt`: Date

## Getting Started

### Prerequisites

- Node.js
- Supabase account

### Setup

1. Connect to Supabase by clicking the "Connect to Supabase" button in the top right.

2. Update the `.env` file with your Supabase database URL:

```
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres"
```

3. Install dependencies:

```bash
npm install
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Run the application:

```bash
npm run start:dev
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:

```
http://localhost:3000/api
```

## Endpoints

- `GET /tickets` - Get all tickets (with optional filters)
- `GET /tickets/:id` - Get a specific ticket
- `POST /tickets` - Create a new ticket
- `PATCH /tickets/:id` - Update a ticket
- `DELETE /tickets/:id` - Delete a ticket
