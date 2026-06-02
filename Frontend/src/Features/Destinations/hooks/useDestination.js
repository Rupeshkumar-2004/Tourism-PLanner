import { useQuery } from "@tanstack/react-query";
import { getDestinationById } from "../services/destinationServices";

export default function useDestination(destinationId) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['destination', destinationId],
        queryFn: () => getDestinationById(destinationId),
        enabled: !!destinationId
    });

    return {
        destination: data,
        isLoading,
        error: error ? (error.response?.data?.message || error.message || "Failed to fetch destination data") : null,
        refetchDestination: refetch,
    };
}