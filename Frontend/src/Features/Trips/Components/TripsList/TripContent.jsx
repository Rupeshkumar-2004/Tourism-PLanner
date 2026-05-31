import { useState } from "react";
import { Plus } from "lucide-react";
import TopNavBar from "../../../../components/TopNavBar.jsx";
import TripCard from "./TripCard.jsx";
import EmptyTripCard from "./EmptyTripCard.jsx";
import { useAuth } from "../../../../hooks/useAuth.js";
import TripFormModal from "./TripFormModal.jsx";
import { useTripMutations } from "../../hooks/useTripMutations.js";

const TripContent = ({ upcomingTrips = [], pastTrips = [], refetchTrips }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTripData, setEditTripData] = useState(null);
  
  const { deleteTrip } = useTripMutations(refetchTrips);

  const handleEdit = (trip) => {
    setEditTripData(trip);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      await deleteTrip(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditTripData(null);
  };

  function onTabChange(val) {
    setActiveTab(val);
  }

  const { user } = useAuth();

  const displayTrips = activeTab === 'upcoming' ? upcomingTrips : pastTrips;

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md pb-section-gap">
      <TopNavBar user={user?.fullName} />

      <main className="px-container-margin-mobile md:px-container-margin-desktop pt-12 max-w-[1440px] mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h1 className="font-display text-display text-on-surface mb-2">My Journeys</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Track your upcoming adventures and relive past experiences.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg px-5 py-3 shadow-ambient hover:shadow-ambient-hover hover:bg-on-primary-container transition-all duration-300"
          >
            <Plus size={18} />
            Plan New Journey
          </button>
        </header>

        {/* Tab Filter */}
        <div className="flex items-center gap-8 border-b border-outline-variant mb-8">
          <button
            onClick={() => onTabChange('upcoming')}
            className={`pb-3 border-b-2 font-label-md text-label-md transition-colors ${activeTab === 'upcoming'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
          >
            Upcoming ({upcomingTrips.length})
          </button>

          <button
            onClick={() => onTabChange('past')}
            className={`pb-3 border-b-2 font-label-md text-label-md transition-colors ${activeTab === 'past'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
          >
            Past ({pastTrips.length})
          </button>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
          {activeTab === 'upcoming' ? (
            <>
              {upcomingTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
              {upcomingTrips.length < 3 && <EmptyTripCard />}
            </>
          ) : displayTrips && displayTrips.length > 0 ? (
            displayTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onEdit={handleEdit} onDelete={handleDelete} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="font-body-lg text-body-lg text-outline">No {activeTab} trips yet</p>
            </div>
          )}
        </div>
      </main>

      <TripFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSuccess={refetchTrips}
        initialData={editTripData}
      />
    </div>
  )
}

export default TripContent
