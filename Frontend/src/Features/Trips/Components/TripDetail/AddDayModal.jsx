import { useState } from "react";
import { X } from "lucide-react";
import { updateTripDestination } from "../../services/tripDestinationService";

const AddDayModal = ({ isOpen, onClose, onSuccess, tripDestination }) => {
    const [dayNumber, setDayNumber] = useState(tripDestination?.itinerary?.length ? tripDestination.itinerary.length + 1 : 1);
    const [theme, setTheme] = useState("");
    const [date, setDate] = useState("");
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen || !tripDestination) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const newDay = {
                dayNumber: Number(dayNumber),
                theme,
                date: date ? new Date(date).toISOString() : undefined,
                activities: []
            };

            const updatedItinerary = [...(tripDestination.itinerary || []), newDay];

            // Sort the itinerary by day number to keep it organized
            updatedItinerary.sort((a, b) => a.dayNumber - b.dayNumber);

            await updateTripDestination(tripDestination._id, {
                itinerary: updatedItinerary
            });
            
            onSuccess();
            onClose();
            // Reset state
            setTheme("");
            setDate("");
            setDayNumber(updatedItinerary.length + 1);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add day.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-scrim/40 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md shadow-ambient overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-6 border-b border-outline-variant/50">
                    <h2 className="font-headline-md text-headline-md text-on-surface">Add Day to Itinerary</h2>
                    <button 
                        onClick={onClose}
                        className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant p-2 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <div className="p-4 bg-error-container text-on-error-container rounded-xl font-body-sm text-body-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-label-md text-label-md text-on-surface mb-2">Day Number</label>
                                <input 
                                    type="number" 
                                    required
                                    min="1"
                                    value={dayNumber}
                                    onChange={(e) => setDayNumber(e.target.value)}
                                    className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-body-md text-body-md"
                                />
                            </div>
                            <div>
                                <label className="block font-label-md text-label-md text-on-surface mb-2">Date (Optional)</label>
                                <input 
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-body-md text-body-md"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-label-md text-label-md text-on-surface mb-2">Theme / Title</label>
                            <input 
                                type="text"
                                required
                                placeholder="e.g. Arrival & Acclimatization"
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-body-md text-body-md"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
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
                            {isLoading ? "Saving..." : "Add Day"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDayModal;
