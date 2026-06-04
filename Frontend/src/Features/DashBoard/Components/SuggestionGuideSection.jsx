import { Plus, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GuideCard from './GuideCard.jsx';

const SuggestionGuideSection = ({ guides = [] }) => {
  const navigate = useNavigate();

  // Ensure guides is an array
  const guideList = Array.isArray(guides) ? guides : Array.isArray(guides?.data) ? guides.data : [];

  const visibleGuides = guideList.map((place) => {
    const placeName = place.name || place.city || 'Unknown Destination';
    const image = place.images?.[0] || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop';

    return {
      id: place._id,
      title: placeName,
      description: place.description || `Discover the best places to visit, stay, and explore in ${placeName}.`,
      image: image,
      imageAlt: `${placeName} destination view`,
      badge: place.category || 'Destination',
      BadgeIcon: MapPin,
    };
  });

  return (
    <section>
      <div className="flex justify-between items-end mb-8 border-b border-outline-variant pb-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Suggested Destinations
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Curated places to inspire your next adventure.
          </p>
        </div>
        <button
          onClick={() => navigate('/trips')}
          className="bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-colors px-6 py-3 rounded-lg font-label-md text-label-md flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} />
          Plan New Journey
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {visibleGuides.map((guide) => (
          <GuideCard
            key={guide.id}
            id={guide.id}
            title={guide.title}
            description={guide.description}
            image={guide.image}
            imageAlt={guide.imageAlt}
            badge={guide.badge}
            BadgeIcon={guide.BadgeIcon}
          />
        ))}
      </div>
    </section>
  );
};

export default SuggestionGuideSection;
