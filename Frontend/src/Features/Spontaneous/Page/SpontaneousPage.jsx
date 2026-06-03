import React, { useState, useEffect } from 'react';
import TopNavBar from "../../../components/TopNavBar.jsx";
import { useAuth } from "../../../hooks/useAuth.js";
import api from "../../../services/api.js";
import InteractiveMap from "../../Places/components/InteractiveMap.jsx";

const SpontaneousPage = () => {
    const { user } = useAuth();
    const [locationState, setLocationState] = useState({
        loading: true,
        error: null,
        data: null
    });
    const [fallbackCity, setFallbackCity] = useState('');

    const fetchSpontaneousData = async (lat, lon) => {
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
    };

    const handleGeolocation = () => {
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
    };

    useEffect(() => {
        handleGeolocation();
    }, []);

    const handleFallbackSearch = async (e) => {
        e.preventDefault();
        if (!fallbackCity) return;
        
        setLocationState(prev => ({ ...prev, loading: true, error: null }));
        try {
            // Use Geoapify forward geocoding directly on client or a new backend endpoint
            // Actually, we can just hit our destination service or do a quick fetch to Geoapify
            const GEOAPIFY_API_KEY = "ebefc78bce7345339f4007da8d752ed1"; // Note: It's better to proxy this through backend, but this is a fallback.
            // Wait, we don't have the API key in the frontend. We should create a quick forward geocode endpoint or just proxy it.
            // Let's just use openstreetmap nominatim for a quick free geocode on the frontend as a fallback
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

    // Render loading state
    if (locationState.loading && !locationState.data) {
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
    }

    // Render error/fallback state
    if (locationState.error && !locationState.data) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <TopNavBar user={user?.fullName} />
                <div className="flex-grow flex items-center justify-center p-8">
                    <div className="max-w-md w-full bg-surface-container-low p-8 rounded-3xl text-center shadow-lg border border-outline-variant/30">
                        <span className="material-symbols-outlined text-6xl text-error mb-4">location_off</span>
                        <h2 className="font-headline text-3xl text-on-background mb-4">Location Needed</h2>
                        <p className="font-body text-on-surface-variant mb-8">{locationState.error}</p>
                        
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
    }

    const { location, weather, mapUrl, suggestions, paths } = locationState.data;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopNavBar user={user?.fullName} />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative h-[716px] flex items-center overflow-hidden">
                    <img 
                        className="absolute inset-0 w-full h-full object-cover" 
                        alt="Hero background" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBztqa3QjqqdUHGyElrqibbDa6A29BCtdZT8l4xJE_iO1rfkNLBsuq0GVyroTSOIHjwJTfAt00lBQyNtuU2LaMc9zDFd4BTAQOaeNs-up2DTd6qM7GK1ARcykMNy8llVIsyCxrQUjm4qjbpOP5U30KPYpD2hPpF6W_xnvLh2ect_dRie4xvKK5u7oNG0B6kaSdFIHaF_HliWce0ZEpcJyPp4a2PODKZzdQ21QZ-TClI-xcpCmG86mfuCn-YJ23aXaYUBXjR4qm1DWlQ"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent"></div>
                    <div className="relative max-w-7xl mx-auto px-8 w-full">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full mb-6">
                                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>location_on</span>
                                <span className="text-xs font-bold tracking-widest uppercase">Currently in {location?.city}</span>
                                <button 
                                    onClick={() => setLocationState({ loading: false, error: "Enter a different location manually.", data: null })}
                                    className="ml-1 p-0.5 rounded-full hover:bg-primary/20 transition-colors opacity-70 hover:opacity-100 flex items-center"
                                    title="Change location"
                                >
                                    <span className="material-symbols-outlined text-[14px]">edit</span>
                                </button>
                            </div>
                            <h1 className="font-headline text-6xl md:text-8xl text-on-background leading-tight mb-8">Adventure is Just Around the Corner</h1>
                            <p className="font-body text-lg text-on-surface-variant mb-10 max-w-md">The best memories aren't planned months in advance. Discover hidden gems within reach right now.</p>
                            <button 
                                onClick={() => {
                                    document.getElementById('nearby-wonders').scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-primary/20 active:scale-95 transition-all"
                            >
                                Start Journey Now
                            </button>
                        </div>
                    </div>
                </section>

                {/* Map & Proximity Section */}
                <section id="nearby-wonders" className="max-w-7xl mx-auto px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="font-headline text-4xl text-on-background">Nearby Wonders</h2>
                                    <p className="font-body text-on-surface-variant">Real-time sights within 20km of your location</p>
                                </div>
                            </div>
                            
                            {/* Map Component */}
                            <InteractiveMap 
                                places={[
                                    ...(location && location.lat ? [{
                                        _id: 'user-loc',
                                        name: 'Your Location',
                                        description: location.formatted || location.city,
                                        category: 'You',
                                        lat: parseFloat(location.lat),
                                        lon: parseFloat(location.lon)
                                    }] : []),
                                    ...(suggestions || []).map((sug, idx) => ({
                                        _id: `sug-${idx}`,
                                        name: sug.title,
                                        description: sug.description,
                                        category: sug.tag || 'Adventure',
                                        lat: parseFloat(sug.lat),
                                        lon: parseFloat(sug.lon)
                                    }))
                                ]}
                                hideTitle={true}
                                containerClassName="relative flex flex-col h-[500px] rounded-3xl overflow-hidden shadow-[0_2px_16px_rgba(58,48,42,0.08)] bg-surface-container-low group z-0"
                            />
                        </div>

                        {/* Spontaneous Suggestions */}
                        <div className="flex flex-col gap-6">
                            <h3 className="font-headline text-3xl text-on-background">Spontaneous Suggestions</h3>
                            <div className="space-y-4">
                                {suggestions && suggestions.length > 0 ? suggestions.map((sug, idx) => (
                                    <div key={idx} className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/40 hover:border-primary/50 transition-all group cursor-pointer">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                                                <img className="w-full h-full object-cover" alt={sug.title} src={sug.image}/>
                                            </div>
                                            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded ml-4 text-right">
                                                {sug.tag}
                                            </span>
                                        </div>
                                        <h4 className="font-headline text-xl mb-2 group-hover:text-primary transition-colors">{sug.title}</h4>
                                        <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">{sug.description}</p>
                                        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant/70">
                                            {sug.distance && (
                                                <span className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">directions_run</span> 
                                                    {sug.distance}
                                                </span>
                                            )}
                                            {sug.cost && (
                                                <span className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">local_activity</span> 
                                                    {sug.cost}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-on-surface-variant">No suggestions found nearby. Try exploring a larger city!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bento Grid: Spontaneous Itineraries */}
                {paths && paths.length > 0 && (
                <section className="bg-surface-container py-24">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="max-w-xl">
                                <h2 className="font-headline text-5xl text-on-background mb-4">Unplanned Paths</h2>
                                <p className="font-body text-on-surface-variant">Carefully curated one-day journeys that require zero preparation. Just show up and wander.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
                            {/* Bento 1: Large Feature */}
                            {paths[0] && (
                            <div className="md:col-span-7 relative rounded-3xl overflow-hidden group cursor-pointer h-[400px] md:h-full">
                                <img 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                    alt={paths[0].title} 
                                    src={paths[0].image}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-10 w-full z-10">
                                    <span className="inline-block px-3 py-1 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-widest rounded mb-4">
                                        {paths[0].tag}
                                    </span>
                                    <h3 className="font-headline text-4xl text-white mb-2">{paths[0].title}</h3>
                                    <p className="text-white/80 font-body mb-6 max-w-md">{paths[0].description}</p>
                                    <button className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-lg font-bold border border-white/30 hover:bg-white/30 transition-colors">
                                        Follow Path
                                    </button>
                                </div>
                            </div>
                            )}

                            {/* Bento 2: Secondary Features */}
                            {paths[1] && (
                            <div className="md:col-span-5 grid grid-rows-2 gap-6 h-[600px] md:h-full">
                                <div className="relative rounded-3xl overflow-hidden group cursor-pointer h-full">
                                    <img 
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                                        alt={paths[1].title} 
                                        src={paths[1].image}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-8 z-10">
                                        <span className="inline-block px-3 py-1 bg-tertiary text-on-primary text-[10px] font-bold uppercase tracking-widest rounded mb-2">
                                            {paths[1].tag}
                                        </span>
                                        <h3 className="font-headline text-2xl text-white mb-2">{paths[1].title}</h3>
                                        <p className="text-white/80 text-sm font-body">{paths[1].description}</p>
                                    </div>
                                </div>
                                <div className="relative rounded-3xl overflow-hidden group cursor-pointer bg-tertiary flex flex-col justify-end p-8 h-full">
                                    <div className="absolute top-8 right-8 text-white/20">
                                        <span className="material-symbols-outlined text-8xl" style={{fontVariationSettings: "'wght' 200"}}>explore</span>
                                    </div>
                                    <h3 className="font-headline text-3xl text-white mb-2 leading-tight">Ready for more?</h3>
                                    <p className="text-white/80 text-sm font-body max-w-[200px]">Unlock more spontaneous routes by checking the destinations tab.</p>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </section>
                )}

                {/* Weather and Vibes Micro-widget */}
                {weather && (
                <section className="max-w-7xl mx-auto px-8 py-20">
                    <div className="bg-surface-container-low rounded-[40px] p-12 border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex items-center gap-8">
                            <div className="text-center md:text-left">
                                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Conditions Right Now</p>
                                <div className="flex items-center gap-4 justify-center md:justify-start">
                                    <span className="font-headline text-7xl text-on-background">{weather.temperature}°</span>
                                    <div className="text-left">
                                        <span className="material-symbols-outlined text-primary text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>{weather.icon}</span>
                                        <p className="text-sm font-bold text-on-surface-variant">{weather.condition}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-auto">
                            <div className="bg-background/50 backdrop-blur-md p-6 rounded-3xl border border-white/40 flex items-center gap-6">
                                <div className="flex-grow">
                                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">AI Recommendation</p>
                                    <p className="text-sm font-medium">"Based on the weather in {location?.city}, it's a great time for {weather.condition === 'Clear/Cloudy' ? 'outdoor exploration!' : 'indoor museum visits!'}"</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-white">tips_and_updates</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                )}
            </main>
        </div>
    );
};

export default SpontaneousPage;
