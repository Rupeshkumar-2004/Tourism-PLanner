import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import getDestinations from "../services/destinationsServices";

function useDestinations() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['destinations', { page, limit, search, category }],
        queryFn: () => getDestinations({ page, limit, search, category }),
        placeholderData: keepPreviousData // keep old data while fetching new page
    });

    return {
        destinations: data?.destinations || [],
        pagination: data?.pagination || null,
        isLoading,
        error: error ? (error.response?.data?.message || error.message || "Failed to fetch destinations data") : null,
        refetchDestinations: refetch,
        page,
        setPage,
        limit,
        setLimit,
        search,
        setSearch,
        category,
        setCategory,
    };
}

export default useDestinations;