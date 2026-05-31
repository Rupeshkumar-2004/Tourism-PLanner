import { useParams } from "react-router-dom";
import useDestination from "../hooks/useDestination";
import DestinationSkeleton from "../components/SingleDestination/DestinationSkeleton";
import DestinationError from "../components/SingleDestination/DestinationError";
import DestinationContent from "../components/SingleDestination/DestinationContent";
import DestinationEmpty from "../components/SingleDestination/DestinationEmpty";

const DestinationPage = () => {
    const { destinationId } = useParams();
    const { destination, isLoading, error, refetchDestination } = useDestination(destinationId);

    if (isLoading) return <DestinationSkeleton />
    if (error) return <DestinationError onRetry={refetchDestination} />
    if (!destination) return <DestinationEmpty />

    return (
        <DestinationContent destination={destination} />
    )
}

export default DestinationPage; 