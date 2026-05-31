
import { UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

function GuideCard({ id, title, description, image, imageAlt, badge, BadgeIcon }) {
  const Icon = BadgeIcon || UserRound;
  const cardTitle = title || 'Travel Guide';
  const cardDescription =
    description || 'Explore curated routes, places, and travel ideas for your next journey.';
  const cardBadge = badge || 'Guide';

  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-ambient transition-all duration-300 hover:shadow-ambient-hover group cursor-pointer border border-transparent hover:border-outline-variant/30 flex flex-col h-full">
      <div className="h-48 relative overflow-hidden bg-surface-container">
        {image ? (
          <img
            alt={imageAlt || cardTitle}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={image}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary-container text-primary transition-transform duration-700 group-hover:scale-105">
            <Icon size={54} />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full text-primary font-label-sm text-label-sm border border-outline-variant/20 shadow-sm flex items-center gap-1">
          <Icon size={14} />
          {cardBadge}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-2 group-hover:text-primary transition-colors">
          {cardTitle}
        </h3>
        <p className="text-on-surface-variant font-body-md text-body-md mb-6 flex-grow">
          {cardDescription}
        </p>
        <div className="mt-auto pt-4 border-t border-outline-variant/30">
          <Link 
            to={id ? `/destinations/${id}` : '#'}
            className="w-full bg-primary text-on-primary hover:bg-primary/90 transition-colors py-2.5 rounded-lg font-label-md text-label-md flex justify-center items-center gap-2"
          >
            View Guide
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GuideCard;
