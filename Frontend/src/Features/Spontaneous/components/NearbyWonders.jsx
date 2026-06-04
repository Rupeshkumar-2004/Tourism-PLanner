import React from 'react';
import InteractiveMap from "../../Places/components/InteractiveMap.jsx";

const NearbyWonders = ({ location, suggestions }) => {
    return (
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
                                        <img className="w-full h-full object-cover" alt={sug.title} src={sug.image} />
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
    );
};

export default NearbyWonders;
