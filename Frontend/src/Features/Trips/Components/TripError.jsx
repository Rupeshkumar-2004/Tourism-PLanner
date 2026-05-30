import { AlertTriangle } from 'lucide-react';
import TopNavBar from '../../../components/TopNavBar.jsx';

const TripError = ({ onRetry = () => {} }) => {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen pb-section-gap">
      <TopNavBar />

      <main className="px-container-margin-mobile md:px-container-margin-desktop pt-12 max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center justify-center py-20 bg-surface-container rounded-2xl border border-outline">

          {/* Error Icon */}
          <div className="mb-6 p-4 bg-error-fixed rounded-full">
            <AlertTriangle size={48} className="text-error" />
          </div>

          {/* Error Message */}
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
            Oops! Something went wrong
          </h2>

          <p className="text-center text-on-surface-variant max-w-md mb-8">
            We encountered an error while loading your Trips. Please try again or contact support if the problem persists.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-surface-container text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-colors shadow-sm border border-outline"
            >
              Go Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TripError;