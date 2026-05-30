import api from "./api.js";

const getPayload = (responseData) => responseData?.data ?? responseData;

const getUser = (responseData) => {
    const payload = getPayload(responseData);

    return payload?.user ?? payload;
};

export const signup = async (userData) => {
    const response = await api.post('/auth/register', userData);
    const responseData = response.data;

    return {
        ...responseData,
        user: getUser(responseData),
    };
}

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    const responseData = response.data;

    return {
        ...responseData,
        user: getUser(responseData),
    };
}

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return getUser(response.data);
};

export const refreshToken = async () => {
  const response = await api.post('/auth/refresh-token');
  return response.data;
};
