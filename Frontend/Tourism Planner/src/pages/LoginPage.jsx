import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';

const IMAGES = {
    mountainSide: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
};

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleDemoLogin = () => {
        setEmail('rupesh@example.com');
        setPassword('password123');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setIsSubmitting(true);

        try {
            await login({ email, password });
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
            {/* Left Side: Editorial Image Banner */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
                {/* Background Image */}
                <img
                    src={IMAGES.mountainSide}
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

            {/* Right Side: Simple Clean Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 bg-slate-50">
                <div className="mx-auto w-full max-w-md bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-center sm:text-left mb-8">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                            Welcome back!
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Enter your credentials to manage your planned itineraries.
                        </p>
                    </div>

                    {/* Demo Login Assist Button */}
                    <button
                        id="demo-login-btn"
                        onClick={handleDemoLogin}
                        className="mb-6 w-full flex items-center justify-center space-x-2 rounded-xl bg-amber-50 hover:bg-amber-100 px-4 py-3.5 text-sm font-semibold text-amber-700 border border-amber-100 transition duration-150"
                    >
                        <span>🚀 Quick Access: Log in as Rupesh</span>
                        <ArrowRight className="h-4 w-4" />
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100" />
                        </div>
                        <div className="relative flex justify-center text-xs text-slate-400 uppercase">
                            <span className="bg-white px-3">or credentials</span>
                        </div>
                    </div>

                    {errorMsg && (
                        <div className="mb-4 text-xs bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-lg" id="auth-login-error">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="h-4.5 w-4.5 text-slate-400" />
                                </div>
                                <input
                                    id="login-email-input"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="[EMAIL_ADDRESS]"
                                    className="block w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-4 text-sm bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                                    Password
                                </label>
                                <a href="#" className="text-xs text-amber-600 hover:underline">Forgot?</a>
                            </div>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-4.5 w-4.5 text-slate-400" />
                                </div>
                                <input
                                    id="login-password-input"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="block w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-4 text-sm bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <button
                            id="auth-login-submit-btn"
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-150 active:scale-[0.98]"
                        >
                            {isSubmitting ? 'Logging in...' : 'Enter Voyage'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500">
                        Don't have an exciting account?{' '}
                        <Link
                            to="/register"
                            id="toggle-signup-mode-btn"
                            onClick={() => setErrorMsg('')}
                            className="font-semibold text-amber-600 hover:underline hover:text-amber-700"
                        >
                            Join the voyage
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
