/*
  ╔══════════════════════════════════════════════════════════════════╗
  ║  📘 LESSON: React Router — Client-Side Routing                  ║
  ╠══════════════════════════════════════════════════════════════════╣
  ║                                                                  ║
  ║  In a traditional website, every URL change causes a FULL page   ║
  ║  reload — the browser fetches new HTML from the server.          ║
  ║                                                                  ║
  ║  In a React SPA (Single Page Application):                       ║
  ║  - There's only ONE HTML file (index.html)                       ║
  ║  - React Router intercepts URL changes                           ║
  ║  - It renders different components for different URLs             ║
  ║  - No page reload! Just component swapping.                      ║
  ║                                                                  ║
  ║  Key concepts:                                                   ║
  ║  <BrowserRouter> — enables routing (wraps the whole app)         ║
  ║  <Routes> — container for route definitions                      ║
  ║  <Route path="" element={}> — maps a URL to a component          ║
  ║  <Navigate to=""> — redirects to another URL                     ║
  ║  <Outlet /> — renders child routes (used in layout routes)       ║
  ║                                                                  ║
  ║  NESTED ROUTES:                                                  ║
  ║  <Route element={<ProtectedRoute />}>     ← Layout route         ║
  ║    <Route path="/dashboard" element={..}> ← Child route          ║
  ║  </Route>                                                        ║
  ║                                                                  ║
  ║  The child only renders if ProtectedRoute renders <Outlet />.    ║
  ║  ProtectedRoute checks auth → renders Outlet or redirects.       ║
  ╚══════════════════════════════════════════════════════════════════╝
*/

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProtectedRoute, GuestRoute } from './components/ProtectedRoute.jsx';

// Pages
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import DestinationsPage from './pages/DestinationsPage.jsx';

function App() {
  return (
    /*
      📘 AuthProvider wraps EVERYTHING.
      This means every component in the app can access auth state
      via useAuth(). It's like a "global variable" but the React way.

      ORDER MATTERS:
      AuthProvider must be INSIDE BrowserRouter if any auth logic
      uses routing hooks (useNavigate, useLocation).
      But here AuthProvider doesn't use routing, so it can be outside.
      We put it outside for clarity.
    */
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 
            📘 GUEST ROUTES — Only visible to NOT-logged-in users.
            If a logged-in user visits /login, they get redirected to /dashboard.
          */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* 
            📘 PROTECTED ROUTES — Only visible to logged-in users.
            If a guest visits /dashboard, they get redirected to /login.
          */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          {/* 
            📘 PUBLIC ROUTES — Visible to everyone.
            Destinations can be browsed without login.
          */}
          <Route path="/destinations" element={<DestinationsPage />} />

          {/* 
            📘 Catch-all redirect — any unknown URL goes to login.
            The `*` matches anything not matched above.
          */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;