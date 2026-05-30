import { Bookmark, Globe, MapPin, Plane } from 'lucide-react';
import StatsCard from './StatsCard';

const StatsSection = ({ stats = {}, guideCount = 0 }) => {
  const dashboardStats = [
    {
      icon: Plane,
      label: 'Upcoming Trips',
      value: stats.upcomingTrips ?? 0,
      bgColor: 'bg-primary-fixed',
      iconColor: 'text-primary',
    },
    {
      icon: Globe,
      label: 'Destinations Visited',
      value: stats.destinationsVisited ?? 0,
      bgColor: 'bg-secondary-fixed',
      iconColor: 'text-secondary',
    },
    {
      icon: MapPin,
      label: 'Saved Places',
      value: stats.savedPlaces ?? 0,
      bgColor: 'bg-tertiary-fixed',
      iconColor: 'text-tertiary',
    },
    {
      icon: Bookmark,
      label: 'Suggested Guides',
      value: guideCount ?? 0,
      bgColor: 'bg-primary-fixed',
      iconColor: 'text-primary',
    },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gutter mb-section-gap">
      {dashboardStats.map((stat) => (
        <StatsCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          bgColor={stat.bgColor}
          iconColor={stat.iconColor}
        />
      ))}
    </section>
  );
};

export default StatsSection;
