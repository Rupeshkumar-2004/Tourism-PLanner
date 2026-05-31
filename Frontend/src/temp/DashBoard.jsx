
export default function DestinationEmpty() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* TopNavBar */}
      <nav className="flex justify-between items-center w-full px-8 py-4 sticky top-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-sm">
        <div className="text-headline-md font-headline-md font-bold text-primary">SkyVoyage</div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-primary border-b-2 border-primary pb-1 font-body-md" href="#">Destinations</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md" href="#">Itineraries</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md" href="#">Stories</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md" href="#">Plan</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant font-label-sm px-4 py-2 hover:text-primary transition-colors">Login</button>
          <button className="bg-primary text-white font-label-sm px-6 py-2 rounded-lg hover:bg-primary/90 transition-all shadow-sm">Sign Up</button>
        </div>
      </nav>

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

          {/* Suggestion Grid (Subtle) */}
          <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
            <div className="p-6 bg-surface-container-low rounded-xl text-left space-y-3 soft-elevation">
              <span className="material-symbols-outlined text-primary">temple_hindu</span>
              <h3 className="font-headline text-xl">The Ruins of Petra</h3>
              <p className="text-xs text-on-surface-variant">A similar historical marvel carved into deep rose-red cliffs.</p>
            </div>
            <div className="p-6 bg-surface-container-low rounded-xl text-left space-y-3 soft-elevation">
              <span className="material-symbols-outlined text-primary">terrain</span>
              <h3 className="font-headline text-xl">Cappadocia Valley</h3>
              <p className="text-xs text-on-surface-variant">Floating through ancient landscapes and fairy chimneys.</p>
            </div>
            <div className="p-6 bg-surface-container-low rounded-xl text-left space-y-3 soft-elevation">
              <span className="material-symbols-outlined text-primary">castle</span>
              <h3 className="font-headline text-xl">Machu Picchu</h3>
              <p className="text-xs text-on-surface-variant">Uncovering the sacred peaks and hidden secrets of the Incas.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
