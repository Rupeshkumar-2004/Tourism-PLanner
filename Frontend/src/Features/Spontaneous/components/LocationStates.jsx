import React from 'react';
import TopNavBar from "../../../components/TopNavBar.jsx";

export const LoadingLocation = ({ user }) => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopNavBar user={user?.fullName} />
            <div className="flex-grow flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <h2 className="font-headline text-3xl text-primary mb-2">Discovering Nearby Wonders...</h2>
                    <p className="font-body text-on-surface-variant">Using your location to curate spontaneous adventures.</p>
                </div>
            </div>
        </div>
    );
};

export const FallbackLocation = ({ user, error, fallbackCity, setFallbackCity, handleFallbackSearch, handleGeolocation }) => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopNavBar user={user?.fullName} />
            <div className="flex-grow flex items-center justify-center p-8">
                <div className="max-w-md w-full bg-surface-container-low p-8 rounded-3xl text-center shadow-lg border border-outline-variant/30">
                    <span className="material-symbols-outlined text-6xl text-error mb-4">location_off</span>
                    <h2 className="font-headline text-3xl text-on-background mb-4">Location Needed</h2>
                    <p className="font-body text-on-surface-variant mb-8">{error}</p>

                    <form onSubmit={handleFallbackSearch} className="relative mb-4">
                        <input
                            type="text"
                            value={fallbackCity}
                            onChange={(e) => setFallbackCity(e.target.value)}
                            placeholder="Enter a city (e.g., Goa, Jaipur)"
                            className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface"
                        />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-on-primary p-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-sm">search</span>
                        </button>
                    </form>
                    <button onClick={handleGeolocation} className="text-primary text-sm font-bold underline">
                        Try Location Again
                    </button>
                </div>
            </div>
        </div>
    );
};
