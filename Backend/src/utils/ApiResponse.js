/*
==================== API RESPONSE CLASS (STANDARD SUCCESS RESPONSE) ====================

1. WHY THIS CLASS EXISTS
- To maintain a consistent API response structure across the backend
- Instead of sending random responses, we standardize format

Example:
{
  statusCode: 200,
  success: true,
  message: "Success",
  data: {...}
}

-------------------------------------------------------------------

2. PURPOSE
- Used for SUCCESS responses (unlike ApiError for failures)
- Keeps response structure predictable for frontend

-------------------------------------------------------------------

3. CONSTRUCTOR PARAMETERS

(statusCode, data, message)

- statusCode → HTTP status (200, 201, etc.)
- data → actual response data (user, trips, etc.)
- message → optional message (default = "Success")

-------------------------------------------------------------------

4. IMPORTANT FIELD

this.success = statusCode < 400;

- Automatically determines success
- Any status < 400 → success = true
- Any status ≥ 400 → success = false

-------------------------------------------------------------------

5. RESPONSE STRUCTURE

Every response will follow:

{
  statusCode,
  data,
  message,
  success
}

-------------------------------------------------------------------

6. WHY THIS IS IMPORTANT

- Frontend can rely on consistent format
- Easier debugging
- Cleaner and scalable backend

-------------------------------------------------------------------

7. HOW IT IS USED

res.status(200).json(
    new ApiResponse(200, userData, "User fetched successfully")
);

-------------------------------------------------------------------

8. KEY MENTAL MODEL

ApiResponse → for successful operations
ApiError    → for failed operations

Together → complete API response system

===============================================================================
*/

class ApiResponse {
    constructor(statusCode, data = null, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode >= 200 && statusCode < 400;
    }
}

export { ApiResponse };