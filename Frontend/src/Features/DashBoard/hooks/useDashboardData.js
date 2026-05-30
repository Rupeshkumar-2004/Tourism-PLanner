import { useEffect, useState } from "react";
import { getDashboardData } from '../services/dashboardServices.js';

export function useDashboardData(){
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try{
            setIsLoading(true);
            setError(null);
            const userData = await getDashboardData();
            setDashboardData(userData);
        }
        catch(error){
            const message = error.response?.data?.message || 'Failed to fetch dashboard data';
            setError(message);
            setDashboardData(null);
        }
        finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchData();
    }, []);

    return {
        dashboardData,
        isLoading,
        error,
        refetchDashboard: fetchData
    };
}