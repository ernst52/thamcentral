# ThamCentral

A cave discovery and trip planning platform for the Thai caving community because planning trips in LINE and digging through KMZ files is a terrible way to go underground.

## Contents

* `backend/` — Express.js REST API with PostgreSQL

* `backend/scripts/` — KML importer, seeder, and schema

* `backend/src/` — Routes, controllers, services, models, and middleware

* `1docs/` — Feature roadmap, pain points doc, and raw KML cave data

* `frontend/` — HTML, CSS, JS pages (in progress)

* `README.md` — The thing you're reading right now.

## Tech Stack

* **Backend** — Node.js, Express.js
* **Database** — PostgreSQL (`pg`)
* **Auth** — JWT + bcrypt
* **Data pipeline** — KML/XML → fast-xml-parser → PostgreSQL
* **Validation** — Joi
* **Security** — Helmet, CORS, cookie-parser

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cave` | Get caves with optional filters |
| GET | `/api/cave/:code` | Get a single cave by code |

### Query Parameters for `GET /api/cave`

| Param | Type | Description |
|-------|------|-------------|
| `name` | string | Filter by name (partial, case-insensitive) |
| `code` | string | Filter by cave code |
| `province` | string | Filter by province |
| `length_min` | number | Minimum length (m) |
| `length_max` | number | Maximum length (m) |
| `depth_min` | number | Minimum depth (m) |
| `depth_max` | number | Maximum depth (m) |
| `sort` | string | Sort field: `cave_length`, `cave_depth`, `cave_id` |
| `order` | string | `asc` or `desc` |
| `pageSize` | number | Results per page (default: 20) |
| `currentPage` | number | Page number (default: 1) |

## Roadmap

| Version | Focus |
|---------|-------|
| **V1** | Cave database, map, search & filters, trip PDF generator, admin panel |
| **V2** | Accounts, community contributions, digital trip system with status lifecycle |
