import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from '../services/dashboardServices.js';

export function useDashboardData() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboardData
    });

    return {
        dashboardData: data,
        isLoading,
        error: error ? (error.response?.data?.message || error.message || "Failed to fetch dashboard data") : null,
        refetchDashboard: refetch
    };
}