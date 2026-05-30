export default function DashboardSkeleton() {
  return (
    <div className="light min-h-screen pb-16">
      {/* TopNavBar */}
      <nav className="bg-surface shadow-sm sticky top-0 z-50 flex justify-between items-center w-full px-5 md:px-12 h-16">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full skeleton-item"></div>
            <div className="h-6 w-32 skeleton-item"></div>
          </div>
          <div className="hidden md:flex items-center gap-6 ml-8">
            <div className="h-4 w-20 skeleton-item"></div>
            <div className="h-4 w-20 skeleton-item"></div>
            <div className="h-4 w-20 skeleton-item"></div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full skeleton-item"></div>
          <div className="h-8 w-8 rounded-full skeleton-item"></div>
          <div className="h-8 w-8 rounded-full skeleton-item"></div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="px-5 md:px-12 pt-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <header className="mb-16">
          <div className="h-12 w-1/2 skeleton-item mb-4"></div>
          <div className="h-6 w-1/3 skeleton-item"></div>
        </header>

        {/* Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg skeleton-item"></div>
                <div className="h-4 w-24 skeleton-item"></div>
              </div>
              <div className="h-8 w-16 skeleton-item"></div>
            </div>
          ))}
        </section>

        {/* Suggested Section */}
        <section>
          <div className="flex justify-between items-end mb-8 border-b border-outline-variant pb-4">
            <div>
              <div className="h-8 w-48 skeleton-item mb-2"></div>
              <div className="h-4 w-64 skeleton-item"></div>
            </div>
            <div className="h-12 w-40 skeleton-item rounded-lg"></div>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((card) => (
              <div key={card} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-ambient h-full">
                <div className="h-48 skeleton-item"></div>
                <div className="p-6">
                  <div className="h-6 w-3/4 skeleton-item mb-4"></div>
                  <div className="h-4 w-full skeleton-item mb-2"></div>
                  <div className="h-4 w-5/6 skeleton-item mb-6"></div>
                  <div className="h-10 w-full skeleton-item rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { background-color: #e2e8f0; }
          50% { background-color: #cbd5e1; }
        }
        .skeleton-item {
          animation: skeleton-pulse 1.5s ease-in-out infinite;
          border-radius: 0.25rem;
        }
        .shadow-ambient {
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 0 3px -1px rgba(15, 23, 42, 0.02);
        }
      `}</style>
    </div>
  );
}
