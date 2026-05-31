
const SkeletonItem = ({ className = "" }) => (
  <div className={`skeleton-item ${className}`} aria-hidden="true" />
);

const SkeletonCard = () => (
  <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/30">
    <div className="h-48 w-full bg-surface-container relative overflow-hidden">
      <SkeletonItem className="h-full w-full rounded-none" />
    </div>

    <div className="p-4">
      <SkeletonItem className="h-5 w-3/4 rounded-md mb-3" />
      <SkeletonItem className="h-4 w-full rounded-full mb-2" />
      <SkeletonItem className="h-4 w-4/5 rounded-full" />
    </div>
  </article>
);

export default function DestinationSkeleton() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md pb-section-gap">
      <main className="px-container-margin-mobile md:px-container-margin-desktop pt-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </main>

      <style>{`
        .skeleton-item {
          position: relative;
          overflow: hidden;
          background: #e2e8f0;
        }

        .skeleton-item::after {
          animation: dest-skeleton-shimmer 1.2s ease-in-out infinite;
          background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.72), transparent);
          content: "";
          inset: 0;
          position: absolute;
          transform: translateX(-100%);
        }

        @keyframes dest-skeleton-shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
