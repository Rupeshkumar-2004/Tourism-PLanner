import api from "../../../services/api";

const getDestinations = async ({ page = 1, limit = 10, search = '', category = '' } = {}) => {
    const params = { page, limit };

    if (search) {
        params.search = search;
    }

    if (category && category !== 'All') {
        params.category = category;
    }

    const response = await api.get("/destinations", { params });

    return response.data.data;
};

export default getDestinations;