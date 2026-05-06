const PropertyBadge = ({ label, isTrue }) => {
  if (!isTrue) return null;
  return (
    <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full border border-rose-200">
      {label}
    </span>
  );
};

export default PropertyBadge;
