import TopNavBar from "../../../../components/TopNavBar";
import { useAuth } from "../../../../hooks/useAuth";

export default function DestinationSkeleton() {

    const { user } = useAuth();
    return (
        <div className="light bg-surface text-on-surface font-body-md antialiased min-h-screen flex flex-col">
            {/* TopNavBar */}
            <TopNavBar user={user.fullName} />

            <main className="flex-grow">
                {/* Hero Section */}
                <section
                    className="relative w-full h-[614px] md:h-[819px] flex items-end pb-container-margin-desktop px-container-margin-mobile md:px-container-margin-desktop bg-cover bg-center"
                    style={{ backgroundColor: "#e6e0d6" }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="relative z-10 w-full max-w-7xl mx-auto">
                        <div className="animate-pulse">
                            <div className="h-4 bg-white/20 w-32 rounded mb-4"></div>
                            <div className="h-12 bg-white/30 w-3/4 rounded mb-4"></div>
                            <div className="h-6 bg-white/20 w-1/2 rounded"></div>
                        </div>
                    </div>
                </section>

                {/* Quick Facts Bar */}
                <div className="w-full bg-surface-container-lowest border-b border-surface-container px-container-margin-mobile md:px-container-margin-desktop py-6 shadow-sm relative z-20 -mt-6 rounded-t-xl max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter divide-y md:divide-y-0 md:divide-x divide-surface-variant">
                        <div className="flex items-center gap-4 py-4 md:py-0 md:px-4 animate-pulse">
                            <div className="w-12 h-12 rounded-full bg-surface-container-highest"></div>
                            <div>
                                <div className="h-3 bg-surface-container-highest w-16 rounded mb-2"></div>
                                <div className="h-4 bg-surface-container-highest w-24 rounded"></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 py-4 md:py-0 md:px-4 animate-pulse border-l border-surface-variant">
                            <div className="w-12 h-12 rounded-full bg-surface-container-highest"></div>
                            <div>
                                <div className="h-3 bg-surface-container-highest w-20 rounded mb-2"></div>
                                <div className="h-4 bg-surface-container-highest w-20 rounded"></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 py-4 md:py-0 md:px-4 animate-pulse border-l border-surface-variant">
                            <div className="w-12 h-12 rounded-full bg-surface-container-highest"></div>
                            <div>
                                <div className="h-3 bg-surface-container-highest w-16 rounded mb-2"></div>
                                <div className="h-4 bg-surface-container-highest w-28 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overview Section */}
                <section className="max-w-7xl mx-auto px-container-margin-mobile md:px-container-margin-desktop py-section-gap">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
                        <div className="lg:col-span-7 pr-0 lg:pr-12">
                            <div className="animate-pulse">
                                <div className="h-8 bg-surface-container-highest w-1/2 rounded mb-6"></div>
                                <div className="space-y-4 mb-6">
                                    <div className="h-4 bg-surface-container-highest w-full rounded"></div>
                                    <div className="h-4 bg-surface-container-highest w-11/12 rounded"></div>
                                    <div className="h-4 bg-surface-container-highest w-4/5 rounded"></div>
                                </div>
                                <div className="space-y-4 mb-8">
                                    <div className="h-4 bg-surface-container-highest w-full rounded"></div>
                                    <div className="h-4 bg-surface-container-highest w-10/12 rounded"></div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-8 w-24 bg-surface-container-highest rounded-full"></div>
                                    <div className="h-8 w-20 bg-surface-container-highest rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-5 mt-8 lg:mt-0">
                            <div
                                className="rounded-xl overflow-hidden shadow-sm aspect-[4/5] bg-surface-variant"
                                style={{ backgroundColor: "#e6e0d6" }}
                            ></div>
                        </div>
                    </div>
                </section>

                {/* Curated Itineraries */}
                <section className="bg-surface-container-low py-section-gap">
                    <div className="max-w-7xl mx-auto px-container-margin-mobile md:px-container-margin-desktop">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
                                    Curated Itineraries
                                </h2>
                                <p className="font-body-md text-body-md text-on-surface-variant">
                                    Tailored paths for your Hampi adventure.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                            <div className="bg-surface-container-lowest rounded-xl p-8 border border-surface-container animate-pulse">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="space-y-3">
                                        <div className="h-6 bg-surface-container-highest w-16 rounded-full"></div>
                                        <div className="h-7 bg-surface-container-highest w-48 rounded"></div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-surface-container-highest"></div>
                                </div>
                                <div className="h-4 bg-surface-container-highest w-full rounded mb-3"></div>
                                <div className="h-4 bg-surface-container-highest w-5/6 rounded mb-8"></div>
                                <div className="space-y-4">
                                    <div className="h-4 bg-surface-container-highest w-3/4 rounded"></div>
                                    <div className="h-4 bg-surface-container-highest w-2/3 rounded"></div>
                                    <div className="h-4 bg-surface-container-highest w-1/2 rounded"></div>
                                </div>
                                <div className="mt-8 h-12 bg-surface-container-highest w-full rounded-lg"></div>
                            </div>
                            <div className="bg-surface-container-lowest rounded-xl p-8 border border-surface-container animate-pulse">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="space-y-3">
                                        <div className="h-6 bg-surface-container-highest w-16 rounded-full"></div>
                                        <div className="h-7 bg-surface-container-highest w-56 rounded"></div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-surface-container-highest"></div>
                                </div>
                                <div className="h-4 bg-surface-container-highest w-full rounded mb-3"></div>
                                <div className="h-4 bg-surface-container-highest w-4/5 rounded mb-8"></div>
                                <div className="space-y-4">
                                    <div className="h-4 bg-surface-container-highest w-2/3 rounded"></div>
                                    <div className="h-4 bg-surface-container-highest w-3/4 rounded"></div>
                                </div>
                                <div className="mt-[4.5rem] h-12 bg-surface-container-highest w-full rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="max-w-7xl mx-auto px-container-margin-mobile md:px-container-margin-desktop py-section-gap text-center">
                    <div className="animate-pulse max-w-2xl mx-auto">
                        <div className="h-8 bg-surface-container-highest w-2/3 mx-auto rounded mb-6"></div>
                        <div className="h-4 bg-surface-container-highest w-full rounded mb-3"></div>
                        <div className="h-4 bg-surface-container-highest w-4/5 mx-auto rounded mb-8"></div>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <div className="h-14 w-full sm:w-48 bg-surface-container-highest rounded-lg"></div>
                            <div className="h-14 w-full sm:w-48 bg-surface-container-highest rounded-lg"></div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
