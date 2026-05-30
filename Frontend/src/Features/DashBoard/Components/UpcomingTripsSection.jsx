import { CalendarDays, MapPin } from 'lucide-react';

const UpcomingTripsSection = ({ trips = [] }) => {
  return (
    <section className="mb-section-gap">
      <div className="flex justify-between items-center mb-8 border-b border-outline-variant pb-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Upcoming Trips
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Journeys you have planned next
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {trips.map((trip) => (
          <article
            key={trip.id}
            className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-ambient p-6"
          >
            <h3 className="font-headline-md text-headline-md text-on-surface mb-3">
              {trip.title || trip.destination || 'Upcoming Journey'}
            </h3>
            <div className="space-y-2 text-on-surface-variant font-body-md text-body-md">
              {(trip.destination || trip.location) && (
                <p className="flex items-center gap-2">
                  <MapPin size={16} />
                  {trip.destination || trip.location}
                </p>
              )}
              {(trip.date || trip.startDate) && (
                <p className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {trip.date || trip.startDate}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UpcomingTripsSection;
