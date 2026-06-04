import { Compass } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const EmptyStateCard = () => {
  const navigate = useNavigate();
  return (
    <article className="bg-surface-bright rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center p-8 text-center hover:border-primary hover:bg-surface transition-colors duration-300 cursor-pointer min-h-[420px]">
      <div className="relative z-10 w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center">
        <Compass size={64} className="text-amber-700" />
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Where to next?</h3>
      <p className="font-body-md text-body-md text-outline mb-6 max-w-[250px]">
        The horizon is waiting. Start organizing your next seamless travel experience.
      </p>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          navigate('/destinations');
        }}
        className="font-label-md text-label-md text-primary border border-primary rounded-lg px-6 py-2 hover:bg-primary hover:text-on-primary transition-colors"
      >
        Browse Destinations
      </button>
    </article>
  );
};

export default EmptyStateCard;