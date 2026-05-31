import { RefreshCw } from "lucide-react";

const TripDetailError = ({ onRetry }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-surface px-4">
            <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-10 max-w-md w-full text-center border border-outline-variant/50">
                <div className="w-20 h-20 bg-error-container rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-4xl text-on-error-container">
                        error
                    </span>
                </div>
                <h2 className="font-display text-display text-on-surface mb-3">
                    Oops! Something went wrong.
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                    We couldn't load the details for this journey. Please try again.
                </p>
                <button
                    onClick={onRetry}
                    className="flex items-center justify-center gap-2 w-full bg-primary text-on-primary font-label-lg text-label-lg rounded-xl px-6 py-3.5 shadow-ambient hover:shadow-ambient-hover hover:bg-on-primary-container transition-all duration-300"
                >
                    <RefreshCw size={20} />
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default TripDetailError;
