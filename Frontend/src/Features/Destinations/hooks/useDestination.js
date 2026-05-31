import { useEffect, useState } from "react";
import { getDestinationById } from "../services/destinationServices";

export default function useDestination(destinationId) {
    const [destination, setDestination] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDestination = async () => {
        setIsLoading(true);
        try {
            setError(null);
            setDestination(null);
            const data = await getDestinationById(destinationId);
            setDestination(data);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        if (destinationId) {
            fetchDestination();
        }
        else {
            setError("Destination Id is required");
            setIsLoading(false);
            return;
        }
    }, [destinationId]);

    return {
        destination,
        isLoading,
        error,
        refetchDestination: fetchDestination,
    };
}