import { useState } from "react";
import { createTrip, updateTrip, deleteTrip } from "../services/tripService";

export function useTripMutations(onSuccessCallback) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreate = async (tripData) => {
        setIsLoading(true);
        setError(null);
        try {
            await createTrip(tripData);
            if (onSuccessCallback) onSuccessCallback();
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create trip");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (id, tripData) => {
        setIsLoading(true);
        setError(null);
        try {
            await updateTrip(id, tripData);
            if (onSuccessCallback) onSuccessCallback();
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update trip");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            await deleteTrip(id);
            if (onSuccessCallback) onSuccessCallback();
            return true;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete trip");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createTrip: handleCreate,
        updateTrip: handleUpdate,
        deleteTrip: handleDelete,
        isLoading,
        error
    };
}
