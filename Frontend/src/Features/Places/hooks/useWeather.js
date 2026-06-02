import { useQuery } from '@tanstack/react-query';
import { getDestinationWeather } from '../services/weatherService';

const useWeather = (destinationId) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['weather', destinationId],
        queryFn: () => getDestinationWeather(destinationId),
        enabled: !!destinationId
    });

    return { 
        weatherData: data, 
        isLoading, 
        error: error ? (error.response?.data?.message || error.message || 'Failed to fetch weather data') : null 
    };
};

export default useWeather;
