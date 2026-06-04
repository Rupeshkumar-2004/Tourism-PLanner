import React from 'react';

const UnplannedPaths = ({ paths }) => {
    if (!paths || paths.length === 0) return null;

    return (
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
                                    <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'wght' 200" }}>explore</span>
                                </div>
                                <h3 className="font-headline text-3xl text-white mb-2 leading-tight">Ready for more?</h3>
                                <p className="text-white/80 text-sm font-body max-w-[200px]">Unlock more spontaneous routes by checking the destinations tab.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default UnplannedPaths;
