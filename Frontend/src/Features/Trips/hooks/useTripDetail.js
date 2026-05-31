import { useState, useEffect } from "react";
import { getTripById } from "../services/tripService";
import { getTripDestinations } from "../services/tripDestinationService";

export function useTripDetail(tripId) {
    const [trip, setTrip] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTrip = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const [tripData, tripDestinationsData] = await Promise.all([
                getTripById(tripId),
                getTripDestinations(tripId)
            ]);
            
            const mergedTrip = {
                ...tripData,
                destinations: tripDestinationsData.destinations || []
            };
            
            setTrip(mergedTrip);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load trip details");
            setTrip(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (tripId) {
            fetchTrip();
        }
    }, [tripId]);

    return {
        trip,
        isLoading,
        error,
        refetchTrip: fetchTrip
    };
}
