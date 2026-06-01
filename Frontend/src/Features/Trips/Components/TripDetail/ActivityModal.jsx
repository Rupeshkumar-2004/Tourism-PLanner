import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { updateTripDestination } from "../../services/tripDestinationService";

const ActivityModal = ({ isOpen, onClose, onSuccess, tripDestination, dayId, initialData = null }) => {
    const isEdit = Boolean(initialData);

    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [activityType, setActivityType] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [locationInfo, setLocationInfo] = useState("");
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && isEdit && initialData) {
            setTitle(initialData.title || "");
            setTime(initialData.time || "");
            setDescription(initialData.description || "");
            setActivityType(initialData.activityType || "");
            setImageUrl(initialData.imageUrl || "");
            setLocationInfo(initialData.locationInfo || "");
        } else if (isOpen && !isEdit) {
            setTitle("");
            setTime("");
            setDescription("");
            setActivityType("");
            setImageUrl("");
            setLocationInfo("");
        }
    }, [isOpen, isEdit, initialData]);

    if (!isOpen || !tripDestination || !dayId) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // Deep clone the itinerary array so we can mutate it safely
            const updatedItinerary = JSON.parse(JSON.stringify(tripDestination.itinerary || []));
            
            // Find the specific day
            const dayIndex = updatedItinerary.findIndex(day => day._id === dayId || day.dayNumber === dayId);
            
            if (dayIndex === -1) {
                throw new Error("Day not found in itinerary");
            }

            const newActivity = {
                title,
                time,
                description,
                activityType,
                imageUrl,
                locationInfo
            };

            if (isEdit) {
                // If edit, we need the initialData._id to find and replace
                const activityIndex = updatedItinerary[dayIndex].activities.findIndex(act => act._id === initialData._id);
                if (activityIndex !== -1) {
                    updatedItinerary[dayIndex].activities[activityIndex] = {
                        ...updatedItinerary[dayIndex].activities[activityIndex],
                        ...newActivity
                    };
                }
            } else {
                // Add new activity
                updatedItinerary[dayIndex].activities.push(newActivity);
            }

            await updateTripDestination(tripDestination._id, {
                itinerary: updatedItinerary
            });
            
            onSuccess();
            onClose();
        } catch (err) {
            setError(err.message || err.response?.data?.message || "Failed to save activity.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-scrim/40 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md shadow-ambient overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-6 border-b border-outline-variant/50">
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                        {isEdit ? "Edit Activity" : "Add Activity"}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant p-2 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {error && (
                        <div className="p-4 bg-error-container text-on-error-container rounded-xl font-body-sm text-body-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block font-label-md text-label-md text-on-surface mb-2">Activity Title</label>
                        <input 
                            type="text" 
                            required
                            placeholder="e.g. Visit Shanti Stupa"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-body-md text-body-md"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-label-md text-label-md text-on-surface mb-2">Time</label>
                            <input 
                                type="text"
                                placeholder="e.g. 09:00 AM"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-body-md text-body-md"
                            />
                        </div>
                        <div>
                            <label className="block font-label-md text-label-md text-on-surface mb-2">Type / Category</label>
                            <input 
                                type="text"
                                placeholder="e.g. Sightseeing"
                                value={activityType}
                                onChange={(e) => setActivityType(e.target.value)}
                                className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-body-md text-body-md"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-label-md text-label-md text-on-surface mb-2">Description</label>
                        <textarea 
                            rows="3"
                            placeholder="Brief description of the activity..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-body-md text-body-md resize-none"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-label-md text-label-md text-on-surface mb-2">Image URL (Optional)</label>
                        <input 
                            type="url"
                            placeholder="https://images.unsplash.com/..."
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-body-md text-body-md"
                        />
                    </div>
                    
                    <div>
                        <label className="block font-label-md text-label-md text-on-surface mb-2">Location Info (Optional)</label>
                        <input 
                            type="text"
                            placeholder="e.g. Main Square"
                            value={locationInfo}
                            onChange={(e) => setLocationInfo(e.target.value)}
                            className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-body-md text-body-md"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/50">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2.5 rounded-xl font-label-md text-label-md bg-primary text-on-primary hover:bg-on-primary-container shadow-sm hover:shadow transition-all disabled:opacity-70 flex items-center gap-2"
                        >
                            {isLoading ? "Saving..." : "Save Activity"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ActivityModal;
