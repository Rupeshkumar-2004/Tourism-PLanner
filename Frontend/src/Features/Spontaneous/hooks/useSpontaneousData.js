import { useState, useEffect, useCallback } from 'react';
import api from "../../../services/api.js";

export const useSpontaneousData = () => {
    const [locationState, setLocationState] = useState({
        loading: true,
        error: null,
        data: null
    });
    const [fallbackCity, setFallbackCity] = useState('');

    const fetchSpontaneousData = useCallback(async (lat, lon) => {
        try {
            setLocationState(prev => ({ ...prev, loading: true, error: null }));
            const response = await api.get(`/spontaneous?lat=${lat}&lon=${lon}`);
            setLocationState({
                loading: false,
                error: null,
                data: response.data.data
            });
        } catch (err) {
            setLocationState({
                loading: false,
                error: "Failed to fetch spontaneous adventures. Please try again.",
                data: null
            });
        }
    }, []);

    const handleGeolocation = useCallback(() => {
        setLocationState(prev => ({ ...prev, loading: true, error: null }));
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchSpontaneousData(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    let errMsg = "Please allow location access to find nearby adventures.";
                    if (error.code === error.PERMISSION_DENIED) errMsg = "Location permission denied. Please enter a city manually.";
                    setLocationState({ loading: false, error: errMsg, data: null });
                },
                { timeout: 10000 }
            );
        } else {
            setLocationState({
                loading: false,
                error: "Geolocation is not supported by your browser.",
                data: null
            });
        }
    }, [fetchSpontaneousData]);

    useEffect(() => {
        handleGeolocation();
    }, [handleGeolocation]);

    const handleFallbackSearch = async (e) => {
        e.preventDefault();
        if (!fallbackCity) return;

        setLocationState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fallbackCity)}`);
            const data = await res.json();
            if (data && data.length > 0) {
                fetchSpontaneousData(data[0].lat, data[0].lon);
            } else {
                setLocationState({ loading: false, error: "City not found. Please try another name.", data: null });
            }
        } catch (err) {
            setLocationState({ loading: false, error: "Failed to resolve city.", data: null });
        }
    };

    return {
        locationState,
        setLocationState,
        fallbackCity,
        setFallbackCity,
        handleGeolocation,
        handleFallbackSearch
    };
};
