import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Features/DashBoard/pages/DashboardPage.jsx";
import LoginPage from "./Features/Auth/Page/LoginPage.jsx";
import RegisterPage from "./Features/Auth/Page/SignUp.jsx";
import TripPage from "./Features/Trips/Pages/TripPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import DestinationsPage from "./Features/Destinations/Page/DestinationsPage.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trips" element={<TripPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
