/*
  ╔══════════════════════════════════════════════════════════════════════╗
  ║  📘 MEGA LESSON: React Context API — Global State Management       ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                      ║
  ║  THE PROBLEM:                                                        ║
  ║  When a user logs in, MANY components need to know:                  ║
  ║  - Is the user logged in?                                            ║
  ║  - What's their name? (for the navbar greeting)                      ║
  ║  - Should we show the dashboard or redirect to login?                ║
  ║                                                                      ║
  ║  WITHOUT Context, you'd have to pass user data as props through      ║
  ║  every component in the chain. This is called "prop drilling":       ║
  ║                                                                      ║
  ║    App (has user) → Layout (passes user) → Navbar (passes user)      ║
  ║                   → Dashboard (passes user) → TripCard (needs user)  ║
  ║                                                                      ║
  ║  WITH Context, ANY component can directly access the user:           ║
  ║                                                                      ║
  ║    AuthProvider (stores user in Context)                              ║
  ║      ├── Navbar → useAuth() → gets user ✅                          ║
  ║      ├── Dashboard → useAuth() → gets user ✅                       ║
  ║      └── TripCard → useAuth() → gets user ✅                        ║
  ║                                                                      ║
  ║  Think of Context as a "broadcast channel":                          ║
  ║  - Provider = radio station (broadcasts data)                        ║
  ║  - useContext = radio receiver (any component can tune in)           ║
  ║                                                                      ║
  ║  🎯 INTERNSHIP TIP: Context API is asked in 90% of React            ║
  ║  interviews. Know: createContext, Provider, useContext.               ║
  ╚══════════════════════════════════════════════════════════════════════╝
*/

import { createContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/authService.js';

/*
  ─── Step 1: Create the Context ─────────────────────────────────────

  📘 createContext() creates an empty "container" for shared data.
  It returns an object with two things:
    - AuthContext.Provider → wraps your app to provide data
    - AuthContext (itself) → used by useContext() to consume data

  The value passed to createContext(null) is the default value
  when no Provider is found above in the tree. We set null
  because we'll always have a Provider.
*/
export const AuthContext = createContext(null);

/*
  ─── Step 2: Create the Provider Component ──────────────────────────

  📘 The Provider is a regular React component that:
  1. Holds all the auth state (user, isAuthenticated, etc.)
  2. Has functions to modify that state (login, register, logout)
  3. Wraps the entire app so ALL children can access this state

  📘 { children } — This is a special React prop.
  When you write:
    <AuthProvider>
      <App />
    </AuthProvider>

  The <App /> becomes `children`. The Provider wraps around it
  and makes auth data available to everything inside.
*/
export function AuthProvider({ children }) {

  // ─── State ────────────────────────────────────────────────────
  
  // 📘 useState — React's way of creating variables that trigger re-renders.
  // Normal JS variables DON'T cause the screen to update when changed.
  // useState variables DO.
  //
  // Syntax: const [value, setterFunction] = useState(initialValue);
  
  const [user, setUser] = useState(null);          // The logged-in user object (or null)
  const [isLoading, setIsLoading] = useState(true); // True while checking if user is already logged in
  const [error, setError] = useState(null);          // Any auth error message

  // 📘 Derived state — computed from existing state, no need for another useState.
  // Double-bang (!!) converts any value to boolean: null → false, {object} → true
  const isAuthenticated = !!user;

  /*
    ─── Step 3: Check if user is already logged in on app load ─────

    📘 useEffect — Runs side effects (code that isn't directly rendering UI).
    
    Side effects include:
    - Fetching data from an API
    - Setting up timers
    - Reading from localStorage
    - Subscribing to events

    Syntax:
      useEffect(() => {
        // This code runs...
      }, [dependencies]);

    The dependency array controls WHEN it runs:
    - []  → runs ONCE after first render (component mount)
    - [x] → runs every time `x` changes
    - (no array) → runs after EVERY render (usually a mistake!)

    Here we use [] because we only need to check the session once on app load.

    📘 WHY do we check on mount?
    When the user refreshes the page, all React state is LOST.
    But the httpOnly cookie survives (it's stored by the browser).
    So we call /auth/me to check: "Is there a valid cookie? If yes, get me the user."
    This is how you persist login across page refreshes.
  */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authService.getCurrentUser();
        // response = { statusCode: 200, data: { _id, fullName, email... }, message, success }
        setUser(response.data);
      } catch (err) {
        // No valid token → user is not logged in → that's fine!
        setUser(null);
      } finally {
        // Whether success or failure, we're done checking
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []); // Empty array = run only once on mount

  /*
    ─── Step 4: Auth functions ─────────────────────────────────────

    📘 useCallback — Performance optimization for functions.
    
    In React, every time a component re-renders, all functions inside it
    are recreated (new memory address). This can cause child components
    to unnecessarily re-render if they receive these functions as props.
    
    useCallback "memoizes" the function — it returns the SAME function
    reference unless its dependencies change.
    
    For internship interviews:
    - useCallback = memoize functions
    - useMemo = memoize values
    - React.memo = memoize components
  */

  const login = useCallback(async (credentials) => {
    setError(null);
    try {
      const response = await authService.login(credentials);
      // response.data = { user, accessToken, refreshToken }
      setUser(response.data.user);
      return response;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw err; // Re-throw so the component can also handle it
    }
  }, []);

  const register = useCallback(async (userData) => {
    setError(null);
    try {
      const response = await authService.register(userData);
      setUser(response.data.user);
      return response;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    // Clear user state → this triggers re-render everywhere that uses auth
    setUser(null);
    setError(null);
    // Note: The httpOnly cookies will expire on their own,
    // or you could add a /logout endpoint in your backend later.
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /*
    ─── Step 5: Provide the value ──────────────────────────────────

    📘 The `value` prop on Provider is the data that ALL children
    can access via useContext(AuthContext).

    Whatever you put in this object is "globally available" to any
    component wrapped inside <AuthProvider>.

    Think of it as: "These are the things I'm broadcasting."
  */
  const value = {
    user,             // The user object (or null if logged out)
    isAuthenticated,  // Boolean: is user logged in?
    isLoading,        // Boolean: still checking initial auth?
    error,            // String or null: any error message
    login,            // Function: login(credentials) → logs in
    register,         // Function: register(userData) → creates account
    logout,           // Function: logout() → clears session
    clearError,       // Function: clearError() → clears error message
  };

  return (
    // 📘 AuthContext.Provider wraps the children and passes `value` down.
    // Every component inside can call useContext(AuthContext) to get this value.
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
