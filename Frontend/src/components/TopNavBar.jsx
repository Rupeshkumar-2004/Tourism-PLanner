import { useEffect, useRef, useState } from 'react';
import { Bell, Compass, Settings } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const navLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'My Trips', to: '/trips' },
];

const getInitials = (name = '') =>
  String(name)
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'SV';

export default function TopNavBar({ user }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const profilePicture = user?.ProfilePicture;
  const userName = user || 'Traveler';

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  const handleSignOut = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate('/login', { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-12">
      <div className="flex min-w-0 items-center gap-6">
        <Link className="flex items-center gap-2 shrink-0" to="/dashboard">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
            <Compass size={20} />
          </span>
          <span className="text-xl font-bold text-sky-700">SkyVoyage</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'border-b-2 border-sky-700 pb-1 font-medium text-sky-700 transition-colors hover:text-sky-800'
                  : 'border-b-2 border-transparent pb-1 font-medium text-slate-600 transition-colors hover:text-sky-700'
              }
              key={link.label}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-sky-700"
          type="button"
        >
          <Bell size={20} />
        </button>

        <button
          aria-label="Settings"
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-sky-700"
          type="button"
        >
          <Settings size={20} />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            aria-expanded={isProfileMenuOpen}
            aria-haspopup="menu"
            aria-label="Open profile menu"
            className="h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-sky-100 text-sky-700 ring-2 ring-white transition hover:ring-sky-200"
            onClick={() => setIsProfileMenuOpen((isOpen) => !isOpen)}
            type="button"
          >
            {profilePicture ? (
              <img
                alt={`${userName}'s profile`}
                className="h-full w-full object-cover"
                src={profilePicture}
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-xs font-bold">
                {getInitials(userName)}
              </span>
            )}
          </button>

          {isProfileMenuOpen && (
            <div
              className="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-ambient"
              role="menu"
            >
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {userName}
                </p>
                {user?.email && (
                  <p className="truncate text-xs text-slate-500">
                    {user.email}
                  </p>
                )}
              </div>

              <button
                className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-sky-700"
                onClick={handleSignOut}
                role="menuitem"
                type="button"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
