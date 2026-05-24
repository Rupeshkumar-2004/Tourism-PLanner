import { useState } from 'react';
import { Search, Star, Bookmark } from 'lucide-react';

const DESTINATIONS = [
    {
        id: 1,
        title: 'Kerala Backwaters',
        category: 'Nature',
        rating: 4.9,
        image:
            'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600',
    },
    {
        id: 2,
        title: 'Jaipur Heritage',
        category: 'Heritage',
        rating: 4.8,
        image:
            'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600',
    },
    {
        id: 3,
        title: 'Goa Beaches',
        category: 'Beach',
        rating: 4.7,
        image:
            'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600',
    },
];

export default function Dashboard() {
    const [search, setSearch] = useState('');
    const [saved, setSaved] = useState([]);

    const filtered = DESTINATIONS.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const toggleSave = (id) => {
        setSaved((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 bg-slate-50 min-h-screen">
            {/* Header */}
            <div>
                <p className="text-sm uppercase tracking-wider text-amber-600 font-bold">
                    Travel Dashboard
                </p>
                <h1 className="text-4xl font-black text-slate-900 mt-2">
                    Explore Beautiful Destinations
                </h1>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search destinations..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-amber-500"
                />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((place) => {
                    const isSaved = saved.includes(place.id);

                    return (
                        <div
                            key={place.id}
                            className="overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={place.image}
                                    alt={place.title}
                                    className="w-full h-full object-cover"
                                />

                                <button
                                    onClick={() => toggleSave(place.id)}
                                    className={`absolute top-4 right-4 p-2 rounded-lg transition ${isSaved
                                            ? 'bg-amber-500 text-white'
                                            : 'bg-white text-slate-700'
                                        }`}
                                >
                                    <Bookmark className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wide text-amber-600">
                                        {place.category}
                                    </span>

                                    <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                        {place.rating}
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold text-slate-800">
                                    {place.title}
                                </h2>

                                <button className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition">
                                    Explore Destination
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
