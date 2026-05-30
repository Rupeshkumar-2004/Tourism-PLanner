import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Mail, Lock} from "lucide-react";
import InputField from "../../../components/UI/InputField";
import Button from "../../../components/UI/Button";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();


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

                    {errorMsg && (
                        <div className="mb-4 text-xs bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-lg" id="auth-login-error">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                            <InputField
                                id="login-email-input"
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="[EMAIL_ADDRESS]"
                                icon={Mail}
                            />

                            <InputField
                                id="login-password-input"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                icon={Lock}
                            />

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Logging in...' : 'Enter Voyage'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500">
                        Don't have an exciting account?{' '}
                        <Link
                            to="/sign-up"
                            id="toggle-signup-mode-btn"
                            onClick={() => setErrorMsg('')}
                            className="font-semibold text-amber-600 hover:underline hover:text-amber-700"
                        >
                            Join the voyage
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default LoginForm;