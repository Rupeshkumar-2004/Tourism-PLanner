const TripDetailSkeleton = () => {
    return (
        <div className="min-h-screen bg-surface animate-pulse">
            <div className="h-[40vh] bg-surface-container-high w-full relative"></div>
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3 space-y-6">
                        <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-8 h-48 border border-outline-variant/70"></div>
                        <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-8 h-96 border border-outline-variant/70"></div>
                    </div>
                    
                    <aside className="lg:w-1/3 space-y-6">
                        <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-6 h-64 border border-outline-variant/70"></div>
                        <div className="bg-surface-container-lowest rounded-2xl shadow-ambient p-6 h-48 border border-outline-variant/70"></div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default TripDetailSkeleton;
