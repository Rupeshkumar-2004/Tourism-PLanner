import { useEffect, useState, useCallback } from "react";
import getDestinations from "../services/destinationsServices";

function useDestinations() {
    const [destinations, setDestinations] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await getDestinations({ page, limit, search, category });

            setDestinations(data.destinations);
            setPagination(data.pagination);
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Failed to fetch destinations data";

            setError(message);

            setDestinations([]);
            setPagination(null);
        } finally {
            setIsLoading(false);
        }
    }, [page, limit, search, category]);

    useEffect(() => {
        let canceled = false;

        const load = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const data = await getDestinations({ page, limit, search, category });

                if (!canceled) {
                    setDestinations(data.destinations);
                    setPagination(data.pagination);
                }
            } catch (error) {
                if (!canceled) {
                    const message =
                        error.response?.data?.message ||
                        "Failed to fetch destinations data";

                    setError(message);
                    setDestinations([]);
                    setPagination(null);
                }
            } finally {
                if (!canceled) {
                    setIsLoading(false);
                }
            }
        };

        load();

        return () => {
            canceled = true;
        };
    }, [page, limit, search, category]);

    return {
        destinations,
        pagination,
        isLoading,
        error,
        refetchDestinations: fetchData,
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