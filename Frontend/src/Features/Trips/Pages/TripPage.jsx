import TripContent from "../Components/TripContent.jsx";
import TripSkeleton from "../Components/TripSkeleton.jsx";
import TripError from "../Components/TripError.jsx";
import EmptyTrip from "../Components/EmptyTrip.jsx";

import { useTrips } from "../hooks/useTrips.js";

const normalizeTrips = (tripsData) => {
  const trips = Array.isArray(tripsData) ? tripsData : tripsData?.trips;

  if (!Array.isArray(trips)) {
    return [];
  }

  return trips.map((trip) => ({
    ...trip,
    id: trip.id || trip._id,
    image:
      trip.image ||
      trip.coverImage ||
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    status: trip.status || "Planned",
    type: trip.type || "Solo",
  }));
};

const getTripTime = (trip) => {
  const date = trip?.endDate || trip?.startDate || trip?.date;
  const timestamp = new Date(date).getTime();

  return Number.isNaN(timestamp) ? null : timestamp;
};

const allUpcomingTrips = (tripsData) => {
  const now = Date.now();

  return normalizeTrips(tripsData)
    .filter((trip) => {
      const status = trip?.status?.toLowerCase();

      if (status === "completed" || status === "cancelled") {
        return false;
      }

      const timestamp = getTripTime(trip);

      return timestamp === null || timestamp >= now;
    })
    .sort((firstTrip, secondTrip) => {
      const firstDate = getTripTime(firstTrip) ?? Number.MAX_SAFE_INTEGER;
      const secondDate = getTripTime(secondTrip) ?? Number.MAX_SAFE_INTEGER;

      return firstDate - secondDate;
    });
};

const allPastTrips = (tripsData) => {
  const now = Date.now();

  return normalizeTrips(tripsData)
    .filter((trip) => {
      const status = trip?.status?.toLowerCase();
      const timestamp = getTripTime(trip);

      return status === "completed" || timestamp !== null && timestamp < now;
    })
    .sort((firstTrip, secondTrip) => {
      const firstDate = getTripTime(firstTrip) ?? 0;
      const secondDate = getTripTime(secondTrip) ?? 0;

      return secondDate - firstDate;
    });
};
const TripPage = () => {
  const { tripsData, isLoading, error, refetchTrip } = useTrips();

  if (isLoading) {
    return <TripSkeleton />
  }

  if (error) {
    return <TripError onRetry={refetchTrip} />
  }

  const upcomingTrips = allUpcomingTrips(tripsData);
  const pastTrips = allPastTrips(tripsData);

  if (upcomingTrips.length === 0 && pastTrips.length === 0) {
    return <EmptyTrip />;
  }

  return <TripContent upcomingTrips={upcomingTrips} pastTrips={pastTrips} />
}

export default TripPage
