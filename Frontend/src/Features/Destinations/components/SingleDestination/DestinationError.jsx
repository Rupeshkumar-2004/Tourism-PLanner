import { Link } from 'react-router-dom';

export default function DestinationError({ message, destinationName }) {
    return (
        <div className="bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden">
            <div className="fixed inset-0 grain-overlay z-50 pointer-events-none"></div>

            {/* Header */}
            <header className="w-full top-0 bg-background/80 backdrop-blur-md z-40 border-b border-outline-variant/60">
                <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
                    <Link className="font-headline text-2xl font-bold text-primary tracking-tight" to="/">
                        SkyVoyage
                    </Link>
                    <div className="hidden md:flex gap-8 items-center">
                        <span className="text-on-surface-variant font-medium text-sm tracking-wide">
                            Error 404 {destinationName ? `— ${destinationName} Guide` : ''}
                        </span>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="min-h-[870px] flex flex-col items-center justify-center px-6 relative">
                {/* Atmospheric Background Elements */}
                <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary-fixed-dim/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-tertiary-fixed-dim/20 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-4xl w-full text-center z-10 flex flex-col items-center">
                    {/* Illustration Section */}
                    <div className="relative w-full max-w-md mb-12">
                        <div className="relative aspect-square flex items-center justify-center">
                            {/* Stylized Map/Compass Illustration */}
                            <div className="absolute inset-0 bg-surface-container-low rounded-full scale-95 opacity-50 luxury-shadow"></div>
                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                                <img
                                    alt="Adventurous Compass Illustration"
                                    className="w-full h-full object-cover rounded-full border-8 border-surface-container luxury-shadow"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB82m-7Abo14WVD-nv5aMDQmT-OsHHA2qzYLWugsDTtKBaUsfCCadlpEjp3iYCmR1DYa18oObLwUmHH6p8DmKTwKTtQ8Ldp3bzShk7RocJacbtEExsobjXlyD9qE08fVuSp5epoU2jocDJGTCcPmo307qpMUTcMNyS_nyfsEv3jgU1EnO6uY0LtqQ7BgyJYPhLiNDvxkHXmley7To37o8lrrMRZrfWjH26Cm6YSI29MN0C6Ni9WBfoqMqfxrsjMsGYqnf-cZOw6_yGw"
                                />
                                {/* Floating Question Mark Overlay */}
                                <div className="absolute top-0 right-0 bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center text-4xl font-headline italic shadow-xl transform rotate-12 border-4 border-background">
                                    ?
                                </div>
                            </div>

                            {/* Decorative Compass Markings */}
                            <div className="absolute -inset-8 pointer-events-none border border-outline-variant/30 rounded-full flex items-center justify-center">
                                <span className="absolute top-2 font-body text-xs tracking-widest text-outline uppercase">North</span>
                                <span className="absolute bottom-2 font-body text-xs tracking-widest text-outline uppercase">South</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-6 max-w-2xl">
                        <span className="font-body text-sm uppercase tracking-[0.3em] text-primary font-bold">Lost in Translation</span>
                        <h1 className="font-display text-5xl md:text-7xl text-on-surface leading-tight">The path is obscured</h1>
                        <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-lg mx-auto">
                            {message || "Even the most seasoned explorers lose their way. The destination you seek is momentarily hidden by the shifting sands of the digital world."}
                        </p>

                        <div className="pt-8 flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button
                                className="group flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-lg font-body font-semibold luxury-shadow hover:bg-primary/90 transition-all active:scale-95"
                                onClick={() => window.location.reload()}
                            >
                                <span className="material-symbols-outlined transition-transform group-hover:rotate-180">refresh</span>
                                Try Again
                            </button>
                            <Link
                                className="group flex items-center gap-2 text-on-surface font-body font-semibold px-8 py-4 rounded-lg border border-outline-variant/60 hover:bg-surface-container-low transition-all"
                                to="/destinations"
                            >
                                Explore Other Destinations
                                <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">east</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}