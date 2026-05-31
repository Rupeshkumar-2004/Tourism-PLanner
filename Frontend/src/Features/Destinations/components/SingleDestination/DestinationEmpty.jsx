import TopNavBar from "../../../../components/TopNavBar";
import { useAuth } from "../../../../hooks/useAuth";

export default function DestinationEmpty() {
    const { user } = useAuth();


    return (
        <div className="bg-background text-on-surface min-h-screen flex flex-col">
            {/* TopNavBar */}
            <TopNavBar user={user.fullName} />

            {/* Main Content Canvas */}
            <main className="flex-grow flex items-center justify-center px-6 py-12 bg-warm-gradient">
                <div className="max-w-4xl w-full text-center space-y-12">
                    {/* Empty State Illustration/Icon */}
                    <div className="relative inline-block group mx-auto">
                        <div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-700"></div>
                        <div className="relative flex flex-col items-center">
                            <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center">
                                <img
                                    alt="Faint ruins silhouette"
                                    className="w-full h-full object-cover rounded-full mix-blend-multiply opacity-20 grayscale brightness-125"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd8zFiK-ZNbgNh1YOMfxIvae1_r9ECJ_tV0tPLWGV3Gk9y2IPOg1BP3vvtETc1T4aAvLa6ESFLoYIVmHFpa-lV4x4R4XZEL9Zd9EjPzufj_VL9cLSfGaXLIFDnWHn6crZoQmb71NLbKsJkTTMs35KehHAEEr_dB8n-6xg8vqjra9ycBayy8OIQDXD4WeLTjRi2nkC8bMYaTXSW1LQXaXdFXgCcOaevFcccVRqaBxR636qiz7mhtsoKHRuRTmDsdsNCBn2l88TCj50k"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-surface-container-lowest p-8 rounded-full soft-elevation border border-outline-variant/30 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[80px] md:text-[100px] text-primary/40 leading-none">map</span>
                                        <span className="material-symbols-outlined absolute text-[32px] md:text-[40px] text-tertiary-container translate-x-8 -translate-y-8" style={{ fontVariationSettings: "'FILL' 1" }}>help_center</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 max-w-lg mx-auto">
                        <h1 className="text-5xl md:text-6xl text-on-surface font-headline leading-tight italic">No Details Found</h1>
                        <p className="text-on-surface-variant font-body text-lg leading-relaxed">
                            It seems the sun hasn't quite risen on our guide for <span className="text-primary italic font-serif">Hampi</span> yet. We're currently curating the golden histories and hidden trails of this stone-carved empire.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a className="group relative px-10 py-4 bg-primary text-white rounded-lg font-label-md overflow-hidden soft-elevation hover:bg-primary/95 transition-all flex items-center gap-3" href="#">
                            <span>Explore Other Destinations</span>
                            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </a>
                        <a className="text-on-surface-variant font-label-md border-b border-transparent hover:border-primary hover:text-primary transition-all pb-1 flex items-center gap-2" href="#">
                            <span className="material-symbols-outlined text-sm">bookmark</span>
                            Notify me when it's ready
                        </a>
                    </div>

                </div>
            </main>
        </div>
    );
}
