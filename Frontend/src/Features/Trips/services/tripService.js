import api from "../../../services/api.js";

export const getTrips = async () => {
    const response = await api.get("/trips");
    return response.data.data;
};

export const getTripById = async (id) => {
    const response = await api.get(`/trips/${id}`);
    return response.data.data;
};

export const createTrip = async (tripData) => {
    const response = await api.post("/trips", tripData);
    return response.data.data;
};

export const updateTrip = async (id, tripData) => {
    const response = await api.patch(`/trips/${id}`, tripData);
    return response.data.data;
};

export const deleteTrip = async (id) => {
    const response = await api.delete(`/trips/${id}`);
    return response.data;
};