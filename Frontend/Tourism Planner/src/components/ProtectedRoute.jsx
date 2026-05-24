/*
  ╔══════════════════════════════════════════════════════════════════╗
  ║  📘 LESSON: Protected Routes — Guarding Pages                   ║
  ╠══════════════════════════════════════════════════════════════════╣
  ║                                                                  ║
  ║  Some pages should only be accessible to logged-in users:        ║
  ║  - Dashboard (/dashboard) → needs login                          ║
  ║  - Trip details (/trips/:id) → needs login                      ║
  ║                                                                  ║
  ║  Some pages should only be accessible to logged-OUT users:       ║
  ║  - Login (/login) → no point showing if already logged in        ║
  ║  - Register (/register) → same                                  ║
  ║                                                                  ║
  ║  HOW IT WORKS:                                                   ║
  ║                                                                  ║
  ║  In App.jsx routes:                                              ║
  ║    <Route element={<ProtectedRoute />}>                          ║
  ║      <Route path="/dashboard" element={<Dashboard />} />         ║
  ║    </Route>                                                      ║
  ║                                                                  ║
  ║  ProtectedRoute checks: "Is user logged in?"                     ║
  ║    ✅ Yes → renders the child route (via <Outlet />)             ║
  ║    ❌ No → redirects to /login                                   ║
  ║                                                                  ║
  ║  📘 <Outlet /> is React Router's way of saying:                  ║
  ║  "Render whatever child route matches the current URL"           ║
  ║  It's like {children} but for routes.                            ║
  ╚══════════════════════════════════════════════════════════════════╝
*/

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

// ─── ProtectedRoute: Only for logged-in users ─────────────────────
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  // 📘 While we're still checking if the user has a valid session,
  // show a loading spinner. Without this, you'd briefly see the
  // login page flash before redirecting to dashboard.
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
      </div>
    );
  }

  // 📘 Navigate component from React Router.
  // `replace` means: don't add this redirect to browser history.
  // So pressing "Back" won't take them to the protected page again.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 📘 <Outlet /> renders the matched child route.
  // If URL is /dashboard, it renders <DashboardPage />.
  // If URL is /trips/123, it renders <TripDetailPage />.
  return <Outlet />;
}

// ─── GuestRoute: Only for NOT-logged-in users ─────────────────────
// Prevents logged-in users from seeing login/register pages.
export function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>
      </div>
    );
  }

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
