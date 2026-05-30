import { useEffect, useState } from "react";
import { getTrips } from "../services/tripService";

export function useTrips() {
    const [tripsData, setTripsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTrips = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const data = await getTrips();

                setTripsData(data);
            } catch (error) {
                const message =
                    error.response?.data?.message ||
                    "Failed to fetch trips";

                setError(message);
                setTripsData(null);
            } finally {
                setIsLoading(false);
            }
        };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTrips();
    }, []);

    return {
        tripsData,
        isLoading,
        error,
        refetchTrip : fetchTrips
    };
}
