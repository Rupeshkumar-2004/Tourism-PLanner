/*
  ╔══════════════════════════════════════════════════════════════════╗
  ║  📘 LESSON: Why create an Axios "instance"?                     ║
  ╠══════════════════════════════════════════════════════════════════╣
  ║                                                                  ║
  ║  Instead of writing this in EVERY component:                     ║
  ║                                                                  ║
  ║    axios.post('http://localhost:5000/api/v1/auth/login', data, {  ║
  ║      withCredentials: true                                       ║
  ║    });                                                           ║
  ║                                                                  ║
  ║  We create ONE configured instance and just write:               ║
  ║                                                                  ║
  ║    api.post('/auth/login', data);                                ║
  ║                                                                  ║
  ║  Benefits:                                                       ║
  ║  1. DRY — Don't Repeat Yourself                                  ║
  ║  2. If your backend URL changes, update ONE file                 ║
  ║  3. Auth headers are auto-attached via interceptors              ║
  ║  4. Error handling is centralized                                ║
  ║                                                                  ║
  ║  🎯 INTERNSHIP TIP: Interviewers LOVE seeing a service layer.   ║
  ║  It shows you think about architecture, not just "make it work." ║
  ╚══════════════════════════════════════════════════════════════════╝
*/

import axios from 'axios';

// ─── Step 1: Create a configured Axios instance ───────────────────
// Think of this like creating a "pre-configured fetch" tool.
// Every request made with `api` will automatically have:
//   - The correct base URL
//   - Credentials (cookies) included

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',

  // 📘 withCredentials: true
  // This tells the browser: "Send cookies with every request"
  // Your backend sets httpOnly cookies for accessToken & refreshToken.
  // Without this, the browser BLOCKS cookies on cross-origin requests.
  withCredentials: true,

  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  📘 LESSON: What are Interceptors?

  Think of them like "middleware" but on the frontend:

  REQUEST INTERCEPTOR:
    Runs BEFORE every request leaves your browser.
    Use case: Attach auth tokens to headers automatically.

  RESPONSE INTERCEPTOR:
    Runs AFTER every response comes back.
    Use case: If you get a 401 (token expired), automatically
              refresh the token and retry the failed request.

  Flow:
    Component calls api.get('/trips')
         ↓
    [Request Interceptor] → adds token to header
         ↓
    Request goes to server
         ↓
    Server responds
         ↓
    [Response Interceptor] → checks for errors, handles 401
         ↓
    Component receives data
*/

// ─── Step 2: Response Interceptor — Auto handle token expiry ──────

// This flag prevents infinite loops when refreshing tokens
let isRefreshing = false;

api.interceptors.response.use(
  // ✅ Success handler: If response is 2xx, just pass it through
  (response) => response,

  // ❌ Error handler: If response is 4xx/5xx
  async (error) => {
    const originalRequest = error.config;

    // If we get 401 (Unauthorized) AND we haven't already tried refreshing
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Mark this request as "already retried" to prevent infinite loop
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Try to get a new access token using the refresh token
          // The refresh token is in the cookie (sent automatically)
          await api.post('/auth/refresh-token');
          
          isRefreshing = false;

          // 🔄 RETRY the original failed request with the new token
          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          
          // If refresh also fails, user needs to login again
          // We'll redirect to login page
          window.location.href = '/login';
          
          return Promise.reject(refreshError);
        }
      }
    }

    // For all other errors, just pass them through
    return Promise.reject(error);
  }
);

// Export the configured instance
// Every other file will import THIS instead of raw axios
export default api;
