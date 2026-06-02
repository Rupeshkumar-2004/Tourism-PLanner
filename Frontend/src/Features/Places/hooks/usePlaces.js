import { useQuery } from '@tanstack/react-query';
import api from '../../../services/api.js';

const usePlaces = (destinationId) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['places', destinationId],
        queryFn: async () => {
            const response = await api.get(`/places?destinationId=${destinationId}`);
            return response.data.data;
        },
        enabled: !!destinationId
    });

    return {
        places: data || [],
        isLoading,
        error: error ? (error.response?.data?.message || error.message || 'Failed to fetch places') : null,
        refetchPlaces: refetch
    };
};

export default usePlaces;
