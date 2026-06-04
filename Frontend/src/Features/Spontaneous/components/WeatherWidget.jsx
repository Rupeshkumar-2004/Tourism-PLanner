import React from 'react';

const WeatherWidget = ({ weather, location }) => {
    if (!weather) return null;

    return (
        <section className="max-w-7xl mx-auto px-8 py-20">
            <div className="bg-surface-container-low rounded-[40px] p-12 border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex items-center gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Conditions Right Now</p>
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                            <span className="font-headline text-7xl text-on-background">{weather.temperature}°</span>
                            <div className="text-left">
                                <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>{weather.icon}</span>
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
    );
};

export default WeatherWidget;
