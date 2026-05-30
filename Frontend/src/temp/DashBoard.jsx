import {Plus,Compass,Bookmark,Trophy,Star,Users,User,} from 'lucide-react';
import TopNavBar from '../components/TopNavBar';
import GuideCard from '../components/UI/GuideCard';

export default function SkyVoyageDashboard() {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen pb-section-gap">
      <TopNavBar />

      {/* Main Content Canvas */}
      <main className="px-container-margin-mobile md:px-container-margin-desktop pt-12 max-w-[1440px] mx-auto">
        {/* Hero Section */}
        <header className="mb-section-gap">
          <h1 className="font-display text-display text-on-surface mb-2">
            Welcome back, Rupesh!
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Where will your next adventure take you?
          </p>
        </header>

        {/* Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gutter mb-section-gap">
          {/* Stat 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary-fixed rounded-lg text-primary">
                <Compass size={20} />
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Destinations Explored
              </span>
            </div>
            <div className="font-headline-lg text-headline-lg text-on-surface">
              24
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-tertiary-fixed rounded-lg text-tertiary">
                <Bookmark size={20} />
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Guides Saved
              </span>
            </div>
            <div className="font-headline-lg text-headline-lg text-on-surface">
              15
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-secondary-fixed rounded-lg text-secondary">
                <Trophy size={20} />
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Traveler Rank
              </span>
            </div>
            <div className="font-headline-lg text-headline-lg text-on-surface">
              Gold
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary-fixed rounded-lg text-primary">
                <Star size={20} fill="currentColor" />
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Points Earned
              </span>
            </div>
            <div className="font-headline-lg text-headline-lg text-on-surface">
              4,200
            </div>
          </div>
        </section>

        {/* Suggested Section */}
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

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Guide Card 1 */}
            <GuideCard
              title="Royal Jaipur Heritage"
              description="Best for heritage walks, exploring historic forts, and experiencing majestic royal architecture."
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuAyjoWGUBeltbo9w_OtHlMGaY3q-NDy4x9XHt5mWnoyEyipl8Y0unW-LBpRMrqyJoexqEXprzpNGeHwIQuM2M40ApAqrlcdruxDENsKyxgqJBaw9cB2knGMm0YrchiMpsBTJZ356MMfN2P3_cNTjKRnDDiMXcYy6lmsvXxlwBq_J3orfdS7a0DKo8Dl4wXoeQvuW8Z9Fmedq6_5eJxAJcmK2qRS3MDiZ1xeLDh8O51ENf7XwmICcxZIoiBrLL2aCjOYIFlNEnIoaAH9"
              imageAlt="Hawa Mahal, Jaipur"
              badge="Group"
              BadgeIcon={Users}
            />

            {/* Guide Card 2 */}
            <GuideCard
              title="Kerala Backwaters"
              description="Best for peaceful houseboat stays, Ayurvedic retreats, and lush green tropical landscapes."
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuBW5HzesNueTDB4nSCn6yQn3p4KRf2OX_DUSt4pvVRwuoqs8yjBJHBaTlwneV6tWmNjxr0yZke0-VKIr7hOe_8dMxfksrPuPvAhFxBEaoEjhMga6bsDOhjChOsE6RTn5T99Bs6J_JqalVH_ipExU2VAIGYic4b54Y8Ci7QCy8Yf3l042V7rRCFqSrUwdjroeqkJBJRFDjLQNwWm8fMJPWMRipZKAaw2lqwiUeheHB0_id6nlJpB1HgNnjDWAy2Lw6j6mmDN05dqaF1u"
              imageAlt="Kerala Backwaters"
              badge="Solo"
              BadgeIcon={User}
            />

            {/* Guide Card 3 */}
            <GuideCard
              title="Spiritual Varanasi"
              description="Best for profound spiritual experiences, morning boat rides, and the grand evening Aarti ceremonies."
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuB7YqBR6FZ06fwfIcLNVwxEk6dB2vUNaF-gKCtgNrxIBhe2AkpXA9Gq7cPVwakGbLLgjPJECD5Ey5Xed_-AymbrigjPzhprCLHc86L7DzGshlvby5MfhjP57r6IFeJhJ36qdi5-GD96ZReEbga2AUfnxeLXUdKRxTL4BCMYhaVqMzP7-Bk0ekWOAu9957poVG7MNev9BcIanZW7fA3fSmHbvfQOfGX7TwL3y34XGxcWDhFvsGzokbcIpIAqAUxbjT-9jHmQx9iEM-vR"
              imageAlt="Varanasi Ghats"
              badge="Group"
              BadgeIcon={Users}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
