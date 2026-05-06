const ScoreBar = ({ label, score }) => {
  // If score is undefined or null, we shouldn't render the bar
  if (score === undefined || score === null) return null;

  return (
    <div className="flex flex-col space-y-1.5">
      <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
        {label}
      </span>
      <div className="h-2.5 w-full bg-stone-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-400 rounded-full transition-all duration-500"
          style={{ width: `${(score / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreBar;
