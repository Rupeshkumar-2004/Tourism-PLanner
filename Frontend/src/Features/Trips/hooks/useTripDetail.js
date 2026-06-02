import { useQuery } from "@tanstack/react-query";
import { getTripById } from "../services/tripService";
import { getTripDestinations } from "../services/tripDestinationService";

export function useTripDetail(tripId) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['trip', tripId],
        queryFn: async () => {
            const [tripData, tripDestinationsData] = await Promise.all([
                getTripById(tripId),
                getTripDestinations(tripId)
            ]);
            
            return {
                ...tripData,
                destinations: tripDestinationsData.destinations || []
            };
        },
        enabled: !!tripId // Only fetch if tripId exists
    });

    return {
        trip: data,
        isLoading,
        error: error ? (error.response?.data?.message || error.message || "Failed to load trip details") : null,
        refetchTrip: refetch
    };
}
