import { useQuery } from "@tanstack/react-query";
import { getTrips } from "../services/tripService";

export function useTrips() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['trips'],
        queryFn: getTrips
    });

    return {
        tripsData: data,
        isLoading,
        error: error ? (error.response?.data?.message || error.message || "Failed to fetch trips") : null,
        refetchTrip: refetch
    };
}
