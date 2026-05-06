export default function MealCard({ meal, onSelect }) {
  const area = meal.strArea;
  const name = meal.strMeal;
  const instructions = meal.strInstructions;
  const imageUrl = meal.strMealThumb;

  // Grab just the first 3 ingredients for the preview
  const ingredients = [];
  for (let i = 1; i <= 3; i++) {
    if (
      meal[`strIngredient${i}`] &&
      meal[`strIngredient${i}`].trim().length > 0
    ) {
      ingredients.push(meal[`strIngredient${i}`]);
    }
  }

  return (
    <article
      className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100 flex flex-col group cursor-pointer"
      onClick={() => onSelect(meal)}
    >
      <div className="relative h-56 overflow-hidden bg-stone-200 shrink-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="bg-orange-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            View Recipe
          </span>
        </div>
      </div>

      <div className="p-6 grow flex flex-col">
        <div className="flex justify-between items-start mb-3 gap-2">
          <h2 className="text-xl font-bold text-stone-800 leading-tight line-clamp-1 group-hover:text-orange-600 transition-colors">
            {name}
          </h2>
          {area && (
            <span className="text-stone-400 text-[10px] font-bold uppercase tracking-wider shrink-0 mt-1">
              {area}
            </span>
          )}
        </div>

        <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {instructions}
        </p>

        <div className="mt-auto pt-4 border-t border-stone-100">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
            Features
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ingredients.map((ing, idx) => (
              <span
                key={idx}
                className="bg-stone-50 text-stone-600 text-xs px-2.5 py-1 rounded-md"
              >
                {ing}
              </span>
            ))}
            <span className="text-xs text-stone-400 font-medium self-center ml-1">
              & more
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
