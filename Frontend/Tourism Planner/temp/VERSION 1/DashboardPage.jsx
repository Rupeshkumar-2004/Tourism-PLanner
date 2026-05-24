import { useState } from 'react';
import { Compass, Calendar, Trophy, Bookmark, Plus, MapPin, Sparkles, Star, ArrowRight } from 'lucide-react';

const IMAGES = {
    kerala: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200',
};

const CURATED_DESTINATIONS = [
    {
        id: 'jaipur-rajasthan',
        title: 'The Pink City of Jaipur',
        state: 'Rajasthan',
        category: 'Heritage',
        rating: 4.8,
        intro: 'Explore the majestic Hawa Mahal, Amber Fort, and vibrant bazaars of Rajasthan\'s capital city.',
        imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600',
    },
    {
        id: 'alleppey-kerala',
        title: 'Kerala Backwaters Cruise',
        state: 'Kerala',
        category: 'Nature',
        rating: 4.9,
        intro: 'Drift through serene lagoons on a traditional houseboat surrounded by lush paddy fields.',
        imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600',
    },
    {
        id: 'varanasi-up',
        title: 'Spiritual Varanasi',
        state: 'Uttar Pradesh',
        category: 'Spiritual',
        rating: 4.7,
        intro: 'Witness the mesmerizing Ganga Aarti and explore centuries-old ghats along the Ganges.',
        imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600',
    },
    {
        id: 'manali-hp',
        title: 'Adventure in Manali',
        state: 'Himachal Pradesh',
        category: 'Adventure',
        rating: 4.6,
        intro: 'Trekking, paragliding, and snow-capped Himalayan panoramas await in this mountain paradise.',
        imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600',
    },
    {
        id: 'goa-beaches',
        title: 'Sun-Kissed Goa',
        state: 'Goa',
        category: 'Beach',
        rating: 4.5,
        intro: 'Golden sands, Portuguese heritage, and electric nightlife along India\'s western coast.',
        imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600',
    },
    {
        id: 'hampi-karnataka',
        title: 'Ruins of Hampi',
        state: 'Karnataka',
        category: 'Heritage',
        rating: 4.8,
        intro: 'Walk among the surreal boulder-strewn ruins of the ancient Vijayanagara Empire.',
        imageUrl: 'https://images.unsplash.com/photo-1600100397608-6d7e96e1c1c2?w=600',
    },
];

//{ user, savedGuides, activeTripsCount, onNavigate, onOpenWizard, onExploreGuide, toggleSaved }

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter curated suggestions
    const filteredSuggestions = CURATED_DESTINATIONS.filter((dest) =>
        dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //const isEmpty = activeTripsCount === 0 && savedGuides.length === 0;

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8" id="dashboard-view-container">
            {/* Top Welcome Title Banner */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <span className="font-mono text-xs font-bold tracking-wider text-amber-600 uppercase">
                        Travel Dashboard
                    </span>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
                        {isEmpty
                            ? `Welcome back, ${user.name.split(' ')[0]}. Start your discovery`
                            : `Welcome back, ${user.name.split(' ')[0]}!`
                        }
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        {isEmpty
                            ? "You haven't built any custom itineraries yet. Let's map your first grand journey!"
                            : "Track your active itineraries, review saved travel guides, and collect voyager ranking points."
                        }
                    </p>
                </div>

            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4" id="dashboard-metrics-grid">
                {/* Metric 1 */}
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow transition duration-150 flex items-center space-x-4">
                    <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                        <MapPin className="h-6 w-6" id="metric-icon-destinations" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-400 capitalize">Destinations Explored</p>
                        <p className="text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
                            {isEmpty ? 0 : user.destinationsCount}
                        </p>
                    </div>
                </div>

                {/* Metric 2 */}
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow transition duration-150 flex items-center space-x-4">
                    <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                        <Bookmark className="h-6 w-6" id="metric-icon-bookmarks" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-400 capitalize">Guides Bookmarked</p>
                        <p className="text-2xl font-black text-slate-800 tracking-tight leading-none mt-1">
                            {isEmpty ? 0 : savedGuides.length}
                        </p>
                    </div>
                </div>

                {/* Metric 3 */}
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow transition duration-150 flex items-center space-x-4">
                    <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                        <Trophy className="h-6 w-6" id="metric-icon-rank" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-400 capitalize">Traveler Rank</p>
                        <p className="text-base font-bold text-slate-800 truncate leading-none mt-1">
                            {isEmpty ? "Beginner" : user.rank}
                        </p>
                    </div>
                </div>

                {/* Metric 4 */}
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow transition duration-150 flex items-center space-x-4">
                    <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                        <Sparkles className="h-6 w-6" id="metric-icon-points" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-400 capitalize">Points Earned</p>
                        <p className="text-lg font-black text-slate-800 tracking-tight leading-none mt-1 font-mono">
                            {isEmpty ? "0 XP" : `${user.points.toLocaleString()} XP`}
                        </p>
                    </div>
                </div>
            </div>

            {isEmpty ? (
                // ================== EMPTY STATE VIEW ==================
                <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 bg-slate-50/50 rounded-2xl py-16 px-6 text-center shadow-inner" id="dashboard-empty-state-card">
                    <div className="bg-white rounded-full p-4 shadow-sm border border-slate-100 flex items-center justify-center mb-5 animate-pulse">
                        <Compass className="h-10 w-10 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Your Voyage Diary lies Empty</h3>
                    <p className="mt-2 text-sm text-slate-400 max-w-md">
                        Wanderlust is calling! Create an active travel plan or save standard guides from our Explore library to get started on your quest.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button
                            id="empty-dashboard-plan-journey-btn"
                            onClick={onOpenWizard}
                            className="inline-flex items-center justify-center space-x-2 rounded-xl bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-amber-700 transition"
                        >
                            <Plus className="h-4.5 w-4.5" />
                            <span>Plan Jam-packed Journey</span>
                        </button>
                        <button
                            id="empty-dashboard-explore-guides-btn"
                            onClick={() => onNavigate('explore')}
                            className="inline-flex items-center justify-center space-x-2 rounded-xl bg-white border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                        >
                            <Compass className="h-4.5 w-4.5" />
                            <span>Browse Popular Guides</span>
                        </button>
                    </div>
                </div>
            ) : (
                // ================== POPULATED STATE VIEW ==================
                <div className="space-y-8" id="dashboard-populated-section">
                    {/* Main Hero Promo banner */}
                    <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row shadow-sm min-h-[220px]">
                        <img
                            src={IMAGES.kerala}
                            alt="Kerala houseboat"
                            className="absolute inset-0 w-full h-full object-cover opacity-35"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
                        <div className="relative z-10 flex-1 p-8 sm:p-10 flex flex-col justify-center">
                            <span className="font-mono text-xs font-bold text-amber-400 tracking-wider uppercase mb-1.5">
                                Limited Time Adventure
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight max-w-lg">
                                Monsoon Cruising in the Lagoons of Kerala
                            </h2>
                            <p className="mt-2 text-sm text-slate-300 max-w-md">
                                Secure a 5-day luxurious wood houseboat trip complete with Ayurvedic massage therapies and organic spice culinary tours.
                            </p>
                            <div className="mt-6">
                                <button
                                    onClick={() => onExploreGuide('alleppey-kerala')}
                                    className="inline-flex items-center space-x-1.5 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-slate-900 shadow hover:bg-slate-50 transition active:scale-95"
                                >
                                    <span>Read Guide</span>
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Suggested Discoveries with Search Filter */}
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Suggested for You</h3>
                                <p className="text-xs text-slate-400 mt-0.5">Custom recommendations based on your historical explore style.</p>
                            </div>
                            <div className="w-full sm:w-72">
                                <input
                                    type="text"
                                    placeholder="Filter suggestions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full text-xs px-3 py-2 border border-slate-200 bg-white rounded-lg outline-none focus:border-amber-500 transition"
                                />
                            </div>
                        </div>

                        {/* Suggestions Grid */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" id="dashboard-suggestions-grid">
                            {filteredSuggestions.map((dest) => {
                                const isSaved = savedGuides.includes(dest.id);
                                return (
                                    <div
                                        key={dest.id}
                                        className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition duration-150 flex flex-col h-full"
                                    >
                                        {/* Cover image */}
                                        <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                                            <img
                                                src={dest.imageUrl}
                                                alt={dest.title}
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                referrerPolicy="no-referrer"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                                            {/* Rating Label */}
                                            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1 text-[10px] font-bold text-slate-800 shadow">
                                                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                                                <span>{dest.rating}</span>
                                            </div>
                                            {/* Share / bookmark top buttons */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleSaved(dest.id);
                                                }}
                                                className={`absolute top-3 right-3 p-1.5 rounded-lg border shadow-sm transition-all ${isSaved
                                                    ? 'bg-amber-600 border-amber-600 text-white'
                                                    : 'bg-white/90 border-slate-100 text-slate-500 hover:text-slate-800'
                                                    }`}
                                            >
                                                <Bookmark className="h-3.5 w-3.5 fill-current" />
                                            </button>
                                        </div>

                                        {/* Meta info */}
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center space-x-1.5 text-[10px] uppercase font-bold text-amber-600 tracking-wider">
                                                    <span>{dest.category}</span>
                                                    <span>•</span>
                                                    <span>{dest.state}</span>
                                                </div>
                                                <h4 className="text-base font-extrabold text-slate-800 mt-1.5 leading-snug">
                                                    {dest.title}
                                                </h4>
                                                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                                                    {dest.intro}
                                                </p>
                                            </div>

                                            {/* Explore Button CTA */}
                                            <button
                                                onClick={() => onExploreGuide(dest.id)}
                                                className="mt-5 w-full text-center py-2 px-3 border border-slate-200 hover:border-amber-200 rounded-xl text-xs font-semibold text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition"
                                            >
                                                Explore Guide
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}

                            {filteredSuggestions.length === 0 && (
                                <div className="col-span-full py-8 text-center text-sm text-slate-400">
                                    No destinations found matching your criteria. Try another filter.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
