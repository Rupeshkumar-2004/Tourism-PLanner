/*
==================== API ERROR CLASS (CUSTOM ERROR HANDLING) ====================

1. WHY THIS CLASS EXISTS
- Default Error in JS only has:
  → message
  → stack

- In backend, we also need:
  → statusCode (HTTP status like 404, 500)
  → success flag
  → structured error details

- So we create a custom error class by extending Error

-------------------------------------------------------------------

2. WHY EXTEND Error CLASS
- Makes this behave like a real system error
- Works with:
  → throw / try-catch
  → Express error middleware
  → Stack traces for debugging

Without extending Error:
→ It becomes just a normal object ❌

-------------------------------------------------------------------

3. HOW THIS CLASS WORKS

class ApiError extends Error

- Inherits all properties of Error
- Adds custom fields for API responses

-------------------------------------------------------------------

4. CONSTRUCTOR PARAMETERS

(statusCode, message, errors, stack)

- statusCode → HTTP error code (404, 500, etc.)
- message → error message for client
- errors → array of detailed issues (validation errors)
- stack → optional custom stack trace

-------------------------------------------------------------------

5. IMPORTANT LINE

super(message);

- Calls parent Error constructor
- Sets:
  → error.message
  → internal error behavior

Without this:
→ message and stack won’t work properly ❌

-------------------------------------------------------------------

6. CUSTOM PROPERTIES ADDED

this.statusCode → used in HTTP response
this.success = false → indicates failure
this.errors → detailed error list
this.data = null → placeholder (used in API structure)

-------------------------------------------------------------------

7. STACK TRACE HANDLING

if (stack) {
    this.stack = stack;
} else {
    Error.captureStackTrace(this, this.constructor);
}

- captureStackTrace removes unnecessary constructor calls
- gives cleaner debugging output

-------------------------------------------------------------------

8. HOW IT IS USED

throw new ApiError(404, "User not found");

Flow:
Error thrown → caught by middleware → response sent

-------------------------------------------------------------------

9. KEY MENTAL MODEL

Normal Error:
→ basic message + stack

ApiError:
→ structured error for API response

-------------------------------------------------------------------

10. GOLDEN RULE

Always use custom errors in backend for:
- consistency
- debugging
- clean API responses

===============================================================================
Flow:

        Controller
           ↓
        Throws error
           ↓
        Express catches it
           ↓
        Error middleware handles it
           ↓
        Structured response sent
*/

class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [], // fixed name
        stack = ""
    ) {
        // Call parent Error constructor with message
        super(message);

        // HTTP status code (e.g., 404, 500)
        this.statusCode = statusCode;

        // Optional: additional data (can be used later)
        this.data = null;

        // Indicates request failed
        this.success = false;

        // Array of detailed errors (validation errors, etc.)
        this.errors = errors;

        // Stack trace handling
        if (stack) {
            this.stack = stack;
        } else {
            // Cleaner stack trace (removes constructor call from trace)
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };