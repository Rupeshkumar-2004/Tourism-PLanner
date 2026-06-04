import React from 'react';
import TopNavBar from "../../../components/TopNavBar.jsx";
import { useAuth } from "../../../hooks/useAuth.js";
import { useSpontaneousData } from '../hooks/useSpontaneousData.js';
import { LoadingLocation, FallbackLocation } from '../components/LocationStates.jsx';
import SpontaneousHero from '../components/SpontaneousHero.jsx';
import NearbyWonders from '../components/NearbyWonders.jsx';
import UnplannedPaths from '../components/UnplannedPaths.jsx';
import WeatherWidget from '../components/WeatherWidget.jsx';

const SpontaneousPage = () => {
    const { user } = useAuth();
    const {
        locationState,
        setLocationState,
        fallbackCity,
        setFallbackCity,
        handleGeolocation,
        handleFallbackSearch
    } = useSpontaneousData();

    // Render loading state
    if (locationState.loading && !locationState.data) {
        return <LoadingLocation user={user} />;
    }

    // Render error/fallback state
    if (locationState.error && !locationState.data) {
        return (
            <FallbackLocation 
                user={user}
                error={locationState.error}
                fallbackCity={fallbackCity}
                setFallbackCity={setFallbackCity}
                handleFallbackSearch={handleFallbackSearch}
                handleGeolocation={handleGeolocation}
            />
        );
    }

    const { location, weather, suggestions, paths } = locationState.data || {};

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopNavBar user={user?.fullName} />

            <main className="flex-grow">
                {/* Hero Section */}
                <SpontaneousHero 
                    location={location} 
                    setLocationState={setLocationState} 
                />

                {/* Map & Proximity Section */}
                <NearbyWonders 
                    location={location} 
                    suggestions={suggestions} 
                />

                {/* Bento Grid: Spontaneous Itineraries */}
                <UnplannedPaths paths={paths} />

                {/* Weather and Vibes Micro-widget */}
                <WeatherWidget weather={weather} location={location} />
            </main>
        </div>
    );
};

export default SpontaneousPage;
