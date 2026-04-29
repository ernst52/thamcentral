# FEATURE_ROADMAP.md
CaveCentral, inspired by AllTrails

────────────────────────────────

## 🧱 V1 — MVP (Note: schema is based on old version, might have to be changed)

### Core Data
- Import KMZ → convert → store in database
- Cave schema:
  - name
  - region
  - coordinates
  - length
  - depth
  - description
  - SRT flag / difficulty (manual)

### Map & Discovery
- Interactive map with cave markers
- Click marker → cave detail page
- Search by cave name
- Basic filters:
  - region
  - length
  - depth
  - difficulty / SRT

### Cave Detail Page
- Technical information
- Description
- Last updated
- (optional) 1–3 photos
- nearby caves

### Admin Panel
- Edit cave data
- Add / update caves
- Main dataset admin (me and trusted cavers)

### Trip Tool (Safety Document Generator)
- Select cave
- Trip name
- Date
- Meeting point
- Leader + contact
- Callout time
- Plan text
- Generate printable PDF

### Beginner Guide
- “Recommended for beginners” list
- Based on manual difficulty field

### Home page
- Select region
- Top 10 longest caves
- Top 10 deepest caves
- Recommendations
────────────────────────────────

## 🌱 V2 — COMMUNITY MODE

### Accounts & Roles
- User registration & login
- Roles:
  - admin
  - trusted contributor
  - normal user

### Cave Page Contributions
- Submit data correction
- Photo uploads
- Edit request with approval flow
- Change history

### Trip System (Digital)
- Create trip
- Invite users
- Accept / decline invite
- Participant list

### Trip Status Lifecycle
- OPEN INVITE 🟢
- ONGOING 🟡 (with callout time)
- COMPLETED ⚪

### Bulletin Board
Display:

[Trip Name] — OPEN INVITE  
[Trip Name] — ONGOING — CALLOUT 18:00  
[Trip Name] — COMPLETED  

### Per-Trip Page
- Plan details
- Team members
- Leader
- Callout time

────────────────────────────────

## 🌍 V3 — TRUST / REPUTATION SYSTEM

### User Expedition Profile
- Caves completed (verified by trip leader)
- Trip history
- Skills:
  - SRT
  - horizontal
  - rigging
  - bolting
  - survey
- Region / activity focus

### Trust Model
- Leader endorsement
- Verified participation records
- Experience level (calculated)

### Trip Safety Matching
- Leader can view member skill compatibility

────────────────────────────────

## 🧬 V4 — BIODIVERSITY & RESEARCH DATA

### Fauna Integration
- Fauna list per cave
- Species ↔ cave relationship

### Book Digitization Pipeline
- Scan → PDF → text extraction (Python)
- Transform → JSON / PostgreSQL
- Data validation workflow

### Research Features
- Biodiversity search
- Region biodiversity view

────────────────────────────────

## 🗺️ V5 — CAVE CENTRAL PLATFORM

### Community Infrastructure
- Forum / knowledge archive
- Expedition reports
- National activity feed

### Conservation & Access Control
- Sensitive cave protection
- Restricted coordinates system

### Field Use
- Mobile-first UI
- Offline trip access

### External Integration
- Public API
- Research data access