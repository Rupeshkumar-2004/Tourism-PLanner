import { CalendarDays, MapPin } from "lucide-react";

const StatusBadge = ({status}) => {
  const statusColors = {
    'Planned': 'bg-primary',
    'In Progress': 'bg-[#f59e0b]',
    'Completed': 'bg-tertiary',
    'Cancelled': 'bg-error',
  };

  return (
    <div className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
      <div className={`w-2 h-2 rounded-full ${statusColors[status] || 'bg-primary'}`}></div>
      <span className="font-label-sm text-label-sm text-on-surface">{status}</span>
    </div>
  );
};

const Badge = ({ text, color = 'secondary' }) => {
  const colorMap = {
    secondary: 'bg-secondary-fixed text-secondary',
    primary: 'bg-primary-container text-on-primary-container',
    default: 'bg-surface-container text-on-surface',
  };

  return (
    <span className={`${colorMap[color]} px-2.5 py-1 rounded-full font-label-sm text-label-sm`}>
      {text}
    </span>
  );
};

const Dates = ({ trip }) => {
    const formatDate = (date) => {
      if (!date) return null;

      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) {
        return null;
      }

      return parsedDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };

    const startDate = formatDate(trip.startDate);
    const endDate = formatDate(trip.endDate);
    const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : startDate || "Date not planned";

    return(
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-1">{trip.title}</h2>
          <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md">
            <CalendarDays size={18} />
            <span>{dateRange}</span>
          </div>
        </div>
    )
}

const TripCard = ({ trip }) => {
  return (
    <article className="bg-surface-container-lowest rounded-xl shadow-ambient hover:shadow-ambient-hover transition-all duration-300 flex flex-col overflow-hidden border border-outline-variant/70">
      <div className="h-[220px] w-full bg-surface-container relative overflow-hidden">
        <img
          alt={trip.title || "Trip cover"}
          className="w-full h-full object-cover"
          src={trip.image}
        />
        <StatusBadge status={trip.status} />
      </div>

      <div className="p-6 flex flex-col flex-grow gap-4">
        <div className="flex items-center justify-between gap-3">
          <Badge text={trip.type} color={trip.type === 'Solo' ? 'secondary' : 'primary'} />
          {trip.destination && (
            <span className="flex min-w-0 items-center gap-1.5 text-label-sm font-label-sm text-on-surface-variant">
              <MapPin size={15} className="shrink-0" />
              <span className="truncate">{trip.destination}</span>
            </span>
          )}
        </div>

        <Dates trip={trip} />

        {trip.description && (
          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
            {trip.description}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-outline-variant flex justify-between items-center">
          {/* {trip.milestone && (
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline">Next Milestone</span>
              <span className="font-body-md text-body-md text-on-surface">{trip.milestone}</span>
            </div>
          )} */}
          <button className="font-label-md text-label-md text-primary hover:text-on-primary-container transition-colors">
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};

export default TripCard;
