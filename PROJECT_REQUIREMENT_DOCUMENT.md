# PROJECT REQUIREMENT DOCUMENT (PRD)
## Tourism Planner Application

**Document Version:** 1.0  
**Last Updated:** June 2026  
**Project Owner:** Rupeshkumar-2004  
**Repository:** https://github.com/Rupeshkumar-2004/Tourism-PLanner  
**Status:** In Development

---

## TABLE OF CONTENTS
1. [Executive Summary](#executive-summary)
2. [Product Overview](#product-overview)
3. [Objectives & Goals](#objectives--goals)
4. [Functional Requirements](#functional-requirements)
5. [Non-Functional Requirements](#non-functional-requirements)
6. [Data Models](#data-models)
7. [System Architecture](#system-architecture)
8. [API Specifications](#api-specifications)
9. [User Roles & Permissions](#user-roles--permissions)
10. [Technical Specifications](#technical-specifications)
11. [Third-Party Integrations](#third-party-integrations)
12. [Security & Compliance](#security--compliance)
13. [Performance Requirements](#performance-requirements)
14. [Scalability](#scalability)
15. [Deployment & DevOps](#deployment--devops)
16. [Testing Strategy](#testing-strategy)
17. [Success Metrics](#success-metrics)
18. [Roadmap & Milestones](#roadmap--milestones)
19. [Risk Assessment](#risk-assessment)
20. [Appendices](#appendices)

---

## 1. EXECUTIVE SUMMARY

### Overview
Tourism Planner is a full-stack web application that empowers users to plan, organize, and manage their trips efficiently. The application provides destination discovery, trip management, budgeting tools, and real-time weather information to help users make informed travel decisions.

### Target Users
- Individual travelers planning personal trips
- Tour guides managing group itineraries
- Travel agencies coordinating multiple trips
- Budget-conscious travelers
- Adventure enthusiasts

### Key Features (MVP)
- ✅ User authentication (register, login, JWT-based)
- ✅ Destination discovery and browsing
- ✅ Trip planning and management
- ✅ Place categorization within destinations
- ✅ Weather information integration
- ✅ Budget tracking
- ✅ Trip date management
- ✅ Role-based access control (user, guide, admin)

### Project Type
- **Full-Stack Web Application**
- **Real-Time Capable** (WebSockets ready)
- **Mobile Responsive**
- **Cloud-Ready**

---

## 2. PRODUCT OVERVIEW

### Vision
To become the go-to platform for seamless trip planning, offering users an intuitive interface to discover destinations, manage trips, and share experiences with other travelers.

### Mission
Simplify trip planning by providing a centralized platform that integrates destination information, weather data, budgeting tools, and collaborative features.

### Product Philosophy
- **User-Centric:** Simple, intuitive interface
- **Data-Driven:** Real-time information integration
- **Scalable:** Handle thousands of concurrent users
- **Secure:** Enterprise-grade security
- **Open:** API-first architecture for integrations

---

## 3. OBJECTIVES & GOALS

### Primary Objectives

| Objective | Description | Priority |
|-----------|-------------|----------|
| **Trip Management** | Users can create, edit, delete, and organize trips | P0 |
| **Destination Discovery** | Browse and search destinations with filters | P0 |
| **Authentication** | Secure login/signup with JWT tokens | P0 |
| **Weather Integration** | Real-time weather for destinations | P1 |
| **Budget Tracking** | Monitor trip expenses | P1 |
| **User Profiles** | Manage user information and preferences | P1 |
| **Mobile Responsiveness** | Work seamlessly on mobile devices | P1 |
| **Performance** | Sub-2s page load time | P2 |

### Success Metrics
- ✅ 1000+ monthly active users (6 months)
- ✅ 99.5% uptime
- ✅ < 2 second avg. response time
- ✅ 4.5+ star rating on reviews
- ✅ 80%+ user retention rate

---

## 4. FUNCTIONAL REQUIREMENTS

### 4.1 Authentication & Authorization

#### FR-AUTH-1: User Registration
```
User Story: As a new user, I want to create an account to access the platform

Acceptance Criteria:
- User provides: fullName, email, password, optional phone
- Email must be unique and valid
- Password must be at least 6 characters
- Phone must be 10-digit format (if provided)
- Auto-login after successful registration
- Send confirmation email (Future: Phase 2)
- Return access & refresh tokens (httpOnly cookies)
```

#### FR-AUTH-2: User Login
```
User Story: As a user, I want to securely log in with credentials

Acceptance Criteria:
- User provides: email, password
- Validate credentials against hashed password
- Return JWT access token (15 min expiry) + refresh token (7 days)
- Store tokens in httpOnly, secure cookies
- Show error for invalid credentials
- Implement rate limiting (max 5 attempts per 15 min)
```

#### FR-AUTH-3: Token Refresh
```
User Story: As a logged-in user, I want seamless session persistence

Acceptance Criteria:
- Refresh token endpoint: POST /api/v1/auth/refresh-token
- Validate stored refresh token against DB
- Generate new access token
- Prevent token reuse attacks
- Refresh token rotation enabled
```

#### FR-AUTH-4: Logout
```
User Story: As a user, I want to logout and clear my session

Acceptance Criteria:
- Clear tokens from cookies
- Remove refresh token from DB
- Redirect to login page
- Prevent token reuse
```

#### FR-AUTH-5: Role-Based Access Control
```
Roles:
- USER: Standard trip planner
- GUIDE: Can manage group trips + share itineraries
- ADMIN: Full platform control, user management

Permissions:
- USER: Create own trips, view destinations
- GUIDE: All USER permissions + manage guides
- ADMIN: All permissions + user management
```

---

### 4.2 Destination Management

#### FR-DEST-1: Browse All Destinations
```
User Story: As a user, I want to discover travel destinations

Acceptance Criteria:
- Display all destinations with pagination (20 per page)
- Show: name, city, country, images, budget, category
- No authentication required
- Load in < 2 seconds
- Support infinite scroll (optional)
```

#### FR-DEST-2: Search & Filter Destinations
```
Filters:
- ?search=keyword → searches name, city, description, tags
- ?city=goa → filter by city
- ?country=india → filter by country
- ?category=adventure,heritage → multiple categories
- ?minBudget=1000&maxBudget=50000 → budget range
- ?tags=beach,mountains → tag-based filtering
- ?sortBy=estimatedBudget&sortType=asc → sorting

Response:
- Paginated results with total count
- Each destination shows: name, city, images, budget, tags
```

#### FR-DEST-3: View Destination Details
```
Endpoint: GET /api/v1/destinations/:id

Displays:
- Full name, description, images
- City, state, country
- Estimated budget
- Best time to visit
- Category and tags
- Associated places (attractions)
- Weather data

Optional: User reviews, ratings
```

#### FR-DEST-4: Get Destination Weather
```
Endpoint: GET /api/v1/destinations/:id/weather

Response:
- Current temperature
- Weather condition
- Humidity, wind speed
- 5-day forecast
- Data refreshed hourly

Integration: OpenWeatherMap API
```

#### FR-DEST-5: Create/Edit Destination (ADMIN/GUIDE)
```
User Story: As an admin/guide, I want to add new destinations

Required Fields:
- name (string, unique)
- city (required)
- state (required)
- country (default: India)
- category (adventure/heritage/nature/city/relaxation)
- estimatedBudget (number >= 0)
- images (array of URLs)
- bestTimeToVisit (string)
- description (string)
- tags (array of strings)

Validation:
- Images must be valid URLs
- Max 10 images per destination
- Remove duplicate tags automatically
```

---

### 4.3 Trip Management

#### FR-TRIP-1: Create Trip
```
User Story: As a user, I want to create a new trip

Required Fields:
- title (string, max 100 chars)
- startDate (required, ISO format)
- endDate (required, >= startDate)
- totalBudget (required, >= 0)

Optional Fields:
- description
- category (adventure/heritage/nature/city/relaxation)
- bannerImage (URL)
- destinations (array of destination IDs)

Validation:
- Dates must be valid
- End date must be >= start date
- Budget must be non-negative
- Title cannot be empty

Response:
- Created trip object with ID
- Associated with authenticated user (createdBy)
- Timestamps included
```

#### FR-TRIP-2: Get User Trips
```
Endpoint: GET /api/v1/trips

Query Parameters:
- ?page=1&limit=20
- ?sortBy=createdAt&sortType=desc
- ?search=keyword → searches trip title, description

Response:
- Paginated list of user's trips
- Includes: title, dates, budget, destination count
- Pagination metadata (page, total, hasMore)
```

#### FR-TRIP-3: Get Trip Details
```
Endpoint: GET /api/v1/trips/:tripId

Response:
- Full trip data including:
  - Title, description, dates
  - Total budget
  - Associated destinations (populated)
  - Associated places
  - Trip owner info
  - Created/updated timestamps
```

#### FR-TRIP-4: Update Trip
```
Endpoint: PATCH /api/v1/trips/:tripId

Updatable Fields:
- title, description, category
- startDate, endDate
- totalBudget
- bannerImage
- destinations (add/remove)

Validation:
- Only trip owner can update
- Dates must remain valid
- Budget must be >= 0
```

#### FR-TRIP-5: Delete Trip
```
Endpoint: DELETE /api/v1/trips/:tripId

Behavior:
- Only trip owner can delete
- Also delete associated trip-destination associations
- Soft delete optional (for data recovery)
- Return 204 No Content on success
```

#### FR-TRIP-6: Add Destinations to Trip
```
Endpoint: POST /api/v1/trips/:tripId/destinations

Request Body:
{
  "destinationIds": ["id1", "id2", "id3"]
}

Response:
- Updated trip with destinations array
- Avoid duplicate destinations
```

---

### 4.4 Places Management

#### FR-PLACE-1: View Places in Destination
```
Endpoint: GET /api/v1/destinations/:destinationId/places

Response:
- List of attractions/places in destination
- Each place shows: name, description, category, images, location (lat/lon)
- Paginated results
```

#### FR-PLACE-2: Create Place (ADMIN/GUIDE)
```
Required Fields:
- destination (destination ID)
- name (string, unique per destination)
- description (string, max 3000)
- category (string, e.g., "temple", "beach", "restaurant")

Optional Fields:
- images (array of URLs)
- address (string)
- latitude, longitude (for map integration)
- tags (array)

Validation:
- Destination must exist
- Name must be unique per destination
- Coordinates must be valid if provided
```

#### FR-PLACE-3: Update Place
```
Endpoint: PATCH /api/v1/places/:placeId

Allowed Updates:
- name, description, category
- images, address
- latitude, longitude
- tags

Validation:
- Only creator or admin can update
```

#### FR-PLACE-4: Delete Place
```
Endpoint: DELETE /api/v1/places/:placeId

Behavior:
- Only creator or admin can delete
- Remove from trip-destination-place associations
```

---

### 4.5 User Profile & Dashboard

#### FR-USER-1: Get Current User
```
Endpoint: GET /api/v1/auth/me

Response:
- User object with: _id, fullName, email, phone, role, profilePicture
- No password field returned
- Authentication required
```

#### FR-USER-2: Update User Profile
```
Endpoint: PATCH /api/v1/users/:userId

Updatable Fields:
- fullName (3-50 chars)
- phone (10-digit format)
- profilePicture (URL to image)

Validation:
- Only user can update own profile
- Email cannot be changed
```

#### FR-USER-3: Dashboard Metrics
```
Endpoint: GET /api/v1/dashboard

Response:
{
  "totalTrips": 12,
  "upcomingTrips": 3,
  "totalDestinations": 24,
  "totalSpent": 125000,
  "averageBudget": 10417,
  "travelStats": {
    "mostVisitedCategory": "adventure",
    "totalDays": 45,
    "averageDuration": 3.75
  },
  "recentTrips": [...],
  "favoriteDestinations": [...]
}
```

---

### 4.6 Trip-Destination Association

#### FR-TRIP-DEST-1: Associate Destinations with Trips
```
Purpose: Track which destinations are included in a trip

Model Structure:
{
  tripId: ObjectId,
  destinationId: ObjectId,
  visitDate: Date (estimated date in trip),
  duration: Number (days),
  plannedBudget: Number,
  notes: String,
  status: "planned" | "visited" | "skipped"
}

Usage:
- When creating trip, can specify destinations
- When editing trip, add/remove destinations
- Track multiple destinations per trip
```

---

## 5. NON-FUNCTIONAL REQUIREMENTS

### 5.1 Performance Requirements

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Page Load Time | < 2 seconds | 3-4s | ⚠️ NEEDS IMPROVEMENT |
| API Response Time | < 500ms (p95) | 600ms | ⚠️ NEEDS IMPROVEMENT |
| Database Query Time | < 100ms (p95) | 150ms | ⚠️ NEEDS IMPROVEMENT |
| First Contentful Paint | < 1.5s | 2.5s | ⚠️ NEEDS IMPROVEMENT |
| Largest Contentful Paint | < 2.5s | 3.5s | ⚠️ NEEDS IMPROVEMENT |

### 5.2 Scalability Requirements

```
Current Capacity:
- Single node backend: ~1000 concurrent users
- MongoDB single instance: ~10GB data

Target Capacity (Year 1):
- 100,000 monthly active users
- Multi-node backend with load balancer
- MongoDB replica set
- Redis caching layer
- CDN for static assets

Year 2:
- 1M monthly active users
- Microservices architecture
- Elasticsearch for search
- Kafka for event streaming
```

### 5.3 Availability & Reliability

```
Uptime Target: 99.5% (acceptable downtime: ~3.6 hours/month)

SLAs:
- API: 99.5% uptime
- Database: 99.9% uptime
- Frontend: 99% uptime

Recovery Objectives:
- RTO (Recovery Time Objective): 1 hour
- RPO (Recovery Point Objective): 15 minutes
```

### 5.4 Security Requirements

```
Data Protection:
- All data encrypted in transit (HTTPS/TLS 1.3)
- PII encrypted at rest (AES-256)
- Password hashing: bcrypt with 10+ salt rounds

Access Control:
- JWT-based authentication
- Role-based authorization
- Rate limiting on sensitive endpoints
- CORS properly configured

Compliance:
- GDPR compliant (for EU users)
- CCPA compliant (for US users)
- SOC 2 Type 1 certification (Phase 2)
```

### 5.5 Maintainability Requirements

```
Code Quality:
- ESLint rules enforced
- Prettier auto-formatting
- Minimum 70% code coverage (tests)
- TypeScript for type safety (Phase 2)

Documentation:
- API documentation (Swagger/OpenAPI)
- Architecture documentation
- README files in each module
- Code comments for complex logic
```

---

## 6. DATA MODELS

### 6.1 User Model

```javascript
{
  _id: ObjectId (auto-generated),
  fullName: String (required, 3-50 chars),
  email: String (required, unique, validated),
  password: String (required, hashed, min 6),
  phone: String (optional, 10-digit),
  ProfilePicture: String (optional, URL),
  role: String (enum: ["admin", "user", "guide"], default: "user"),
  refreshToken: String (optional, for logout),
  
  // Metadata
  createdAt: Date (auto),
  updatedAt: Date (auto),
  
  // Indexes
  email: unique
}
```

### 6.2 Destination Model

```javascript
{
  _id: ObjectId,
  name: String (required, max 100, unique),
  city: String (required, lowercase, indexed),
  state: String (required, lowercase, indexed),
  country: String (default: "India", indexed),
  description: String (max 1000),
  images: [String] (URLs, validated),
  bestTimeToVisit: String (max 120),
  estimatedBudget: Number (default: 0, >= 0),
  category: String (e.g., "adventure", "heritage", indexed),
  tags: [String] (lowercase, deduplicated),
  
  createdAt: Date,
  updatedAt: Date,
  
  // Indexes
  { city: 1 }
  { country: 1 }
  { category: 1 }
  { estimatedBudget: 1 }
  { name: "text", city: "text", description: "text" }
  { name: 1, city: 1, state: 1, country: 1 } (unique)
}
```

### 6.3 Trip Model

```javascript
{
  _id: ObjectId,
  title: String (required, max 100),
  description: String,
  category: String (enum: [...], default: "other"),
  bannerImage: String (optional, URL),
  
  startDate: Date (required),
  endDate: Date (required, >= startDate),
  
  destinations: [ObjectId] (references to Destination, populated),
  totalBudget: Number (required, >= 0),
  
  createdBy: ObjectId (User reference, indexed),
  
  createdAt: Date,
  updatedAt: Date,
  
  // Indexes
  { createdBy: 1, createdAt: -1 }
  { createdBy: 1, totalBudget: 1 }
  { createdBy: 1, startDate: 1 }
}
```

### 6.4 Place Model

```javascript
{
  _id: ObjectId,
  destination: ObjectId (required, reference to Destination, indexed),
  name: String (required, max 100),
  description: String (max 3000),
  category: String (e.g., "temple", "restaurant", indexed),
  tags: [String] (lowercase),
  
  lat: Number (latitude for map),
  lon: Number (longitude for map),
  
  images: [String] (URLs, validated),
  address: String (max 250),
  
  createdAt: Date,
  updatedAt: Date,
  
  // Indexes
  { destination: 1, name: 1 } (unique)
  { destination: 1 }
  { category: 1 }
}
```

### 6.5 TripDestination Model (Association)

```javascript
{
  _id: ObjectId,
  tripId: ObjectId (reference to Trip, required, indexed),
  destinationId: ObjectId (reference to Destination, required),
  
  visitDate: Date (estimated visit date),
  duration: Number (days spent),
  plannedBudget: Number (allocated budget),
  notes: String (user notes),
  
  status: String (enum: ["planned", "visited", "skipped"], default: "planned"),
  order: Number (sequence in trip itinerary),
  
  createdAt: Date,
  updatedAt: Date,
  
  // Indexes
  { tripId: 1, order: 1 }
  { tripId: 1, destinationId: 1 } (unique)
}
```

---

## 7. SYSTEM ARCHITECTURE

### 7.1 High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│         CLIENT LAYER (Frontend)                 │
│  ┌──────────────────────────────────────────┐   │
│  │ React 19 + Vite + TailwindCSS            │   │
│  │ Pages: Auth, Trips, Destinations, etc.   │   │
│  │ State: Context API + React Query         │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                   HTTP/HTTPS
                   JWT in Cookies
┌─────────────────────────────────────────────────┐
│        API GATEWAY / LOAD BALANCER              │
│  (Nginx/HAProxy - Future)                       │
└─────────────────────────────────────────────────┘
                   HTTP
┌─────────────────────────────────────────────────┐
│        APPLICATION LAYER (Backend)              │
│  ┌──────────────────────────────────────────┐   │
│  │ Express.js + Node.js                     │   │
│  │ Routes → Controllers → Services → Models │   │
│  │ Middleware: Auth, Error, CORS, Logging   │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                   Driver Protocol
┌─────────────────────────────────────────────────┐
│         DATA LAYER (Persistence)                │
│  ┌──────────────────────────────────────────┐   │
│  │ MongoDB (Main Database)                  │   │
│  │ Redis (Cache Layer) - Future             │   │
│  │ Elasticsearch (Search) - Future          │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                External APIs
        ┌──────────────────────────────┐
        │  OpenWeatherMap API          │
        │  Geolocation Services        │
        │  Image CDN (Cloudinary)      │
        └──────────────────────────────┘
```

### 7.2 Component Diagram

```
FRONTEND
├── Pages/
│   ├── LoginPage
│   ├── RegisterPage
│   ├── DashboardPage
│   ├── TripsPage
│   ├── TripDetailPage
│   ├── DestinationsPage
│   └── DestinationDetailPage
├── Components/ (Reusable UI)
├── Context/ (Global State)
└── Services/ (API Communication)

BACKEND
├── Routes/ (Endpoint definitions)
├── Controllers/ (Request handlers)
├── Services/ (Business logic)
├── Models/ (Data schemas)
├── Middlewares/ (Auth, Error, Logging)
├── Utils/ (Helpers: ApiError, asyncHandler)
└── Database/ (MongoDB connection)
```

### 7.3 API Layer Architecture

```
Request Flow:
1. Client sends HTTP request
2. Middleware chain:
   - CORS check
   - Body parsing
   - Cookie parsing
3. Route matching
4. Authentication middleware (if required)
5. Controller execution
6. Database operations
7. Response formatting
8. Error handling (if any)
9. Response sent back

Error Flow:
Error thrown → asyncHandler catches → next(err) → Error middleware → JSON response
```

---

## 8. API SPECIFICATIONS

### 8.1 Authentication Endpoints

```
POST /api/v1/auth/register
├── Request: { fullName, email, password, phone (optional), role (optional) }
├── Response: { user, accessToken, refreshToken }
└── Status: 201 Created

POST /api/v1/auth/login
├── Request: { email, password }
├── Response: { user, accessToken, refreshToken }
└── Status: 200 OK

POST /api/v1/auth/refresh-token
├── Request: (uses cookie)
├── Response: { accessToken, refreshToken }
└── Status: 200 OK

GET /api/v1/auth/me
├── Auth Required: Yes
├── Response: { user }
└── Status: 200 OK
```

### 8.2 Destination Endpoints

```
GET /api/v1/destinations
├── Query: ?page=1&limit=20&search=&city=&country=&minBudget=&maxBudget=&sortBy=&sortType=
├── Response: { destinations: [...], pagination: {...} }
└── Status: 200 OK

GET /api/v1/destinations/:id
├── Response: { destination: {...} }
└── Status: 200 OK

GET /api/v1/destinations/:id/weather
├── Response: { current: {...}, forecast: [...] }
└── Status: 200 OK

POST /api/v1/destinations
├── Auth Required: Yes (ADMIN/GUIDE)
├── Request: { name, city, state, country, description, ... }
├── Response: { destination }
└── Status: 201 Created

PATCH /api/v1/destinations/:id
├── Auth Required: Yes (ADMIN/GUIDE)
├── Request: { fields to update }
├── Response: { destination }
└── Status: 200 OK

DELETE /api/v1/destinations/:id
├── Auth Required: Yes (ADMIN/GUIDE)
├── Response: {}
└── Status: 204 No Content
```

### 8.3 Trip Endpoints

```
POST /api/v1/trips
├── Auth Required: Yes
├── Request: { title, startDate, endDate, totalBudget, ... }
├── Response: { trip }
└── Status: 201 Created

GET /api/v1/trips
├── Auth Required: Yes
├── Query: ?page=1&limit=20&sortBy=&sortType=
├── Response: { trips: [...], pagination: {...} }
└── Status: 200 OK

GET /api/v1/trips/:tripId
├── Auth Required: Yes
├── Response: { trip (with populated destinations) }
└── Status: 200 OK

PATCH /api/v1/trips/:tripId
├── Auth Required: Yes (trip owner)
├── Request: { fields to update }
├── Response: { trip }
└── Status: 200 OK

DELETE /api/v1/trips/:tripId
├── Auth Required: Yes (trip owner)
├── Response: {}
└── Status: 204 No Content
```

### 8.4 Places Endpoints

```
GET /api/v1/destinations/:destinationId/places
├── Query: ?page=1&limit=20
├── Response: { places: [...], pagination: {...} }
└── Status: 200 OK

POST /api/v1/places
├── Auth Required: Yes (ADMIN/GUIDE)
├── Request: { destination, name, description, category, ... }
├── Response: { place }
└── Status: 201 Created

PATCH /api/v1/places/:placeId
├── Auth Required: Yes (creator/ADMIN)
├── Request: { fields to update }
├── Response: { place }
└── Status: 200 OK

DELETE /api/v1/places/:placeId
├── Auth Required: Yes (creator/ADMIN)
├── Response: {}
└── Status: 204 No Content
```

### 8.5 Dashboard Endpoint

```
GET /api/v1/dashboard
├── Auth Required: Yes
├── Response: {
│     totalTrips: Number,
│     upcomingTrips: Number,
│     totalDestinations: Number,
│     totalSpent: Number,
│     averageBudget: Number,
│     travelStats: {...},
│     recentTrips: [...],
│     favoriteDestinations: [...]
│   }
└── Status: 200 OK
```

---

## 9. USER ROLES & PERMISSIONS

### 9.1 Role Definitions

| Role | Description | Capabilities |
|------|-------------|--------------|
| **USER** | Standard traveler | Create/manage own trips, browse destinations, view places |
| **GUIDE** | Tour guide/organizer | All USER permissions + manage group trips + share itineraries |
| **ADMIN** | Platform administrator | All permissions + user management + destination/place management |

### 9.2 Permission Matrix

| Feature | USER | GUIDE | ADMIN |
|---------|------|-------|-------|
| Create Trip | ✅ Own only | ✅ Own + group | ✅ All |
| View Trips | ✅ Own only | ✅ Own + managed | ✅ All |
| Edit Trip | ✅ Own only | ✅ Own + managed | ✅ All |
| Delete Trip | ✅ Own only | ✅ Own + managed | ✅ All |
| Browse Destinations | ✅ | ✅ | ✅ |
| Create Destination | ❌ | ✅ | ✅ |
| Edit Destination | ❌ | ✅ (own) | ✅ |
| Delete Destination | ❌ | ❌ | ✅ |
| Create Places | ❌ | ✅ | ✅ |
| Edit Places | ❌ | ✅ (own) | ✅ |
| Delete Places | ❌ | ❌ | ✅ |
| View Users | ❌ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |
| View Analytics | ❌ | ✅ (own) | ✅ |

---

## 10. TECHNICAL SPECIFICATIONS

### 10.1 Technology Stack

#### Backend
```
Runtime: Node.js v18+
Framework: Express.js v5.2.1
Database: MongoDB v5.0+
Language: JavaScript (ES6+)
Authentication: JWT (jsonwebtoken v9.0.3)
Password Hashing: bcrypt v6.0.0
Request Parsing: Express built-in + cookie-parser
Utilities: Mongoose v9.6.1 (ODM)
Development: nodemon v3.1.14
Code Style: Prettier v3.8.3
```

#### Frontend
```
Runtime: Node.js v18+ (build time)
UI Framework: React v19.2.6
Build Tool: Vite v8.0.12
Routing: React Router v7.16.0
HTTP Client: Axios v1.16.1
Styling: TailwindCSS v4.3.0
Icons: Lucide React v1.17.0
Maps: Leaflet v1.9.4 + react-leaflet v5.0.0
State: Context API + React Query v5.100.14
Linting: ESLint v10.3.0
Code Formatting: Prettier

Dev Dependencies:
- @vitejs/plugin-react v6.0.1
- Various type definitions (@types/react, etc.)
```

### 10.2 Development Environment

```
Version Control: Git + GitHub
Environment Management: .env files
Package Manager: npm v9+
Node Version Manager: nvm (optional)
Development Server: Vite dev server
Backend Dev Server: nodemon
API Testing: Postman/Insomnia
Database Admin: MongoDB Compass
```

### 10.3 Database Schema & Indexing

**Indexes for Performance:**

```
Users Collection:
- email (unique)
- createdAt (for user analytics)

Destinations Collection:
- city (for filtering)
- country (for filtering)
- category (for categorization)
- estimatedBudget (for budget filtering)
- createdAt (for sorting)
- { country: 1, category: 1 } (compound)
- { name: "text", city: "text", ... } (full-text search)

Trips Collection:
- { createdBy: 1, createdAt: -1 } (user's trips, newest first)
- { createdBy: 1, startDate: 1 } (user's trips by date)

Places Collection:
- destination (for filtering)
- { destination: 1, name: 1 } (unique per destination)
- category (for categorization)
```

---

## 11. THIRD-PARTY INTEGRATIONS

### 11.1 Weather API

**Service:** OpenWeatherMap API  
**Endpoint:** GET https://api.openweathermap.org/data/2.5/weather

```
Parameters:
- q: city name
- appid: API key
- units: metric/imperial

Response:
- Temperature (current, min, max)
- Humidity
- Pressure
- Wind speed
- Weather condition (clouds, rain, etc.)
- 5-day forecast

Usage:
- Called when user views destination details
- Cached for 1 hour
- Fallback: Show cached data if API fails
```

### 11.2 Geolocation API (Future)

**Service:** Google Maps API / Mapbox  
**Purpose:** Get coordinates from addresses, reverse geocoding

### 11.3 Image CDN (Future - Phase 2)

**Service:** Cloudinary / AWS S3 + CloudFront  
**Purpose:**
- Store user-uploaded images
- Optimize images (resize, compress)
- Serve from CDN for faster delivery

### 11.4 Email Service (Future - Phase 2)

**Service:** SendGrid / Mailgun  
**Purpose:**
- Send confirmation emails
- Trip reminders
- Notification emails

---

## 12. SECURITY & COMPLIANCE

### 12.1 Authentication Security

```
✅ IMPLEMENTED:
- JWT tokens with expiration
- Refresh token rotation
- httpOnly cookies (XSS protection)
- Secure flag (HTTPS only)
- SameSite=Strict (CSRF protection)
- Password hashing with bcrypt (10 salt rounds)
- Input validation on registration

⚠️ TODO - Phase 2:
- Two-factor authentication (2FA)
- OAuth2 integration (Google, GitHub)
- Email verification
- Password reset with secure tokens
```

### 12.2 Data Protection

```
In Transit:
- HTTPS/TLS 1.3 (enforced in production)
- Certificate pinning (mobile apps)

At Rest:
- Encrypt sensitive data (PII, payment info)
- Database encryption (MongoDB Enterprise)
- Encrypted backups

Access Control:
- Role-based authorization
- Resource ownership validation
- API rate limiting (5 login attempts per 15 min)
```

### 12.3 OWASP Top 10 Mitigation

| Vulnerability | Mitigation |
|---|---|
| A1: Injection | Mongoose ORM (parameterized queries), input validation |
| A2: Broken Auth | JWT + refresh tokens, secure cookies, rate limiting |
| A3: Sensitive Data Exposure | HTTPS, encrypted cookies, no PII in logs |
| A4: XXE | N/A (JSON only, no XML) |
| A5: Access Control | Role-based permissions, ownership checks |
| A6: Misconfiguration | Security headers (Helmet), CORS whitelist |
| A7: XSS | httpOnly cookies, input sanitization, CSP headers |
| A8: Deserialization | Mongoose schema validation |
| A9: Log Monitoring | Winston logging, centralized log management (Phase 2) |
| A10: Vulnerable Dependencies | npm audit, dependabot, regular updates |

### 12.4 GDPR Compliance (MVP)

```
✅ IMPLEMENTED:
- User consent for data processing
- Data transparency (what data is collected)
- Right to access (user can view their data)

⚠️ TODO - Phase 2:
- Right to deletion (GDPR right to be forgotten)
- Data portability
- Automated processing transparency
- Privacy by design documentation
```

---

## 13. PERFORMANCE REQUIREMENTS

### 13.1 Frontend Performance Targets

| Metric | Target | Measurement Tool |
|--------|--------|------------------|
| Lighthouse Performance Score | 85+ | Google Chrome DevTools |
| First Contentful Paint | < 1.5s | Lighthouse, WebPageTest |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Time to Interactive | < 3s | Lighthouse |
| First Input Delay | < 100ms | Web Vitals |

### 13.2 Backend Performance Targets

| Endpoint | Target | Measurement |
|----------|--------|-------------|
| GET /destinations | < 500ms | Average response time |
| GET /trips | < 300ms | Average response time |
| GET /destinations/:id | < 200ms | Average response time |
| POST /trips | < 400ms | Average response time |
| PATCH /trips/:id | < 350ms | Average response time |
| GET /dashboard | < 800ms | Average response time (aggregates multiple queries) |

### 13.3 Optimization Strategies

**Frontend:**
- Code splitting with React.lazy() + Suspense
- Image lazy loading and optimization
- CSS-in-JS with Tailwind (smaller bundle)
- Minification and gzip compression
- Service Worker for offline support (Phase 2)

**Backend:**
- Database indexing (critical queries)
- Query optimization (projections, lean())
- Pagination (default 20 items)
- Caching with Redis (Phase 2)
- CDN for static assets (Phase 2)
- Horizontal scaling with load balancer (Phase 2)

---

## 14. SCALABILITY

### 14.1 Current Architecture Limits

```
Single Node Backend:
- ~1,000 concurrent connections
- ~10,000 requests/minute
- Max 10GB MongoDB storage (before performance degrades)

Limiting Factors:
- Single Express.js process
- Single MongoDB instance
- No caching layer
- No CDN for assets
```

### 14.2 Phase 1 Scaling (100K users)

```
Components:
- Load Balancer (Nginx/HAProxy)
- Multiple Node.js instances (3-5 replicas)
- MongoDB Replica Set (3 nodes)
- Redis cluster (caching)
- CDN (CloudFlare/AWS CloudFront)
- Separate storage for uploads (S3/Cloudinary)

Expected Performance:
- 100K monthly active users
- 50 concurrent users
- Sub-second response times
```

### 14.3 Phase 2 Scaling (1M users)

```
Components:
- Kubernetes orchestration
- Microservices (Auth, Trips, Destinations)
- MongoDB sharding by geography
- Elasticsearch (full-text search)
- Kafka (event streaming)
- Monitoring (Prometheus, Grafana)
- Log aggregation (ELK stack)

Architecture:
- API Gateway (Kong)
- Separate services with independent databases
- Event-driven communication
- Distributed tracing (Jaeger)
```

---

## 15. DEPLOYMENT & DEVOPS

### 15.1 Deployment Environments

```
Development:
- Local machine
- Vite dev server (frontend)
- nodemon (backend)
- Local MongoDB

Staging:
- Heroku / AWS EC2
- Docker containers
- Staging MongoDB
- SSL certificates
- Environment variables from .env

Production:
- AWS / Digital Ocean / GCP
- Docker Kubernetes (Phase 2)
- MongoDB Atlas (managed)
- CloudFlare CDN
- SSL certificates (auto-renewal)
- Backup automation
```

### 15.2 CI/CD Pipeline

```
Trigger: Push to main branch

Steps:
1. Code checkout
2. Install dependencies
3. Run tests (Jest)
4. Lint code (ESLint)
5. Build frontend (Vite)
6. Build Docker images
7. Push to registry
8. Deploy to staging
9. Run integration tests
10. Deploy to production (manual approval)
11. Smoke tests
12. Rollback on failure
```

### 15.3 Deployment Checklist

```
Before Deployment:
- [ ] All tests passing
- [ ] Code review approved
- [ ] Database migrations prepared
- [ ] Environment variables configured
- [ ] SSL certificates valid
- [ ] Backups created
- [ ] Monitoring alerts configured
- [ ] Rollback plan documented

After Deployment:
- [ ] Health check endpoint returns 200
- [ ] Monitor error rates (< 0.1%)
- [ ] Check API response times
- [ ] Verify database connections
- [ ] Test critical user flows
- [ ] Check log aggregation
```

---

## 16. TESTING STRATEGY

### 16.1 Unit Testing

**Framework:** Jest

```
Coverage Target: 70%+

Test Areas:
- Model validations
- Utility functions
- Input validators
- Error handling
- Authentication logic

Example:
describe('User Registration', () => {
  it('should hash password before saving', () => {
    // Test password hashing
  });
  
  it('should reject duplicate email', () => {
    // Test duplicate prevention
  });
});
```

### 16.2 Integration Testing

**Framework:** Jest + Supertest

```
Test Areas:
- API endpoints
- Database operations
- Middleware chain
- Error responses
- Authentication flow

Example:
it('should create trip and associate with user', async () => {
  const response = await request(app)
    .post('/api/v1/trips')
    .set('Authorization', `Bearer ${token}`)
    .send(tripData);
  
  expect(response.status).toBe(201);
  expect(response.body.data.createdBy).toBe(userId);
});
```

### 16.3 End-to-End Testing

**Framework:** Cypress (Phase 2)

```
Test Scenarios:
- User registration and login
- Trip creation flow
- Destination browsing and filtering
- Trip editing and deletion
- Weather display
```

### 16.4 Performance Testing

**Framework:** Apache JMeter / Locust

```
Load Test Scenarios:
- 1000 concurrent users
- 10,000 requests/minute
- Measure response times
- Identify bottlenecks
- Database connection pooling stress test
```

### 16.5 Security Testing

```
Areas:
- SQL injection attempts
- XSS payload testing
- CSRF token validation
- JWT token expiration
- Unauthorized access attempts
- Rate limiting enforcement

Tools:
- OWASP ZAP
- Burp Suite Community
- npm audit
```

---

## 17. SUCCESS METRICS

### 17.1 Product Metrics

| Metric | Target (6 months) | Target (1 year) |
|--------|-------------------|-----------------|
| Monthly Active Users | 1,000 | 10,000 |
| Daily Active Users | 200 | 2,000 |
| Trip Plans Created | 500 | 5,000 |
| Destinations Catalogued | 100 | 1,000 |
| User Retention (30-day) | 40% | 60% |

### 17.2 Technical Metrics

| Metric | Target |
|--------|--------|
| API Uptime | 99.5% |
| Avg Response Time | < 500ms |
| Error Rate | < 0.1% |
| Page Load Time | < 2s |
| Code Coverage | 70%+ |

### 17.3 Business Metrics

| Metric | Target |
|--------|--------|
| User Acquisition Cost | $5 |
| Lifetime Value | $100+ |
| Churn Rate | < 5% monthly |
| NPS Score | 40+ |
| Support Response Time | < 24hrs |

---

## 18. ROADMAP & MILESTONES

### Phase 1: MVP (Completed ✅)
**Timeline:** Month 1-2

- [x] User authentication (register, login)
- [x] Destination browsing and search
- [x] Trip CRUD operations
- [x] Place management
- [x] Weather integration
- [x] Basic dashboard

### Phase 2: Enhanced Features (In Progress 🔄)
**Timeline:** Month 3-4

- [ ] TypeScript migration
- [ ] Advanced testing (unit + integration)
- [ ] User profiles and preferences
- [ ] Social features (share trips)
- [ ] Email notifications
- [ ] Payment integration (Stripe)
- [ ] Image upload (Cloudinary)
- [ ] Trip budgeting breakdown

### Phase 3: Performance & Scale (Planned 📋)
**Timeline:** Month 5-6

- [ ] Redis caching layer
- [ ] Database optimization
- [ ] Frontend code splitting
- [ ] Image CDN integration
- [ ] Elasticsearch for search
- [ ] Load testing and optimization
- [ ] Monitoring setup (Sentry, New Relic)

### Phase 4: Enterprise Features (Future 🚀)
**Timeline:** Month 7-12

- [ ] Group trip collaboration
- [ ] Real-time collaboration (WebSockets)
- [ ] Advanced analytics dashboard
- [ ] API access for third parties
- [ ] Mobile app (React Native)
- [ ] AI recommendations
- [ ] Microservices migration

### Phase 5: Global Scale (Long-term 🌐)
**Timeline:** Year 2+

- [ ] Multi-language support (i18n)
- [ ] Multi-currency support
- [ ] Kubernetes orchestration
- [ ] Disaster recovery setup
- [ ] SOC 2 compliance
- [ ] International expansion

---

## 19. RISK ASSESSMENT

### 19.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| Database corruption | High | Low | Regular backups, automated recovery tests |
| API rate limiting attacks | Medium | Medium | Implement rate limiting, DDoS protection |
| Sensitive data breach | Critical | Low | Encryption, security audits, penetration testing |
| Third-party API failure (weather) | Medium | Low | Fallback cached data, service monitoring |
| Performance degradation at scale | High | Medium | Load testing, horizontal scaling, caching |

### 19.2 Business Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| Low user adoption | High | Medium | Marketing, user research, UX improvements |
| Competitor emergence | Medium | High | Differentiation, unique features |
| Regulatory changes | High | Low | Legal consultation, compliance team |
| Team turnover | High | Low | Documentation, knowledge sharing, culture |

### 19.3 Security Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| SQL/NoSQL Injection | Critical | Low | Mongoose ORM, input validation |
| XSS attacks | High | Low | httpOnly cookies, CSP headers, sanitization |
| Brute force attacks | Medium | Medium | Rate limiting, 2FA (Phase 2) |
| Session hijacking | High | Low | Secure cookies, token expiration |

---

## 20. APPENDICES

### Appendix A: Glossary

| Term | Definition |
|------|-----------|
| **JWT** | JSON Web Token - stateless authentication mechanism |
| **Refresh Token** | Long-lived token used to get new access tokens |
| **Access Token** | Short-lived token for API requests |
| **httpOnly** | Cookie flag preventing JS access (XSS protection) |
| **CSRF** | Cross-Site Request Forgery - attack prevented by SameSite cookies |
| **ODM** | Object Document Mapper (Mongoose for MongoDB) |
| **CORS** | Cross-Origin Resource Sharing - cross-domain requests |
| **SLA** | Service Level Agreement - uptime guarantee |
| **RTO** | Recovery Time Objective - max acceptable recovery time |
| **RPO** | Recovery Point Objective - max acceptable data loss |

### Appendix B: File Structure

```
Tourism-PLanner/
├── Backend/
│   ├── src/
│   │   ├── Index.js                    # Entry point
│   │   ├── App.js                      # Express app
│   │   ├── controllers/                # Route handlers
│   │   ├── models/                     # MongoDB schemas
│   │   ├── routes/                     # API routes
│   │   ├── middlewares/                # Middleware functions
│   │   ├── services/                   # Business logic
│   │   ├── utils/                      # Utilities
│   │   └── database/                   # DB connection
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── Frontend/
│   ├── src/
│   │   ├── main.jsx                    # Entry point
│   │   ├── App.jsx                     # App component
│   │   ├── Features/                   # Feature modules
│   │   ├── components/                 # Reusable components
│   │   ├── context/                    # Context API
│   │   ├── services/                   # API calls
│   │   ├── hooks/                      # Custom hooks
│   │   └── Routes/                     # Route definitions
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── PROJECT_REQUIREMENT_DOCUMENT.md     # This file
├── README.md
└── .gitignore
```

### Appendix C: Environment Variables Template

```
# Backend .env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tourism-planner
NODE_ENV=development

# JWT Configuration
ACCESS_TOKEN_SECRET=your-secret-key-here-min-32-chars
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your-refresh-secret-key-min-32-chars
REFRESH_TOKEN_EXPIRY=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# External APIs
OPENWEATHERMAP_API_KEY=your-api-key-here

# Redis (Phase 2)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Email Service (Phase 2)
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=

# Frontend .env
VITE_API_URL=http://localhost:5000
VITE_WEATHER_API_KEY=your-openweathermap-key
```

### Appendix D: API Response Format

```javascript
// Success Response (2xx)
{
  success: true,
  statusCode: 200,
  data: {
    // Response payload
  },
  message: "Operation successful"
}

// Error Response (4xx, 5xx)
{
  success: false,
  statusCode: 400,
  message: "Validation failed",
  errors: [
    {
      field: "email",
      message: "Invalid email format"
    }
  ],
  stack: "..." // Only in development
}
```

### Appendix E: Deployment Checklist

**Pre-Deployment:**
- [ ] All tests passing (`npm test`)
- [ ] Code review approved
- [ ] Environment variables set correctly
- [ ] Database backups created
- [ ] SSL certificates valid for 30+ days
- [ ] Monitoring alerts configured

**Post-Deployment:**
- [ ] Health check endpoint returns 200
- [ ] API endpoints responding < 500ms
- [ ] Error rate < 0.1%
- [ ] Database queries < 100ms
- [ ] No critical logs/errors
- [ ] Monitor for 24 hours before marking complete

### Appendix F: Future Enhancement Ideas

```
Phase 2+:
1. Real-time Collaboration
   - Multiple users editing same trip
   - WebSockets for live updates
   - Cursor tracking

2. AI-Powered Recommendations
   - Suggest destinations based on preferences
   - Optimize trip itineraries
   - Predict best travel dates

3. Social Features
   - Follow other travelers
   - Share trips publicly
   - Rate and review destinations
   - Comment on trips

4. Payment Integration
   - Stripe/PayPal integration
   - Booking integration (hotels, flights)
   - Invoice generation

5. Mobile App
   - React Native for iOS/Android
   - Offline mode with sync
   - Push notifications

6. Advanced Analytics
   - Tourism trends
   - Destination popularity
   - User behavior analytics
   - Revenue analytics (admin)

7. Marketplace
   - Tour guide listings
   - Travel package deals
   - Affiliate commissions
```

---

## DOCUMENT METADATA

| Property | Value |
|----------|-------|
| **Document Type** | PRD (Project Requirement Document) |
| **Version** | 1.0 |
| **Status** | Active |
| **Last Modified** | June 2026 |
| **Owner** | Rupeshkumar-2004 |
| **Reviewers** | [To be assigned] |
| **Approval Date** | [To be assigned] |
| **Next Review Date** | June 2026 |

---

**END OF PROJECT REQUIREMENT DOCUMENT**

This document provides comprehensive specifications for the Tourism Planner application covering all aspects from business requirements to technical specifications, testing strategies, and deployment guidelines.

For updates or clarifications, please refer to the GitHub repository: https://github.com/Rupeshkumar-2004/Tourism-PLanner
