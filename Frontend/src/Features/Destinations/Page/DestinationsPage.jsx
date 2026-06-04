import React, { useState, useEffect } from "react";
import DestinationContent from "../components/Destinations/DestinationsContent.jsx";
import DestinationEmpty from "../components/Destinations/DestinationsEmpty.jsx";
import DestinationError from "../components/Destinations/DestinationsError.jsx";
import DestinationSkeleton from "../components/Destinations/DestinationsSkeleton.jsx";
import StatesView from "../components/StatesView.jsx";
import useDestinations from "../hooks/useDestinations.js";
import TopNavBar from "../../../components/TopNavBar.jsx";
import { useAuth } from "../../../hooks/useAuth.js";

const DestinationsPage = () => {
    const { user } = useAuth();
    const [viewMode, setViewMode] = useState("states"); // "states" or "destinations"

    const {
        destinations,
        pagination,
        isLoading,
        error,
        refetchDestinations,
        page,
        setPage,
        search,
        setSearch,
        state,
        setState
    } = useDestinations();

    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            setInitialLoad(false);
        }
    }, [isLoading]);

    // If a state is selected in StatesView, switch to destinations view and set state
    const handleSelectState = (selectedState) => {
        setState(selectedState);
        setViewMode("destinations");
    }

    // If a general search is triggered from StatesView, switch to destinations view
    const handleGeneralSearch = (searchTerm) => {
        setSearch(searchTerm);
        setState(''); // Clear state if we are doing a general search
        setViewMode("destinations");
    }

    // Custom Empty state for when a specific state has no destinations
    const renderDestinations = () => {
        if (initialLoad) return <DestinationSkeleton />
        if (error) return <DestinationError onRetry={refetchDestinations} />

        // If we are filtering by state and have no results
        if (destinations.length === 0 && state) {
            return (
                <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                    <h2 className="text-3xl font-headline text-primary mb-4">No destinations found in {state}</h2>
                    <p className="text-on-surface-variant font-body mb-8">What are you looking for?</p>

                    <div className="relative group max-w-xl w-full mx-auto">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                        <input
                            className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface placeholder:text-outline shadow-sm"
                            placeholder="Search for any destination..."
                            type="text"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.target.value) {
                                    setState(''); // clear state constraint
                                    setSearch(e.target.value);
                                }
                            }}
                        />
                    </div>

                    <button
                        onClick={() => { setState(''); setSearch(''); setViewMode('states'); }}
                        className="mt-8 text-primary underline font-body"
                    >
                        Go back to States
                    </button>
                </div>
            );
        }

        return (
            <DestinationContent
                destinations={destinations}
                pagination={pagination}
                setPage={setPage}
                page={page}
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                isLoading={isLoading}
            />
        );
    }

    return (
        <div className="min-h-screen bg-background pb-16">
            <TopNavBar user={user?.fullName} />
            {/* Toggle Button */}
            <div className="max-w-7xl mx-auto px-8 pt-8 flex justify-end">
                <div className="bg-surface-container-low p-1 rounded-lg inline-flex shadow-sm">
                    <button
                        onClick={() => { setState(''); setViewMode("states"); }}
                        className={`px-6 py-2 rounded-md font-body text-sm font-medium transition-all ${viewMode === "states"
                                ? "bg-primary text-on-primary shadow"
                                : "text-on-surface-variant hover:text-primary"
                            }`}
                    >
                        States
                    </button>
                    <button
                        onClick={() => setViewMode("destinations")}
                        className={`px-6 py-2 rounded-md font-body text-sm font-medium transition-all ${viewMode === "destinations"
                                ? "bg-primary text-on-primary shadow"
                                : "text-on-surface-variant hover:text-primary"
                            }`}
                    >
                        Destinations
                    </button>
                </div>
            </div>

            {/* Content */}
            {viewMode === "states" ? (
                <StatesView onSelectState={handleSelectState} onSearch={handleGeneralSearch} />
            ) : (
                renderDestinations()
            )}
        </div>
    )
}

export default DestinationsPage
