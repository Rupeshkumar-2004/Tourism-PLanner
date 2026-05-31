import api from "../../../services/api";

export async function getDestinationById(id) {
    const response = await api.get(`/destinations/${id}`);

    return response.data.data;
}