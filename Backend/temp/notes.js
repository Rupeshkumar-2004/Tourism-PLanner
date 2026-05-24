/*
==================== BACKEND CORE UNDERSTANDING ====================

1. WHAT IS BACKEND?
- Backend is a server that listens to requests and sends responses.
- Flow: Client → Request → Server → Response

-------------------------------------------------------------------

2. NODE.JS HTTP FLOW
- req → contains incoming request data (URL, method, body)
- res → used to send response back to client
- Server runs continuously and handles multiple requests

-------------------------------------------------------------------

3. EXPRESS BASICS
- express() creates the app (server)
- app.get(), app.post() → define routes
- res.send() → sends response

-------------------------------------------------------------------

4. ROUTING STRUCTURE (IMPORTANT)
- server.js → entry point
- routes/ → defines URLs (NO logic)
- controllers/ → contains logic

Flow:
Request → Route → Controller → Response

-------------------------------------------------------------------

5. MIDDLEWARE (VERY IMPORTANT)
- Runs before route handler
- Has access to (req, res, next)

Example:
app.use((req, res, next) => {
    console.log("Request received");
    next(); // MUST call next()
});

- If next() is not called → request gets stuck

Common middleware:
- express.json() → parses JSON body

-------------------------------------------------------------------

6. HTTP METHODS
- GET → fetch data
- POST → create data
- PUT → update data
- DELETE → remove data

Same route can behave differently based on method

-------------------------------------------------------------------

7. REQUEST DATA ACCESS
- req.params → dynamic URL values (/user/:id)
- req.query → query params (?name=abc)
- req.body → data sent from client (requires express.json())

-------------------------------------------------------------------

8. DATABASE CONNECTION (MONGOOSE)
- mongoose.connect() is async → must use await
- Returns a connection object (connectInstances)

Example:
const connectInstances = await mongoose.connect(DB_URL);

Useful:
connectInstances.connection.host

-------------------------------------------------------------------

9. WHY ASYNC/AWAIT IS USED
- DB connection takes time
- await ensures:
  → DB connects BEFORE server starts

Without await:
→ server starts even if DB is not ready ❌

-------------------------------------------------------------------

10. PROCESS OBJECT (NODE.JS)
- process = current running Node.js app

Important:
- process.env → environment variables (DB URL, secrets)
- process.exit(1) → stops app immediately on failure

-------------------------------------------------------------------

11. WHY process.exit(1) IS IMPORTANT
- If DB fails → app should NOT continue
- Without it:
  → server runs but DB is not connected ❌
  → causes runtime errors later

Fail fast > fail later

-------------------------------------------------------------------

12. CORRECT SERVER START PATTERN

WRONG:
connectDB();
app.listen(3000);

→ Server starts before DB is ready ❌

CORRECT:
await connectDB();
app.listen(3000);

→ Ensures DB is connected first ✅

Best Practice:

const startServer = async () => {
    try {
        await connectDB();
        app.listen(3000);
    } catch (error) {
        process.exit(1);
    }
};

-------------------------------------------------------------------

13. KEY MENTAL MODEL

Request Flow:
Client → Middleware → Route → Controller → Response

Startup Flow:
Start App → Connect DB → Start Server

-------------------------------------------------------------------

14. GOLDEN RULES

- Always handle async operations properly
- Never start server before DB connection
- Use middleware carefully (always call next())
- Separate routes and controllers
- Fail fast when critical errors happen

===================================================================
*/