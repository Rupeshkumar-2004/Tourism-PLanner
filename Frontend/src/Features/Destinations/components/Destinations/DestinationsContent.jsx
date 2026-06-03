import React from "react";
import DestinationCard from "./DestinationsCard.jsx";
import DestinationEmpty from "./DestinationsEmpty.jsx";

import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";

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

const DestinationContent = ({ destinations = [], pagination, setPage, page, search, setSearch, category, setCategory, isLoading }) => {
  const filterScrollRef = React.useRef(null);

  const [localSearch, setLocalSearch] = React.useState(search || '');

  React.useEffect(() => {
    setLocalSearch(search || '');
  }, [search]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (localSearch !== search) {
        setSearch(localSearch);
        setPage(1);
      }
    }
  };

  const filters = standardFilters.filter(f => f !== 'All' && f !== 'Historical');

  const handleSearchChange = (e) => {
    e.preventDefault();
    setLocalSearch(e.target.value);
  };

  const clearSearch = (e) => {
    e.preventDefault();
    setLocalSearch('');
    if (search !== '') {
        setSearch('');
        setPage(1);
    }
  };

  const handleCategoryChange = (e, filter) => {
    e.preventDefault();
    setCategory(filter);
    setPage(1);
  };

  const scrollFilters = (direction) => {
    if (filterScrollRef.current) {
      const scrollAmount = 300;
      filterScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const renderPaginationNumbers = () => {
    if (!pagination) return null;
    const total = pagination.totalPages;
    const current = pagination.page || page;
    const pages = [];

    const addPage = (num) => {
      pages.push(
        <button
          key={num}
          onClick={() => setPage(num)}
          className={`w-10 h-10 flex items-center justify-center rounded-xl font-label-md transition-all duration-200 ${current === num
            ? 'bg-primary text-white shadow-md'
            : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
            }`}
        >
          {num}
        </button>
      );
    };

    const addEllipsis = (key) => {
      pages.push(
        <span key={key} className="w-8 flex items-center justify-center text-on-surface-variant/50">
          ...
        </span>
      );
    };

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        addPage(i);
      }
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 4; i++) addPage(i);
        addEllipsis('ell1');
        addPage(total);
      } else if (current >= total - 2) {
        addPage(1);
        addEllipsis('ell1');
        for (let i = total - 3; i <= total; i++) addPage(i);
      } else {
        addPage(1);
        addEllipsis('ell1');
        addPage(current - 1);
        addPage(current);
        addPage(current + 1);
        addEllipsis('ell2');
        addPage(total);
      }
    }
    return pages;
  };

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md antialiased pb-24 md:pb-0 min-h-screen">
      <main className="max-w-[1440px] mx-auto px-5 md:px-12 pt-12 pb-16">
        {/* Hero Section */}
        <section className="mb-16 flex flex-col items-center text-center">
          <h1 className="font-display text-display text-on-surface mb-4">Explore India</h1>
          <p className="text-body-lg text-on-surface-variant mb-10 max-w-2xl">
            Discover the vibrant culture, rich heritage, and breathtaking landscapes of Incredible India.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl bg-surface-container-lowest rounded-full shadow-ambient hover:shadow-ambient-hover transition-shadow duration-300 border border-outline-variant/30 p-2 pl-6 pr-4 mb-8 flex items-center gap-3">
            <Search className="text-primary/70" size={24} />
            <input
              id="search-destinations"
              type="text"
              value={localSearch}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Search destinations (Press Enter to search)..."
              className="flex-1 bg-transparent border-none outline-none py-3 text-body-lg text-on-surface placeholder:text-on-surface-variant/60 focus:ring-0"
            />
            {localSearch && (
              <button
                onClick={clearSearch}
                className="p-2 bg-surface-variant/50 rounded-full text-on-surface-variant hover:text-primary transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Filter Carousel */}
          <div className="w-full max-w-4xl relative group">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

            <button
              onClick={() => scrollFilters('left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-surface-container-lowest shadow-md rounded-full border border-outline-variant/50 text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Filter Buttons Container */}
            <div
              ref={filterScrollRef}
              className="flex items-center gap-3 overflow-x-hidden scroll-smooth py-2 px-4"
            >
              <button
                onClick={() => handleCategoryChange('')}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full font-label-md transition-all duration-300 flex-shrink-0 ${!category || category === 'All'
                  ? 'bg-primary text-white shadow-md scale-105'
                  : 'bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-variant'
                  }`}
              >
                All
              </button>
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleCategoryChange(filter)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full font-label-md transition-all duration-300 flex-shrink-0 ${filter === category
                    ? 'bg-primary text-white shadow-md scale-105'
                    : 'bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-variant'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollFilters('right')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-surface-container-lowest shadow-md rounded-full border border-outline-variant/50 text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </section>

        {/* Destination Grid */}
        <section className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16 transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          {destinations.length === 0 && !isLoading ? (
            <div className="col-span-full">
              <DestinationEmpty />
            </div>
          ) : destinations.length === 0 && isLoading ? (
            <div className="col-span-full flex justify-center py-12">
               <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            destinations.map((destination) => (
              <DestinationCard key={destination.id || destination._id} destination={destination} />
            ))
          )}
        </section>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-2 shadow-sm">
              <button
                disabled={!pagination.hasPrevPage}
                onClick={() => setPage(Math.max(1, (page || pagination.page) - 1))}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl font-label-md transition-all duration-200 ${pagination.hasPrevPage
                  ? 'text-on-surface-variant hover:bg-surface-variant hover:text-primary cursor-pointer'
                  : 'text-on-surface-variant/30 cursor-not-allowed'
                  }`}
              >
                <ChevronLeft size={18} />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <div className="flex items-center gap-1 px-2">
                {renderPaginationNumbers()}
              </div>

              <button
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((page || pagination.page) + 1)}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl font-label-md transition-all duration-200 ${pagination.hasNextPage
                  ? 'text-on-surface-variant hover:bg-surface-variant hover:text-primary cursor-pointer'
                  : 'text-on-surface-variant/30 cursor-not-allowed'
                  }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default DestinationContent;
