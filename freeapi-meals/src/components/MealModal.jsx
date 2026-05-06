import { useEffect } from "react";

export default function MealModal({ meal, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!meal) return null;

  const area = meal.strArea;
  const category = meal.strCategory;
  const name = meal.strMeal;
  const instructions = meal.strInstructions;
  const imageUrl = meal.strMealThumb;
  const tags = meal.strTags ? meal.strTags.split(",") : [];
  const source = meal.strSource;
  const youtubeTutorial = meal.strYoutube;

  const ingredients = [];
  const measurements = [];
  for (let i = 1; i <= 20; i++) {
    if (
      meal[`strIngredient${i}`] &&
      meal[`strIngredient${i}`].trim().length > 0
    ) {
      ingredients.push(meal[`strIngredient${i}`]);
      measurements.push(meal[`strMeasure${i}`]);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/70 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl relative flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full shadow-md backdrop-blur-md transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto grow flex flex-col md:flex-row">
          {/* Left Side: Image & Links (Sticky on Desktop) */}
          <div className="md:w-2/5 bg-stone-100 flex flex-col">
            <div className="h-64 md:h-80 w-full relative shrink-0">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
              {category && (
                <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {category}
                </span>
              )}
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-4 bg-stone-50 md:grow border-r border-stone-200">
              {youtubeTutorial && (
                <a
                  href={youtubeTutorial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-50 text-red-600 hover:bg-red-100 py-3 px-4 rounded-xl text-center font-bold transition-colors w-full flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                  Watch Tutorial
                </a>
              )}
              {source && (
                <a
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-stone-200 text-stone-700 hover:bg-stone-300 py-3 px-4 rounded-xl text-center font-bold transition-colors w-full"
                >
                  View Original Source
                </a>
              )}
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="md:w-3/5 p-6 md:p-8 md:overflow-y-auto">
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-3xl md:text-4xl font-extrabold text-stone-800 leading-tight">
                  {name}
                </h2>
                {area && (
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-widest shrink-0 mt-1">
                    {area}
                  </span>
                )}
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Ingredients Grid */}
            <div className="mb-8">
              <h3 className="text-sm font-black text-stone-400 uppercase tracking-widest mb-4">
                Ingredients needed
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {ingredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="bg-stone-50 border border-stone-100 p-3 rounded-xl flex flex-col justify-center"
                  >
                    <span className="font-bold text-stone-800 text-sm">
                      {ing}
                    </span>
                    <span className="text-orange-600 font-medium text-xs mt-0.5">
                      {measurements[idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-sm font-black text-stone-400 uppercase tracking-widest mb-4">
                Instructions
              </h3>
              <div className="prose prose-stone prose-sm max-w-none">
                {instructions
                  .split("\n")
                  .filter((p) => p.trim())
                  .map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="mb-4 text-stone-600 leading-relaxed text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
