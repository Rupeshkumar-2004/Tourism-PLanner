/*
  📘 LESSON: Debouncing + Search + Pagination

  This page teaches:
  1. Debouncing — delaying API calls while user is still typing
  2. Multiple filters working together
  3. Pagination — loading data page by page
  4. useEffect with dependencies — re-fetch when filters change
*/

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as destinationService from '../services/destinationService.js';
import { useAuth } from '../hooks/useAuth.js';
import {
  Search, MapPin, Tag, Wallet, ChevronLeft, ChevronRight,
  Plane, LogOut, Map, LayoutDashboard, Filter, X
} from 'lucide-react';

export default function DestinationsPage() {
  const { user, isAuthenticated, logout } = useAuth();

  // ─── State ──────────────────────────────────────────────────────
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ city: '', category: '' });

  /*
    📘 LESSON: Debouncing

    PROBLEM: Without debouncing, the API is called on EVERY KEYSTROKE.
    User types "G-O-A" → 3 API calls: search="G", search="GO", search="GOA"
    That's wasteful and can overload your server.

    SOLUTION: Debouncing waits until the user STOPS typing for a set time
    (e.g., 400ms) before calling the API. So "GOA" only triggers 1 call.

    HOW IT WORKS:
    1. User types → searchTerm updates immediately (input stays responsive)
    2. A setTimeout starts a 400ms timer
    3. If user types again within 400ms, timer resets (clearTimeout)
    4. After 400ms of silence → debouncedSearch updates → useEffect fires → API called

    📘 The cleanup function (return () => clearTimeout) is crucial!
    Without it, old timers would still fire even after the component unmounts,
    causing memory leaks and "can't update state on unmounted component" errors.
  */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to page 1 when search changes
    }, 400);

    // 📘 Cleanup function — runs before the NEXT effect and on unmount
    return () => clearTimeout(timer);
  }, [searchTerm]); // Runs every time searchTerm changes

  // ─── Fetch destinations when search/page/filters change ─────────
  /*
    📘 useEffect with MULTIPLE dependencies.
    This effect runs when ANY of these change:
    - debouncedSearch (user searched something)
    - page (user clicked next/prev page)
    - filters.city or filters.category

    This is the "reactive" nature of React — state changes trigger effects.
  */
  useEffect(() => {
    const fetchDestinations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = {
          page,
          limit: 9,
        };

        // Only add params if they have values (don't send empty strings)
        if (debouncedSearch) params.search = debouncedSearch;
        if (filters.city) params.city = filters.city;
        if (filters.category) params.category = filters.category;

        const response = await destinationService.getDestinations(params);
        setDestinations(response.data.destinations);
        setPagination(response.data.pagination);
      } catch (err) {
        setError('Failed to load destinations');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, [debouncedSearch, page, filters.city, filters.category]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-500 rounded-xl flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">SkyVoyage</span>
          </div>

          <div className="flex items-center gap-6">
            {isAuthenticated && (
              <Link to="/dashboard" className="text-slate-600 hover:text-sky-500 font-medium transition-colors flex items-center gap-1.5">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                  {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <button onClick={logout} className="text-slate-400 hover:text-red-500 transition-colors" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-medium rounded-xl">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Explore Destinations</h1>
          <p className="text-slate-500">Discover amazing places for your next adventure</p>
        </div>

        {/* Search + Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search destinations, cities, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl
                         text-slate-800 placeholder-slate-400
                         focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500
                         transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-5 py-3.5 border rounded-xl flex items-center gap-2 font-medium transition-all
                       ${showFilters 
                         ? 'bg-sky-50 border-sky-200 text-sky-600' 
                         : 'bg-white border-slate-200 text-slate-600 hover:border-sky-200'}`}
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6 flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">City</label>
              <input
                placeholder="e.g., Goa"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800
                           focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
              <input
                placeholder="e.g., beach, mountain"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800
                           focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
            <button
              onClick={() => setFilters({ city: '', category: '' })}
              className="px-4 py-2.5 text-slate-500 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Results */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent mb-4"></div>
            <p className="text-slate-500">Searching destinations...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <Map className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No destinations found</h3>
            <p className="text-slate-500">Try a different search or filter</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {destinations.map((dest) => (
                <div
                  key={dest._id}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden
                             hover:shadow-lg hover:border-sky-100 transition-all duration-300 group"
                >
                  {/* Image or gradient placeholder */}
                  <div className="h-40 bg-gradient-to-br from-sky-300 via-sky-400 to-blue-500 relative overflow-hidden">
                    {dest.images?.[0] && (
                      <img src={dest.images[0]} alt={dest.name} className="w-full h-full object-cover" />
                    )}
                    {dest.category && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-sky-600 capitalize">
                        {dest.category}
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-sky-600 transition-colors">
                      {dest.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      {dest.city}, {dest.state}{dest.country !== 'india' ? `, ${dest.country}` : ''}
                    </div>

                    {dest.description && (
                      <p className="text-sm text-slate-500 mb-3 line-clamp-2">{dest.description}</p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                        <Wallet className="w-4 h-4" />
                        ₹{dest.estimatedBudget?.toLocaleString() || '0'}
                      </div>
                      {dest.tags?.length > 0 && (
                        <div className="flex gap-1">
                          {dest.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-slate-100 rounded text-xs text-slate-500">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ─── Pagination Controls ────────────────────────────── */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setPage(p => p - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg flex items-center gap-1
                             disabled:opacity-40 disabled:cursor-not-allowed
                             hover:border-sky-300 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <span className="text-sm text-slate-600">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={!pagination.hasNextPage}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg flex items-center gap-1
                             disabled:opacity-40 disabled:cursor-not-allowed
                             hover:border-sky-300 transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
