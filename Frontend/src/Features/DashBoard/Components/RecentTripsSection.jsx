import { CalendarDays, MapPin } from 'lucide-react';

const fallbackTripImage =
  'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80';

const formatTripDate = (startDate, endDate) => {
  if (!startDate) return 'Date not planned';

  const formatter = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const start = formatter.format(new Date(startDate));

  if (!endDate) return start;

  return `${start} - ${formatter.format(new Date(endDate))}`;
};

const RecentTripsSection = ({ trips = [] }) => {
  return (
    <section className="mb-section-gap">
      <div className="flex justify-between items-center mb-8 border-b border-outline-variant pb-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Recent Trips
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Your recent travel history
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {trips.length > 0 ? (
          trips.map((trip) => (
            <article
              key={trip._id}
              className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-ambient border border-outline-variant/30"
            >
              <div className="h-44 bg-surface-container">
                <img
                  alt={trip.title || 'Trip cover'}
                  className="h-full w-full object-cover"
                  src={trip.coverImage?.trim() || fallbackTripImage}
                />
              </div>

              <div className="p-6">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">
                  {trip.title || 'Untitled Trip'}
                </h3>
                <div className="space-y-2 text-on-surface-variant font-body-md text-body-md">
                  <p className="flex items-center gap-2">
                    <MapPin size={16} />
                    {trip.destination || 'No destination'}
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {formatTripDate(trip.startDate, trip.endDate)}
                  </p>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-on-surface-variant">No recent trips yet</div>
        )}
      </div>
    </section>
  );
};

export default RecentTripsSection;
