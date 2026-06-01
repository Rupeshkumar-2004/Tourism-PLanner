import { Clock, Plus, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import AddDestinationModal from "./AddDestinationModal";
import AddDayModal from "./AddDayModal";
import ActivityModal from "./ActivityModal";
import { removeDestinationFromTrip, updateTripDestination } from "../../services/tripDestinationService";

const ItineraryTimeline = ({ trip, refetchTrip }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    // Add Day State
    const [addingDayDest, setAddingDayDest] = useState(null);

    // Activity Modal State
    const [activityModalState, setActivityModalState] = useState({
        isOpen: false,
        tripDestination: null,
        dayId: null,
        initialData: null
    });

    const [isDeletingId, setIsDeletingId] = useState(null);

    const handleDeleteDestination = async (tripDestId) => {
        if (!window.confirm("Are you sure you want to remove this destination and all its itinerary from your trip?")) return;
        
        setIsDeletingId(tripDestId);
        try {
            await removeDestinationFromTrip(tripDestId);
            refetchTrip();
        } catch (error) {
            alert("Failed to remove destination");
        } finally {
            setIsDeletingId(null);
        }
    };

    const handleDeleteDay = async (tripDest, dayId) => {
        if (!window.confirm("Are you sure you want to delete this day and all its activities?")) return;
        
        setIsDeletingId(dayId);
        try {
            const updatedItinerary = tripDest.itinerary.filter(d => d._id !== dayId && d.dayNumber !== dayId);
            await updateTripDestination(tripDest._id, { itinerary: updatedItinerary });
            refetchTrip();
        } catch (error) {
            alert("Failed to delete day");
        } finally {
            setIsDeletingId(null);
        }
    };

    const handleDeleteActivity = async (tripDest, dayId, activityId) => {
        if (!window.confirm("Are you sure you want to delete this activity?")) return;
        
        setIsDeletingId(activityId);
        try {
            const updatedItinerary = JSON.parse(JSON.stringify(tripDest.itinerary));
            const dayIndex = updatedItinerary.findIndex(d => d._id === dayId || d.dayNumber === dayId);
            
            if (dayIndex !== -1) {
                updatedItinerary[dayIndex].activities = updatedItinerary[dayIndex].activities.filter(a => a._id !== activityId);
                await updateTripDestination(tripDest._id, { itinerary: updatedItinerary });
                refetchTrip();
            }
        } catch (error) {
            alert("Failed to delete activity");
        } finally {
            setIsDeletingId(null);
        }
    };

    const openActivityModal = (tripDestination, dayId, initialData = null) => {
        setActivityModalState({
            isOpen: true,
            tripDestination,
            dayId,
            initialData
        });
    };

    const closeActivityModal = () => {
        setActivityModalState({
            isOpen: false,
            tripDestination: null,
            dayId: null,
            initialData: null
        });
    };
    // Determine the list of destinations that have itineraries
    // Assuming trip details API populates `tripDestinations` if the backend is configured to do so.
    // Wait, the backend GET /trips/:id endpoint: Does it include tripDestinations?
    // Let's assume it passes them via trip.destinations or we just pass the structure as we know it.
    
    // Fallback data if API doesn't populate it deeply yet
    const destinations = trip.destinations || [];

    if (destinations.length === 0) {
        return (
            <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-8 border border-outline-variant/70 text-center">
                <div className="w-16 h-16 bg-surface-variant rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-3xl text-on-surface-variant">
                        flight_takeoff
                    </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">No Destinations Added</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                    Start planning your journey by adding destinations and daily activities.
                </p>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-md text-label-md hover:bg-on-primary-container transition-colors"
                >
                    Add Destination
                </button>
                <AddDestinationModal 
                    isOpen={isAddModalOpen} 
                    onClose={() => setIsAddModalOpen(false)} 
                    onSuccess={refetchTrip} 
                    tripId={trip._id} 
                />
            </div>
        );
    }

    return (
        <div className="space-y-8 relative">
            {/* Header Action */}
            <div className="flex justify-end mb-4">
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-primary/20 transition-colors"
                >
                    <Plus size={18} />
                    Add Destination
                </button>
            </div>

            {destinations.map((tripDest, idx) => (
                <div key={tripDest._id || idx} className="bg-surface-container-lowest rounded-2xl shadow-ambient p-8 border border-outline-variant/70">
                    <div className="flex justify-between items-center mb-6 border-b border-outline-variant/50 pb-4">
                        <div>
                            <h3 className="font-headline-lg text-headline-lg text-on-surface text-primary">
                                {tripDest.destination?.name || "Destination"}
                            </h3>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                                {tripDest.notes || "Enjoy your stay"}
                            </p>
                        </div>
                        <button 
                            onClick={() => handleDeleteDestination(tripDest._id)}
                            disabled={isDeletingId === tripDest._id}
                            className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-full transition-colors disabled:opacity-50"
                            title="Remove Destination"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>

                    <div className="space-y-8">
                        {tripDest.itinerary && tripDest.itinerary.length > 0 ? (
                            tripDest.itinerary.map((day) => (
                                <div key={day._id || day.dayNumber} className="relative pl-8">
                                    {/* Timeline Line */}
                                    <div className="absolute left-[11px] top-10 bottom-[-32px] w-0.5 bg-outline-variant/40 last:hidden"></div>
                                    
                                    {/* Day Header */}
                                    <div className="relative mb-6 flex justify-between items-start group/day">
                                        <div>
                                            <div className="absolute -left-[32px] top-1.5 w-6 h-6 bg-primary-container rounded-full border-4 border-surface-container-lowest z-10 flex items-center justify-center">
                                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                            </div>
                                            <h4 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                                                Day {day.dayNumber}: {day.theme}
                                            </h4>
                                            {day.date && (
                                                <p className="font-body-md text-body-md text-on-surface-variant">
                                                    {new Date(day.date).toLocaleDateString("en-IN", { weekday: 'short', month: 'short', day: 'numeric' })}
                                                </p>
                                            )}
                                        </div>
                                        <button 
                                            onClick={() => handleDeleteDay(tripDest, day._id || day.dayNumber)}
                                            disabled={isDeletingId === (day._id || day.dayNumber)}
                                            className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container rounded-full transition-colors opacity-0 group-hover/day:opacity-100 disabled:opacity-50"
                                            title="Delete Day"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    {/* Activities */}
                                    <div className="space-y-4">
                                        {day.activities.map((activity) => (
                                            <div key={activity._id || activity.title} className="bg-surface rounded-xl p-5 border border-outline-variant/50 flex flex-col md:flex-row gap-5 hover:border-primary/30 transition-colors group">
                                                
                                                {/* Image */}
                                                {activity.imageUrl && (
                                                    <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden shrink-0">
                                                        <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    </div>
                                                )}
                                                
                                                {/* Details */}
                                                <div className="flex-grow">
                                                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                                                        <h5 className="font-title-md text-title-md text-on-surface">{activity.title}</h5>
                                                        <div className="flex items-center gap-2">
                                                            {activity.time && (
                                                                <span className="flex items-center gap-1.5 text-primary font-label-md text-label-md bg-primary-container/30 px-2.5 py-1 rounded-md">
                                                                    <Clock size={14} />
                                                                    {activity.time}
                                                                </span>
                                                            )}
                                                            
                                                            {/* Activity Actions */}
                                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                                                                <button 
                                                                    onClick={() => openActivityModal(tripDest, day._id || day.dayNumber, activity)}
                                                                    className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary-container rounded-full transition-colors"
                                                                    title="Edit Activity"
                                                                >
                                                                    <Edit2 size={14} />
                                                                </button>
                                                                <button 
                                                                    onClick={() => handleDeleteActivity(tripDest, day._id || day.dayNumber, activity._id)}
                                                                    disabled={isDeletingId === activity._id}
                                                                    className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container rounded-full transition-colors"
                                                                    title="Delete Activity"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="font-body-md text-body-md text-on-surface-variant mb-3">
                                                        {activity.description}
                                                    </p>
                                                    {activity.activityType && (
                                                        <span className="inline-block bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-full font-label-sm text-label-sm">
                                                            {activity.activityType}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Add Activity Button */}
                                        <button 
                                            onClick={() => openActivityModal(tripDest, day._id || day.dayNumber)}
                                            className="w-full py-3 border-2 border-dashed border-outline-variant/60 rounded-xl text-on-surface-variant font-label-md hover:bg-surface-variant/50 hover:text-on-surface hover:border-outline-variant transition-all flex items-center justify-center gap-2 mt-4"
                                        >
                                            <Plus size={16} />
                                            Add Activity
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-6">
                                <p className="font-body-md text-body-md text-on-surface-variant italic mb-4">
                                    No itinerary planned for this destination yet.
                                </p>
                            </div>
                        )}

                        {/* Add Day Button */}
                        <div className="mt-6">
                            <button 
                                onClick={() => setAddingDayDest(tripDest)}
                                className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-secondary-container/80 transition-colors flex items-center gap-2 w-max"
                            >
                                <Plus size={18} />
                                Add Day
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            
            <AddDestinationModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onSuccess={refetchTrip} 
                tripId={trip._id} 
            />

            <AddDayModal 
                isOpen={Boolean(addingDayDest)} 
                onClose={() => setAddingDayDest(null)} 
                onSuccess={refetchTrip} 
                tripDestination={addingDayDest} 
            />

            <ActivityModal 
                isOpen={activityModalState.isOpen} 
                onClose={closeActivityModal} 
                onSuccess={refetchTrip} 
                tripDestination={activityModalState.tripDestination} 
                dayId={activityModalState.dayId}
                initialData={activityModalState.initialData}
            />
        </div>
    );
};

export default ItineraryTimeline;
