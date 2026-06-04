import React from 'react';
import { Link } from 'react-router-dom';
import TopNavBar from '../../../../components/TopNavBar';
import { useAuth } from '../../../../hooks/useAuth';
import { ChevronRight, CalendarDays, Wallet, Map, User, Users, PlaneTakeoff, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DestinationContent = ({ destination }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <TopNavBar user={user?.fullName} />
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative w-full h-[614px] md:h-[819px] flex items-end pb-container-margin-desktop px-container-margin-mobile md:px-container-margin-desktop bg-cover bg-center"
          data-alt={`A breathtaking panoramic view of ${destination?.name || 'the destination'}`}
          style={{
            backgroundImage: `url("${destination?.images?.[0] || ''}")`
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <nav
              aria-label="Breadcrumb"
              className="flex text-on-primary/80 font-label-md text-label-md mb-4"
            >
              <ol className="flex items-center space-x-2">
                <li>
                  <Link className="hover:text-on-primary transition-colors" to="/destinations">
                    Destinations
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4" />
                </li>
                <li aria-current="page" className="text-on-primary capitalize">
                  {destination?.name}
                </li>
              </ol>
            </nav>
            <h1 className="font-display text-display text-on-primary mb-2 capitalize">
              {destination?.name}
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary/90 max-w-2xl">
              {destination?.description?.substring(0, 150)}{destination?.description?.length > 150 ? '...' : ''}
            </p>
          </div>
        </section>

        {/* Quick Facts Bar */}
        <div className="w-full bg-surface-container-lowest border-b border-surface-container px-container-margin-mobile md:px-container-margin-desktop py-6 shadow-sm relative z-20 -mt-6 rounded-t-xl max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter divide-y md:divide-y-0 md:divide-x divide-surface-variant">
            <div className="flex items-center gap-4 py-4 md:py-0 md:px-4">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Best Time
                </p>
                <p className="font-label-md text-label-md text-on-surface capitalize">
                  {destination?.bestTimeToVisit || "Year Round"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-4 md:py-0 md:px-4">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Estimated Budget
                </p>
                <p className="font-label-md text-label-md text-on-surface capitalize">
                  {destination?.estimatedBudget ? `₹${destination.estimatedBudget}` : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-4 md:py-0 md:px-4">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                <Map className="w-6 h-6" />
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Travel Style
                </p>
                <p className="font-label-md text-label-md text-on-surface capitalize">
                  {destination?.category || "General"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <section className="max-w-7xl mx-auto px-container-margin-mobile md:px-container-margin-desktop py-section-gap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-7 pr-0 lg:pr-12">
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6 capitalize">
                Discover {destination?.name}
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
                {destination?.description}
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                {destination?.tags?.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-4 py-2 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm capitalize">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 mt-8 lg:mt-0">
              <div
                className="rounded-xl overflow-hidden shadow-sm aspect-[4/5] bg-surface-variant"
                data-alt={`Detailed view of ${destination?.name}`}
                style={{
                  backgroundImage: `url("${destination?.images?.[1] || destination?.images?.[0] || ''}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              ></div>
            </div>
          </div>
        </section>

        {/* Explore Places CTA Banner */}
        <section className="max-w-7xl mx-auto px-container-margin-mobile md:px-container-margin-desktop py-8">
            <div className="bg-primary-container/10 rounded-2xl p-8 md:p-12 border border-primary-container/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2 capitalize">
                        Discover 12+ Hidden Gems in {destination?.name}
                    </h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                        Uncover the most iconic architectural marvels, beautiful viewpoints, and cultural spots handpicked just for you.
                    </p>
                </div>
                <button 
                    onClick={() => navigate(`/destinations/${destination?._id}/places`)}
                    className="shrink-0 px-8 py-4 bg-primary text-on-primary font-label-md text-label-md rounded-xl hover:bg-primary/90 hover:-translate-y-1 transition-all shadow-md flex items-center justify-center gap-2 w-full md:w-auto"
                >
                    Explore Places
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </section>

        {/* Curated Itineraries (Bento Grid Style) */}
        <section className="bg-surface-container-low py-section-gap">
          <div className="max-w-7xl mx-auto px-container-margin-mobile md:px-container-margin-desktop">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
                  Curated Itineraries
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant capitalize">
                  Tailored paths for your {destination?.name} adventure.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* Itinerary 1 */}
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_24px_rgba(0,101,145,0.04)] border border-surface-container hover:shadow-[0_8px_32px_rgba(0,101,145,0.08)] transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/20 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div>
                    <span className="inline-block px-3 py-1 bg-tertiary-container/30 text-on-tertiary-container rounded-full font-label-sm text-label-sm mb-3">
                      3 Days
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface">
                      The Solo Soul-Searcher
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <User className="w-5 h-5" />
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8 relative z-10">
                  A slower pace focusing on deep historical immersion and quiet corners. Perfect for reflection and photography.
                </p>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <p className="font-body-md text-body-md text-on-surface">
                      Day 1: Arrival & Local Exploration
                    </p>
                  </div>
                  <div className="h-[1px] w-full bg-surface-container" />
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <p className="font-body-md text-body-md text-on-surface">
                      Day 2: Heritage Walk & Sightseeing
                    </p>
                  </div>
                  <div className="h-[1px] w-full bg-surface-container" />
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <p className="font-body-md text-body-md text-on-surface">
                      Day 3: Hidden Gems & Departure
                    </p>
                  </div>
                </div>
                <button className="mt-8 w-full py-3 border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary/5 transition-colors relative z-10">
                  View Full Itinerary
                </button>
              </div>
              
              {/* Itinerary 2 */}
              <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_24px_rgba(0,101,145,0.04)] border border-surface-container hover:shadow-[0_8px_32px_rgba(0,101,145,0.08)] transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/20 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div>
                    <span className="inline-block px-3 py-1 bg-tertiary-container/30 text-on-tertiary-container rounded-full font-label-sm text-label-sm mb-3">
                      2 Days
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface">
                      The Group Heritage Trail
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8 relative z-10">
                  An active, highlights-driven tour maximizing time with quick rides between monuments and main attractions.
                </p>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <p className="font-body-md text-body-md text-on-surface">
                      Day 1: Highlights & Landmarks
                    </p>
                  </div>
                  <div className="h-[1px] w-full bg-surface-container" />
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <p className="font-body-md text-body-md text-on-surface">
                      Day 2: Markets & Local Culture
                    </p>
                  </div>
                </div>
                <button className="mt-[4.5rem] w-full py-3 border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary/5 transition-colors relative z-10">
                  View Full Itinerary
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-container-margin-mobile md:px-container-margin-desktop py-section-gap text-center">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6 capitalize">
            Ready to Explore {destination?.name}?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-2xl mx-auto">
            Start planning your journey or save this destination to your wishlist
            for later.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={() => navigate('/trips')}
              className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-2"
            >
              <PlaneTakeoff className="w-5 h-5" />
              Plan My Journey
            </button>
            <button 
              onClick={() => navigate('/trips')}
              className="w-full sm:w-auto px-8 py-4 border border-outline text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Save to My Trips
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DestinationContent;
