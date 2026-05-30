import api from "../../../services/api.js"

export const getTrips = async () => {
    const response = await api.get("/trips");

    return response.data.data;
}