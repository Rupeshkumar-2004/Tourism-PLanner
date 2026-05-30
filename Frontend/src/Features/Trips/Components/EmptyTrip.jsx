import { useState } from "react";
import { Plus } from "lucide-react";
import EmptyTripCard from "./EmptyTripCard.jsx";
import TopNavBar from "../../../components/TopNavBar.jsx";
import { useAuth } from "../../../hooks/useAuth.js";

const EmptyTrip = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  function onTabChange(val){
      setActiveTab(val);
  }
  
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md pb-section-gap">
      <TopNavBar user={user.fullName} />

      <main className="px-container-margin-mobile md:px-container-margin-desktop pt-12 max-w-[1440px] mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <h1 className="font-display text-display text-on-surface mb-2">My Journeys</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Track your upcoming adventures and relive past experiences.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg px-5 py-3 shadow-ambient hover:shadow-ambient-hover hover:bg-on-primary-container transition-all duration-300">
              <Plus size={18} />
              Plan New Journey
            </button>
        </header>


        {/* Tab Filter */}
        <div className="flex items-center gap-8 border-b border-outline-variant mb-8">
            <button
              onClick={() => onTabChange('upcoming')}
              className={`pb-3 border-b-2 font-label-md text-label-md transition-colors ${
                activeTab === 'upcoming'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Upcoming ({0})
            </button>

            <button
              onClick={() => onTabChange('past')}
              className={`pb-3 border-b-2 font-label-md text-label-md transition-colors ${
                activeTab === 'past'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Past ({0})
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
          <EmptyTripCard />
        </div>
      </main>
    </div>
  );
};

export default EmptyTrip;
