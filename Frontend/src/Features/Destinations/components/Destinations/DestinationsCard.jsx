import { Link } from 'react-router-dom';

const DestinationCard = ({ destination }) => {
  const imageUrl = destination.images?.[0] || destination.image || '';
  const location = [destination.city, destination.state, destination.country].filter(Boolean).join(', ');

  return (
    <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative h-64 overflow-hidden bg-surface-container-high">
        {imageUrl ? (
          <img
            alt={destination.alt || destination.name || 'Destination image'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={imageUrl}
          />
        ) : (
          <div className="w-full h-full bg-surface-variant flex items-center justify-center text-label-sm text-on-surface-variant">
            No image available
          </div>
        )}

        <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full font-label-sm text-label-sm text-primary shadow-sm">
          {destination.category || 'Destination'}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4 inline-flex items-center rounded-full bg-primary-container/10 px-3 py-1 text-label-sm font-medium text-primary">
          {destination.category || 'Destination'}
        </div>

        <p className="font-label-sm text-label-sm text-on-surface-variant mb-2">{location}</p>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-3">{destination.name}</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">{destination.description}</p>

        <Link 
          to={`/destinations/${destination.id || destination._id}`}
          className="w-full bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded-lg hover:bg-primary transition-colors flex items-center justify-center"
        >
          View Guide
        </Link>
      </div>
    </article>
  );
};

export default DestinationCard
