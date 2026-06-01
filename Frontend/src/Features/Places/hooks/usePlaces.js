import { useState, useEffect } from 'react';
import api from '../../../services/api.js';

const usePlaces = (destinationId) => {
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPlaces = async () => {
        if (!destinationId) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get(`/places?destinationId=${destinationId}`);
            setPlaces(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch places');
            console.error("Error fetching places:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPlaces();
    }, [destinationId]);

    return { places, isLoading, error, refetchPlaces: fetchPlaces };
};

export default usePlaces;
