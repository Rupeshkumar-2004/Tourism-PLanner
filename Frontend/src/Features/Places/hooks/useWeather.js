import { useState, useEffect } from 'react';
import { getDestinationWeather } from '../services/weatherService';

const useWeather = (destinationId) => {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!destinationId) return;

        let isMounted = true;

        const fetchWeather = async () => {
            setIsLoading(true);
            try {
                const data = await getDestinationWeather(destinationId);
                if (isMounted) {
                    setWeatherData(data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.response?.data?.message || 'Failed to fetch weather data');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchWeather();

        return () => {
            isMounted = false;
        };
    }, [destinationId]);

    return { weatherData, isLoading, error };
};

export default useWeather;
