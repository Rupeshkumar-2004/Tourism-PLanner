import React, { useState } from 'react';

// Data for states and UTs
const ALL_STATES = [
    // 5 Featured States (from HTML provided)
    {
        name: "Rajasthan",
        region: "North India",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFnvWSjAiqEokaJKaQvw8IRXn1jWwoV67PhJkbFJmyUeVv_PdvwOpZnOzannRBMVWwn5DgCyJLj4nFgygJlmH3jEet_hRTmxKxjIwZWisU0Rweb1ZxkT4n4qY8xJXmrwN3qSBpOcbmRCaQb4jI7NkL7EDs0EcQVT4dequD7_roK-u3ewRycV7VBD8WQPoMrb9Uec6GMQQDQxGmCdHlH9i5xlZKTStZnLWF9Dpj0-SzudfuDYccftPXzLsJtLav_ded_dYwwYDfrpVQ",
        featured: true
    },
    {
        name: "Kerala",
        region: "South India",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-qBIX3zqODV-sZYYc1D2RoB1kzJ8wjTy-qemHF8sux-zZbDJoBkuCIv2V7sxtSZKaObBFZtKf8xWSoE9zSf09WMIExzAqYsgGsEgurNrUDXPS1YnfNhS37Jg4aeVnKh1JqE6jCpkyQC15xYaFMFc6tKEXeJFFhgmLRGFJMmQ8NbkkVzBEu7Kg6t7jZPV-QPMmkdhM6gTxbWSTVsFaIYxV98jXZqepn1eC9kz5NmifBR74r6mfzDpv90Bhe_GGcsu4zZrSnt1sHsZb",
        featured: true
    },
    {
        name: "Himachal Pradesh",
        region: "North India",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsAd5vawAIG4x0YCj_Ra7qVy02jRcYJvJK2SPxo92Q3fhfaZidnxlwXwcXyUXCIqSDt1LwpAQo5IYWDEQ2gifxhZFcW6qD5dOpGEBQ_f5Q2fr3E-vObz61zWPkZg0zDt4I_7VxYAu_JnDLRr8Gt2fVF3pMMaU_V8qAruWBtL4hAd-TKME-N7uIlWDBpWuRcTIZgC-AIbviEQQNn2tCZY7Qn0AXGPdlVeZaBKjvUG8p8n0YiLsNkuy1gop07QLLqNy0Xynj7Bf17xI2",
        featured: true
    },
    {
        name: "Karnataka",
        region: "South India",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXwvdOa--VClvmjykqs7SIsTLTEOPucK3PXDwhNNPyh86bAeiUwLbHK4ziZ3IqN8ErdYgpVV35RewNAcgP_j4lmkNguVYfn0mKl-qKAbbC7Gd4BV1EryH1WfuShdFHzyNjJTgXzMgPHs2JVw77_Xxi7BK_3dVz8qkDPucMuDlcFM2yNZXt_IiQHT3KUVuLND3P4HLwdJJpOU7X-QtSM2g8ASsZiD-LI_-L-14Uy9xMtZDFhDGbZHpp12A9vuK6eqFCwItVh_RC2ZE1",
        featured: true
    },
    {
        name: "Goa",
        region: "West India",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfJYQMpVTOAmuDvkFNgTg5vJGnN2fNrt50M_TCNaBOfjyKDQnWBX7HkLKcWdSS7Is1eqV7kBKcmRW6j6kU3clSRrvyS-9Ymi51KlDCPl4q5mU4zDjbDx6wP2q-Wv8u6xVqkO4YlvYosq4XtwDAWXRFi-p8DaQRHTWAmQQLdJZMod1hnUCcGKGSGszZECOu6MagRzwMDMcDdv5YaI0q85HaDbOo_hOnU_sOT9jRf7Js23YdDEtrAe8aU-9g9KskCUvP4QRZq9MP2RS1",
        featured: true
    },
    // Other states
    { name: "Andhra Pradesh", image: "https://images.pexels.com/photos/9373357/pexels-photo-9373357.jpeg", featured: false },
    { name: "Arunachal Pradesh", image: "https://images.pexels.com/photos/11464751/pexels-photo-11464751.jpeg", featured: false },
    { name: "Assam", image: "https://images.pexels.com/photos/32569034/pexels-photo-32569034.jpeg", featured: false },
    { name: "Bihar", image: "https://images.pexels.com/photos/28198206/pexels-photo-28198206.jpeg", featured: false },
    { name: "Chhattisgarh", image: "https://images.pexels.com/photos/31739735/pexels-photo-31739735.jpeg", featured: false },
    { name: "Gujarat", image: "https://images.pexels.com/photos/12313651/pexels-photo-12313651.jpeg", featured: false },
    { name: "Haryana", image: "https://images.pexels.com/photos/26302004/pexels-photo-26302004.jpeg", featured: false },
    { name: "Jharkhand", image: "https://images.pexels.com/photos/13596773/pexels-photo-13596773.jpeg", featured: false },
    { name: "Madhya Pradesh", image: "https://images.pexels.com/photos/2555325/pexels-photo-2555325.jpeg", featured: false },
    { name: "Maharashtra", image: "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg", featured: false },
    { name: "Manipur", image: "https://images.pexels.com/photos/9378950/pexels-photo-9378950.jpeg", featured: false },
    { name: "Meghalaya", image: "https://images.pexels.com/photos/12001569/pexels-photo-12001569.jpeg", featured: false },
    { name: "Mizoram", image: "https://images.pexels.com/photos/10185072/pexels-photo-10185072.jpeg", featured: false },
    { name: "Nagaland", image: "https://images.pexels.com/photos/8372627/pexels-photo-8372627.jpeg", featured: false },
    { name: "Odisha", image: "https://images.pexels.com/photos/5604130/pexels-photo-5604130.jpeg", featured: false },
    { name: "Punjab", image: "https://images.pexels.com/photos/2607997/pexels-photo-2607997.jpeg", featured: false },
    { name: "Sikkim", image: "https://images.pexels.com/photos/6683838/pexels-photo-6683838.jpeg", featured: false },
    { name: "Tamil Nadu", image: "https://images.pexels.com/photos/4096053/pexels-photo-4096053.jpeg", featured: false },
    { name: "Telangana", image: "https://images.pexels.com/photos/2261565/pexels-photo-2261565.jpeg", featured: false },
    { name: "Tripura", image: "https://images.pexels.com/photos/10411871/pexels-photo-10411871.jpeg", featured: false },
    { name: "Uttar Pradesh", image: "https://images.pexels.com/photos/1585292/pexels-photo-1585292.jpeg", featured: false },
    { name: "Uttarakhand", image: "https://images.pexels.com/photos/2932220/pexels-photo-2932220.jpeg", featured: false },
    { name: "West Bengal", image: "https://images.pexels.com/photos/13596781/pexels-photo-13596781.jpeg", featured: false },

    // Union Territories
    { name: "Andaman and Nicobar Islands", image: "https://images.pexels.com/photos/5386001/pexels-photo-5386001.jpeg", featured: false },
    { name: "Chandigarh", image: "https://images.pexels.com/photos/3476860/pexels-photo-3476860.jpeg", featured: false },
    { name: "Dadra and Nagar Haveli and Daman and Diu", image: "https://images.pexels.com/photos/3476860/pexels-photo-3476860.jpeg", featured: false },
    { name: "Delhi", image: "https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg", featured: false },
    { name: "Jammu and Kashmir", image: "https://images.pexels.com/photos/3412574/pexels-photo-3412574.jpeg", featured: false },
    { name: "Ladakh", image: "https://images.pexels.com/photos/2798952/pexels-photo-2798952.jpeg", featured: false },
    { name: "Lakshadweep", image: "https://images.pexels.com/photos/2620067/pexels-photo-2620067.jpeg", featured: false },
    { name: "Puducherry", image: "https://images.pexels.com/photos/8991206/pexels-photo-8991206.jpeg", featured: false }
];

const StatesView = ({ onSelectState, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAll, setShowAll] = useState(false);

    // Filter states based on search term
    const filteredStates = ALL_STATES.filter(state =>
        state.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get the states to display
    let displayedStates = filteredStates;
    if (!searchTerm && !showAll) {
        displayedStates = ALL_STATES.filter(s => s.featured);
    }

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter' && searchTerm) {
            // Check if exact match exists in ALL_STATES
            const exactMatch = ALL_STATES.find(s => s.name.toLowerCase() === searchTerm.toLowerCase());
            if (exactMatch) {
                onSelectState(exactMatch.name);
            } else {
                // If it's a completely random search not in states, trigger a general search
                onSearch(searchTerm);
            }
        }
    };

    return (
        <div className="flex-grow w-full max-w-7xl mx-auto py-8">
            {/* Hero & Search Section */}
            <header className="mb-20 text-center max-w-3xl mx-auto">
                <h1 className="font-headline text-5xl md:text-6xl mb-6 tracking-tight leading-tight text-primary">
                    Explore India by State
                </h1>
                <p className="font-body text-on-surface-variant text-lg mb-10">
                    Discover the diverse tapestry of the subcontinent, from sun-baked forts to emerald backwaters.
                </p>

                <div className="relative group max-w-2xl mx-auto">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                    <input
                        className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface placeholder:text-outline shadow-sm"
                        placeholder="Search for a state (e.g. Rajasthan) and press Enter"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearchSubmit}
                    />
                </div>
            </header>

            {/* Bento Grid of States */}
            <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 ${(!searchTerm && !showAll) ? '' : 'auto-rows-[300px]'}`}>
                {displayedStates.map((state, index) => {
                    // For the 5 featured states in the original layout, use specific span classes
                    // If showing all, just make them standard 4 column cards
                    let spanClass = "md:col-span-4";
                    let aspectClass = "aspect-square md:aspect-auto";

                    if (!searchTerm && !showAll) {
                        if (index === 0) {
                            spanClass = "md:col-span-8";
                            aspectClass = "aspect-[16/10]";
                        }
                    } else {
                        // When showing all or searching, make them all the same size
                        aspectClass = "h-full w-full";
                    }

                    return (
                        <div
                            key={state.name}
                            onClick={() => onSelectState(state.name)}
                            className={`${spanClass} group relative overflow-hidden rounded-xl ${aspectClass} bg-surface-container-low shadow-[0_2px_16px_rgba(58,48,42,0.04)] cursor-pointer`}
                        >
                            <img
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                alt={state.name}
                                src={state.image}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-on-background/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                                {state.region && index === 0 && !searchTerm && !showAll && (
                                    <span className="font-body text-sm uppercase tracking-widest mb-2 block opacity-80">
                                        {state.region}
                                    </span>
                                )}
                                <h2 className={`font-headline ${index === 0 && !searchTerm && !showAll ? 'text-5xl italic' : 'text-3xl'} mb-2`}>
                                    {state.name}
                                </h2>
                                {state.guides !== undefined && (
                                    <div className="flex items-center gap-2">
                                        <p className="font-body text-sm opacity-90">{state.guides} Destination Guides</p>
                                        {index === 0 && !searchTerm && !showAll && (
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredStates.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-xl text-on-surface-variant font-body">No states found matching "{searchTerm}"</p>
                    <button
                        onClick={() => onSearch(searchTerm)}
                        className="mt-4 text-primary underline"
                    >
                        Search all destinations for "{searchTerm}" instead
                    </button>
                </div>
            )}

            {/* Pagination/Load More */}
            {!searchTerm && !showAll && (
                <div className="mt-16 text-center">
                    <button
                        onClick={() => setShowAll(true)}
                        className="font-body text-primary border border-primary/30 px-8 py-3 rounded-lg hover:bg-primary/5 transition-all duration-300"
                    >
                        View All 36 States & UTs
                    </button>
                </div>
            )}
            {!searchTerm && showAll && (
                <div className="mt-16 text-center">
                    <button
                        onClick={() => setShowAll(false)}
                        className="font-body text-primary border border-primary/30 px-8 py-3 rounded-lg hover:bg-primary/5 transition-all duration-300"
                    >
                        Show Featured Only
                    </button>
                </div>
            )}
        </div>
    );
};

export default StatesView;
