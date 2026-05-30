function StatsCard({ icon: Icon, label, value, bgColor, iconColor }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 ${bgColor} ${iconColor} rounded-lg`}>
          <Icon size={20} />
        </div>
        <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="font-headline-lg text-headline-lg text-on-surface">
        {value}
      </div>
    </div>
  );
}

export default StatsCard;
