import { ShieldCheck } from 'lucide-react';

const LoginBanner = () => {
    return (
        <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
                {/* Background Image */}
                <img
                    src={'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200'}
                    alt="Mountain Adventure"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                />

                {/* Multi-layer gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-amber-950/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/15 via-transparent to-orange-600/10" />

                {/* Decorative blurred orbs — adds a glassmorphic feel */}
                <div className="absolute top-16 right-16 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-32 left-10 w-56 h-56 bg-orange-400/10 rounded-full blur-3xl" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-16 h-full select-none">

                    {/* Top: Brand Badge */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                            <span className="text-lg">✈️</span>
                        </div>
                        <span className="text-white/90 font-bold text-lg tracking-tight">SkyVoyage</span>
                    </div>

                    {/* Bottom: Headline + Social Proof */}
                    <div>
                        <span className="inline-block font-mono text-xs font-semibold tracking-wider text-amber-400 uppercase mb-4 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                            Discovery Portal
                        </span>
                        <h2 className="font-sans text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight max-w-lg">
                            Venture into the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">unexplored.</span>
                        </h2>
                        <p className="mt-4 text-base text-slate-300/80 max-w-md leading-relaxed">
                            Let every path tell a gorgeous story of age-old monuments, snowy trails, and local backwater cuisines.
                        </p>

                        {/* Social proof avatars */}
                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex -space-x-2.5">
                                {['R', 'A', 'K', 'M'].map((letter, i) => (
                                    <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white">
                                        {letter}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-slate-400">
                                Join <span className="text-white font-semibold">2,400+</span> explorers
                            </p>
                        </div>

                        {/* Trust bar */}
                        <div className="mt-6 flex items-center gap-6 text-xs text-slate-500">
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                                <span>Secure login</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>99.9% uptime</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default LoginBanner;
