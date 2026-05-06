import { useState, useEffect } from "react";

const API_URL = "https://api.freeapi.app/api/v1/public/randomjokes/joke/random";

function App() {
  const [joke, setJoke] = useState({});
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

    async function getJoke() {
      setStatus("loading");

      try {
        const response = await fetch(API_URL, options);
        if (!response.ok) {
          throw new Error(`Error fetching the joke: ${response.status}`);
        }

        const payload = await response.json();

        let jokeData = {};
        if (payload && payload.data) {
          jokeData = payload.data;
        }

        setJoke(jokeData);
        setStatus("success");
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        setError(error.message || "Failed to load joke");
        setStatus("error");
      }
    }
    getJoke();

    return () => controller.abort();
  }, [clicked]);

  const jokeText = joke.content;

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header Section */}
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
            Random Joke Generator
          </h1>
          <p className="text-lg text-stone-500 font-medium">Hasna Mana Hai</p>
        </header>

        {/* Loading State */}
        {status === "loading" && (
          <div className="flex justify-center items-center py-20">
            <span className="flex items-center space-x-3 text-amber-500 font-bold text-lg animate-pulse">
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
              <span>Fetching a good laugh...</span>
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

        {/* Success State / Joke Card */}
        {status === "success" && jokeText && (
          <main className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden relative">
            {/* Decorative Quote Icon Background */}
            <div className="absolute top-4 left-6 text-9xl text-stone-100 font-serif select-none pointer-events-none">
              &ldquo;
            </div>

            <div className="px-8 py-16 md:px-16 md:py-20 relative z-10 flex items-center justify-center min-h-[250px]">
              <p className="text-2xl md:text-3xl lg:text-4xl text-stone-700 font-medium leading-relaxed text-center">
                {jokeText}
              </p>
            </div>
          </main>
        )}

        {/* Action Button (Positioned below the card) */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setClicked((prev) => !prev)}
            disabled={status === "loading"}
            className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 active:bg-amber-700 disabled:bg-amber-300 disabled:cursor-not-allowed text-white font-bold text-lg py-3 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0"
          >
            {status === "loading" ? "Thinking..." : "Tell me another one 🤣"}
          </button>
        </div>

        {/* Footer */}
        {status === "success" && (
          <footer className="flex flex-col md:flex-row justify-between items-center text-sm font-medium text-stone-400 pt-6 border-t border-stone-200">
            <div>
              Implemented By{" "}
              <span className="text-amber-500 font-bold">
                Shivanshu Agrawal
              </span>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;
