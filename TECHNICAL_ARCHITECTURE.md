# TECHNICAL ARCHITECTURE DOCUMENT
## Tourism Planner v2.0 - Full Stack Web Application

**Document Version:** 1.0  
**Last Updated:** June 6, 2026  
**Language Composition:** JavaScript 99.2% (React Frontend, Express Backend)  
**Repository:** https://github.com/Rupeshkumar-2004/Tourism-Planner  
**Status:** Active Development

---

## TABLE OF CONTENTS

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Diagram](#architecture-diagram)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture](#backend-architecture)
6. [Database Design](#database-design)
7. [API Architecture](#api-architecture)
8. [Data Flow](#data-flow)
9. [Integration Points](#integration-points)
10. [Security Architecture](#security-architecture)
11. [Scalability & Performance](#scalability--performance)
12. [Deployment Architecture](#deployment-architecture)
13. [Module Dependencies](#module-dependencies)
14. [Error Handling](#error-handling)
15. [Best Practices & Patterns](#best-practices--patterns)

---

## 1. SYSTEM OVERVIEW

### 1.1 Project Description

Tourism Planner is a **full-stack AI-powered web application** designed to help users plan, organize, and manage trips efficiently. It combines traditional trip planning features with intelligent AI recommendations and spontaneous travel discovery through geolocation-based suggestions.

### 1.2 Architecture Type

- **Type:** Monolithic Full-Stack Application
- **Frontend:** Single-Page Application (SPA) with React
- **Backend:** REST API with Express.js
- **Database:** MongoDB (NoSQL)
- **Communication:** HTTP/HTTPS with JWT authentication

### 1.3 Key Characteristics

```
├── Full-Stack JavaScript (99.2%)
├── AI-Powered (Google Generative AI)
├── Real-Time Capable (WebSockets ready)
├── Mobile Responsive (Tailwind CSS)
├── Cloud-Ready (Environment-based configuration)
├── Type-Safe (Zod validation)
├── Optimized Caching (React Query)
└── Geolocation-Based Services
```

---

## 2. TECHNOLOGY STACK

### 2.1 Frontend Technology Stack

```javascript
{
  "Runtime": "Node.js (ES Modules)",
  "Framework": "React 19.2.6",
  "Build Tool": "Vite 8.0.12",
  "Styling": {
    "Tailwind CSS": "4.3.0",
    "Icons": "lucide-react 1.17.0"
  },
  "Data Management": {
    "State Management": "Context API",
    "Data Fetching": "@tanstack/react-query 5.100.14",
    "Debugging": "@tanstack/react-query-devtools 5.100.14",
    "HTTP Client": "axios 1.16.1"
  },
  "Routing": "react-router-dom 7.16.0",
  "Maps": {
    "Leaflet": "1.9.4",
    "React Leaflet": "5.0.0"
  },
  "Validation": "zod 4.4.3",
  "Development": {
    "ESLint": "10.3.0",
    "TypeScript Types": "@types/react 19.2.14, @types/react-dom 19.2.3"
  }
}
```

### 2.2 Backend Technology Stack

```javascript
{
  "Runtime": "Node.js (ES Modules)",
  "Framework": "Express.js 5.2.1",
  "Database": "MongoDB 9.6.1 (Mongoose ODM)",
  "Authentication": {
    "JWT": "jsonwebtoken 9.0.3",
    "Password Hashing": "bcrypt 6.0.0"
  },
  "Middleware": {
    "CORS": "cors 2.8.6",
    "Cookie Parser": "cookie-parser 1.4.7"
  },
  "Validation": "zod 4.4.3",
  "AI Integration": "@google/genai 2.7.0",
  "Environment": "dotenv 17.4.2",
  "Code Quality": "prettier 3.8.3",
  "Development": "nodemon 3.1.14"
}
```

### 2.3 Database & External Services

```
Primary Database:
├── MongoDB (NoSQL)
│   ├── Collections: Users, Destinations, Trips, Places
│   ├── Indexes: Text search, Geospatial (2dsphere), Compound
│   └── Replication: Ready for replica sets

External APIs:
├── Google Generative AI (@google/genai) - AI insights
├── OpenWeatherMap API - Real-time weather
├── Geolocation Services - Browser Geolocation API
├── OpenStreetMap - Base map tiles (via Leaflet)
└── Google Maps (planned) - Navigation
```

---

## 3. ARCHITECTURE DIAGRAM

### 3.1 High-Level System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     CLIENT TIER (Browser)                    │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │          React 19 SPA (Vite-powered)                  │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ Pages: Auth, Trips, Destinations, Spontaneous   │ │ │
│  │  │ Components: Maps, Weather, Cards, Forms         │ │ │
│  │  │ State: Context API + React Query (Caching)      │ │ │
│  │  │ Validation: Zod Schemas                         │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                                                         │ │
│  │  Rendering: Tailwind CSS + Lucide React Icons        │ │
│  │  Maps: Leaflet + React Leaflet Integration           │ │
│  │  HTTP: Axios with JWT Bearer tokens                  │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
         │
         │ HTTP/HTTPS + JWT Authentication
         │ Geolocation API Calls
         │ Weather Service Requests
         │
         ▼
┌──────────────────────────────────────────────────────────────┐
│                   API GATEWAY TIER (Future)                  │
│              Nginx/HAProxy Load Balancing                    │
│          Rate Limiting, SSL/TLS Termination                 │
└──────────────────────────────────────────────────────────────┘
         │
         │ HTTP
         │
         ▼
┌──────────────────────────────────────────────────────────────┐
│               APPLICATION TIER (Backend)                      │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Express.js Server (Node.js)                   │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ Route Handlers:                                 │ │ │
│  │  │  ├── /api/v1/auth/*      (Authentication)      │ │ │
│  │  │  ├── /api/v1/trips/*     (Trip Management)     │ │ │
│  │  │  ├── /api/v1/destinations/* (Destinations)    │ │ │
│  │  │  ├── /api/v1/places/*    (Places)             │ │ │
│  │  │  └── /api/v1/spontaneous/* (Spontaneous)     │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                                                         │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ Middleware Stack:                               │ │ │
│  │  │  ├── Error Handling                             │ │ │
│  │  │  ├── CORS                                       │ │ │
│  │  │  ├── Authentication/Authorization               │ │ │
│  │  │  ├── Request Validation (Zod)                  │ │ │
│  │  │  └── Logging                                    │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                                                         │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ Business Logic Layer:                            │ │ │
│  │  │  ├── Trip Services                              │ │ │
│  │  │  ├── Destination Services                       │ │ │
│  │  │  ├── Authentication Services                    │ │ │
│  │  │  ├── Geolocation Services                       │ │ │
│  │  │  ├── AI Insights Services                       │ │ │
│  │  │  └── External API Services                      │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │                                                         │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ Global Error Handling:                           │ │ │
│  │  │  ├── Uncaught Exceptions                        │ │ │
│  │  │  ├── Unhandled Promise Rejections               │ │ │
│  │  │  ├── Process Signal Handlers (SIGINT, SIGTERM)  │ │ │
│  │  │  └── Graceful Server Shutdown                   │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
         │
         │ MongoDB Driver Queries
         │ Connection Pooling
         │ Transactions (where applicable)
         │
         ▼
┌──────────────────────────────────────────────────────────────┐
│                  DATA PERSISTENCE TIER                        │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │            MongoDB Database                           │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ Collections:                                     │ │ │
│  │  │  ├── users (with geolocation & preferences)    │ │ │
│  │  │  │   └── Indexes: email (unique), geolocation  │ │ │
│  │  │  ├── destinations (with AI insights)           │ │ │
│  │  │  │   └── Indexes: 2dsphere, text, category     │ │ │
│  │  │  ├── trips (with user & date info)             │ │ │
│  │  │  │   └── Indexes: createdBy, startDate, budget │ │ │
│  │  │  └── places (with location & category)         │ │ │
│  │  │      └── Indexes: destination, 2dsphere        │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘

External Services (Parallel):
┌──────────────────────────────────────────────────────────────┐
│  ├── Google Generative AI (AI Insights)                     │
│  ├── OpenWeatherMap API (Weather Data)                      │
│  ├── Geolocation Services (Browser API)                     │
│  ├── OpenStreetMap/Leaflet (Base Maps)                      │
│  └── Google Maps (Future Navigation)                        │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. FRONTEND ARCHITECTURE

### 4.1 Directory Structure

```
Frontend/
├── src/
│   ├── main.jsx                    # Entry point
│   ├── App.jsx                     # Root component
│   ├── App.css                     # Root styles
│   ├── index.css                   # Global styles (Tailwind)
│   │
│   ├── Routes/                     # Route definitions
│   │   ├── PublicRoutes.jsx
│   │   ├── ProtectedRoutes.jsx
│   │   └── index.jsx
│   │
│   ├── Features/                   # Feature modules
│   │   ├── Auth/                   # Authentication
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── services/
│   │   ├── Trips/                  # Trip management
│   │   ├── Destinations/           # Destination browsing
│   │   ├── Places/                 # Place management
│   │   ├── Spontaneous/            # Spontaneous travel (NEW)
│   │   └── Dashboard/              # User dashboard
│   │
│   ├── components/                 # Reusable components
│   │   ├── Map/                    # Leaflet wrapper
│   │   ├── Weather/                # Weather display
│   │   ├── Cards/                  # Destination, Trip, Place cards
│   │   ├── Forms/                  # Form components (Zod validation)
│   │   ├── Navigation/             # Navigation components
│   │   └── Modals/                 # Modal dialogs
│   │
│   ├── context/                    # Context API
│   │   ├── AuthContext.jsx         # Authentication state
│   │   └── AppContext.jsx          # Global app state
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAuth.js              # Auth hook
│   │   ├── useGeolocation.js       # Geolocation hook (NEW)
│   │   └── useTripForm.js          # Form hook
│   │
│   ├── services/                   # API services & React Query
│   │   ├── authService.js
│   │   ├── tripService.js
│   │   ├── destinationService.js
│   │   ├── placeService.js
│   │   ├── spontaneousService.js   # (NEW)
│   │   └── weatherService.js
│   │
│   └── schemas/                    # Zod validation schemas
│       ├── authSchema.js
│       ├── tripSchema.js
│       ├── placeSchema.js
│       └── destinationSchema.js
│
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind configuration
├── eslint.config.js                # ESLint rules
└── index.html                      # HTML entry point
```

### 4.2 State Management Architecture

```
React Context API:
├── AuthContext
│   ├── user: { _id, fullName, email, role }
│   ├── tokens: { accessToken, refreshToken }
│   ├── isAuthenticated: boolean
│   └── methods: login(), logout(), register()
│
└── AppContext (Optional for future expansion)
    ├── notifications
    ├── loading states
    └── global preferences

React Query Caching:
├── Queries (GET requests)
│   ├── trips: { staleTime: 5m, cacheTime: 30m }
│   ├── destinations: { staleTime: 5m, cacheTime: 30m }
│   ├── places: { staleTime: 5m, cacheTime: 30m }
│   └── weather: { staleTime: 30m, cacheTime: 1h }
│
└── Mutations (POST/PATCH/DELETE requests)
    ├── createTrip: { onSuccess: refetch }
    ├── updateTrip: { onSuccess: refetch }
    ├── deleteTrip: { onSuccess: refetch }
    └── optimistic updates available
```

### 4.3 Component Hierarchy

```
<App>
  ├── <AuthContext.Provider>
  │   ├── <QueryClientProvider>
  │   │   └── <Routes>
  │   │       ├── <PublicRoutes>
  │   │       │   ├── <LoginPage>
  │   │       │   └── <RegisterPage>
  │   │       │
  │   │       ├── <ProtectedRoutes>
  │   │       │   ├── <Layout>
  │   │       │   │   ├── <Navigation>
  │   │       │   │   └── <Outlet /> (Page content)
  │   │       │   │
  │   │       │   ├── <TripsPage>
  │   │       │   │   └── <TripCard /> (multiple)
  │   │       │   ├── <TripDetailPage>
  │   │       │   │   ├── <TripHeader>
  │   │       │   │   ├── <Map> (Leaflet)
  │   │       │   │   └── <PlacesList>
  │   │       │   │
  │   │       │   ├── <DestinationsPage>
  │   │       │   │   ├── <FilterPanel>
  │   │       │   │   └── <DestinationGrid>
  │   │       │   │       └── <DestinationCard /> (multiple)
  │   │       │   │
  │   │       │   ├── <SpontaneousTravelPage> (NEW)
  │   │       │   │   ├── <GeolocationButton>
  │   │       │   │   ├── <Map> (with user location)
  │   │       │   │   └── <NearbyDestinationsList>
  │   │       │   │
  │   │       │   └── <DashboardPage>
  │   │       │       ├── <TripStatistics>
  │   │       │       ├── <RecentTrips>
  │   │       │       └── <Budget Overview>
  │   │       │
  │   │       └── <NotFoundPage>
  │   │
  │   └── <ReactQueryDevtools /> (Development only)
  │
  └── Error Boundary (Future)
```

### 4.4 Data Flow Pattern (React Query Example)

```javascript
// Service Layer (API calls)
tripService.js:
├── getTripsList() → GET /api/v1/trips
├── getTripById(id) → GET /api/v1/trips/:id
├── createTrip(data) → POST /api/v1/trips
├── updateTrip(id, data) → PATCH /api/v1/trips/:id
└── deleteTrip(id) → DELETE /api/v1/trips/:id

// React Query Hooks
useGetTrips():
├── useQuery({
│   ├── queryKey: ['trips'],
│   ├── queryFn: () => tripService.getTripsList(),
│   ├── staleTime: 5 * 60 * 1000,
│   └── cacheTime: 30 * 60 * 1000
│   })
│
useCreateTrip():
├── useMutation({
│   ├── mutationFn: (data) => tripService.createTrip(data),
│   └── onSuccess: () => queryClient.invalidateQueries(['trips'])
│   })

// Component Usage
<TripsPage>
├── const { data: trips, isLoading } = useGetTrips()
├── const { mutate: createTrip } = useCreateTrip()
└── Render trips with loading state

Data Flow:
User Action → React Query Mutation → API Call → Backend → DB → Response → Cache Update → Component Re-render
```

---

## 5. BACKEND ARCHITECTURE

### 5.1 Directory Structure

```
Backend/
├── src/
│   ├── Index.js                    # Entry point (Server startup)
│   ├── App.js                      # Express app configuration
│   │
│   ├── routes/                     # API route handlers
│   │   ├── auth.route.js
│   │   ├── trip.route.js
│   │   ├── destination.route.js
│   │   ├── place.route.js
│   │   ├── spontaneous.route.js    # (NEW)
│   │   └── index.js                # Route aggregator
│   │
│   ├── controllers/                # Route controllers
│   │   ├── auth.controller.js
│   │   ├── trip.controller.js
│   │   ├── destination.controller.js
│   │   ├── place.controller.js
│   │   └── spontaneous.controller.js # (NEW)
│   │
│   ├── services/                   # Business logic
│   │   ├── externalApi.service.js  # Weather, AI APIs
│   │   ├── geolocation.service.js  # Geospatial queries (NEW)
│   │   ├── aiInsights.service.js   # Google Generative AI (NEW)
│   │   └── auth.service.js         # Auth logic
│   │
│   ├── models/                     # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── destination.model.js
│   │   ├── trip.model.js
│   │   └── place.model.js
│   │
│   ├── middlewares/                # Express middleware
│   │   ├── auth.middleware.js      # JWT verification
│   │   ├── error.middleware.js     # Global error handler
│   │   ├── validation.middleware.js # Zod validation
│   │   └── cors.middleware.js      # CORS configuration
│   │
│   ├── schemas/                    # Zod validation schemas
│   │   ├── auth.schema.js
│   │   ├── trip.schema.js
│   │   ├── place.schema.js
│   │   └── spontaneous.schema.js   # (NEW)
│   │
│   ├── database/                   # Database connection
│   │   └── db.js                   # MongoDB connection setup
│   │
│   ├── utils/                      # Utility functions
│   │   ├── asyncHandler.js         # Async error wrapper
│   │   ├── validation.js           # Validation helpers
│   │   ├── distance.js             # Distance calculation
│   │   └── logger.js               # Logging utility
│   │
│   └── scripts/                    # Database scripts
│       └── seedData.js             # Sample data seeding
│
├── .env                            # Environment variables
├── package.json                    # Dependencies
└── .gitignore
```

### 5.2 Server Initialization Flow

```
Index.js (Server Startup):
├── 1. Global Error Handlers Setup
│   ├── process.on('uncaughtException', ...)
│   └── process.on('unhandledRejection', ...)
│
├── 2. Load Environment Variables
│   └── dotenv.config({ path: './.env' })
│
├── 3. Connect to MongoDB
│   └── connectDB() [async]
│   │   ├── Establishes connection
│   │   ├── Validates connection
│   │   └── Logs connection status
│   │
├── 4. Initialize Express Server
│   └── app.listen(PORT, ...)
│   │   ├── Server now listening
│   │   ├── Log environment info
│   │   └── Store server reference for graceful shutdown
│   │
└── 5. Error Handling
    ├── If DB fails → exit(1)
    └── If async error → close server gracefully → exit(1)

App.js (Express Configuration):
├── 1. Middleware Stack (Order matters!)
│   ├── express.json() - Parse JSON
│   ├── express.urlencoded() - Parse form data
│   ├── cookieParser() - Parse cookies
│   ├── cors() - CORS handling
│   └── Custom middleware
│       ├── requestLogger
│       └── requestValidator
│
├── 2. Route Registration
│   ├── /api/v1/auth
│   ├── /api/v1/trips
│   ├── /api/v1/destinations
│   ├── /api/v1/places
│   └── /api/v1/spontaneous
│
├── 3. Error Handling Middleware
│   └── globalErrorHandler (last middleware)
│
└── 4. 404 Handler
    └── Route not found handler
```

### 5.3 Request/Response Lifecycle

```
Client Request
    │
    ▼
Express Middleware Chain:
    ├── 1. Parser Middleware (JSON, urlencoded, cookies)
    ├── 2. CORS Middleware
    ├── 3. Custom Logger Middleware
    ├── 4. Route Handler
    │   │
    │   ▼
    │   Matched Route:
    │   ├── Route Parameters Extraction
    │   └── Route Specific Middleware
    │
    ├── 5. Controller Function
    │   │
    │   ▼
    │   ├── Extract Request Data
    │   ├── Validate (Zod Schema)
    │   ├── Call Service Layer
    │   │   │
    │   │   ▼
    │   │   Service Functions:
    │   │   ├── Business Logic
    │   │   ├── External API Calls (if needed)
    │   │   ├── Database Queries (Mongoose)
    │   │   └── Return Result
    │   │
    │   ├── Construct Response
    │   └── Send Response
    │
    ├── 6. Error Middleware (if error occurs)
    │   ├── Catch error
    │   ├── Log error
    │   ├── Format error response
    │   └── Send error response
    │
    └── 7. Response Sent to Client

Response Handling:
├── Status Code (200, 201, 400, 401, 404, 500, etc.)
├── Headers (Content-Type, Cookies, etc.)
└── Body
    ├── Success: { data: {...}, message: "..." }
    └── Error: { message: "...", errors: [...] }
```

### 5.4 Authentication Flow

```
Registration:
1. POST /api/v1/auth/register
2. Request Body: { fullName, email, password, phone }
3. Validation: Zod schema check
4. Password: Hash with bcrypt (10 rounds)
5. Create User: Save to MongoDB
6. Generate Tokens:
   ├── accessToken (15 min, httpOnly cookie)
   └── refreshToken (7 days, httpOnly cookie)
7. Response: { user, accessToken, refreshToken }

Login:
1. POST /api/v1/auth/login
2. Request Body: { email, password }
3. Validation: User exists? Password matches?
4. Generate Tokens
5. Return tokens

Protected Route Access:
1. Client sends request with Authorization header
   └── Authorization: Bearer <accessToken>
2. Auth Middleware:
   ├── Extract token from header
   ├── Verify token (JWT)
   ├── Extract user info from payload
   └── Attach user to request object (req.user)
3. Controller receives authenticated request
4. Proceed with business logic

Token Refresh:
1. POST /api/v1/auth/refresh-token
2. Request: { refreshToken }
3. Backend:
   ├── Verify refreshToken
   ├── Generate new accessToken
   └── Rotate refreshToken (optional)
4. Return new tokens
```

---

## 6. DATABASE DESIGN

### 6.1 MongoDB Schema Design

#### User Schema
```javascript
{
  _id: ObjectId,
  fullName: String (3-50 chars, required),
  email: String (unique, required),
  password: String (hashed, min 6 chars),
  phone: String (10-digit, optional),
  profilePicture: String (URL, optional),
  role: String (enum: ["user", "guide", "admin"], default: "user"),
  refreshToken: String (for logout),
  
  geolocation: {
    latitude: Number,
    longitude: Number,
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
  
  Indexes:
  ├── email (unique)
  └── geolocation: "2dsphere" (for proximity queries)
}
```

#### Destination Schema
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
    coordinates: [longitude, latitude] // GeoJSON
  },
  
  images: [String] (validated URLs),
  bestTimeToVisit: String,
  estimatedBudget: Number (>= 0),
  category: String (adventure, heritage, nature, city, relaxation),
  tags: [String],
  
  ratings: {
    average: Number (0-5),
    count: Number
  },
  
  aiInsights: {
    summary: String,
    tips: [String],
    culturalInfo: String,
    generatedBy: String,
    generatedAt: Date
  },
  
  createdAt: Date,
  updatedAt: Date,
  
  Indexes:
  ├── city: 1
  ├── country: 1
  ├── category: 1
  ├── estimatedBudget: 1
  ├── location: "2dsphere" (geospatial)
  └── name+city+description: text (full-text search)
}
```

#### Trip Schema
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
  totalBudget: Number (>= 0),
  
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
  
  Indexes:
  ├── createdBy: 1, createdAt: -1
  ├── createdBy: 1, startDate: 1
  ├── createdBy: 1, totalBudget: 1
  └── isPublic: 1, createdAt: -1
}
```

#### Place Schema
```javascript
{
  _id: ObjectId,
  destination: ObjectId (reference, required),
  name: String (required, max 100),
  description: String (max 3000),
  category: String (temple, beach, restaurant, etc.),
  tags: [String],
  
  location: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  
  address: String,
  lat: Number,
  lon: Number,
  images: [String],
  
  distance: Number (from user location),
  rating: Number (0-5),
  reviews: Number,
  
  createdAt: Date,
  updatedAt: Date,
  
  Indexes:
  ├── destination: 1, name: 1 (compound unique)
  ├── destination: 1
  ├── location: "2dsphere"
  └── category: 1
}
```

### 6.2 Indexing Strategy

```
Performance Indexes:
├── User Lookups:
│   ├── email: unique (authentication)
│   └── geolocation: 2dsphere (proximity search)
│
├── Destination Queries:
│   ├── city, state, country: individual indexes
│   ├── category: index (filtering)
│   ├── estimatedBudget: index (range queries)
│   ├── location: 2dsphere (geospatial)
│   └── Text Index: name, city, description (full-text search)
│
├── Trip Queries:
│   ├── createdBy + createdAt (user's trips, sorted)
│   ├── createdBy + startDate (date range)
│   └── createdBy + totalBudget (budget queries)
│
└── Place Queries:
    ├── destination (foreign key lookup)
    ├── location: 2dsphere (proximity search)
    └── category (filtering)

Index Creation:
destination.createIndex({ location: "2dsphere" })
destination.createIndex({ name: "text", city: "text", description: "text" })
user.createIndex({ geolocation: "2dsphere" })
trip.createIndex({ createdBy: 1, createdAt: -1 })
```

### 6.3 Query Optimization

```
Geospatial Queries (Spontaneous Travel):
db.destinations.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [userLon, userLat]
      },
      $maxDistance: 50000 // 50km in meters
    }
  }
})
├── Performance: < 50ms with 2dsphere index
├── Sorting: By distance (automatic with $near)
└── Limiting: Top 5 results

Full-Text Search (Destination Discovery):
db.destinations.find({
  $text: { $search: "beach adventure" }
})
├── Performance: < 100ms with text index
├── Scoring: Relevance-based ranking
└── Limiting: LIMIT 20

Aggregation Pipeline (Dashboard Analytics):
db.trips.aggregate([
  { $match: { createdBy: userId } },
  { $group: {
      _id: null,
      totalTrips: { $sum: 1 },
      avgBudget: { $avg: "$totalBudget" },
      totalSpent: { $sum: "$totalBudget" }
    }
  }
])
```

---

## 7. API ARCHITECTURE

### 7.1 RESTful Endpoints (v1)

#### Authentication Endpoints
```
POST /api/v1/auth/register
├── Body: { fullName, email, password, phone, role }
├── Response: { user, accessToken, refreshToken }
└── Status: 201

POST /api/v1/auth/login
├── Body: { email, password }
├── Response: { user, accessToken, refreshToken }
└── Status: 200

POST /api/v1/auth/refresh-token
├── Body: { refreshToken }
├── Response: { accessToken, refreshToken }
└── Status: 200

POST /api/v1/auth/logout
├── Response: { message: "Logged out" }
└── Status: 200

GET /api/v1/auth/me (Protected)
├── Response: { user }
└── Status: 200
```

#### Trip Endpoints
```
GET /api/v1/trips (Protected)
├── Query: page, limit, status, sortBy
├── Response: { trips: [], pagination }
└── Status: 200

POST /api/v1/trips (Protected)
├── Body: { title, startDate, endDate, totalBudget, destinations }
├── Response: { trip }
└── Status: 201

GET /api/v1/trips/:tripId (Protected)
├── Response: { trip: { ...details, destinations: [...] } }
└── Status: 200

PATCH /api/v1/trips/:tripId (Protected)
├── Body: { title, startDate, endDate, totalBudget, ... }
├── Response: { trip }
└── Status: 200

DELETE /api/v1/trips/:tripId (Protected)
├── Response: { message: "Trip deleted" }
├── Behavior: Cascading delete for trip-destination relations
└── Status: 200
```

#### Destination Endpoints
```
GET /api/v1/destinations
├── Query: page, limit, city, state, category, minBudget, maxBudget, search
├── Response: { destinations: [], pagination }
└── Status: 200

GET /api/v1/destinations/:destinationId
├── Response: { destination: {..., places: [...]} }
└── Status: 200

GET /api/v1/destinations/:destinationId/weather
├── Response: { current: {}, forecast: [] }
└── Status: 200

GET /api/v1/destinations/:destinationId/ai-insights
├── Response: { summary, tips, bestTime, budgetSuggestions }
└── Status: 200
```

#### Place Endpoints
```
GET /api/v1/destinations/:destinationId/places
├── Query: page, limit, category, sort
├── Response: { places: [], pagination }
└── Status: 200

POST /api/v1/places (Protected, Admin/Guide)
├── Body: { destination, name, category, images, location }
├── Response: { place }
└── Status: 201

PATCH /api/v1/places/:placeId (Protected, Admin/Guide)
├── Body: { name, description, category, ... }
├── Response: { place }
└── Status: 200

DELETE /api/v1/places/:placeId (Protected, Admin/Guide)
├── Response: { message: "Place deleted" }
└── Status: 200
```

#### Spontaneous Travel Endpoints (NEW)
```
POST /api/v1/spontaneous/nearby-destinations
├── Body: { latitude, longitude, radius, category }
├── Response: {
│   destinations: [{
│     _id, name, city, distance, estimatedBudget, weather
│   }]
│ }
└── Status: 200

POST /api/v1/spontaneous/quick-trip
├── Body: { destinationId, duration }
├── Response: { trip }
└── Status: 201

GET /api/v1/spontaneous/nearby-places
├── Query: latitude, longitude, destinationId, radius
├── Response: { places: [...] }
└── Status: 200
```

### 7.2 Request/Response Format

#### Success Response Format
```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "...",
      "fullName": "...",
      "email": "..."
    }
  },
  "message": "Operation successful"
}
```

#### Error Response Format
```json
{
  "success": false,
  "statusCode": 400,
  "data": null,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

#### Pagination Format
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasMore": true,
    "hasPrev": false,
    "hasNext": true
  }
}
```

### 7.3 Authentication & Security Headers

```
Request Headers (Protected Routes):
├── Authorization: Bearer <accessToken>
├── Content-Type: application/json
└── Accept: application/json

Response Headers:
├── Content-Type: application/json
├── Access-Control-Allow-Origin: <frontend-url>
├── Access-Control-Allow-Credentials: true
├── Set-Cookie: accessToken=...; HttpOnly; Secure; SameSite=Strict
└── Set-Cookie: refreshToken=...; HttpOnly; Secure; SameSite=Strict

Error Response Headers:
├── Content-Type: application/json
└── Status: 401, 403, 404, 500, etc.
```

---

## 8. DATA FLOW

### 8.1 User Authentication Flow

```
┌─────────────────────────────────────────────┐
│ Frontend: Login Form                        │
└─────────────────────────────────────────────┘
        │
        │ Submit: { email, password }
        │
        ▼
┌─────────────────────────────────────────────┐
│ Axios HTTP Client                           │
│ POST /api/v1/auth/login                     │
└─────────────────────────────────────────────┘
        │
        │ HTTP Request
        │
        ▼
┌─────────────────────────────────────────────┐
│ Backend: Express Router                     │
│ routes/auth.route.js                        │
└─────────────────────────────────────────────┘
        │
        │ Route: POST /auth/login
        │
        ▼
┌─────────────────────────────────────────────┐
│ Controller: auth.controller.js              │
│ - Extract { email, password }               │
│ - Validate input (Zod)                      │
└─────────────────────────────────────────────┘
        │
        │ Call service
        │
        ▼
┌─────────────────────────────────────────────┐
│ Service: auth.service.js                    │
│ - Query: User.findOne({ email })            │
│ - Compare: bcrypt.compare(password)         │
│ - Generate tokens: JWT sign                 │
└─────────────────────────────────────────────┘
        │
        │ DB Query
        │
        ▼
┌─────────────────────────────────────────────┐
│ MongoDB: users collection                   │
│ - Find user by email                        │
│ - Return user document                      │
└─────────────────────────────────────────────┘
        │
        │ User data returned
        │
        ▼
┌─────────────────────────────────────────────┐
│ Backend: Generate Response                  │
│ - accessToken (15 min)                      │
│ - refreshToken (7 days)                     │
│ - User object                               │
│ - Set httpOnly cookies                      │
└─────────────────────────────────────────────┘
        │
        │ HTTP Response (200)
        │ Headers: Set-Cookie with tokens
        │
        ▼
┌─────────────────────────────────────────────┐
│ Frontend: Auth Context                      │
│ - Save tokens (cookies auto-managed)        │
│ - Save user state                           │
│ - Set isAuthenticated = true                │
└─────────────────────────────────────────────┘
        │
        │ Redirect to dashboard
        │
        ▼
┌─────────────────────────────────────────────┐
│ Protected Route Access                      │
│ All future requests include accessToken     │
└─────────────────────────────────────────────┘
```

### 8.2 Trip Creation Flow

```
User Action: Click "Create Trip"
        │
        ▼
Frontend: TripCreateForm (with Zod validation)
├── Validate: title, startDate, endDate, totalBudget
├── Validate: startDate < endDate
└── Validate: budget >= 0
        │
        │ Form valid
        │
        ▼
React Query Mutation: createTrip()
├── Method: POST /api/v1/trips
├── Headers: Authorization: Bearer <token>
└── Body: { title, startDate, endDate, totalBudget, ... }
        │
        │ HTTP Request
        │
        ▼
Backend Controller: createTrip()
├── Extract user from req.user (middleware)
├── Validate body with Zod schema
├── Set createdBy = userId
└── Call tripService.createTrip()
        │
        │ Validation passed
        │
        ▼
Backend Service: tripService.createTrip()
├── Create trip document
├── Save to MongoDB
├── Return saved trip
        │
        │ Trip saved successfully
        │
        ▼
Backend Response: 201
{
  "success": true,
  "data": { trip },
  "message": "Trip created"
}
        │
        │ Response received
        │
        ▼
Frontend: React Query
├── Update cache: trips list
├── Show success notification
├── Redirect to trip detail page
└── Component re-renders with new data
```

### 8.3 Spontaneous Travel Discovery Flow

```
User Action: Click "Find Nearby Trips"
        │
        ▼
Frontend: Request Geolocation Permission
├── navigator.geolocation.getCurrentPosition()
├── User allows/denies
└── Success: { latitude, longitude, accuracy }
        │
        │ Have user location
        │
        ▼
Frontend: Show Loading State
├── Display "Fetching nearby destinations..."
└── Show user location on map
        │
        │ Prepare API call
        │
        ▼
React Query Mutation: getNearbyDestinations()
├── Method: POST /api/v1/spontaneous/nearby-destinations
├── Body: {
│   latitude: number,
│   longitude: number,
│   radius: 50 // km
│ }
└── Headers: Authorization: Bearer <token>
        │
        │ HTTP Request
        │
        ▼
Backend Controller: getNearbyDestinations()
├── Validate geolocation coordinates
├── Validate radius (1-500 km)
├── Call geolocation.service.js
        │
        │ Validation passed
        │
        ▼
Backend Service: geolocation.service.js
├── Convert radius to meters: 50 km = 50000 m
├── Execute geospatial query:
│   db.destinations.find({
│     location: {
│       $near: {
│         $geometry: { type: "Point", coordinates: [lon, lat] },
│         $maxDistance: 50000
│       }
│     }
│   })
├── Get top 5 results (pre-sorted by distance)
└── For each destination:
    ├── Fetch weather data
    ├── Calculate actual distance
    └── Add to response
        │
        │ Query executes (~50ms with index)
        │
        ▼
MongoDB: 2dsphere Index Query
├── Use geospatial index
├── Return destinations within radius
├── Auto-sort by proximity
└── Return to backend service
        │
        │ Destinations found
        │
        ▼
Backend: Enrich Destinations with Weather
├── Call weather service for each destination
├── Get current conditions (cached)
└── Add to response
        │
        │ Response ready
        │
        ▼
Backend Response: 200
{
  "success": true,
  "data": {
    "destinations": [
      {
        "_id": "...",
        "name": "Destination Name",
        "city": "...",
        "distance": 15.5, // km from user
        "estimatedBudget": 5000,
        "weather": { temp: 28, condition: "sunny" }
      },
      // ... more destinations
    ]
  }
}
        │
        │ Response received
        │
        ▼
Frontend: Display Results
├── Update React Query cache
├── Display nearby destinations on map
├── Show distance, weather, budget
├── Add "Add to Trips" button for each
└── User can click to create quick trip
        │
        │ Optional: User clicks "Add to Trips"
        │
        ▼
Frontend: Create Quick Trip
├── Pre-fill with destination details
├── Set default duration (3 days)
├── Suggest budget based on destination
└── Create trip mutation triggered
        │
        │ Trip created
        │
        ▼
Frontend: Success
├── Show notification: "Trip created!"
├── Redirect to trip detail
└── User can now plan trip details
```

---

## 9. INTEGRATION POINTS

### 9.1 External API Integrations

#### Google Generative AI Integration
```javascript
Service: Backend/services/aiInsights.service.js

Integration Method:
├── Library: @google/genai v2.7.0
├── API Key: process.env.GOOGLE_AI_API_KEY
└── Endpoint: generative-language API

Usage:
├── GET /api/v1/destinations/:id/ai-insights
│   └── Triggers: generateDestinationInsights()
│
└── Response Format:
    {
      summary: "AI-generated description",
      tips: ["tip1", "tip2", ...],
      bestTime: "October-March",
      budgetSuggestions: {
        budget: 5000,
        breakdown: { food: 1000, stay: 2000, ... }
      },
      culturalInsights: "..."
    }

Caching:
├── Frontend: 24-hour cache with React Query
├── Backend: Optional Redis cache (Phase 2)
└── Avoids duplicate AI API calls
```

#### OpenWeatherMap API Integration
```javascript
Service: Backend/services/externalApi.service.js

Integration Method:
├── API Key: process.env.WEATHER_API_KEY
├── Base URL: https://api.openweathermap.org/data/2.5
└── Rate Limit: Cached responses

Usage:
├── GET /api/v1/destinations/:id/weather
│   └── Triggers: getWeatherData(lat, lon)
│
└── Response Format:
    {
      current: {
        temp: 28,
        feels_like: 32,
        humidity: 65,
        description: "sunny"
      },
      forecast: [
        { date: "...", temp_min: 25, temp_max: 32 }
        // ... 5-day forecast
      ]
    }

Frontend Usage:
├── Display current weather on destination detail page
├── Show 5-day forecast
└── Weather integration in spontaneous travel cards
```

#### Browser Geolocation API
```javascript
Hook: Frontend/hooks/useGeolocation.js

Integration Method:
├── API: navigator.geolocation
├── Permission: User consent required
└── Accuracy: ~10-100 meters (depends on device)

Usage:
├── Spontaneous Travel Page
│   └── getCurrentPosition() → { latitude, longitude }
│
└── Response:
    {
      latitude: 28.6139,
      longitude: 77.2090,
      accuracy: 25,
      timestamp: 1717676000000
    }

Error Handling:
├── PERMISSION_DENIED: Fallback to manual location input
├── POSITION_UNAVAILABLE: Show error message
└── TIMEOUT: Retry with increased timeout
```

#### Leaflet Map Integration
```javascript
Component: Frontend/components/Map/MapComponent.jsx

Integration Method:
├── Library: leaflet v1.9.4
├── React Wrapper: react-leaflet v5.0.0
├── Tile Provider: OpenStreetMap (free)
└── No API key required

Features:
├── Display map with base layer
├── Add markers for destinations
├── Add user location marker
├── Show radius circle (for spontaneous search)
├── Popup with destination info
└── Interactive zoom/pan

Usage:
├── Trip Detail Page: Show trip destinations
├── Spontaneous Page: Show nearby destinations + user location
└── Place Discovery: Show places within destination
```

### 9.2 Frontend-Backend Communication

```
HTTP Communication:
├── Protocol: HTTP (dev) / HTTPS (prod)
├── Port: 5000 (backend), 5173 (frontend - dev)
├── Base URL: Configured via environment
└── Timeout: 30s (Axios default)

Authentication:
├── Method: JWT Bearer tokens
├── Header: Authorization: Bearer <token>
├── Storage: httpOnly cookies (preferred)
├── Token Refresh: Automatic with interceptor
└── Logout: Clear cookies + clear cache

CORS Configuration:
├── Allowed Origins: Frontend URL
├── Allowed Methods: GET, POST, PATCH, DELETE, OPTIONS
├── Allowed Headers: Content-Type, Authorization
├── Credentials: true (to include cookies)
└── Max Age: 3600 seconds

Request Interceptor (Axios):
├── Auto-add Authorization header
├── Handle token refresh if expired
├── Log requests (dev mode)
└── Format request data

Response Interceptor (Axios):
├── Validate status codes
├── Handle auth errors (401, 403)
├── Redirect to login if unauthorized
├── Show error notifications
└── Cache successful responses
```

---

## 10. SECURITY ARCHITECTURE

### 10.1 Authentication & Authorization

```
User Authentication:
├── Registration:
│   ├── Input validation (Zod)
│   ├── Email uniqueness check
│   ├── Password hashing (bcrypt, 10 rounds)
│   └── Auto-login with generated tokens
│
├── Login:
│   ├── Email/password validation
│   ├── Bcrypt password comparison
│   ├── Generate JWT tokens
│   └── Set httpOnly cookies
│
├── Token Management:
│   ├── Access Token: 15 minutes
│   ├── Refresh Token: 7 days
│   ├── Token Refresh: Automatic rotation
│   └── Logout: Token invalidation
│
└── Session Persistence:
    ├── Cookies: httpOnly, Secure, SameSite=Strict
    ├── Frontend: Store in Context + localStorage (optional)
    └── Backend: Verify on each protected route

Role-Based Access Control (RBAC):
├── Roles:
│   ├── user: Basic trip planning
│   ├── guide: Can manage places
│   └── admin: Full access
│
├── Middleware: requireRole(["admin", "guide"])
│
├── Resource Ownership:
│   ├── User can only access own trips
│   ├── Verified via createdBy field
│   └── Check before delete/update operations
│
└── Protected Routes:
    ├── Verify JWT token
    ├── Extract user ID from token
    ├── Verify user exists
    └── Attach user to request
```

### 10.2 Data Protection

```
Input Validation:
├── Frontend:
│   ├── Zod schema validation
│   ├── Type checking
│   └── Sanitization
│
└── Backend:
    ├── Zod schema validation (server-side)
    ├── SQL/NoSQL injection prevention
    ├── XSS protection
    └── Length validation

Password Security:
├── Minimum: 6 characters
├── Hashing: bcrypt with 10 rounds
├── Never store plaintext
├── Compare using bcrypt.compare()
└── Rate limiting on login attempts (Phase 2)

API Security:
├── HTTPS/TLS 1.3 (production only)
├── CORS: Restrict to frontend domain
├── Rate limiting: Per IP/User (Phase 2)
├── Request validation: Schema checking
└── Response sanitization: Remove sensitive fields

Cookie Security:
├── httpOnly: Not accessible via JavaScript
├── Secure: Only over HTTPS
├── SameSite: Strict (CSRF protection)
├── Domain: Specific to backend domain
├── Path: /api/v1
├── Expiration: Match token expiry
└── Rotation: On token refresh
```

### 10.3 Compliance & Audit

```
Currently Implemented:
✅ JWT authentication
✅ Password hashing (bcrypt)
✅ httpOnly cookies
✅ CORS configuration
✅ Input validation (Zod)
✅ Role-based access control
✅ Resource ownership verification

Phase 2 Enhancements:
⚠️ HTTPS enforcement (prod)
⚠️ Rate limiting
⚠️ Audit logging
⚠️ Data encryption at rest
⚠️ PII encryption

Phase 3 Compliance:
⚠️ GDPR compliance
⚠️ CCPA compliance
⚠️ SOC 2 audit
⚠️ Regular security assessments
```

---

## 11. SCALABILITY & PERFORMANCE

### 11.1 Current Performance Metrics

```
Frontend:
├── Bundle Size: ~150KB (gzipped)
├── Page Load Time: 2-3s (target: <2s)
├── First Contentful Paint: 1.8-2.2s
├── Time to Interactive: 3-4s
└── React Query: Automatic caching & deduplication

Backend:
├── API Response Time: 400-600ms (target: <500ms)
├── Database Query Time: 100-150ms
├── Geospatial Query: <50ms (with 2dsphere index)
├── Weather API Call: ~500ms (should be cached)
└── AI API Call: 2-5s (should be cached)

Database:
├── Single MongoDB instance
├── No replication
├── Collection sizes: ~1000-10000 documents
└── Indexes: Basic setup complete
```

### 11.2 Optimization Strategies

#### Frontend Optimizations (Implemented)
```
✅ Code Splitting:
  ├── Dynamic imports available
  ├── Route-based splitting (planned)
  └── Component-level splitting (planned)

✅ Image Optimization:
  ├── Lazy loading ready
  ├── Format optimization (planned)
  └── Responsive images (planned)

✅ Caching:
  ├── React Query: 5-minute stale time
  ├── Geospatial results: 5-minute cache
  ├── Weather data: 30-minute cache
  └── Service workers: Ready for PWA

✅ Bundle Optimization:
  ├── Tree shaking enabled
  ├── Minification enabled
  ├── Vite build optimizations
  └── Tailwind CSS purging enabled

✅ Network Optimization:
  ├── HTTP/2 ready
  ├── Gzip compression
  └── Request deduplication (React Query)
```

#### Backend Optimizations (Planned)
```
⚠️ Caching:
  ├── Redis cache layer (Phase 2)
  ├── Query result caching
  ├── Weather data caching
  └── AI insights caching

⚠️ Database:
  ├── Query optimization
  ├── Connection pooling
  ├── Aggregation pipelines
  └── Replica set setup

⚠️ API:
  ├── Response compression (gzip)
  ├── CDN for static assets
  ├── Rate limiting
  └── Request batching (GraphQL alternative)
```

### 11.3 Scalability Plan

#### Phase 1: 100K Users
```
Infrastructure:
├── Load Balancer (Nginx/HAProxy)
├── 3-5 backend replicas
├── MongoDB replica set
├── Redis cache cluster
└── CDN (CloudFlare)

Performance:
├── Horizontal scaling for API
├── Database replication for HA
├── Cache layer for hot data
└── Static asset CDN
```

#### Phase 2: 1M Users
```
Infrastructure:
├── Kubernetes orchestration
├── Microservices architecture
├── MongoDB sharding
├── Elasticsearch for search
├── Kafka event streaming
├── Message queue (RabbitMQ)
└── Advanced monitoring (Datadog, New Relic)

Changes:
├── Service decomposition
├── Event-driven architecture
├── Advanced caching strategies
└── Database sharding by city/country
```

---

## 12. DEPLOYMENT ARCHITECTURE

### 12.1 Development Environment

```
Local Development:
├── Frontend:
│   ├── npm run dev
│   ├── Vite dev server: localhost:5173
│   ├── Hot module replacement enabled
│   └── React DevTools + Query DevTools
│
└── Backend:
    ├── npm run dev
    ├── Nodemon watching: src/Index.js
    ├── Port: localhost:5000
    └── Logs: Console output

Environment Variables (.env):
├── VITE_API_BASE_URL=http://localhost:5000/api/v1
├── GOOGLE_AI_API_KEY=...
├── WEATHER_API_KEY=...
├── MONGODB_URI=mongodb://localhost:27017/tourism
├── JWT_SECRET=...
└── NODE_ENV=development
```

### 12.2 Production Environment (Planned)

```
Docker Containerization:
├── Backend Dockerfile
│   ├── Node.js 18+ base image
│   ├── EXPOSE 5000
│   ├── Health check endpoint
│   └── Non-root user
│
├── Frontend Dockerfile
│   ├── Build stage: Node.js 18+
│   ├── Runtime stage: Nginx
│   ├── EXPOSE 80
│   └── Gzip compression enabled
│
└── docker-compose.yml
    ├── Backend service
    ├── Frontend service
    ├── MongoDB service
    └── Redis service (Phase 2)

Cloud Deployment:
├── Option 1: Heroku (small scale)
├── Option 2: AWS (ECS/EKS)
├── Option 3: Google Cloud Platform
├── Option 4: DigitalOcean (AppPlatform)
└── Option 5: Vercel (Frontend) + Render (Backend)

CI/CD Pipeline:
├── GitHub Actions
├── Automated testing
├── Build optimization
├── Deployment automation
└── Environment-based configuration
```

---

## 13. MODULE DEPENDENCIES

### 13.1 Dependency Tree

```
Backend Dependencies:
├── Express.js 5.2.1
│   ├── Core: HTTP server framework
│   └── Middleware: body-parser, cors, etc.
│
├── Mongoose 9.6.1
│   ├── MongoDB ODM
│   ├── Schema validation
│   └── Query builders
│
├── JWT (jsonwebtoken 9.0.3)
│   ├── Token generation
│   └── Token verification
│
├── Bcrypt 6.0.0
│   ├── Password hashing
│   └── Comparison
│
├── Zod 4.4.3
│   ├── Schema validation
│   └── Type checking
│
├── Google GenAI 2.7.0
│   ├── AI-powered insights
│   └── Text generation
│
├── Cookie-parser 1.4.7
│   ├── Cookie parsing
│   └── Cookie management
│
├── CORS 2.8.6
│   ├── Cross-origin requests
│   └── Security headers
│
├── Dotenv 17.4.2
│   ├── Environment variables
│   └── Configuration
│
├── Nodemon 3.1.14 (Dev)
│   ├── File watching
│   └── Auto-restart
│
└── Prettier 3.8.3 (Dev)
    ├── Code formatting
    └── Consistency

Frontend Dependencies:
├── React 19.2.6
│   ├── UI framework
│   ├── Component system
│   └── Hooks
│
├── Vite 8.0.12
│   ├── Build tool
│   ├── Dev server
│   └── Hot reload
│
├── React Router DOM 7.16.0
│   ├── Routing
│   ├── Navigation
│   └── Protected routes
│
├── Axios 1.16.1
│   ├── HTTP client
│   ├── Request/response interceptors
│   └── Error handling
│
├── React Query 5.100.14
│   ├── Data fetching
│   ├── Caching
│   ├── Synchronization
│   └── Mutations
│
├── Tailwind CSS 4.3.0
│   ├── Utility-first CSS
│   ├── Responsive design
│   └── Component styling
│
├── Leaflet 1.9.4
│   ├── Map library
│   ├── Geospatial display
│   └── Markers/popups
│
├── React Leaflet 5.0.0
│   ├── React wrapper for Leaflet
│   ├── Component-based maps
│   └── Integration
│
├── Zod 4.4.3
│   ├── Schema validation
│   ├── Type safety
│   └── Form validation
│
├── Lucide React 1.17.0
│   ├── Icon library
│   ├── Customizable icons
│   └── SVG-based
│
├── React Query DevTools 5.100.14 (Dev)
│   ├── Query debugging
│   ├── Cache inspection
│   └── DevTools
│
├── ESLint 10.3.0 (Dev)
│   ├── Code linting
│   ├── Quality checks
│   └── Best practices
│
└── Vite Tailwind Plugin 4.3.0
    ├── Tailwind integration
    └── Optimization
```

### 13.2 Module Interaction

```
Frontend Module Flow:
main.jsx
  ↓
App.jsx (Root)
  ├── AuthContext.Provider
  │   ├── useAuth() hook
  │   ├── AuthRoutes
  │   └── ProtectedRoutes
  │
  └── QueryClientProvider
      ├── Routes (React Router)
      ├── Pages
      ├── Components (reusable)
      ├── Services (API calls)
      ├── Hooks (custom logic)
      └── Schemas (validation)

Backend Module Flow:
Index.js (Entry point)
  ├── Global error handlers
  ├── Environment setup
  ├── Database connection
  │
  └── App.js (Express config)
      ├── Middleware
      ├── Routes
      │   ├── auth.route.js
      │   │   └── auth.controller.js
      │   │       └── auth.service.js
      │   │           └── User.model.js
      │   │
      │   ├── trip.route.js
      │   │   └── trip.controller.js
      │   │       └── trip.service.js
      │   │           └── Trip.model.js
      │   │
      │   ├── destination.route.js
      │   │   └── destination.controller.js
      │   │       └── destination.service.js
      │   │           └── Destination.model.js
      │   │
      │   └── spontaneous.route.js
      │       └── spontaneous.controller.js
      │           └── geolocation.service.js
      │
      └── Global error handler
```

---

## 14. ERROR HANDLING

### 14.1 Frontend Error Handling

```
Error Types:
├── Network Errors
│   ├── No internet connection
│   ├── API timeout
│   └── Server error (500)
│
├── Validation Errors
│   ├── Invalid email format
│   ├── Password too short
│   └── Required field missing
│
├── Authentication Errors
│   ├── Invalid credentials
│   ├── Token expired
│   └── Unauthorized access (403)
│
├── Business Logic Errors
│   ├── Trip date invalid
│   ├── Budget negative
│   └── Resource not found (404)
│
└── UI Errors
    ├── Component rendering errors
    ├── Geolocation permission denied
    └── Map loading failures

Error Handling Strategies:
├── Axios Interceptors:
│   ├── Catch all HTTP errors
│   ├── Auto-redirect on 401
│   ├── Show notification for user
│   └── Log error (dev mode)
│
├── React Query:
│   ├── useQuery onError callback
│   ├── useMutation onError callback
│   ├── Retry logic (configurable)
│   └── Error boundaries (planned)
│
├── Form Validation:
│   ├── Zod schema validation
│   ├── Display field errors
│   ├── Highlight invalid fields
│   └── Show validation messages
│
└── User Feedback:
    ├── Toast notifications
    ├── Error modals (critical)
    ├── Fallback UI
    └── User-friendly messages
```

### 14.2 Backend Error Handling

```
Global Error Handler (Index.js):
├── process.on('uncaughtException', ...)
│   ├── Log error
│   └── Exit process (critical error)
│
└── process.on('unhandledRejection', ...)
    ├── Log error
    ├── Close server gracefully
    └── Exit process (critical error)

Route-Level Error Handling:
├── try-catch blocks in controllers
├── asyncHandler wrapper for async functions
├── Validation middleware (Zod)
└── Error forwarding to global handler

Error Response Format:
{
  "success": false,
  "statusCode": 400,
  "data": null,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}

HTTP Status Codes:
├── 200 OK: Successful request
├── 201 Created: Resource created
├── 400 Bad Request: Validation error
├── 401 Unauthorized: Authentication required
├── 403 Forbidden: Authorization failed
├── 404 Not Found: Resource not found
├── 409 Conflict: Resource already exists
├── 500 Internal Server Error: Server error
└── 503 Service Unavailable: Server down

Validation Errors (Zod):
├── Validate on input
├── Return 400 with detailed errors
├── Include field-level error messages
└── Example: "email must be valid email"

Database Errors:
├── Connection errors: Reconnect, log, notify
├── Query errors: Log, return 500
├── Duplicate key: Return 409
└── Validation errors: Return 400
```

---

## 15. BEST PRACTICES & PATTERNS

### 15.1 Frontend Best Practices

```
✅ Component Architecture:
  ├── Functional components
  ├── Hooks for logic
  ├── Custom hooks for reusability
  ├── Separation of concerns
  └── Single responsibility principle

✅ State Management:
  ├── Context API for auth state
  ├── React Query for server state
  ├── Local component state (useState)
  └── Avoid prop drilling

✅ Performance:
  ├── Memoization (React.memo)
  ├── useCallback for callbacks
  ├── useMemo for expensive computations
  ├── Lazy loading components
  └── Image optimization

✅ Code Quality:
  ├── ESLint rules enforced
  ├── Consistent naming conventions
  ├── Comments for complex logic
  ├── Modular file structure
  └── Environment-based config

✅ Security:
  ├── Input validation (Zod)
  ├── XSS prevention
  ├── CSRF protection (cookies)
  ├── Never store sensitive data in localStorage
  └── Use httpOnly cookies for tokens

✅ Accessibility:
  ├── Semantic HTML
  ├── ARIA labels
  ├── Keyboard navigation
  ├── Color contrast
  └── Focus management
```

### 15.2 Backend Best Practices

```
✅ Code Organization:
  ├── MVC pattern (Models, Views/Controllers, Services)
  ├── Separation of concerns
  ├── DRY (Don't Repeat Yourself)
  ├── Single responsibility principle
  └── Modular route/service structure

✅ Error Handling:
  ├── Try-catch blocks
  ├── Async error wrapper
  ├── Global error handler
  ├── Meaningful error messages
  └── Proper HTTP status codes

✅ Validation:
  ├── Zod schemas on input
  ├── Mongoose schema validation
  ├── Type-safe data structures
  ├── Validation middleware
  └── Field-level error messages

✅ Security:
  ├── Password hashing (bcrypt)
  ├── JWT token management
  ├── CORS configuration
  ├── Input sanitization
  ├── SQL/NoSQL injection prevention
  └── Rate limiting (planned)

✅ Database:
  ├── Mongoose models
  ├── Schema validation
  ├── Indexes on frequent queries
  ├── Query optimization
  ├── Connection pooling (built-in)
  └── Transactions (where needed)

✅ Logging:
  ├── Request logging
  ├── Error logging
  ├── Debug mode logging
  ├── Environment-specific levels
  └── Structured logging (planned)

✅ API Design:
  ├── RESTful endpoints
  ├── Consistent naming
  ├── Proper HTTP methods
  ├── Versioning (/api/v1)
  ├── Pagination support
  └── Filtering & sorting
```

### 15.3 Design Patterns

```
Frontend Patterns:
├── Context Pattern (Auth state)
├── Custom Hook Pattern (useAuth, useGeolocation)
├── Render Props (if needed)
├── Higher-Order Components (if needed)
├── Query Pattern (React Query)
└── Observer Pattern (Event listeners)

Backend Patterns:
├── MVC Pattern
│   ├── Model: MongoDB schemas
│   ├── View: JSON responses
│   └── Controller: Route handlers
│
├── Service Layer Pattern
│   ├── Business logic separation
│   ├── Reusable services
│   └── Dependency injection (basic)
│
├── Middleware Pattern
│   ├── Authentication middleware
│   ├── Error handling middleware
│   ├── Validation middleware
│   └── Logging middleware
│
├── Strategy Pattern
│   ├── Different validation strategies
│   ├── Different sorting strategies
│   └── Different caching strategies
│
└── Factory Pattern
    ├── Model creation
    ├── Service instantiation
    └── Middleware creation

Database Patterns:
├── Schema Validation Pattern
├── Index Strategy Pattern
├── Query Optimization Pattern
├── Relationship Management Pattern
│   ├── References (ObjectId)
│   ├── Normalization
│   └── Denormalization (selective)
└── Aggregation Pipeline Pattern
```

---

## APPENDIX: Quick Reference

### A1. Key Files Location

```
Frontend:
├── Entry: Frontend/src/main.jsx
├── Root: Frontend/src/App.jsx
├── Config: Frontend/vite.config.js
├── Services: Frontend/src/services/
├── Hooks: Frontend/src/hooks/
├── Schemas: Frontend/src/schemas/
└── Styles: Frontend/src/index.css

Backend:
├── Entry: Backend/src/Index.js
├── Config: Backend/src/App.js
├── Routes: Backend/src/routes/
├── Controllers: Backend/src/controllers/
├── Services: Backend/src/services/
├── Models: Backend/src/models/
└── Middleware: Backend/src/middlewares/

Database:
├── Connection: Backend/src/database/db.js
├── Collections: MongoDB (cloud or local)
└── Indexes: Auto-created on model definition
```

### A2. Environment Variables

```
Frontend (.env):
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Tourism Planner

Backend (.env):
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tourism
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
GOOGLE_AI_API_KEY=your-google-ai-key
WEATHER_API_KEY=your-weather-api-key
```

### A3. Common Commands

```
Frontend:
├── npm install - Install dependencies
├── npm run dev - Start dev server
├── npm run build - Build for production
├── npm run lint - Run ESLint
└── npm run preview - Preview production build

Backend:
├── npm install - Install dependencies
├── npm run dev - Start with nodemon
├── npm start - Start production server
└── npm run seed - Seed sample data (planned)

Database:
├── mongod - Start MongoDB
├── mongo - Connect to MongoDB
├── db.collections() - List collections
└── db.dropDatabase() - Drop database (dev only)
```

### A4. Testing Checklist

```
Frontend:
├── [ ] Authentication flow (register, login, logout)
├── [ ] Protected routes access
├── [ ] Geolocation permission
├── [ ] Map rendering
├── [ ] React Query caching
├── [ ] Form validation (Zod)
└── [ ] Error notifications

Backend:
├── [ ] API endpoint responses
├── [ ] JWT token generation/verification
├── [ ] Database CRUD operations
├── [ ] Geospatial queries
├── [ ] External API integration
├── [ ] Error handling
└── [ ] Input validation
```

---

**Document Status:** Complete as of June 6, 2026  
**Next Review:** When major architectural changes occur  
**Maintainer:** Rupeshkumar-2004
