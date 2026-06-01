import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Features/DashBoard/pages/DashboardPage.jsx";
import LoginPage from "./Features/Auth/Page/LoginPage.jsx";
import RegisterPage from "./Features/Auth/Page/SignUp.jsx";
import TripPage from "./Features/Trips/Pages/TripPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import DestinationsPage from "./Features/Destinations/Page/DestinationsPage.jsx";
import DestinationPage from "./Features/Destinations/Page/DestinationPage.jsx";
import PlacesPage from "./Features/Places/Page/PlacesPage.jsx";
import TripDetailPage from "./Features/Trips/Pages/TripDetailPage.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:destinationId" element={<DestinationPage />} />
          <Route path="/destinations/:destinationId/places" element={<PlacesPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trips" element={<TripPage />} />
            <Route path="/trips/:tripId" element={<TripDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
