import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_API}`,

    withCredentials: true,

    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;

api.interceptors.response.use(
    (response) => response, 

    async (error) => {
        const originalRequest = error.config;

        const skipUrls = ['/auth/me', '/auth/refresh-token', '/auth/login', '/auth/register'];
        const requestUrl = originalRequest?.url || '';
        if (skipUrls.some(url => requestUrl.includes(url))) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            if(!isRefreshing){
                isRefreshing = true;

                try {
                    await api.post('/auth/refresh-token');
            
                    isRefreshing = false;

                    return api(originalRequest);
                } catch (refreshError) {
                    isRefreshing = false;
            
    
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;