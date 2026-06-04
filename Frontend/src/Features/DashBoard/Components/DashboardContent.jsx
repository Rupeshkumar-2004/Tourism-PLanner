import TopNavBar from '../../../components/TopNavBar.jsx';
import StatsSection from './StatsSection.jsx';
import UpcomingTripsSection from './UpcomingTripsSection.jsx';
import RecentTripsSection from './RecentTripsSection.jsx';
import SuggestionGuideSection from './SuggestionGuideSection.jsx';
import { useAuth } from '../../../hooks/useAuth.js';

const DashboardContent = ({ dashboardData }) => {
  const { user } = useAuth();
  const upcomingTrips = Array.isArray(dashboardData?.upcomingTrips)
    ? dashboardData.upcomingTrips
    : [];
  const recentTrips = Array.isArray(dashboardData?.recentTrips)
    ? dashboardData.recentTrips
    : [];
  const suggestedPlaces = dashboardData?.suggestedPlaces || [];

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen pb-section-gap">
      <TopNavBar user={user.fullName} />

      {/* Main Content Canvas */}
      <main className="px-container-margin-mobile md:px-container-margin-desktop pt-12 max-w-[1440px] mx-auto">
        {/* Hero Section */}
        <header className="mb-section-gap">
          <h1 className="font-display text-display text-on-surface mb-2">
            Welcome back, {user.fullName}!
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Where will your next adventure take you?
          </p>
        </header>

        {/* Stats Row */}
        <StatsSection
          stats={dashboardData?.stats}
          guideCount={Array.isArray(suggestedPlaces) ? suggestedPlaces.length : 0}
        />

        {/* Upcoming Trips Section */}
        {upcomingTrips.length > 0 && (
          <UpcomingTripsSection trips={upcomingTrips} />
        )}

        {/* Recent Trips Section */}
        {recentTrips.length > 0 && (
          <RecentTripsSection trips={recentTrips} />
        )}

        <SuggestionGuideSection guides={suggestedPlaces} />
      </main>
    </div>
  );
}

export default DashboardContent;
