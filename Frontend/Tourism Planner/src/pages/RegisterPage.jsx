import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';

const IMAGES = {
    jaipur: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200',
};

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [travelStyle, setTravelStyle] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setIsSubmitting(true);

        try {
            await register({ fullName, email, password, travelStyle });
            navigate('/dashboard');
        } catch (err) {
            setErrorMsg(
                err.response?.data?.message || 'Something went wrong. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Left Side: Sign Up Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 bg-slate-50 order-2 lg:order-1">
                <div className="mx-auto w-full max-w-md bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-center sm:text-left mb-6">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                            Join the voyage
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Build custom travel styles and log shared community stories.
                        </p>
                    </div>

                    {errorMsg && (
                        <div className="mb-4 text-xs bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-lg" id="auth-signup-error">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                                Your Full Name
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <User className="h-4.5 w-4.5 text-slate-400" />
                                </div>
                                <input
                                    id="signup-name-input"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Aditi Sharma"
                                    className="block w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-4 text-sm bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="h-4.5 w-4.5 text-slate-400" />
                                </div>
                                <input
                                    id="signup-email-input"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="aditi@example.com"
                                    className="block w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-4 text-sm bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                                Create Password
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-4.5 w-4.5 text-slate-400" />
                                </div>
                                <input
                                    id="signup-password-input"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="block w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-4 text-sm bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Interactive Select Travel Style cards */}
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                                Default Travel Style
                            </label>
                            <div className="grid grid-cols-2 gap-3" id="signup-travel-style-selector">
                                <button
                                    type="button"
                                    onClick={() => setTravelStyle('solo')}
                                    className={`p-3 text-left rounded-xl border text-sm transition-all flex flex-col justify-between ${travelStyle === 'solo'
                                        ? 'border-amber-500 bg-amber-50 text-amber-900'
                                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                                        }`}
                                >
                                    <span className="font-semibold block">Solo Run</span>
                                    <span className="text-[10px] text-slate-400 mt-1">Peaceful self explores</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTravelStyle('group')}
                                    className={`p-3 text-left rounded-xl border text-sm transition-all flex flex-col justify-between ${travelStyle === 'group'
                                        ? 'border-amber-500 bg-amber-50 text-amber-900'
                                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                                        }`}
                                >
                                    <span className="font-semibold block">In a Group</span>
                                    <span className="text-[10px] text-slate-400 mt-1">Lively joint adventures</span>
                                </button>
                            </div>
                        </div>

                        <button
                            id="auth-signup-submit-btn"
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-150 active:scale-[0.98] mt-2"
                        >
                            {isSubmitting ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-5 text-center text-sm text-slate-500">
                        Already registered?{' '}
                        <Link
                            to="/login"
                            id="toggle-login-mode-btn"
                            className="font-semibold text-amber-600 hover:underline hover:text-amber-700"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side: Editorial Image Banner */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden order-1 lg:order-2">
                {/* Background Image */}
                <img
                    src={IMAGES.jaipur}
                    alt="Hawa Mahal Monument"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                />

                {/* Multi-layer gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-amber-950/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/15 via-transparent to-orange-600/10" />

                {/* Decorative blurred orbs — warm amber glow */}
                <div className="absolute top-20 left-16 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-24 right-12 w-56 h-56 bg-orange-400/10 rounded-full blur-3xl" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between p-16 h-full select-none">

                    {/* Top: Brand Badge */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                            <MapPin className="w-5 h-5 text-amber-400" />
                        </div>
                        <span className="text-white/90 font-bold text-lg tracking-tight">SkyVoyage</span>
                    </div>

                    {/* Bottom: Headline + Social Proof */}
                    <div>
                        <span className="inline-block font-mono text-xs font-semibold tracking-wider text-amber-400 uppercase mb-4 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                            Culture & Wanderlust
                        </span>
                        <h2 className="font-sans text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight max-w-lg">
                            Explore majestic <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">legacies.</span>
                        </h2>
                        <p className="mt-4 text-base text-slate-300/80 max-w-md leading-relaxed">
                            Uncover royal architectures in ancient Rajasthan, mystical temples of Hampi, and spiritual trails across serene mountains.
                        </p>

                        {/* Social proof avatars */}
                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex -space-x-2.5">
                                {['A', 'S', 'P', 'D'].map((letter, i) => (
                                    <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white">
                                        {letter}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-slate-400">
                                <span className="text-white font-semibold">850+</span> joined this week
                            </p>
                        </div>

                        {/* Trust bar */}
                        <div className="mt-6 flex items-center gap-6 text-xs text-slate-500">
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                                <span>Encrypted signup</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                <span>Instant activation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default RegisterPage;
