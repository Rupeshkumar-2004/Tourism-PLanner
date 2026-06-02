import { Plus, UserRound, Users } from 'lucide-react';
import GuideCard from './GuideCard.jsx';

const defaultGuides = [
  {
    id: 'royal-jaipur-heritage',
    title: 'Royal Jaipur Heritage',
    description:
      'Best for heritage walks, exploring historic forts, and experiencing majestic royal architecture.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAyjoWGUBeltbo9w_OtHlMGaY3q-NDy4x9XHt5mWnoyEyipl8Y0unW-LBpRMrqyJoexqEXprzpNGeHwIQuM2M40ApAqrlcdruxDENsKyxgqJBaw9cB2knGMm0YrchiMpsBTJZ356MMfN2P3_cNTjKRnDDiMXcYy6lmsvXxlwBq_J3orfdS7a0DKo8Dl4wXoeQvuW8Z9Fmedq6_5eJxAJcmK2qRS3MDiZ1xeLDh8O51ENf7XwmICcxZIoiBrLL2aCjOYIFlNEnIoaAH9',
    imageAlt: 'Hawa Mahal, Jaipur',
    badge: 'Group',
  },
  {
    id: 'kerala-backwaters',
    title: 'Kerala Backwaters',
    description:
      'Best for peaceful houseboat stays, Ayurvedic retreats, and lush green tropical landscapes.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBW5HzesNueTDB4nSCn6yQn3p4KRf2OX_DUSt4pvVRwuoqs8yjBJHBaTlwneV6tWmNjxr0yZke0-VKIr7hOe_8dMxfksrPuPvAhFxBEaoEjhMga6bsDOhjChOsE6RTn5T99Bs6J_JqalVH_ipExU2VAIGYic4b54Y8Ci7QCy8Yf3l042V7rRCFqSrUwdjroeqkJBJRFDjLQNwWm8fMJPWMRipZKAaw2lqwiUeheHB0_id6nlJpB1HgNnjDWAy2Lw6j6mmDN05dqaF1u',
    imageAlt: 'Kerala Backwaters',
    badge: 'Solo',
  },
  {
    id: 'spiritual-varanasi',
    title: 'Spiritual Varanasi',
    description:
      'Best for profound spiritual experiences, morning boat rides, and the grand evening Aarti ceremonies.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7YqBR6FZ06fwfIcLNVwxEk6dB2vUNaF-gKCtgNrxIBhe2AkpXA9Gq7cPVwakGbLLgjPJECD5Ey5Xed_-AymbrigjPzhprCLHc86L7DzGshlvby5MfhjP57r6IFeJhJ36qdi5-GD96ZReEbga2AUfnxeLXUdKRxTL4BCMYhaVqMzP7-Bk0ekWOAu9957poVG7MNev9BcIanZW7fA3fSmHbvfQOfGX7TwL3y34XGxcWDhFvsGzokbcIpIAqAUxbjT-9jHmQx9iEM-vR',
    imageAlt: 'Varanasi Ghats',
    badge: 'Group',
  },
];

const firstFilledValue = (...values) =>
  values.find((value) => typeof value === 'string' && value.trim().length > 0);

const SuggestionGuideSection = ({ guides = [] }) => {
  const guideList = Array.isArray(guides)
    ? guides
    : Array.isArray(guides?.guides)
      ? guides.guides
      : Array.isArray(guides?.data)
        ? guides.data
        : [];

  const visibleGuides =
    guideList.length > 0
      ? guideList.map((guideData, index) => {
          const guide = guideData || {};
          const fallback = defaultGuides[index % defaultGuides.length];
          const guideName =
            guide.fullName ||
            guide.title ||
            guide.name ||
            guide.destination ||
            guide.destinationName ||
            guide.placeName ||
            guide.city ||
            fallback.title;
          const badge = guide.badge || guide.type || guide.category || fallback.badge;
          const image = firstFilledValue(
            guide.image,
            guide.coverImage,
            guide.imageUrl,
            guide.photoUrl,
            guide.thumbnail,
            guide.ProfilePicture,
            guide.profilePicture,
            fallback.image,
          );

          return {
            id: guide._id || guide.id || fallback.id,
            title: guideName,
            description:
              guide.description ||
              `${guideName} can help you plan a journey that matches your travel style.`,
            image,
            imageAlt: guide.imageAlt || guide.alt || guideName,
            badge,
            BadgeIcon: badge === 'Group' ? Users : UserRound,
            email: guide.email,
            phone: guide.phone,
          };
        })
      : defaultGuides.map((guide) => ({
          ...guide,
          BadgeIcon: guide.badge === 'Group' ? Users : UserRound,
        }));

  return (
    <section>
      <div className="flex justify-between items-end mb-8 border-b border-outline-variant pb-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Suggested for You
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Curated travel guides based on your preferences.
          </p>
        </div>
        <button className="bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-colors px-6 py-3 rounded-lg font-label-md text-label-md flex items-center gap-2 shadow-sm">
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
            email={guide.email}
            phone={guide.phone}
          />
        ))}
      </div>
    </section>
  );
};

export default SuggestionGuideSection;
