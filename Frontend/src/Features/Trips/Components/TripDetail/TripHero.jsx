import { CalendarDays, MapPin } from "lucide-react";

const TripHero = ({ trip }) => {
    const formatDate = (date) => {
        if (!date) return null;
        const parsedDate = new Date(date);
        if (Number.isNaN(parsedDate.getTime())) return null;
        return parsedDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const startDate = formatDate(trip.startDate);
    const endDate = formatDate(trip.endDate);
    const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : startDate || "Date not planned";

    return (
        <div className="relative h-[50vh] min-h-[400px] w-full mt-[72px]">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={trip.bannerImage || trip.image || "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80"}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 backdrop-blur-[2px]"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end pb-32">
                <div className="max-w-[1440px] w-full mx-auto px-container-margin-mobile md:px-container-margin-desktop">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="bg-primary text-on-primary px-3 py-1.5 rounded-full font-label-md text-label-md shadow-sm">
                            {trip.category ? trip.category.charAt(0).toUpperCase() + trip.category.slice(1) : 'Journey'}
                        </span>
                        <span className="bg-surface/20 text-surface backdrop-blur-md px-3 py-1.5 rounded-full font-label-md text-label-md border border-surface/30">
                            {trip.type || 'Solo'}
                        </span>
                        <span className="bg-surface/20 text-surface backdrop-blur-md px-3 py-1.5 rounded-full font-label-md text-label-md border border-surface/30">
                            {trip.status || 'Planned'}
                        </span>
                    </div>

                    <h1 className="font-display text-display text-surface mb-4 max-w-4xl drop-shadow-md">
                        {trip.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-surface/90 font-body-lg text-body-lg">
                        <div className="flex items-center gap-2">
                            <CalendarDays size={20} className="text-primary-container" />
                            <span>{dateRange}</span>
                        </div>
                        {trip.destination && (
                            <div className="flex items-center gap-2">
                                <MapPin size={20} className="text-primary-container" />
                                <span>{trip.destination}</span>
                            </div>
                        )}
                        {trip.totalBudget > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px] text-primary-container">
                                    account_balance_wallet
                                </span>
                                <span>₹{trip.totalBudget.toLocaleString('en-IN')} Est. Budget</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripHero;
