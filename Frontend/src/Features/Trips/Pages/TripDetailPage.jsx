import { useParams } from "react-router-dom";
import { useTripDetail } from "../hooks/useTripDetail";
import TripDetailSkeleton from "../Components/TripDetail/TripDetailSkeleton";
import TripDetailError from "../Components/TripDetail/TripDetailError";
import TripDetailContent from "../Components/TripDetail/TripDetailContent";

const TripDetailPage = () => {
    const { tripId } = useParams();
    const { trip, isLoading, error, refetchTrip } = useTripDetail(tripId);

    if (isLoading) return <TripDetailSkeleton />;
    if (error) return <TripDetailError onRetry={refetchTrip} />;
    
    return <TripDetailContent trip={trip} refetchTrip={refetchTrip} />;
};

export default TripDetailPage;
