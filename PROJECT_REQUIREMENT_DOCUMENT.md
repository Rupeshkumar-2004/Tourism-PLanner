# PROJECT REQUIREMENT DOCUMENT (PRD) - UPDATED
## Tourism Planner Application v2.0

**Document Version:** 2.0 (Updated)  
**Last Updated:** June 2026  
**Project Owner:** Rupeshkumar-2004  
**Repository:** https://github.com/Rupeshkumar-2004/Tourism-PLanner  
**Latest Commit:** Spontaneous travel feature with geolocation-based suggestions  
**Status:** Active Development

---

## TABLE OF CONTENTS
1. [Executive Summary](#executive-summary)
2. [What's New in v2.0](#whats-new-in-v20)
3. [Product Overview](#product-overview)
4. [Objectives & Goals](#objectives--goals)
5. [Functional Requirements](#functional-requirements)
6. [New Features: Spontaneous Travel & AI Integration](#new-features-spontaneous-travel--ai-integration)
7. [Non-Functional Requirements](#non-functional-requirements)
8. [Data Models](#data-models)
9. [System Architecture](#system-architecture)
10. [API Specifications](#api-specifications)
11. [User Roles & Permissions](#user-roles--permissions)
12. [Technical Specifications v2.0](#technical-specifications-v20)
13. [Third-Party Integrations](#third-party-integrations)
14. [Security & Compliance](#security--compliance)
15. [Performance Requirements](#performance-requirements)
16. [Scalability](#scalability)
17. [Deployment & DevOps](#deployment--devops)
18. [Testing Strategy](#testing-strategy)
19. [Success Metrics](#success-metrics)
20. [Roadmap & Milestones](#roadmap--milestones)
21. [Risk Assessment](#risk-assessment)
22. [Appendices](#appendices)

---

## 1. EXECUTIVE SUMMARY

### Overview
Tourism Planner is a **next-generation full-stack web application** that empowers users to plan, organize, and manage their trips efficiently with **AI-powered recommendations and spontaneous travel suggestions**. 

**Latest Major Updates:**
- ✅ **React Query Integration** - Advanced data fetching and caching
- ✅ **Zod Schema Validation** - Type-safe schema validation on frontend
- ✅ **Google Generative AI Integration** - AI-powered destination insights
- ✅ **Spontaneous Travel Feature** - Geolocation-based trip suggestions
- ✅ **Interactive Maps** - Leaflet-based destination visualization
- ✅ **Real-Time Weather** - Current and forecast weather data

The application now provides **intelligent trip recommendations** and **spontaneous travel discovery** alongside traditional trip planning features.

### Target Users
- Individual travelers planning personal trips
- Spontaneous travelers seeking immediate trip suggestions
- Tour guides managing group itineraries
- Travel agencies coordinating multiple trips
- Budget-conscious travelers
- Adventure enthusiasts
- Users seeking AI-powered recommendations

### Key Features (v2.0)
- ✅ **User authentication** (JWT-based with refresh tokens)
- ✅ **Destination discovery** with advanced filtering
- ✅ **Trip planning** and management
- ✅ **AI-powered destination insights** (Google Generative AI)
- ✅ **Spontaneous travel suggestions** (geolocation-based)
- ✅ **Place categorization** within destinations
- ✅ **Weather integration** (real-time data)
- ✅ **Interactive maps** (Leaflet + React Leaflet)
- ✅ **Budget tracking**
- ✅ **Role-based access control** (user, guide, admin)
- ✅ **React Query caching** (optimized data fetching)
- ✅ **Zod validation** (type-safe schemas)
- ✅ **Dashboard analytics** (travel statistics)

### Project Type
- **Full-Stack Web Application**
- **AI-Powered Platform**
- **Real-Time Capable** (WebSockets ready)
- **Mobile Responsive**
- **Cloud-Ready**
- **Progressive Enhancement** (offline-first ready)

---

## 2. WHAT'S NEW IN v2.0

### Recent Commits (Last Week)

#### Commit 1: Spontaneous Travel Feature
**Date:** June 4, 2026  
**Message:** Implement Spontaneous travel feature with geolocation-based suggestions and UI components

**Changes:**
- New `Spontaneous` module for impromptu travel planning
- Geolocation API integration
- Proximity-based destination suggestions
- Real-time location tracking
- Optimized place discovery within radius

**Technology Added:**
- Geolocation Services
- Location-based filtering algorithms

#### Commit 2: Zod Validation & Dashboard Refactor
**Date:** June 3-4, 2026  
**Message:** Implement Zod schema validation for trips and update dashboard

**Changes:**
- Migrated to **Zod** for schema validation
- Modularized validation schemas
- Renamed "suggested guides" to "suggested places"
- Enhanced dashboard logic
- Type-safe form validation

**Technology Added:**
- `zod ^4.4.3` (schema validation library)

#### Commit 3: React Query Migration
**Date:** June 2, 2026  
**Message:** Migrate data fetching to React Query, update dashboard guide logic, and add cascading delete

**Changes:**
- Replaced manual API calls with **React Query**
- Implemented automatic caching and stale state management
- Added React Query DevTools for debugging
- Cascading delete for trip-destination relationships
- Improved performance with query invalidation

**Technology Added:**
- `@tanstack/react-query ^5.100.14`
- `@tanstack/react-query-devtools ^5.100.14`

#### Commit 4: Interactive Maps & Weather
**Date:** June 1, 2026  
**Message:** Integrate interactive maps and real-time weather service for destinations

**Changes:**
- Leaflet.js integration for maps
- React Leaflet for React components
- Real-time weather API integration
- Map markers for destinations
- Weather forecast display

**Technology Added:**
- `leaflet ^1.9.4`
- `react-leaflet ^5.0.0`

#### Commit 5: Place Search & External APIs
**Date:** June 1, 2026  
**Message:** Implement integrated place search and destination management with external AI services

**Changes:**
- Google Generative AI integration
- Place search using external services
- AI-powered destination insights
- Enhanced destination detail cards
- Dynamic content generation

**Technology Added:**
- `@google/genai ^2.7.0`

#### Commit 6: Destination Detail Components
**Date:** May 31, 2026  
**Message:** Implement destination detail components and theme branding

**Changes:**
- Custom destination detail pages
- Dynamic banner generation
- Lucide React icons integration
- Theme color branding
- Enhanced UI/UX

**Technology Added:**
- `lucide-react ^1.17.0`

#### Commit 7: State-Based Filtering
**Date:** May 31, 2026  
**Message:** Implement state-based destination filtering

**Changes:**
- Filter destinations by state
- Hierarchical location filtering
- Advanced query parameters
- Improved search algorithms

---

## 3. PRODUCT OVERVIEW

### Vision
To become the **AI-powered trip planning platform** where users discover destinations through intelligent recommendations, plan trips seamlessly, and embrace spontaneous travel opportunities.

### Mission
Simplify and personalize trip planning by combining traditional trip management with **AI-powered insights**, **spontaneous travel discovery**, and **real-time information**.

### Product Philosophy
- **User-Centric:** Simple, intuitive interface for all user types
- **AI-Driven:** Leverage machine learning for personalized recommendations
- **Data-Rich:** Real-time information integration (weather, maps, insights)
- **Spontaneous:** Enable impromptu travel decisions with geolocation
- **Scalable:** Handle millions of concurrent users
- **Secure:** Enterprise-grade security
- **Open:** API-first architecture for integrations

---

## 4. OBJECTIVES & GOALS

### Primary Objectives

| Objective | Description | Priority | Status |
|-----------|-------------|----------|--------|
| **Trip Management** | CRUD operations for trips | P0 | ✅ Complete |
| **Destination Discovery** | Browse & search with filters | P0 | ✅ Complete |
| **Authentication** | JWT-based security | P0 | ✅ Complete |
| **AI Insights** | Google Generative AI integration | P1 | ✅ Complete |
| **Spontaneous Travel** | Geolocation-based suggestions | P1 | ✅ Complete |
| **Weather Integration** | Real-time weather data | P1 | ✅ Complete |
| **Interactive Maps** | Leaflet-based visualization | P1 | ✅ Complete |
| **Data Caching** | React Query optimization | P2 | ✅ Complete |
| **Budget Tracking** | Trip expense management | P1 | 🔄 In Progress |
| **Mobile Responsiveness** | Mobile-first design | P1 | 🔄 In Progress |

### Success Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| MAU (Monthly Active Users) | 1000+ | TBD | 📈 Tracking |
| System Uptime | 99.5% | TBD | 📈 Tracking |
| API Response Time | < 500ms | 400-600ms | ⚠️ Needs Optimization |
| Page Load Time | < 2s | 2-3s | ⚠️ Needs Optimization |
| User Retention (30-day) | 60%+ | TBD | 📈 Tracking |
| NPS Score | 40+ | TBD | 📈 Tracking |

---

## 5. FUNCTIONAL REQUIREMENTS

### 5.1 Authentication & Authorization (MVP ✅)

#### FR-AUTH-1: User Registration
```
Status: ✅ IMPLEMENTED

Endpoint: POST /api/v1/auth/register

Request:
{
  fullName: string (3-50 chars),
  email: string (unique, validated),
  password: string (min 6 chars),
  phone: string (optional, 10-digit),
  role: string (optional, default: "user")
}

Response:
{
  user: { _id, fullName, email, role },
  accessToken: string (15 min expiry),
  refreshToken: string (7 days expiry)
}

Features:
- Auto-login after registration
- JWT tokens in httpOnly cookies
- Password hashing with bcrypt
- Email uniqueness validation
```

#### FR-AUTH-2: User Login
```
Status: ✅ IMPLEMENTED

Endpoint: POST /api/v1/auth/login

Request:
{
  email: string,
  password: string
}

Response:
{
  user: { _id, fullName, email, role },
  accessToken: string,
  refreshToken: string
}

Security:
- Rate limiting (5 attempts per 15 min)
- Bcrypt password comparison
- Secure cookie configuration
```

#### FR-AUTH-3: Token Refresh
```
Status: ✅ IMPLEMENTED

Endpoint: POST /api/v1/auth/refresh-token

Features:
- Automatic token rotation
- Prevent token reuse attacks
- Seamless session persistence
```

---

### 5.2 Destination Management (MVP ✅)

#### FR-DEST-1: Browse Destinations
```
Status: ✅ IMPLEMENTED

Endpoint: GET /api/v1/destinations

Query Parameters:
- page (default: 1)
- limit (default: 20)
- search (keyword search)
- city (filter by city)
- country (filter by country)
- category (adventure, heritage, nature, city, relaxation)
- minBudget, maxBudget (budget range)
- tags (comma-separated)
- sortBy (name, city, budget, createdAt)
- sortType (asc, desc)

Response:
{
  destinations: [...],
  pagination: { page, total, hasMore }
}

Caching: React Query with 5-minute stale time
```

#### FR-DEST-2: Destination Details with Weather
```
Status: ✅ IMPLEMENTED

Endpoint: GET /api/v1/destinations/:id
GET /api/v1/destinations/:id/weather

Features:
- Full destination information
- Real-time weather data
- Associated places list
- Interactive map visualization
- AI-powered insights (Google Generative AI)
```

#### FR-DEST-3: Advanced Filtering
```
Status: ✅ IMPLEMENTED

Features:
- State-based filtering (NEW)
- Multiple city selection
- Budget range queries
- Category-based discovery
- Tag-based search
- Full-text search support
```

---

### 5.3 Trip Management (MVP ✅)

#### FR-TRIP-1: Create Trip
```
Status: ✅ IMPLEMENTED

Endpoint: POST /api/v1/trips

Validation: Zod schema (NEW)

Request:
{
  title: string (max 100),
  startDate: Date,
  endDate: Date (>= startDate),
  totalBudget: number (>= 0),
  description: string (optional),
  category: string,
  bannerImage: string (URL, optional),
  destinations: [ObjectId] (optional)
}

Validation Library: Zod
```

#### FR-TRIP-2: Trip CRUD Operations
```
Status: ✅ IMPLEMENTED

GET /api/v1/trips (list user's trips)
GET /api/v1/trips/:tripId (get details)
PATCH /api/v1/trips/:tripId (update)
DELETE /api/v1/trips/:tripId (delete with cascade)

Features:
- Cascading delete for destinations
- Pagination support
- Zod schema validation
- React Query caching
```

---

### 5.4 Places Management (MVP ✅)

#### FR-PLACE-1: Place Discovery
```
Status: ✅ IMPLEMENTED

Endpoint: GET /api/v1/destinations/:destinationId/places

Features:
- Paginated place list
- Category filtering
- Distance-based sorting
- Place details (name, category, address, images)
```

#### FR-PLACE-2: Create/Edit Places
```
Status: ✅ IMPLEMENTED

Endpoint: POST /api/v1/places
PATCH /api/v1/places/:placeId

Validation: Zod schema

Fields:
{
  destination: ObjectId,
  name: string,
  description: string,
  category: string,
  images: [string],
  address: string,
  lat: number,
  lon: number,
  tags: [string]
}
```

---

## 6. NEW FEATURES: SPONTANEOUS TRAVEL & AI INTEGRATION

### 6.1 Spontaneous Travel Module (NEW ✅)

#### FR-SPON-1: Geolocation-Based Suggestions
```
Status: ✅ IMPLEMENTED

Endpoint: POST /api/v1/spontaneous/nearby-destinations

Features:
- User geolocation detection
- Radius-based search (default: 50km)
- Proximity ranking
- Real-time location updates

Request:
{
  latitude: number,
  longitude: number,
  radius: number (km, default: 50),
  category: string (optional)
}

Response:
{
  destinations: [
    {
      _id, name, city, distance,
      estimatedBudget, images, weather
    }
  ]
}

Algorithm:
- Geospatial queries (MongoDB)
- Distance calculation
- Ranking by proximity + popularity
```

#### FR-SPON-2: Spontaneous Trip Planning
```
Status: ✅ IMPLEMENTED

Features:
- One-click trip creation from nearby destination
- Auto-fill trip details based on location
- Suggested duration (default: 3 days)
- Estimated budget calculation

Workflow:
1. User shares location (geolocation API)
2. Get nearby destinations within radius
3. Display quick trip suggestions
4. One-click booking to add to trips
5. Auto-suggest places to visit
```

#### FR-SPON-3: Real-Time Place Suggestions
```
Status: ✅ IMPLEMENTED

Features:
- Suggest 5 top-rated places in destination
- Distance from user's current location
- Operating hours (future enhancement)
- User reviews (future enhancement)
- Quick navigation to place (Google Maps integration)
```

---

### 6.2 AI Integration (Google Generative AI)

#### FR-AI-1: Destination Insights
```
Status: ✅ IMPLEMENTED

Integration: Google Generative AI (@google/genai ^2.7.0)

Features:
- AI-generated destination descriptions
- Travel tips and recommendations
- Best time to visit analysis
- Budget optimization suggestions
- Cultural insights

Endpoint: GET /api/v1/destinations/:id/ai-insights

Response:
{
  summary: "AI-generated overview",
  tips: ["tip1", "tip2", ...],
  bestTime: "recommended season",
  budgetSuggestions: {...},
  culturalInsights: {...}
}

Use Case:
- Enhance destination cards with AI content
- Provide deeper insights without manual data entry
- Personalized recommendations
```

#### FR-AI-2: Trip Itinerary Suggestions
```
Status: 🔄 PLANNED (Phase 2)

Features:
- AI-generated optimal itineraries
- Time optimization
- Place recommendations
- Budget-aware suggestions
```

---

## 7. NON-FUNCTIONAL REQUIREMENTS

### 7.1 Performance Requirements

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Page Load Time** | < 2s | 2-3s | ⚠️ Needs Optimization |
| **API Response Time** | < 500ms | 400-600ms | ⚠️ Needs Optimization |
| **First Contentful Paint** | < 1.5s | 1.8-2.2s | ⚠️ Needs Optimization |
| **Largest Contentful Paint** | < 2.5s | 2.8-3.5s | ⚠️ Needs Optimization |
| **Time to Interactive** | < 3s | 3-4s | ⚠️ Needs Optimization |
| **Database Query Time** | < 100ms | 100-150ms | ⚠️ Borderline |

### 7.2 Performance Improvements (v2.0)

**React Query Implementation:**
- ✅ Automatic caching
- ✅ Stale-while-revalidate pattern
- ✅ Query deduplication
- ✅ Background refetching
- ✅ Optimistic updates

**Frontend Optimizations:**
- ✅ Code splitting (dynamic imports ready)
- ✅ Image lazy loading
- ✅ Tailwind CSS optimization
- ✅ Bundle size: ~150KB (gzipped)

**Backend Optimizations Needed:**
- ⚠️ Redis caching layer (Phase 2)
- ⚠️ Database query optimization
- ⚠️ API response compression
- ⚠️ CDN for static assets

### 7.3 Scalability Requirements

```
Current Capacity:
- Concurrent users: ~1,000
- Requests/minute: ~10,000
- MongoDB storage: Single instance

Phase 1 Target (100K users):
- Load balancer (Nginx/HAProxy)
- 3-5 backend replicas
- MongoDB replica set
- Redis cache cluster
- CDN (CloudFlare)

Phase 2 Target (1M users):
- Kubernetes orchestration
- Microservices architecture
- MongoDB sharding
- Elasticsearch for search
- Kafka event streaming
```

### 7.4 Availability & Reliability

```
Uptime Target: 99.5% (~3.6 hours acceptable downtime/month)

SLAs:
- API: 99.5% uptime
- Database: 99.9% uptime
- Frontend: 99% uptime

Recovery:
- RTO (Recovery Time Objective): 1 hour
- RPO (Recovery Point Objective): 15 minutes
- Automated backups: Every 6 hours
```

### 7.5 Security Requirements (v2.0)

```
Authentication:
✅ JWT tokens with expiration
✅ Refresh token rotation
✅ httpOnly, secure, sameSite cookies
✅ Bcrypt password hashing (10 rounds)
✅ Input validation with Zod

Authorization:
✅ Role-based access control
✅ Resource ownership validation
✅ Rate limiting on sensitive endpoints

Data Protection:
⚠️ HTTPS/TLS 1.3 (prod-only)
⚠️ PII encryption (Phase 2)
⚠️ Database encryption (Phase 2)

Compliance:
⚠️ GDPR compliance (Phase 2)
⚠️ CCPA compliance (Phase 2)
⚠️ SOC 2 audit (Phase 3)
```

---

## 8. DATA MODELS

### 8.1 User Model

```javascript
{
  _id: ObjectId,
  fullName: String (3-50 chars, required),
  email: String (unique, required),
  password: String (hashed, min 6 chars),
  phone: String (10-digit, optional),
  ProfilePicture: String (URL, optional),
  role: String (enum: ["admin", "user", "guide"], default: "user"),
  refreshToken: String (for logout),
  
  geolocation: {
    latitude: Number (optional),
    longitude: Number (optional),
    lastUpdated: Date,
    enabled: Boolean (default: false)
  },
  
  preferences: {
    favoriteCategories: [String],
    budget: Number,
    travelStyle: String
  },
  
  createdAt: Date,
  updatedAt: Date,
  
  indexes: {
    email: unique,
    geolocation: "2dsphere" (for geospatial queries)
  }
}
```

### 8.2 Destination Model

```javascript
{
  _id: ObjectId,
  name: String (unique, max 100),
  city: String (required, lowercase, indexed),
  state: String (required, lowercase, indexed),
  country: String (default: "India", indexed),
  description: String (max 1000),
  
  location: {
    type: "Point",
    coordinates: [longitude, number]  // GeoJSON format
  },
  
  images: [String] (validated URLs),
  bestTimeToVisit: String (max 120),
  estimatedBudget: Number (>= 0),
  category: String (adventure, heritage, nature, city, relaxation),
  tags: [String] (deduplicated),
  
  ratings: {
    average: Number (0-5),
    count: Number
  },
  
  aiInsights: {
    summary: String,
    tips: [String],
    culturalInfo: String,
    generatedBy: "Google Generative AI",
    generatedAt: Date
  },
  
  createdAt: Date,
  updatedAt: Date,
  
  indexes: [
    { city: 1 },
    { country: 1 },
    { category: 1 },
    { estimatedBudget: 1 },
    { location: "2dsphere" },  // For geospatial queries
    { name: "text", city: "text", description: "text" }
  ]
}
```

### 8.3 Place Model

```javascript
{
  _id: ObjectId,
  destination: ObjectId (reference, required, indexed),
  name: String (required, max 100),
  description: String (max 3000),
  category: String (temple, beach, restaurant, etc.),
  tags: [String],
  
  location: {
    type: "Point",
    coordinates: [longitude, number]
  },
  
  address: String (max 250),
  lat: Number,
  lon: Number,
  images: [String] (validated URLs),
  
  distance: Number (calculated from user location),
  rating: Number (0-5),
  reviews: Number,
  
  createdAt: Date,
  updatedAt: Date,
  
  indexes: [
    { destination: 1, name: 1 } (unique),
    { destination: 1 },
    { location: "2dsphere" },
    { category: 1 }
  ]
}
```

### 8.4 Trip Model

```javascript
{
  _id: ObjectId,
  title: String (required, max 100),
  description: String,
  category: String,
  bannerImage: String,
  
  startDate: Date (required),
  endDate: Date (required, >= startDate),
  
  destinations: [ObjectId] (reference array, populated),
  totalBudget: Number (required, >= 0),
  
  budget: {
    accommodation: Number,
    food: Number,
    transport: Number,
    activities: Number,
    other: Number
  },
  
  createdBy: ObjectId (User reference, indexed),
  
  status: String (enum: ["planning", "ongoing", "completed", "cancelled"]),
  isPublic: Boolean (default: false),
  
  createdAt: Date,
  updatedAt: Date,
  
  indexes: [
    { createdBy: 1, createdAt: -1 },
    { createdBy: 1, startDate: 1 },
    { createdBy: 1, totalBudget: 1 },
    { isPublic: 1, createdAt: -1 }
  ]
}
```

---

## 9. SYSTEM ARCHITECTURE

### 9.1 High-Level Architecture (v2.0)

```
┌──────────────────────────────────────────────────────┐
│           FRONTEND (React 19 + Vite)                 │
│  ┌────────────────────────────────────────────────┐  │
│  │ Pages: Auth, Trips, Destinations, Spontaneous │  │
│  │ State: Context API + React Query (caching)    │  │
│  │ Maps: Leaflet + React Leaflet                 │  │
│  │ Validation: Zod schemas                       │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
                HTTP/HTTPS + JWT
           Geolocation API + Weather API
┌──────────────────────────────────────────────────────┐
│     API GATEWAY / LOAD BALANCER (Future)             │
│                Nginx/HAProxy                         │
└──────────────────────────────────────────────────────┘
                    HTTP
┌──────────────────────────────────────────────────────┐
│      BACKEND (Express.js + Node.js)                  │
│  ┌────────────────────────────────────────────────┐  │
│  │ Routes → Controllers → Services → Models       │  │
│  │ Middleware: Auth, Error, CORS, Logging         │  │
│  │ Validation: Zod schemas (input validation)     │  │
│  │ AI Services: Google Generative AI              │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
              MongoDB Driver + Queries
┌──────────────────────────────────────────────────────┐
│           DATA LAYER (MongoDB)                       │
│  ┌────────────────────────────────────────────────┐  │
│  │ Users Collection (with geolocation)            │  │
│  │ Destinations (2dsphere index for spatial)      │  │
│  │ Trips (indexed by user & date)                 │  │
│  │ Places (indexed for proximity search)          │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘

External Services:
┌─────────────────────────────────────────────────────┐
│ OpenWeatherMap API (weather)                        │
│ Google Generative AI (destination insights)         │
│ Geolocation Services (user location)                │
│ Leaflet/OpenStreetMap (maps)                        │
│ Cloudinary (image storage - Phase 2)               │
└─────────────────────────────────────────────────────┘
```

### 9.2 Data Flow: Spontaneous Travel

```
User Journey:
1. User clicks "Find Nearby Trips" button
2. Browser requests geolocation permission
3. Geolocation API returns lat/lon
4. Frontend calls: POST /api/v1/spontaneous/nearby-destinations
5. Backend:
   - Validates geolocation coordinates
   - Queries Destination with 2dsphere index
   - Calculates distances
   - Ranks by proximity + popularity
   - Enriches with weather data
   - Returns top 5 suggestions
6. Frontend:
   - Displays destinations on Leaflet map
   - Shows distance, weather, estimated budget
   - User selects one destination
   - One-click trip creation
   - Navigates to trip detail page

Performance:
- Geospatial query: < 50ms
- Weather API call: ~500ms (cached)
- Total response: < 800ms
- React Query caches results for 5 minutes
```

### 9.3 Component Architecture

```
FRONTEND
├── Pages/
│   ├── Auth/
│   │   ├── LoginPage
│   │   └── RegisterPage
│   ├── Trips/
│   │   ├── TripPage
│   │   ├── TripDetailPage
│   │   └── TripCreatePage
│   ├── Destinations/
│   │   ├── DestinationsPage
│   │   ├── DestinationDetailPage
│   │   └── DestinationFiltersPanel
│   ├── Places/
│   │   └── PlacesPage
│   ├── Spontaneous/ (NEW)
│   │   ├── SpontaneousTravelPage
│   │   ├── NearbyDestinations
│   │   └── QuickTripCard
│   └── DashBoard/
│       └── DashboardPage
│
├── Components/ (Reusable)
│   ├── Map/ (Leaflet wrapper)
│   ├── Weather/ (weather display)
│   ├── Cards/ (destination, trip, place)
│   ├── Forms/ (with Zod validation)
│   └── Modals/
│
├── context/
│   └── AuthContext (user state)
│
├── hooks/ (Custom)
│   ├── useAuth
│   ├── useGeolocation (NEW)
│   └── useTripForm
│
├── services/ (API + queries)
│   ├── authServices
│   ├── tripServices
│   ├── destinationServices
│   ├── placeServices
│   └── spontaneousServices (NEW)
│
└── schemas/ (Zod validation)
    ├── tripSchema
    ├── authSchema
    └── placeSchema

BACKEND
├── routes/
│   ├── auth.route.js
│   ├── trip.route.js
│   ├── destination.route.js
│   ├── place.route.js
│   └── spontaneous.route.js (NEW)
│
├── controllers/
│   ├── auth.controller.js
│   ├── trip.controller.js
│   ├── destination.controller.js
│   ├── place.controller.js
│   └── spontaneous.controller.js (NEW)
│
├── services/
│   ├── externalApi.service.js (weather, AI)
│   ├── geolocation.service.js (NEW)
│   └── aiInsights.service.js (NEW)
│
├── models/
│   ├── user.model.js
│   ├── trip.model.js
│   ├── destination.model.js
│   └── place.model.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── validation.middleware.js
│
├── utils/
│   ├── ApiError.js
│   ├── asyncHandler.js
│   ├── ApiResponse.js
│   └── queryFeatures.js
│
└── schemas/ (Zod - NEW)
    ├── tripSchema.js
    ├── authSchema.js
    └── placeSchema.js
```

---

## 10. API SPECIFICATIONS

### 10.1 Authentication Endpoints

```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh-token
GET /api/v1/auth/me
```

### 10.2 Trip Endpoints

```
POST /api/v1/trips              # Create trip
GET /api/v1/trips               # Get user's trips (paginated)
GET /api/v1/trips/:tripId       # Get trip details
PATCH /api/v1/trips/:tripId     # Update trip
DELETE /api/v1/trips/:tripId    # Delete trip
```

### 10.3 Destination Endpoints

```
GET /api/v1/destinations                    # List with filters
GET /api/v1/destinations/:id                # Get details
GET /api/v1/destinations/:id/weather        # Weather data
GET /api/v1/destinations/:id/ai-insights    # AI insights (NEW)
```

### 10.4 Spontaneous Travel Endpoints (NEW)

```
POST /api/v1/spontaneous/nearby-destinations
├── Request: { latitude, longitude, radius, category }
├── Response: {
│     destinations: [
│       {
│         _id, name, city, distance,
│         estimatedBudget, images, weather, rating
│       }
│     ]
│   }
└── Status: 200 OK

POST /api/v1/spontaneous/quick-trip
├── Request: { destinationId, days }
├── Response: { trip }
└── Status: 201 Created
```

### 10.5 Places Endpoints

```
GET /api/v1/destinations/:destinationId/places
POST /api/v1/places
PATCH /api/v1/places/:placeId
DELETE /api/v1/places/:placeId
```

---

## 11. USER ROLES & PERMISSIONS

### Role Definitions

| Role | Capabilities | Trip Access |
|------|-----------|-------------|
| **USER** | Create/manage own trips, browse destinations, discover spontaneous trips | Own only |
| **GUIDE** | All USER + manage group trips, create destinations | Own + managed |
| **ADMIN** | All permissions, user management | All |

---

## 12. TECHNICAL SPECIFICATIONS v2.0

### 12.1 Backend Stack (Updated)

```
Runtime: Node.js v18+
Framework: Express.js v5.2.1
Database: MongoDB v5.0+
Language: JavaScript (ES6+)

Core Dependencies:
- jsonwebtoken v9.0.3 (JWT)
- bcrypt v6.0.0 (Password hashing)
- mongoose v9.6.1 (MongoDB ODM)
- cookie-parser v1.4.7 (Cookie handling)
- cors v2.8.6 (CORS middleware)
- dotenv v17.4.2 (Environment variables)

NEW Dependencies:
✨ zod v4.4.3 (Schema validation)
✨ @google/genai v2.7.0 (Google Generative AI)

Dev Tools:
- nodemon v3.1.14 (Auto-restart)
- prettier v3.8.3 (Code formatting)
```

### 12.2 Frontend Stack (Updated)

```
Build Tool: Vite v8.0.12
UI Framework: React v19.2.6
Routing: React Router v7.16.0
Styling: TailwindCSS v4.3.0
HTTP: Axios v1.16.1

NEW Dependencies:
✨ @tanstack/react-query v5.100.14 (Data fetching)
✨ @tanstack/react-query-devtools v5.100.14 (Debugging)
✨ leaflet v1.9.4 (Interactive maps)
✨ react-leaflet v5.0.0 (React Leaflet components)
✨ lucide-react v1.17.0 (Icon library)

Icons & UI:
- lucide-react v1.17.0 (SVG icons)

Linting:
- ESLint v10.3.0
- Prettier v3.8.3
```

### 12.3 Database Specifications (Updated)

**MongoDB Collections:**

1. **Users** (with geolocation)
   - Index: `email` (unique)
   - Index: `geolocation` (2dsphere for spatial queries)

2. **Destinations** (optimized for search)
   - Index: `city` (1)
   - Index: `location` (2dsphere for proximity)
   - Index: `category` (1)
   - Index: `{name: "text", city: "text", description: "text"}`

3. **Trips** (indexed by owner)
   - Index: `{createdBy: 1, createdAt: -1}`
   - Index: `{createdBy: 1, startDate: 1}`

4. **Places** (indexed for discovery)
   - Index: `{destination: 1, name: 1}` (unique)
   - Index: `location` (2dsphere)

**Geospatial Queries:**
- 2dsphere indexes for proximity-based searches
- Distance calculations for spontaneous travel
- Efficient radius searches (< 50ms)

---

## 13. THIRD-PARTY INTEGRATIONS

### 13.1 Google Generative AI

**Status:** ✅ INTEGRATED

```
Library: @google/genai v2.7.0

Use Cases:
- Destination insights generation
- AI-powered travel tips
- Content enrichment
- Cultural information

Integration Points:
- GET /api/v1/destinations/:id/ai-insights
- Trip planning suggestions (Phase 2)
- Itinerary optimization (Phase 2)

Rate Limits:
- 60 requests per minute (standard)
- Implement request queuing for optimization
```

### 13.2 Weather API

**Status:** ✅ INTEGRATED

```
Service: OpenWeatherMap API

Features:
- Current weather (temperature, humidity, wind)
- 5-day forecast
- Weather condition icons
- Hourly updates

Caching:
- React Query: 1-hour stale time
- Backend: 30-minute cache

Integration Points:
- GET /api/v1/destinations/:id/weather
- Spontaneous travel suggestions
- Trip planning recommendations
```

### 13.3 Geolocation API

**Status:** ✅ INTEGRATED (Browser)

```
Implementation: Browser Geolocation API

Features:
- User location detection
- Accuracy: ~10-100m
- Privacy: User permission required
- One-time or continuous tracking

Integration Points:
- POST /api/v1/spontaneous/nearby-destinations
- Real-time location updates
- Privacy mode (disable tracking)

Security:
- HTTPS only
- User opt-in
- Data not stored by default
```

### 13.4 Maps Integration

**Status:** ✅ INTEGRATED

```
Libraries:
- Leaflet v1.9.4
- React Leaflet v5.0.0
- OpenStreetMap (tiles)

Features:
- Interactive destination maps
- Place markers
- Zoom and pan
- Polyline routes (Phase 2)

Use Cases:
- Destination visualization
- Place location display
- Trip route planning (Phase 2)
```

### 13.5 Future Integrations (Phase 2)

```
Payment Gateway:
- Stripe integration
- Payment processing
- Invoice generation

Image Storage:
- Cloudinary CDN
- Image optimization
- Auto-resizing

Email Service:
- SendGrid / Mailgun
- Notification emails
- Trip reminders

Advanced Mapping:
- Google Maps API (directions)
- Route optimization
- Place search

Social Media:
- OAuth2 integration
- Social login
- Trip sharing
```

---

## 14. SECURITY & COMPLIANCE

### 14.1 Authentication Security

```
✅ JWT Implementation:
- Access token: 15-minute expiry
- Refresh token: 7-day expiry
- Automatic token rotation
- Token stored in httpOnly cookies

✅ Password Security:
- Bcrypt hashing (10 salt rounds)
- Minimum 6 characters
- No plaintext transmission
- Secure cookie flags

✅ Session Management:
- Cookie attributes:
  - httpOnly: true (JS cannot access)
  - secure: true (HTTPS only in prod)
  - sameSite: "strict" (CSRF protection)

Refresh Token Rotation:
- New refresh token on each refresh
- Prevent token replay attacks
- Secure logout implementation
```

### 14.2 Input Validation & Sanitization

```
✅ Zod Schema Validation:
- Type-safe schema definitions
- Automatic coercion and validation
- Frontend validation (user experience)
- Backend validation (security layer)

✅ Validation Points:
- User registration (email, password, phone)
- Trip creation (dates, budget)
- Place creation (coordinates, name)
- Query parameters (pagination, filters)

⚠️ TODO - Phase 2:
- SQL injection prevention (already protected by Mongoose)
- XSS protection (Content Security Policy headers)
- CORS rate limiting enhancement
```

### 14.3 Data Protection

```
In Transit:
✅ HTTPS/TLS 1.3 (production)
✅ Encrypted cookies
✅ Secure headers

At Rest:
⚠️ TODO: MongoDB encryption
⚠️ TODO: PII encryption (AES-256)
⚠️ TODO: Field-level encryption

Access Control:
✅ JWT-based authentication
✅ Role-based authorization
✅ Resource ownership validation
✅ Rate limiting on sensitive endpoints
```

### 14.4 Compliance

```
GDPR (Phase 2):
- User data access requests
- Right to deletion
- Data portability
- Privacy policy compliance

CCPA (Phase 2):
- California privacy rights
- Data collection disclosure
- Opt-out mechanisms

SOC 2 (Phase 3):
- Security audit
- Compliance certification
- Regular assessments
```

---

## 15. PERFORMANCE REQUIREMENTS

### 15.1 Frontend Performance Targets

| Metric | Target | Current | Improvement |
|--------|--------|---------|------------|
| Lighthouse Score | 85+ | ~70 | ⚠️ +15 needed |
| First Contentful Paint | < 1.5s | 1.8-2.2s | ⚠️ -300ms needed |
| Largest Contentful Paint | < 2.5s | 2.8-3.5s | ⚠️ -500ms needed |
| Cumulative Layout Shift | < 0.1 | ~0.08 | ✅ Good |
| Time to Interactive | < 3s | 3-4s | ⚠️ -1s needed |

### 15.2 Backend Performance Targets

| Endpoint | Target | Current | Status |
|----------|--------|---------|--------|
| GET /trips | < 300ms | 350ms | ⚠️ Close |
| GET /destinations | < 500ms | 600ms | ⚠️ Needs optimization |
| POST /trips | < 400ms | 450ms | ⚠️ Borderline |
| GET /spontaneous/nearby | < 800ms | 850ms | ⚠️ Borderline |

### 15.3 Optimizations Implemented (v2.0)

```
✅ React Query:
- Automatic caching (5-minute stale time)
- Background refetching
- Query deduplication
- Optimistic updates

✅ Frontend:
- Code splitting (dynamic imports ready)
- Image lazy loading
- Tailwind CSS optimization
- Bundle size: ~150KB (gzipped)

✅ Backend:
- Database indexing for geospatial queries
- Query optimization
- Pagination support

⚠️ TODO - Phase 2:
- Redis caching layer
- API response compression
- CDN for static assets
- Service Worker for offline
```

---

## 16. SCALABILITY

### 16.1 Current Architecture Limits

```
Single Node:
- Concurrent connections: ~1,000
- Requests/minute: ~10,000
- MongoDB storage: Single instance (< 10GB)
- Response time: Degradation at > 5,000 concurrent

Bottlenecks:
- Single backend process
- Single MongoDB instance
- No caching layer
- No static asset CDN
```

### 16.2 Phase 1 Scaling (100K MAU)

```
Timeline: Months 3-4

Components:
- Load balancer (Nginx/HAProxy)
- 3-5 backend replicas
- MongoDB replica set (3 nodes)
- Redis cache cluster (3 nodes)
- CloudFlare CDN
- S3 for uploads (optional)

Expected Capacity:
- 100K monthly active users
- 5,000 concurrent users
- 50,000 requests/minute
- Sub-second response times
```

### 16.3 Phase 2 Scaling (1M MAU)

```
Timeline: Months 6-12

Components:
- Kubernetes orchestration
- Microservices (auth, trips, destinations)
- MongoDB sharding by geography
- Elasticsearch for full-text search
- Kafka for event streaming
- Distributed caching (Redis cluster)
- Global CDN

Architecture:
- API Gateway (Kong/AWS API Gateway)
- Service mesh (Istio)
- Database replication across regions
- Event-driven architecture
- Distributed tracing (Jaeger)
```

---

## 17. DEPLOYMENT & DEVOPS

### 17.1 Deployment Environments

```
Development:
- Local machine
- Vite dev server
- nodemon backend
- Local MongoDB

Staging:
- Cloud VM (AWS EC2 / Digital Ocean)
- Docker containers
- Staging MongoDB
- SSL certificates
- Environment configuration

Production:
- Cloud platform (AWS / Digital Ocean / GCP)
- Docker Kubernetes (Phase 2)
- MongoDB Atlas (managed)
- CloudFlare CDN
- Auto-scaling
- Monitoring & alerts
```

### 17.2 CI/CD Pipeline (GitHub Actions)

```yaml
Trigger: Push to main

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

### 17.3 Database Deployment

```
Development: Local MongoDB
Staging: MongoDB Atlas (managed)
Production: MongoDB Atlas + automated backups

Backup Strategy:
- Automated daily backups
- Point-in-time recovery (last 35 days)
- Regular restoration tests

Migration Strategy:
- Zero-downtime deployments
- Blue-green deployments
- Canary releases
```

---

## 18. TESTING STRATEGY

### 18.1 Unit Testing

```
Framework: Jest
Coverage Target: 70%+

Areas:
- Model validations (User, Trip, Destination)
- Utility functions (calculations, formatting)
- Validation schemas (Zod)
- Error handling
- Authentication logic

Example:
```javascript
describe('Zod Validation', () => {
  it('should validate trip schema', () => {
    const validTrip = {
      title: "Goa Trip",
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000),
      totalBudget: 50000
    };
    
    const result = tripSchema.safeParse(validTrip);
    expect(result.success).toBe(true);
  });
});
```

### 18.2 Integration Testing

```
Framework: Jest + Supertest
Areas:
- API endpoints
- Database operations
- Auth flow
- Error responses
- React Query integration

Example:
```javascript
it('should fetch nearby destinations with geolocation', async () => {
  const response = await request(app)
    .post('/api/v1/spontaneous/nearby-destinations')
    .send({
      latitude: 28.7041,
      longitude: 77.1025,
      radius: 50
    });
  
  expect(response.status).toBe(200);
  expect(response.body.destinations).toBeArray();
});
```

### 18.3 Performance Testing

```
Framework: Apache JMeter / Artillery

Scenarios:
- 1000 concurrent users
- Sustained load (30 minutes)
- Spike testing
- Database connection pooling stress

Metrics:
- Response time (p50, p95, p99)
- Error rate (target: < 0.1%)
- Throughput (req/sec)
```

### 18.4 Security Testing

```
Areas:
- JWT token validation
- Authorization checks
- Input sanitization (Zod)
- Rate limiting
- CORS configuration

Tools:
- OWASP ZAP
- Burp Suite Community
- npm audit

Checklist:
- SQL injection attempts (protected by Mongoose)
- XSS payload testing
- CSRF token validation
- Password reset security
```

---

## 19. SUCCESS METRICS

### 19.1 Product Metrics

| Metric | 3-Month | 6-Month | 12-Month |
|--------|---------|---------|----------|
| Monthly Active Users | 500 | 1,000 | 5,000 |
| Daily Active Users | 100 | 200 | 1,000 |
| Trips Created | 200 | 500 | 2,500 |
| Spontaneous Trips | N/A | 100 | 500 |
| Avg Trips/User | 2.5 | 3 | 4 |
| User Retention (30-day) | 35% | 50% | 65% |

### 19.2 Technical Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| API Uptime | 99.5% | N/A | 📈 Tracking |
| Avg Response Time | < 500ms | 400-600ms | ⚠️ Optimizing |
| Error Rate | < 0.1% | TBD | 📈 Tracking |
| Page Load Time | < 2s | 2-3s | ⚠️ Optimizing |
| Code Coverage | 70%+ | ~40% | 📈 In Progress |

### 19.3 Business Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| NPS Score | 40+ | TBD | 📈 Tracking |
| User Satisfaction | 4.5/5 | TBD | 📈 Tracking |
| Support Response Time | < 24hrs | N/A | 📈 Ready |
| Churn Rate | < 5%/month | N/A | 📈 Tracking |
| Feature Adoption | 70%+ | N/A | 📈 Tracking |

---

## 20. ROADMAP & MILESTONES

### Phase 1: Enhanced MVP ✅ COMPLETE
**June 2026**

**Completed:**
- [x] Spontaneous travel feature (geolocation)
- [x] React Query integration
- [x] Zod validation schemas
- [x] Google Generative AI integration
- [x] Interactive maps (Leaflet)
- [x] Real-time weather
- [x] State-based filtering

**Metrics:**
- 50+ active users
- ~100 destinations in database
- ~200 places catalogued

---

### Phase 2: Performance & Scale 🔄 PLANNED
**July-August 2026**

**Features:**
- [ ] Redis caching layer
- [ ] Database query optimization
- [ ] Image CDN (Cloudinary)
- [ ] Advanced analytics dashboard
- [ ] Budget breakdown tracking
- [ ] Trip sharing feature
- [ ] Email notifications
- [ ] Payment integration (Stripe)

**Infrastructure:**
- [ ] Load balancer setup
- [ ] MongoDB replica set
- [ ] CI/CD automation
- [ ] Monitoring (Sentry, New Relic)

---

### Phase 3: Enterprise Features 📋 PLANNED
**September-October 2026**

**Features:**
- [ ] Group trip collaboration (real-time)
- [ ] Advanced AI itineraries
- [ ] Mobile app (React Native)
- [ ] Multi-language support (i18n)
- [ ] Multi-currency support
- [ ] User reviews & ratings
- [ ] Social sharing
- [ ] API for partners

---

### Phase 4: Global Scale 🚀 FUTURE
**2027+**

**Targets:**
- [ ] 100K monthly active users
- [ ] Microservices architecture
- [ ] Kubernetes orchestration
- [ ] SOC 2 compliance
- [ ] International expansion
- [ ] Machine learning recommendations

---

## 21. RISK ASSESSMENT

### 21.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| API Rate Limiting (Google AI) | High | Medium | Implement queue, cache results |
| Geolocation Privacy Issues | High | Low | User opt-in, privacy policy |
| Database Corruption | Critical | Low | Automated backups, recovery tests |
| External API Failures | Medium | Low | Fallback cached data, retry logic |
| Performance Degradation | High | Medium | Load testing, horizontal scaling |

### 21.2 Business Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| Low User Adoption | High | Medium | Marketing, user research, UX improvements |
| Competitor Emergence | Medium | High | Unique features (AI), community building |
| Feature Scope Creep | High | High | Strict prioritization, MVP focus |
| Team Turnover | High | Low | Documentation, knowledge sharing, culture |

### 21.3 Security Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| Data Breach | Critical | Low | Encryption, security audits, 2FA (Phase 2) |
| Brute Force Attacks | Medium | Medium | Rate limiting, CAPTCHA (Phase 2) |
| Session Hijacking | High | Low | Secure cookies, short expiry, HTTPS |
| AI Content Misuse | Medium | Low | Content review, terms of service |

---

## 22. APPENDICES

### Appendix A: Technology Stack Summary

```
FRONTEND:
- React 19 + Vite (build)
- Tailwind CSS 4 (styling)
- Leaflet + React Leaflet (maps)
- React Query (data fetching)
- Zod (validation)
- Lucide React (icons)
- Axios (HTTP client)

BACKEND:
- Express.js 5 (framework)
- Node.js 18+ (runtime)
- MongoDB (database)
- Mongoose (ODM)
- JWT (authentication)
- Bcrypt (password hashing)
- Zod (server-side validation)
- Google Generative AI SDK

EXTERNAL SERVICES:
- OpenWeatherMap (weather)
- Google Generative AI (insights)
- Browser Geolocation API (location)
- Leaflet/OSM (maps)
```

### Appendix B: File Structure (v2.0)

```
Tourism-PLanner/
├── Backend/
│   ├── src/
│   │   ├── Index.js
│   │   ├── App.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── trip.controller.js
│   │   │   ├── destination.controller.js
│   │   │   ├── place.controller.js
│   │   │   └── spontaneous.controller.js (NEW)
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   │   ├── externalApi.service.js
│   │   │   ├── geolocation.service.js (NEW)
│   │   │   └── aiInsights.service.js (NEW)
│   │   ├── schemas/ (NEW)
│   │   │   ├── tripSchema.js
│   │   │   ├── authSchema.js
│   │   │   └── placeSchema.js
│   │   ├── utils/
│   │   └── database/
│   ├── package.json (updated)
│   ├── .env.example
│   └── README.md
│
├── Frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── Features/
│   │   │   ├── Auth/
│   │   │   ├── Trips/
│   │   │   ├── Destinations/
│   │   │   ├── Places/
│   │   │   ├── Spontaneous/ (NEW)
│   │   │   └── DashBoard/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── schemas/ (NEW)
│   │   │   ├── tripSchema.js
│   │   │   ├── authSchema.js
│   │   │   └── placeSchema.js
│   │   └── temp/
│   ├── package.json (updated)
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── PROJECT_REQUIREMENT_DOCUMENT.md (v2.0 - THIS FILE)
├── README.md
└── .gitignore
```

### Appendix C: Latest Dependencies

**Backend (package.json)**
```json
{
  "dependencies": {
    "@google/genai": "^2.7.0",
    "bcrypt": "^6.0.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.6.1",
    "nodemon": "^3.1.14",
    "prettier": "^3.8.3",
    "zod": "^4.4.3"
  }
}
```

**Frontend (package.json)**
```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.3.0",
    "@tanstack/react-query": "^5.100.14",
    "@tanstack/react-query-devtools": "^5.100.14",
    "axios": "^1.16.1",
    "leaflet": "^1.9.4",
    "lucide-react": "^1.17.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-leaflet": "^5.0.0",
    "react-router-dom": "^7.16.0",
    "tailwindcss": "^4.3.0"
  }
}
```

### Appendix D: Environment Variables Template

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
GOOGLE_AI_API_KEY=your-google-genai-api-key

# Redis (Phase 2)
REDIS_HOST=localhost
REDIS_PORT=6379

# Frontend .env
VITE_API_URL=http://localhost:5000
VITE_WEATHER_API_KEY=your-openweathermap-key
VITE_GOOGLE_AI_API_KEY=your-google-genai-api-key
```

### Appendix E: Performance Checklist

**Before Production:**
- [ ] Load test with 1000 concurrent users
- [ ] Verify API response times < 500ms (p95)
- [ ] Check database query times < 100ms
- [ ] Lighthouse score > 85
- [ ] All endpoints tested
- [ ] Error handling verified
- [ ] Security headers configured
- [ ] SSL certificates valid
- [ ] Monitoring configured
- [ ] Backups automated

**After Deployment:**
- [ ] Health check endpoint returns 200
- [ ] Error rate < 0.1%
- [ ] Response times monitored
- [ ] Database connections stable
- [ ] All critical flows tested
- [ ] Logs aggregated
- [ ] Alerts configured
- [ ] 24-hour monitoring

---

## DOCUMENT METADATA

| Property | Value |
|----------|-------|
| **Document Type** | PRD v2.0 (Updated) |
| **Version** | 2.0 |
| **Status** | Active Development |
| **Last Modified** | June 4, 2026 |
| **Owner** | Rupeshkumar-2004 |
| **Latest Commit** | `133fcea90311d7fc0ab0cb430f5e6981a562e601` |
| **Commit Message** | Spontaneous travel feature with geolocation |
| **Next Review** | July 1, 2026 |

---

## KEY IMPROVEMENTS IN v2.0

✅ **React Query Integration** - Advanced caching and data management  
✅ **Zod Validation** - Type-safe schema validation across stack  
✅ **Google Generative AI** - AI-powered destination insights  
✅ **Spontaneous Travel** - Geolocation-based trip suggestions  
✅ **Interactive Maps** - Leaflet-based visualization  
✅ **Real-Time Weather** - Current and forecast data  
✅ **Enhanced Architecture** - Better scalability & performance  
✅ **Improved Security** - Enhanced validation and error handling  

---

**END OF PROJECT REQUIREMENT DOCUMENT v2.0**

This updated document reflects the latest developments and provides a comprehensive guide for the Tourism Planner application in its current state with cutting-edge features and technologies.

For the latest commits and updates, visit: https://github.com/Rupeshkumar-2004/Tourism-PLanner
