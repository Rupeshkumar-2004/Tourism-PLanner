import React from "react";
import TopNavBar from "../../../components/TopNavBar.jsx"
import { useAuth } from "../../../hooks/useAuth.js";
import InputField from "../../../components/UI/InputField.jsx";
import DestinationCard from "./DestinationCard.jsx";
import DestinationEmpty from "./DestinationEmpty.jsx";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const standardFilters = [
  'All',
  'Historical',
  'Beach',
  'Adventure',
  'Nature',
  'Solo',
  'Group',
  'Coastal',
  'Mountains',
  'Heritage',
];

const DestinationContent = ({ destinations = [], pagination, setPage, page, search, setSearch, category, setCategory }) => {
  const { user } = useAuth();
  const filterScrollRef = React.useRef(null);

  const filters = standardFilters.filter(f => f !== 'All' && f !== 'Historical');

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (filter) => {
    setCategory(filter);
    setPage(1);
  };

  const scrollFilters = (direction) => {
    if (filterScrollRef.current) {
      const scrollAmount = 200;
      filterScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md antialiased pb-24 md:pb-0 min-h-screen">
      <TopNavBar user={user?.fullName} />


      <main className="max-w-[1440px] mx-auto px-5 md:px-12 pt-8 pb-16">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="font-display text-display text-on-surface mb-6">Explore India</h1>

          {/* Search Bar */}
          <div className="bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 p-4 mb-6 max-w-4xl">
            <div className="flex-1 relative flex items-center">
              <InputField
                id="search-destinations"
                label="Destinations"
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search Destinations"
                icon={Search}
              />
            </div>
          </div>

          {/* Filter Carousel */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => scrollFilters('left')}
              className="flex-shrink-0 p-2 rounded-lg border border-outline-variant/50 hover:bg-surface-container-low transition-colors"
            >
              <ChevronLeft size={20} className="text-on-surface-variant" />
            </button>

            {/* Filter Buttons Container */}
            <div
              ref={filterScrollRef}
              className="flex items-center gap-2 overflow-x-hidden flex-1 scroll-smooth"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleCategoryChange(filter)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full font-label-md text-label-md transition-colors flex-shrink-0 ${filter === category
                      ? 'bg-primary-container/10 text-primary'
                      : 'bg-surface border border-outline-variant text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollFilters('right')}
              className="flex-shrink-0 p-2 rounded-lg border border-outline-variant/50 hover:bg-surface-container-low transition-colors"
            >
              <ChevronRight size={20} className="text-on-surface-variant" />
            </button>
          </div>
        </section>

        {/* Destination Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {destinations.length === 0 ? (
            <DestinationEmpty />
          ) : (
            destinations.map((destination) => (
              <DestinationCard key={destination.id || destination._id} destination={destination} />
            ))
          )}
        </section>

        {/* Pagination */}
        {pagination && (
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-4 shadow-sm">
              <button
                disabled={!pagination.hasPrevPage}
                onClick={() => setPage(Math.max(1, (page || pagination.page) - 1))}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-label-md transition-all duration-200 ${pagination.hasPrevPage
                    ? 'bg-primary-container/10 text-primary hover:bg-primary-container/20 active:bg-primary-container/30 cursor-pointer'
                    : 'bg-surface-variant/30 text-on-surface-variant/50 cursor-not-allowed'
                  }`}
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Page</span>
                <span className="font-headline-sm text-headline-sm text-primary">{pagination.page}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">of</span>
                <span className="font-headline-sm text-headline-sm text-primary">{pagination.totalPages}</span>
              </div>

              <button
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((page || pagination.page) + 1)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-label-md transition-all duration-200 ${pagination.hasNextPage
                    ? 'bg-primary-container/10 text-primary hover:bg-primary-container/20 active:bg-primary-container/30 cursor-pointer'
                    : 'bg-surface-variant/30 text-on-surface-variant/50 cursor-not-allowed'
                  }`}
              >
                <span>Next</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default DestinationContent
