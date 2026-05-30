import api from "../../../services/api.js";

export const getDashboardData = async () => {
    const response = await api.get("/dashboard/dashboard-stats");

    return response.data.data;
};