/*
==================== CORS (CROSS-ORIGIN RESOURCE SHARING) ====================

1. WHAT IS CORS?
- A browser security mechanism
- Controls which frontend (origin) can access backend APIs

Origin = protocol + domain + port
Example:
http://localhost:3000 ≠ http://localhost:5173

-------------------------------------------------------------------

2. WHY CORS EXISTS
- Prevents malicious websites from accessing user data
- Protects authenticated requests (cookies, sessions)

-------------------------------------------------------------------

3. IMPORTANT POINT

CORS is enforced by BROWSER, not backend

- Backend only sends permission headers
- Browser decides to allow or block request

-------------------------------------------------------------------

4. REQUEST FLOW

Frontend → Request → Backend
         ↓
Browser checks CORS rules
         ↓
Allowed → Request succeeds
Blocked → CORS error

-------------------------------------------------------------------

5. TYPES OF REQUESTS

Simple Request:
- GET, POST (basic)
- No preflight

Complex Request:
- JSON, PUT, DELETE
- Browser sends OPTIONS request first (preflight)

-------------------------------------------------------------------

6. PREFLIGHT REQUEST

Browser sends:
OPTIONS /api

Asks:
"Is this request allowed?"

Backend responds with allowed methods/origin

-------------------------------------------------------------------

7. CORS IN EXPRESS

app.use(cors({
    origin: function(origin, callback) { ... }
}));

- origin → incoming request origin
- callback → used to allow or deny request

-------------------------------------------------------------------

8. COMMON RULES USED

if (!origin)
→ allow tools like Postman

if (origin.includes('localhost'))
→ allow development frontend

if (origin === process.env.CORS_ORIGIN)
→ allow production frontend

else
→ reject request

-------------------------------------------------------------------

9. CREDENTIALS

credentials: true

- Allows cookies / authentication headers
- Required for login systems

IMPORTANT:
- Cannot use "*" with credentials

-------------------------------------------------------------------

10. COMMON MISTAKES

- Using "*" in production ❌
- Forgetting credentials ❌
- Not handling preflight ❌

-------------------------------------------------------------------

11. MENTAL MODEL

Backend = club
Browser = security guard
Origin = ID card

Backend says:
"Allowed origins = X"

Browser enforces:
"Only X can enter"

===================================================================
*/