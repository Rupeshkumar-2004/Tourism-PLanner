import api from '../../../services/api';

export const getDestinationWeather = async (destinationId) => {
    const response = await api.get(`/destinations/${destinationId}/weather`);
    return response.data.data;
};
