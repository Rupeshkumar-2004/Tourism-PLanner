
import usePlaces from '../hooks/usePlaces';
import InteractiveMap from './InteractiveMap';

const InteractiveMapWrapper = ({ destinationId }) => {
    const { places, isLoading, error } = usePlaces(destinationId);

    if (isLoading) {
        return <div className="min-h-[300px] w-full bg-surface-variant/20 rounded-2xl animate-pulse"></div>;
    }

    if (error) {
        return (
            <div className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] shadow-sm text-center">
                <p className="text-error">{error}</p>
            </div>
        );
    }

    return <InteractiveMap places={places} />;
};

export default InteractiveMapWrapper;
