import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Lock, Mail, User } from "lucide-react";
import InputField from "../../../components/UI/InputField";
import Button from "../../../components/UI/Button";

const RegisterForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [travelStyle, setTravelStyle] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMsg('');
      setIsSubmitting(true);

      try {
        await signup({ fullName, email, password, travelStyle });
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
              <InputField
                  label="Your Full Name"
                  id="signup-name-input"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Aditi Sharma"
                  className="block w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-4 text-sm bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                  icon={User}
              />
            </div>

            <div>
              <InputField
                  id="signup-email-input"
                  label="Your Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aditi@example.com"
                  className="block w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-4 text-sm bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                  icon={Mail}
              />

            </div>

            <div>
                <InputField
                  id="signup-password-input"
                  label="Create Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-4 text-sm bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                  icon={Lock}
                />
            </div>

            {/* Interactive Select Travel Style cards */}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Default Travel Style
              </label>
              <div className="grid grid-cols-2 gap-3" id="signup-travel-style-selector">
                <Button
                  type="button"
                  onClick={() => setTravelStyle('solo')}
                  className={`p-3 text-left rounded-xl border text-sm transition-all flex flex-col justify-between ${travelStyle === 'solo'
                    ? 'border-amber-500 bg-amber-50 text-amber-900'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                    }`}
                >
                  <span className="font-semibold block">Solo Run</span>
                  <span className="text-[10px] text-slate-400 mt-1">Peaceful self explores</span>  
                </Button>

                <Button
                  type="button"
                  onClick={() => setTravelStyle('group')}
                  className={`p-3 text-left rounded-xl border text-sm transition-all flex flex-col justify-between ${travelStyle === 'group'
                    ? 'border-amber-500 bg-amber-50 text-amber-900'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                    }`}
                >
                  <span className="font-semibold block">In a Group</span>
                  <span className="text-[10px] text-slate-400 mt-1">Lively joint adventures</span>
                </Button>
              </div>
            </div>

            <Button 
              id="auth-signup-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-150 active:scale-[0.98] mt-2"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}

            </Button>
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
    )
}

export default RegisterForm;
