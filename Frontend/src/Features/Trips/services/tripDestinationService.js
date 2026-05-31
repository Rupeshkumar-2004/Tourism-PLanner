import api from "../../../services/api.js";

export const getTripDestinations = async (tripId, params = {}) => {
    const response = await api.get(`/trips/${tripId}/destinations`, { params });
    return response.data.data;
};

export const addDestinationToTrip = async (tripId, destinationId, options = {}) => {
    const response = await api.post(`/trips/${tripId}/destinations`, {
        destinationId,
        ...options
    });
    return response.data.data;
};

export const updateTripDestination = async (tripId, tripDestinationId, updateData) => {
    // Assuming backend patch route supports this via /trips/:tripId or /trip-destinations/:id
    // This connects to the updateTripById backend controller we modified earlier if it handles nested itinerary updates
    const response = await api.patch(`/trips/${tripId}`, updateData);
    return response.data.data;
};

export const removeDestinationFromTrip = async (tripId, tripDestinationId) => {
    const response = await api.delete(`/trips/${tripId}/destinations/${tripDestinationId}`);
    return response.data.data;
};
