import WeatherWidget from '../../../Places/components/WeatherWidget';
import InteractiveMap from '../../../Places/components/InteractiveMap';
import { useState, useEffect } from 'react';

const TripSidebar = ({ trip }) => {
    // Collect all essential gear from all destinations
    const destinations = trip.destinations || [];
    const allGear = new Set();
    destinations.forEach(dest => {
        if (dest.essentialGear) {
            dest.essentialGear.forEach(item => allGear.add(item));
        }
    });
    const gearList = Array.from(allGear);

    const [mapPlaces, setMapPlaces] = useState([]);

    useEffect(() => {
        const fetchCoordinates = async () => {
            if (destinations.length === 0) return;
            
            const placesWithCoords = await Promise.all(
                destinations.map(async (dest, index) => {
                    const destData = dest.destination || {};
                    const name = destData.name || "Unknown";
                    
                    // If we somehow had lat/lon in DB
                    if (destData.lat && destData.lon) {
                        return {
                            id: dest._id,
                            name: name,
                            description: dest.notes || `Stop ${index + 1}`,
                            category: destData.category || "Destination",
                            lat: destData.lat,
                            lon: destData.lon
                        };
                    }
                    
                    try {
                        // Fallback to OpenStreetMap Nominatim for basic geocoding
                        const query = `${name}, ${destData.city || ''}, ${destData.country || ''}`;
                        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
                        const data = await res.json();
                        if (data && data.length > 0) {
                            return {
                                id: dest._id,
                                name: name,
                                description: dest.notes || `Stop ${index + 1}`,
                                category: destData.category || "Destination",
                                lat: parseFloat(data[0].lat),
                                lon: parseFloat(data[0].lon)
                            };
                        }
                    } catch (e) {
                        console.error("Failed to geocode:", name);
                    }
                    
                    return null;
                })
            );
            
            setMapPlaces(placesWithCoords.filter(Boolean));
        };
        
        fetchCoordinates();
    }, [destinations]);

    return (
        <div className="space-y-6 sticky top-28">
            
            {/* Map Placeholder */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-ambient overflow-hidden border border-outline-variant/70">
                {mapPlaces.length > 0 ? (
                    <div className="h-64 border-b border-outline-variant/70">
                        <InteractiveMap 
                            places={mapPlaces} 
                            title="" 
                            showRoute={true} 
                        />
                    </div>
                ) : (
                    <div className="h-48 bg-surface-container flex flex-col items-center justify-center relative group cursor-pointer">
                        <span className="material-symbols-outlined text-4xl text-outline mb-2 group-hover:scale-110 transition-transform">
                            map
                        </span>
                        <p className="font-label-md text-label-md text-on-surface-variant group-hover:text-primary transition-colors">
                            Loading Map Route...
                        </p>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-t-2xl transition-colors"></div>
                    </div>
                )}
                <div className="p-4 bg-surface-container-lowest">
                    <h3 className="font-title-md text-title-md text-on-surface mb-1">Route Overview</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {destinations.length} Stops • {trip.totalBudget > 0 ? `₹${trip.totalBudget.toLocaleString('en-IN')}` : 'Budget Pending'}
                    </p>
                </div>
            </div>

            {/* Weather Integration */}
            {destinations.length > 0 && destinations[0]._id && (
                <div className="w-full">
                    <WeatherWidget destinationId={destinations[0]._id} />
                </div>
            )}

            {/* Essential Gear */}
            {gearList.length > 0 && (
                <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-6 border border-outline-variant/70">
                    <h3 className="font-title-lg text-title-lg text-on-surface mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">backpack</span>
                        Essential Gear
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {gearList.map((item, idx) => (
                            <span key={idx} className="bg-surface-container px-3 py-1.5 rounded-lg font-label-sm text-label-sm text-on-surface border border-outline-variant/50">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TripSidebar;
