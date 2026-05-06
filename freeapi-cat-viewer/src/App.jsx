import { useState, useEffect } from "react";
import ScoreBar from "./components/ScoreBar.jsx";
import PropertyBadge from "./components/PropertyBadge.jsx";

const url = "https://api.freeapi.app/api/v1/public/cats/cat/random";

function App() {
  const [cat, setCat] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const options = {
      method: "GET",
      headers: { accept: "application/json" },
      signal: controller.signal,
    };

    async function getCats() {
      setStatus("loading");
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Unable to fetch Cats data (${response.status})`);
        }

        const payload = await response.json();
        let catsInfo = {};
        if (payload.data) {
          catsInfo = payload.data;
        }

        setCat(catsInfo);
        setStatus("success");
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message || "Failed to load Cats data");
        setStatus("error");
      }
    }
    getCats();

    return () => controller.abort();
  }, [clicked]);

  const catName = cat.name;
  const cfaUrl = cat.cfa_url;
  const vetstreetUrl = cat.vetstreet_url;
  const vcaUrl = cat.vcahospitals_url;
  const nature = cat.temperament;
  const origin = cat.origin;
  const catDescription = cat.description;
  const lifeSpan = cat.life_span;
  const imageUrl = cat.image;
  const wikipediaUrl = cat.wikipedia_url;

  // Points out of 5
  const indoor = cat.indoor;
  const lap = cat.lap;
  const adaptability = cat.adaptability;
  const affectionLevel = cat.affection_level;
  const childFriendly = cat.child_friendly;
  const dogFriendly = cat.dog_friendly;
  const energyLevel = cat.energy_level;
  const grooming = cat.grooming;
  const healthIssues = cat.health_issues;
  const intelligence = cat.intelligence;
  const sheddingLevel = cat.shedding_level;
  const socialNeeds = cat.social_needs;
  const strangerFriendly = cat.stranger_friendly;
  const vocalisation = cat.vocalisation;

  // Boolean traits
  const experimental = cat.experimental;
  const hairless = cat.hairless;
  const natural = cat.natural;
  const rare = cat.rare;
  const rex = cat.rex;
  const suppressedTail = cat.suppressed_tail;
  const shortLegs = cat.short_legs;

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header Section */}
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
            A Random Cat
          </h1>
          <p className="text-lg text-stone-500 font-medium">
            Here are random cat profiles for you to explore.
          </p>
        </header>

        {/* Loading State */}
        {status === "loading" && (
          <div className="flex justify-center items-center py-20">
            <span className="flex items-center space-x-3 text-teal-600 font-bold text-lg animate-pulse">
              <svg
                className="w-6 h-6 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Fetching Cat Data...</span>
            </span>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="max-w-lg mx-auto bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl shadow-sm">
            <div className="flex items-center space-x-3 text-red-700 font-bold">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Success State / Cat Card */}
        {status === "success" && catName && (
          <main className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden flex flex-col lg:flex-row">
            {/* Left: Image Box */}
            <div className="lg:w-2/5 bg-stone-100 flex-shrink-0">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={catName}
                  className="w-full h-80 lg:h-full object-cover"
                />
              ) : (
                <div className="w-full h-80 lg:h-full flex items-center justify-center text-stone-400 font-medium">
                  No Image Available
                </div>
              )}
            </div>

            {/* Right: Info Box */}
            <div className="lg:w-3/5 p-8 md:p-10 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Title & Origin */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-3xl font-extrabold text-stone-900">
                      {catName}
                    </h2>
                    {origin && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-bold rounded-full border border-amber-200">
                        📍 {origin}
                      </span>
                    )}
                    {lifeSpan && (
                      <span className="px-3 py-1 bg-stone-100 text-stone-600 text-sm font-bold rounded-full border border-stone-200">
                        ⏳ {lifeSpan} years
                      </span>
                    )}
                  </div>
                  <p className="text-teal-600 font-semibold italic">{nature}</p>
                </div>

                {/* Description */}
                <p className="text-stone-600 leading-relaxed text-base">
                  {catDescription}
                </p>

                {/* Boolean Traits (Badges) */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <PropertyBadge label="Experimental" isTrue={experimental} />
                  <PropertyBadge label="Hairless" isTrue={hairless} />
                  <PropertyBadge label="Natural" isTrue={natural} />
                  <PropertyBadge label="Rare" isTrue={rare} />
                  <PropertyBadge label="Rex" isTrue={rex} />
                  <PropertyBadge
                    label="Suppressed Tail"
                    isTrue={suppressedTail}
                  />
                  <PropertyBadge label="Short Legs" isTrue={shortLegs} />
                </div>

                {/* Divider */}
                <hr className="border-stone-100" />

                {/* Scores Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
                  <ScoreBar label="Adaptability" score={adaptability} />
                  <ScoreBar label="Affection" score={affectionLevel} />
                  <ScoreBar label="Child Friendly" score={childFriendly} />
                  <ScoreBar label="Dog Friendly" score={dogFriendly} />
                  <ScoreBar label="Energy" score={energyLevel} />
                  <ScoreBar label="Grooming" score={grooming} />
                  <ScoreBar label="Health Issues" score={healthIssues} />
                  <ScoreBar label="Indoor" score={indoor} />
                  <ScoreBar label="Intelligence" score={intelligence} />
                  <ScoreBar label="Lap Cat" score={lap} />
                  <ScoreBar label="Shedding" score={sheddingLevel} />
                  <ScoreBar label="Social Needs" score={socialNeeds} />
                  <ScoreBar
                    label="Stranger Friendly"
                    score={strangerFriendly}
                  />
                  <ScoreBar label="Vocalisation" score={vocalisation} />
                </div>
              </div>

              {/* Links Row */}
              <div className="mt-10 flex flex-wrap gap-4 pt-6 border-t border-stone-100">
                {wikipediaUrl && (
                  <a
                    href={wikipediaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-white bg-stone-900 hover:bg-stone-700 px-5 py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    Wikipedia
                  </a>
                )}
                {cfaUrl && (
                  <a
                    href={cfaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-5 py-2.5 rounded-lg transition-colors"
                  >
                    CFA Profile
                  </a>
                )}
                {vetstreetUrl && (
                  <a
                    href={vetstreetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-5 py-2.5 rounded-lg transition-colors"
                  >
                    Vetstreet
                  </a>
                )}
                {vcaUrl && (
                  <a
                    href={vcaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-5 py-2.5 rounded-lg transition-colors"
                  >
                    VCA Hospitals
                  </a>
                )}
              </div>
            </div>
          </main>
        )}

        {/* Action Button (Moved below the card) */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setClicked((prev) => !prev)}
            disabled={status === "loading"}
            className="inline-flex items-center justify-center bg-teal-500 hover:bg-teal-600 active:bg-teal-700 disabled:bg-teal-300 disabled:cursor-not-allowed text-white font-bold text-lg py-3 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0"
          >
            {status === "loading" ? "Fetching..." : "Fetch Next Cat "}
          </button>
        </div>

        {/* Footer */}
        {status === "success" && (
          <footer className="flex flex-col md:flex-row justify-between items-center text-sm font-medium text-stone-400 pt-6 border-t border-stone-200">
            <div className="mb-2 md:mb-0">Showing cat data successfully.</div>
            <div>
              Implemented By{" "}
              <span className="text-teal-600 font-bold">Shivanshu Agrawal</span>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;
