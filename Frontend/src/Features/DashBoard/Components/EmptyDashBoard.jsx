import {Compass, Plane, Globe, Navigation, MapPin, Sparkles } from 'lucide-react';
import TopNavBar from '../../../components/TopNavBar.jsx';

const EmptyDashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-gray-900">

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavBar />

        {/* ================= MAIN SCROLL AREA ================= */}
        <main className="flex-1 overflow-y-auto px-6 md:px-12 py-8">
          
          {/* Welcome Section */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-2">
              Welcome back, Rupesh.
            </h2>

            <p className="text-lg text-gray-500">
              The world is waiting. Let's plan something extraordinary.
            </p>
          </section>

          {/* ================= STATS SECTION ================= */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            
            {/* Upcoming Trips */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Plane size={20} className="text-amber-700" />
              </div>

              <p className="text-4xl font-bold">0</p>

              <p className="text-sm uppercase tracking-wide text-gray-500">
                Upcoming Trips
              </p>
            </div>

            {/* Destinations Visited */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Globe size={20} className="text-orange-700" />
              </div>

              <p className="text-4xl font-bold">0</p>

              <p className="text-sm uppercase tracking-wide text-gray-500">
                Destinations Visited
              </p>
            </div>

            {/* Miles Traveled */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Navigation size={20} className="text-gray-700" />
              </div>

              <p className="text-4xl font-bold">0</p>

              <p className="text-sm uppercase tracking-wide text-gray-500">
                Miles Traveled
              </p>
            </div>

            {/* Saved Places */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <MapPin size={20} className="text-amber-700" />
              </div>

              <p className="text-4xl font-bold">0</p>

              <p className="text-sm uppercase tracking-wide text-gray-500">
                Saved Places
              </p>
            </div>
          </section>

          {/* ================= EMPTY STATE SECTION ================= */}
          <section className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed">
            
            {/* Illustration */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
              
              {/* Background Circles */}
              <div className="absolute inset-0 bg-amber-100 rounded-full blur-2xl"></div>

              {/* Decorative Icons */}
              <Plane size={24} className="absolute top-4 right-8 text-amber-400" />
              <MapPin size={24} className="absolute bottom-4 right-4 text-amber-300" />

              {/* Main Icon */}
              <div className="relative z-10 w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center">
                <Compass size={64} className="text-amber-700" />
              </div>
            </div>

            {/* Text */}
            <h3 className="text-2xl font-bold mb-2">
              Start your discovery
            </h3>

            <p className="text-center text-gray-500 max-w-md mb-8">
              Discover the hidden gems of India tailored for solo explorers and groups. Save your favorite guides and plan your next big adventure.
            </p>

            {/* CTA Button */}
            <button className="px-8 py-3 rounded-lg bg-amber-700 text-white hover:bg-amber-800 flex items-center gap-2 font-medium transition-colors">
              <Sparkles size={18} />
              Explore Destinations
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default EmptyDashboard;
