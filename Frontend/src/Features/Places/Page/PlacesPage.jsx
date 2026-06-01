import { useParams, Link } from 'react-router-dom';
import TopNavBar from '../../../components/TopNavBar.jsx';
import { useAuth } from '../../../hooks/useAuth.js';
import useDestination from '../../Destinations/hooks/useDestination.js';
import PlacesGrid from '../components/PlacesGrid.jsx';
import WeatherWidget from '../components/WeatherWidget.jsx';
import InteractiveMapWrapper from '../components/InteractiveMapWrapper.jsx';
import { ChevronRight } from 'lucide-react';

const PlacesPage = () => {
    const { user } = useAuth();
    const { destinationId } = useParams();
    const { destination, isLoading } = useDestination(destinationId);

    return (
        <div className="bg-background text-on-surface min-h-screen flex flex-col">
            <TopNavBar user={user?.fullName} />
            <main className="flex-grow max-w-7xl mx-auto w-full px-container-margin-mobile md:px-container-margin-desktop py-8">

                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="flex text-on-surface-variant font-label-sm text-label-sm mb-6">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <Link className="hover:text-primary transition-colors" to="/destinations">Destinations</Link>
                        </li>
                        <li><ChevronRight className="w-4 h-4" /></li>
                        <li>
                            <Link className="hover:text-primary transition-colors capitalize" to={`/destinations/${destinationId}`}>
                                {isLoading ? "..." : destination?.name}
                            </Link>
                        </li>
                        <li><ChevronRight className="w-4 h-4" /></li>
                        <li aria-current="page" className="text-on-surface font-semibold">Places</li>
                    </ol>
                </nav>

                {/* Header */}
                <header className="mb-12">
                    <h1 className="font-headline-lg text-headline-lg md:text-display text-on-surface mb-2 capitalize">
                        Must-Visit Places in {isLoading ? "..." : destination?.name}
                    </h1>
                    <p className="text-body-lg text-on-surface-variant max-w-2xl">
                        Discover the timeless grandeur and beautiful hidden gems of this incredible destination.
                    </p>
                </header>

                {/* Weather and Map Placeholders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-12">
                    {/* Weather Integration */}
                    <WeatherWidget destinationId={destinationId} />

                    {/* Map Integration */}
                    <InteractiveMapWrapper destinationId={destinationId} />
                </div>

                {/* Places Grid Component (Handles its own loading and fetching) */}
                <PlacesGrid destinationId={destinationId} />

            </main>
        </div>
    );
};

export default PlacesPage;
