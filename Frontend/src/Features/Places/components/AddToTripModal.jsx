import { useState } from 'react';
import { useTrips } from '../../Trips/hooks/useTrips';
import { addPlaceToTripItinerary } from '../../Trips/services/tripDestinationService';
import { X, MapPin, Loader2, CheckCircle2 } from 'lucide-react';

const AddToTripModal = ({ place, destinationId, onClose }) => {
    const { tripsData, isLoading, error } = useTrips();
    const [selectedTripId, setSelectedTripId] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const trips = tripsData?.trips || [];

    const handleSave = async () => {
        if (!selectedTripId) return;

        setIsSaving(true);
        setSaveError(null);

        try {
            await addPlaceToTripItinerary(selectedTripId, destinationId, place);
            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err) {
            setSaveError(err.response?.data?.message || "Failed to add place to itinerary.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-surface-variant flex items-center justify-between">
                    <h3 className="font-headline-md text-on-surface">Add to Itinerary</h3>
                    <button 
                        onClick={onClose}
                        className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant p-2 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {/* Place Summary */}
                    <div className="flex gap-4 mb-6 p-4 bg-surface-container-lowest rounded-xl border border-surface-variant">
                        {place.images && place.images[0] ? (
                            <img src={place.images[0]} alt={place.name} className="w-16 h-16 rounded-lg object-cover" />
                        ) : (
                            <div className="w-16 h-16 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
                                <MapPin className="w-6 h-6 text-primary" />
                            </div>
                        )}
                        <div>
                            <h4 className="font-label-lg text-on-surface line-clamp-1">{place.name}</h4>
                            <p className="text-body-sm text-on-surface-variant line-clamp-2">{place.description}</p>
                        </div>
                    </div>

                    {success ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                            <h4 className="font-headline-sm text-on-surface mb-2">Successfully Added!</h4>
                            <p className="text-body-md text-on-surface-variant">
                                Added to Day 1 of your trip itinerary.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <label className="block font-label-md text-on-surface mb-2">
                                    Select Trip
                                </label>
                                {isLoading ? (
                                    <div className="h-12 flex items-center justify-center border border-surface-variant rounded-xl bg-surface-container-lowest">
                                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                                    </div>
                                ) : error ? (
                                    <div className="text-error text-body-sm">{error}</div>
                                ) : trips.length === 0 ? (
                                    <div className="p-4 bg-secondary-container text-on-secondary-container rounded-xl text-body-md text-center">
                                        You don't have any active trips. Create one from the Dashboard first!
                                    </div>
                                ) : (
                                    <select 
                                        className="w-full h-12 px-4 border border-outline-variant rounded-xl bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                                        value={selectedTripId}
                                        onChange={(e) => setSelectedTripId(e.target.value)}
                                    >
                                        <option value="" disabled>-- Select a Trip --</option>
                                        {trips.map(trip => (
                                            <option key={trip._id} value={trip._id}>
                                                {trip.title} ({new Date(trip.startDate).toLocaleDateString()})
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {saveError && (
                                <div className="mb-4 text-error text-body-sm p-3 bg-error-container/20 rounded-lg">
                                    {saveError}
                                </div>
                            )}

                            <div className="flex gap-3 mt-8">
                                <button 
                                    onClick={onClose}
                                    className="flex-1 py-3 rounded-xl border border-outline text-on-surface font-label-md hover:bg-surface-variant transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleSave}
                                    disabled={!selectedTripId || isSaving || trips.length === 0}
                                    className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-label-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSaving ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        "Add to Trip"
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddToTripModal;
