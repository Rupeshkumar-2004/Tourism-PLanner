import TopNavBar from "../../../../components/TopNavBar";
import TripHero from "./TripHero";
import ItineraryTimeline from "./ItineraryTimeline";
import TripSidebar from "./TripSidebar";
import { useAuth } from "../../../../hooks/useAuth";

const TripDetailContent = ({ trip, refetchTrip }) => {
    const { user } = useAuth();
    return (
        <div className="min-h-screen bg-surface font-body-md text-on-surface">
            {/* Top Navigation */}
            <div className="fixed top-0 w-full z-50">
                <TopNavBar user={user?.fullName} />
            </div>

            {/* Hero Section */}
            <TripHero trip={trip} />

            {/* Main Content */}
            <main className="max-w-[1440px] mx-auto px-container-margin-mobile md:px-container-margin-desktop -mt-24 relative z-10 pb-section-gap">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: Overview & Itinerary */}
                    <div className="lg:w-2/3 space-y-8">
                        {/* Trip Overview Card */}
                        <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-8 border border-outline-variant/70">
                            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Journey Overview</h2>
                            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                                {trip.description || "No description provided for this journey."}
                            </p>
                        </div>

                        {/* Itinerary Timeline */}
                        <ItineraryTimeline trip={trip} refetchTrip={refetchTrip} />
                    </div>

                    {/* Right Column: Sidebar */}
                    <aside className="lg:w-1/3">
                        <TripSidebar trip={trip} />
                    </aside>

                </div>
            </main>
        </div>
    );
};

export default TripDetailContent;
