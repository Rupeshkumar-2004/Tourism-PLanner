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

export const updateTripDestination = async (tripDestinationId, updateData) => {
    const response = await api.patch(`/trip-destinations/${tripDestinationId}`, updateData);
    return response.data.data;
};

export const removeDestinationFromTrip = async (tripDestinationId) => {
    const response = await api.delete(`/trip-destinations/${tripDestinationId}`);
    return response.data.data;
};

export const addPlaceToTripItinerary = async (tripId, destinationId, place) => {
    const response = await api.post(`/trip-destinations/add-place`, {
        tripId,
        destinationId,
        place
    });
    return response.data.data;
};
