/*
==================== ASYNC HANDLER (ERROR WRAPPER FOR ASYNC ROUTES) ====================

1. WHY THIS EXISTS
- Express does NOT automatically catch errors in async functions
- If an async function throws error → it may crash app or go unhandled

Example problem:

app.get("/", async (req, res) => {
    throw new Error("Something broke"); // NOT caught automatically ❌
});

-------------------------------------------------------------------

2. SOLUTION

Wrap async functions so errors are passed to Express error middleware

-------------------------------------------------------------------

3. HOW THIS WORKS

asyncHandler takes a function (requestHandler) and returns a new function

Flow:
Route → asyncHandler → your async function → error caught → next(err)

-------------------------------------------------------------------

4. CORE IDEA

Promise.resolve(requestHandler(...)).catch(next)

- Converts function result into a Promise
- If error occurs → .catch() runs
- next(err) passes error to Express error middleware

-------------------------------------------------------------------

5. WHY next(err) IS IMPORTANT

- next(err) tells Express:
  → "This is an error, handle it in error middleware"

Without next():
→ Express will not know about the error ❌

-------------------------------------------------------------------

6. HOW TO USE

Instead of writing try/catch in every controller:

router.get("/", asyncHandler(async (req, res) => {
    const user = await User.find();
    res.json(user);
}));

-------------------------------------------------------------------

7. BENEFITS

- No need to write try/catch everywhere
- Cleaner controllers
- Centralized error handling
- Prevents unhandled promise rejections

-------------------------------------------------------------------

8. KEY MENTAL MODEL

asyncHandler = safety wrapper

Async function
   ↓
Error occurs
   ↓
Caught automatically
   ↓
Passed to middleware

===============================================================================
*/

// Utility function to handle errors in async route handlers
// Prevents need for try-catch in every controller

const asyncHandler = (requestHandler) => {
    // Return a new function that Express understands (req, res, next)
    return (req, res, next) => {

        // Wrap the async function in Promise.resolve()
        // This ensures it works whether the function is async or not
        Promise.resolve(requestHandler(req, res, next))

        // If any error occurs inside requestHandler:
        // catch it and pass it to Express error middleware
        .catch((err) => next(err));
    };
};

export { asyncHandler };