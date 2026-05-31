const SkeletonItem = ({ className = "" }) => (
  <div className={`skeleton-item ${className}`} aria-hidden="true" />
);

const SkeletonTripCard = ({ compact = false }) => (
  <article className="bg-surface-container-lowest rounded-xl shadow-ambient flex flex-col overflow-hidden border border-outline-variant/70">
    <div className="h-[220px] w-full bg-surface-container relative overflow-hidden">
      <SkeletonItem className="h-full w-full rounded-none" />
      <div className="absolute top-4 right-4 rounded-full bg-surface-container-lowest/90 px-3 py-1.5 shadow-sm">
        <SkeletonItem className="h-4 w-20 rounded-full" />
      </div>
    </div>

    <div className="p-6 flex flex-col flex-grow gap-4">
      <div className="flex items-center justify-between gap-3">
        <SkeletonItem className="h-6 w-16 rounded-full" />
        <SkeletonItem className="h-4 w-24 rounded-full" />
      </div>

      <div>
        <SkeletonItem className={`h-7 ${compact ? "w-2/3" : "w-3/4"} rounded-md mb-3`} />
        <SkeletonItem className="h-5 w-56 max-w-full rounded-full" />
      </div>

      <div className="space-y-2">
        <SkeletonItem className="h-4 w-full rounded-full" />
        <SkeletonItem className="h-4 w-4/5 rounded-full" />
      </div>

      <div className="mt-auto pt-4 border-t border-outline-variant flex justify-between items-center">
        <SkeletonItem className="h-5 w-24 rounded-full" />
      </div>
    </div>
  </article>
);

export default function TripSkeleton() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md pb-section-gap">
      <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-12">
        <div className="flex min-w-0 items-center gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <SkeletonItem className="h-8 w-8 rounded-lg" />
            <SkeletonItem className="h-6 w-32 rounded-md" />
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <SkeletonItem className="h-4 w-20 rounded-full" />
            <SkeletonItem className="h-4 w-24 rounded-full" />
            <SkeletonItem className="h-4 w-20 rounded-full" />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <SkeletonItem className="h-10 w-10 rounded-full" />
          <SkeletonItem className="h-10 w-10 rounded-full" />
          <SkeletonItem className="h-9 w-9 rounded-full" />
        </div>
      </nav>

      <main className="px-container-margin-mobile md:px-container-margin-desktop pt-12 max-w-[1440px] mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="w-full md:w-auto">
            <SkeletonItem className="h-12 w-72 max-w-full rounded-md mb-4" />
            <SkeletonItem className="h-6 w-[520px] max-w-full rounded-full" />
          </div>
          <SkeletonItem className="h-12 w-48 rounded-lg" />
        </header>

        <div className="flex items-center gap-8 border-b border-outline-variant mb-8">
          <div className="pb-3 border-b-2 border-primary">
            <SkeletonItem className="h-5 w-28 rounded-full" />
          </div>
          <div className="pb-3 border-b-2 border-transparent">
            <SkeletonItem className="h-5 w-20 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
          <SkeletonTripCard />
          <SkeletonTripCard compact />
          <SkeletonTripCard />
        </div>
      </main>

      <style>{`
        .skeleton-item {
          position: relative;
          overflow: hidden;
          background: #e2e8f0;
        }

        .skeleton-item::after {
          animation: trip-skeleton-shimmer 1.45s ease-in-out infinite;
          background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.72), transparent);
          content: "";
          inset: 0;
          position: absolute;
          transform: translateX(-100%);
        }

        @keyframes trip-skeleton-shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
