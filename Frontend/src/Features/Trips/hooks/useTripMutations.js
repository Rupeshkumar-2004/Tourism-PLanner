import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrip, updateTrip, deleteTrip } from "../services/tripService";

export function useTripMutations(onSuccessCallback) {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createTrip,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            if (onSuccessCallback) onSuccessCallback();
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, tripData }) => updateTrip(id, tripData),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            queryClient.invalidateQueries({ queryKey: ['trip', variables.id] });
            if (onSuccessCallback) onSuccessCallback();
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTrip,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            if (onSuccessCallback) onSuccessCallback();
        }
    });

    const handleCreate = async (tripData) => {
        try {
            await createMutation.mutateAsync(tripData);
            return true;
        } catch (err) {
            return false;
        }
    };

    const handleUpdate = async (id, tripData) => {
        try {
            await updateMutation.mutateAsync({ id, tripData });
            return true;
        } catch (err) {
            return false;
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteMutation.mutateAsync(id);
            return true;
        } catch (err) {
            return false;
        }
    };

    const isLoading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;
    const errorObj = createMutation.error || updateMutation.error || deleteMutation.error;
    const error = errorObj ? (errorObj.response?.data?.message || errorObj.message || "Operation failed") : null;

    return {
        createTrip: handleCreate,
        updateTrip: handleUpdate,
        deleteTrip: handleDelete,
        isLoading,
        error
    };
}
