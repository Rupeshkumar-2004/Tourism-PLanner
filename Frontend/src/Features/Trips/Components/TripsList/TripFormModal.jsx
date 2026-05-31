import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useTripMutations } from "../../hooks/useTripMutations";

const TripFormModal = ({ isOpen, onClose, onSuccess, initialData = null }) => {
    const isEdit = Boolean(initialData);
    const { createTrip, updateTrip, isLoading, error } = useTripMutations(onSuccess);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "other",
        startDate: "",
        endDate: "",
        totalBudget: ""
    });

    useEffect(() => {
        if (initialData && isOpen) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                category: initialData.category || "other",
                startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : "",
                endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : "",
                totalBudget: initialData.totalBudget || ""
            });
        } else if (!isOpen) {
            setFormData({
                title: "",
                description: "",
                category: "other",
                startDate: "",
                endDate: "",
                totalBudget: ""
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            ...formData,
            totalBudget: Number(formData.totalBudget)
        };

        let success = false;
        if (isEdit) {
            success = await updateTrip(initialData.id || initialData._id, payload);
        } else {
            success = await createTrip(payload);
        }

        if (success) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-surface-container-lowest rounded-xl shadow-lg w-full max-w-lg overflow-hidden border border-surface-container">
                <div className="flex items-center justify-between p-6 border-b border-surface-container-low">
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                        {isEdit ? "Edit Journey" : "Plan New Journey"}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-error-container text-on-error-container rounded-lg font-label-sm text-label-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="font-label-md text-label-md text-on-surface">Trip Title</label>
                        <input 
                            type="text" 
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="e.g., Summer in Europe"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="font-label-md text-label-md text-on-surface">Description (Optional)</label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={2}
                            className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                            placeholder="Brief notes about this trip..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="font-label-md text-label-md text-on-surface">Category</label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            >
                                <option value="adventure">Adventure</option>
                                <option value="heritage">Heritage</option>
                                <option value="nature">Nature</option>
                                <option value="city">City</option>
                                <option value="relaxation">Relaxation</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="font-label-md text-label-md text-on-surface">Total Budget (₹)</label>
                            <input 
                                type="number" 
                                name="totalBudget"
                                value={formData.totalBudget}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="font-label-md text-label-md text-on-surface">Start Date</label>
                            <input 
                                type="date" 
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                                className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="font-label-md text-label-md text-on-surface">End Date</label>
                            <input 
                                type="date" 
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                                min={formData.startDate}
                                className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="px-5 py-2 rounded-lg font-label-md text-label-md bg-primary text-on-primary hover:bg-surface-tint transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Saving..." : isEdit ? "Save Changes" : "Create Trip"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TripFormModal;
