import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// Component to dynamically adjust map bounds based on markers
const MapBoundsRefresher = ({ places }) => {
    const map = useMap();

    useEffect(() => {
        if (!places || places.length === 0) return;

        const bounds = L.latLngBounds();
        let validPlacesCount = 0;

        places.forEach(place => {
            if (place.lat && place.lon) {
                bounds.extend([place.lat, place.lon]);
                validPlacesCount++;
            }
        });

        if (validPlacesCount > 0) {
            // Fit bounds with a little padding
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
        }
    }, [map, places]);

    return null;
};

// Create a custom icon using Lucide React
const createCustomIcon = () => {
    const iconMarkup = renderToStaticMarkup(
        <div className="text-primary bg-surface-container-lowest rounded-full p-1 shadow-md border-2 border-primary">
            <MapPin className="w-5 h-5 fill-primary/20" />
        </div>
    );

    return L.divIcon({
        html: iconMarkup,
        className: 'custom-leaflet-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

const InteractiveMap = ({ 
    places = [], 
    title = "Interactive Region Map", 
    showRoute = false,
    containerClassName = "bg-surface-container-lowest border border-surface-variant rounded-2xl p-6 shadow-sm flex flex-col h-[400px]",
    hideTitle = false
}) => {
    const [mapReady, setMapReady] = useState(false);

    // Filter places to only those with valid coordinates
    const mapPlaces = places.filter(place => place.lat && place.lon);

    // Default center to India if no valid places
    const defaultCenter = [20.5937, 78.9629];
    const defaultZoom = 4;

    useEffect(() => {
        // Fix for React 18 strict mode double mounting issue with leaflet
        const timer = setTimeout(() => setMapReady(true), 0);
        return () => clearTimeout(timer);
    }, []);

    if (!mapReady) return <div className="min-h-[300px] w-full bg-surface-variant/20 rounded-2xl animate-pulse"></div>;

    const customIcon = createCustomIcon();

    return (
        <div className={containerClassName}>
            {!hideTitle && <h3 className="font-title-lg text-title-lg text-on-surface mb-4">{title}</h3>}
            
            {mapPlaces.length === 0 ? (
                <div className="flex-1 bg-surface-variant/20 rounded-xl flex items-center justify-center">
                    <p className="text-on-surface-variant font-body-md">No coordinates available for these places.</p>
                </div>
            ) : (
                <div className="flex-1 rounded-xl overflow-hidden relative z-0">
                    <MapContainer 
                        center={defaultCenter} 
                        zoom={defaultZoom} 
                        scrollWheelZoom={false}
                        className="w-full h-full z-0"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        {mapPlaces.map(place => (
                            <Marker 
                                key={place.id || place._id} 
                                position={[place.lat, place.lon]}
                                icon={customIcon}
                            >
                                <Popup className="custom-popup">
                                    <div className="font-body-sm max-w-[200px]">
                                        <h4 className="font-label-lg text-primary mb-1">{place.name}</h4>
                                        <p className="text-on-surface-variant line-clamp-2 text-xs mb-2">
                                            {place.description}
                                        </p>
                                        <span className="inline-block px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-md text-[10px] uppercase font-bold tracking-wider">
                                            {place.category}
                                        </span>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                        
                        {showRoute && mapPlaces.length > 1 && (
                            <Polyline 
                                positions={mapPlaces.map(p => [p.lat, p.lon])} 
                                color="#4F46E5" 
                                weight={3} 
                                opacity={0.7} 
                                dashArray="10, 10" 
                            />
                        )}
                        
                        <MapBoundsRefresher places={mapPlaces} />
                    </MapContainer>
                </div>
            )}
        </div>
    );
};

export default InteractiveMap;
