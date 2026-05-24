/*
  ╔══════════════════════════════════════════════════════════════════╗
  ║  📘 LESSON: The Service Layer Pattern                           ║
  ╠══════════════════════════════════════════════════════════════════╣
  ║                                                                  ║
  ║  WHY separate API calls into their own files?                    ║
  ║                                                                  ║
  ║  ❌ BAD — API call directly in component:                       ║
  ║                                                                  ║
  ║    function LoginPage() {                                        ║
  ║      const handleLogin = async () => {                           ║
  ║        const res = await axios.post('/api/v1/auth/login', data); ║
  ║        // handle response...                                     ║
  ║      }                                                           ║
  ║    }                                                             ║
  ║                                                                  ║
  ║  ✅ GOOD — Component calls a service function:                  ║
  ║                                                                  ║
  ║    function LoginPage() {                                        ║
  ║      const handleLogin = async () => {                           ║
  ║        const data = await authService.login(email, password);    ║
  ║      }                                                           ║
  ║    }                                                             ║
  ║                                                                  ║
  ║  Benefits:                                                       ║
  ║  1. Component stays clean — only UI logic                        ║
  ║  2. Same API call can be reused in multiple components           ║
  ║  3. If the endpoint URL changes, fix it in ONE place             ║
  ║  4. Easier to test (mock the service, not axios)                 ║
  ║                                                                  ║
  ║  🎯 INTERNSHIP TIP: This is called "Separation of Concerns".   ║
  ║  Components handle UI. Services handle data. Clean architecture. ║
  ╚══════════════════════════════════════════════════════════════════╝
*/

import api from './api.js';

// Each function matches one backend endpoint.
// They all return the response data (unwrapped from axios).

// ─── REGISTER ─────────────────────────────────────────────────────
// Matches: POST /api/v1/auth/register
// Body: { fullName, email, password, phone? }
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  // response.data = { statusCode, data: { user, accessToken }, message, success }
  return response.data;
};

// ─── LOGIN ────────────────────────────────────────────────────────
// Matches: POST /api/v1/auth/login
// Body: { email, password }
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// ─── GET CURRENT USER ─────────────────────────────────────────────
// Matches: GET /api/v1/auth/me
// No body needed — the token in cookie identifies the user
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// ─── REFRESH TOKEN ────────────────────────────────────────────────
// Matches: POST /api/v1/auth/refresh-token
// The refresh token is in the httpOnly cookie
export const refreshToken = async () => {
  const response = await api.post('/auth/refresh-token');
  return response.data;
};
