import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { addDestinationToTrip } from "../../services/tripDestinationService";
import getDestinations from "../../../Destinations/services/destinationsServices";

const AddDestinationModal = ({ isOpen, onClose, onSuccess, tripId }) => {
    const [destinations, setDestinations] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState("");
    const [notes, setNotes] = useState("");
    const [estimatedBudget, setEstimatedBudget] = useState("");
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch available destinations when modal opens
    useEffect(() => {
        if (isOpen) {
            const fetchDestinations = async () => {
                try {
                    // Fetch all available destinations to populate the dropdown
                    const data = await getDestinations({ limit: 50 });
                    setDestinations(data.destinations || []);
                } catch (err) {
                    setError("Failed to load available destinations.");
                }
            };
            fetchDestinations();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await addDestinationToTrip(tripId, selectedDestination, {
                notes,
                estimatedBudget: estimatedBudget ? Number(estimatedBudget) : 0
            });
            onSuccess();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add destination.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-scrim/40 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md shadow-ambient overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-6 border-b border-outline-variant/50">
                    <h2 className="font-headline-md text-headline-md text-on-surface">Add Destination to Journey</h2>
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
                        <div>
                            <label className="block font-label-md text-label-md text-on-surface mb-2">Select Destination</label>
                            <select 
                                required
                                value={selectedDestination}
                                onChange={(e) => setSelectedDestination(e.target.value)}
                                className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-body-md text-body-md"
                            >
                                <option value="" disabled>Choose a place...</option>
                                {destinations.map(dest => (
                                    <option key={dest._id} value={dest._id}>
                                        {dest.name} ({dest.city}, {dest.country})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block font-label-md text-label-md text-on-surface mb-2">Estimated Budget (₹)</label>
                            <input 
                                type="number" 
                                min="0"
                                placeholder="0"
                                value={estimatedBudget}
                                onChange={(e) => setEstimatedBudget(e.target.value)}
                                className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-body-md text-body-md"
                            />
                        </div>

                        <div>
                            <label className="block font-label-md text-label-md text-on-surface mb-2">Notes</label>
                            <textarea 
                                placeholder="Any specific notes for this stop?"
                                rows="3"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-body-md text-body-md resize-none"
                            ></textarea>
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
                            {isLoading ? "Adding..." : "Add to Trip"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDestinationModal;
