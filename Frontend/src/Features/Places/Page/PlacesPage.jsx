import { useParams, Link } from 'react-router-dom';
import TopNavBar from '../../../components/TopNavBar.jsx';
import { useAuth } from '../../../hooks/useAuth.js';
import useDestination from '../../Destinations/hooks/useDestination.js';
import PlacesGrid from '../components/PlacesGrid.jsx';
import { ChevronRight, Map, CloudSun } from 'lucide-react';

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
                    {/* Weather Placeholder */}
                    <div className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px] shadow-sm text-center">
                        <CloudSun className="w-12 h-12 text-outline mb-4 opacity-50" />
                        <h3 className="font-headline-md text-headline-md text-on-surface-variant opacity-70 mb-2">Weather Integration</h3>
                        <p className="text-label-md text-outline">Coming soon</p>
                    </div>

                    {/* Map Placeholder */}
                    <div className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px] shadow-sm text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-surface-variant opacity-30"></div>
                        <Map className="w-12 h-12 text-outline mb-4 opacity-50 relative z-10" />
                        <h3 className="font-headline-md text-headline-md text-on-surface-variant opacity-70 mb-2 relative z-10">Interactive Region Map</h3>
                        <p className="text-label-md text-outline relative z-10">Coming soon</p>
                    </div>
                </div>

                {/* Places Grid Component (Handles its own loading and fetching) */}
                <PlacesGrid destinationId={destinationId} />

            </main>
        </div>
    );
};

export default PlacesPage;
