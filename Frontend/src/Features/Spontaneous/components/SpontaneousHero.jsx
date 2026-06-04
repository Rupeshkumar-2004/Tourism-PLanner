import React from 'react';

const SpontaneousHero = ({ location, setLocationState }) => {
    return (
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
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
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
                            document.getElementById('nearby-wonders')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-primary/20 active:scale-95 transition-all"
                    >
                        Start Journey Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SpontaneousHero;
