import { useState } from 'react';
import usePlaces from '../hooks/usePlaces';
import { Search, Map as MapIcon, Heart, Star, Plus } from 'lucide-react';
import AddToTripModal from './AddToTripModal';

const PlacesGrid = ({ destinationId }) => {
    const { places, isLoading, error } = usePlaces(destinationId);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All Places");
    const [showMap, setShowMap] = useState(false);
    const [selectedPlaceForModal, setSelectedPlaceForModal] = useState(null);

    if (isLoading) {
        return (
            <div className="py-section-gap flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-on-surface-variant font-body-md animate-pulse">Generating AI descriptions for places...</p>
            </div>
        );
    }

    if (error) {
        return <div className="text-error p-4 bg-error-container rounded-lg">{error}</div>;
    }

    if (!places || places.length === 0) {
        return <div className="text-on-surface-variant p-4">No places found.</div>;
    }

    // Filter places
    const filteredPlaces = places.filter(place => {
        const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              (place.description && place.description.toLowerCase().includes(searchQuery.toLowerCase()));
        
        // Maps nicely, assuming categories are like "monument", "park", etc.
        const matchesCategory = activeCategory === "All Places" || 
                                (place.category && place.category.toLowerCase() === activeCategory.toLowerCase());
        
        return matchesSearch && matchesCategory;
    });

    // Extract unique categories for the filter buttons
    const categories = ["All Places", ...new Set(places.map(p => p.category).filter(Boolean))];

    return (
        <section className="max-w-7xl mx-auto px-container-margin-mobile md:px-container-margin-desktop py-section-gap">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">Explore Places</h2>
                    <p className="text-body-lg text-on-surface-variant max-w-2xl">Discover iconic architectural marvels and natural wonders curated just for you.</p>
                </div>
                <button 
                    onClick={() => setShowMap(!showMap)}
                    className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                    <MapIcon className="w-5 h-5" />
                    <span>{showMap ? "View List" : "View on Map"}</span>
                </button>
            </div>

            {/* Filters Section */}
            <div className="mb-10 flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:w-1/3 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search landmarks or history..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary-container/20 transition-all outline-none"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-2/3 hide-scrollbar py-2">
                    {categories.map((cat, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full font-label-md whitespace-nowrap active:scale-95 transition-transform capitalize ${
                                activeCategory === cat 
                                ? "bg-secondary-container text-on-secondary-container" 
                                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="transition-opacity duration-300">
                {!showMap ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                        {filteredPlaces.map((place, idx) => (
                            <article key={place._id || idx} className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col border border-surface-variant">
                                <div className="relative h-64 overflow-hidden bg-surface-variant flex items-center justify-center">
                                    {place.images && place.images.length > 0 ? (
                                        <img 
                                            src={place.images[0]} 
                                            alt={place.name} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-primary-container/50 to-secondary-container/50 flex items-center justify-center">
                                            <MapIcon className="w-12 h-12 text-primary/30" />
                                        </div>
                                    )}
                                    <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-headline-md text-headline-md text-on-surface line-clamp-1" title={place.name}>{place.name}</h3>
                                        <div className="flex items-center gap-1 text-primary shrink-0">
                                            <Star className="w-4 h-4 fill-primary text-primary" />
                                            <span className="text-label-md font-bold">4.5</span>
                                        </div>
                                    </div>
                                    <p className="text-on-surface-variant text-body-md mb-6 line-clamp-3" title={place.description}>
                                        {place.description || "A beautiful place to visit."}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-label-sm text-outline">Category</span>
                                            <span className="text-label-md font-semibold text-primary capitalize line-clamp-1">{place.category || "Attraction"}</span>
                                        </div>
                                        <button 
                                            onClick={() => setSelectedPlaceForModal(place)}
                                            className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-label-md hover:brightness-95 transition-all active:scale-95 flex items-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add to Itinerary
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="h-[600px] w-full bg-surface-container rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border border-surface-variant">
                        <div className="absolute inset-0 grayscale opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="z-10 text-center px-6">
                            <MapIcon className="w-16 h-16 text-primary mx-auto mb-4" />
                            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Interactive Map</h2>
                            <p className="text-on-surface-variant max-w-md">Map integration coming soon.</p>
                        </div>
                    </div>
                )}
            </div>

            {selectedPlaceForModal && (
                <AddToTripModal 
                    place={selectedPlaceForModal} 
                    destinationId={destinationId} 
                    onClose={() => setSelectedPlaceForModal(null)} 
                />
            )}
        </section>
    );
};

export default PlacesGrid;
