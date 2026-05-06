import { useEffect, useState } from "react";

const QUOTES_API = "https://api.freeapi.app/api/v1/public/quotes";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadQuotes() {
      setStatus("loading");
      setError(null);

      try {
        const response = await fetch(QUOTES_API, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Unable to fetch quotes (${response.status})`);
        }

        const payload = await response.json();

        // Safely extract the array
        let extractedQuotes = [];
        if (Array.isArray(payload)) {
          extractedQuotes = payload;
        } else if (payload?.data && Array.isArray(payload.data)) {
          extractedQuotes = payload.data;
        } else if (payload?.data?.data && Array.isArray(payload.data.data)) {
          extractedQuotes = payload.data.data;
        }

        setQuotes(extractedQuotes);
        setStatus("success");
      } catch (fetchError) {
        if (fetchError.name === "AbortError") return;
        setError(fetchError.message || "Failed to load quotes.");
        setStatus("error");
      }
    }

    loadQuotes();
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-slate-200 font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900 pb-20">
      <header className="max-w-4xl mx-auto text-center px-6 pt-20 pb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
          Random <span className=" bg-clip-text text-orange-500">Quotes</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Discover a fresh batch of inspiring words. Every card shows a short
          quote, its author, and metadata for a seamless reading experience.
        </p>
      </header>
      <div className="flex justify-center min-h-12 mb-8">
        {status === "loading" && (
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-slate-200 text-slate-600 text-sm font-medium animate-pulse">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Gathering wisdom...
          </span>
        )}

        {status === "error" && (
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            {error}
          </span>
        )}
      </div>

      {/* Quotes Grid */}
      {status === "success" && (
        <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quotes.map((quote, index) => {
            const text =
              quote?.content ??
              quote?.text ??
              quote?.quote ??
              "Untitled quote.";
            const author = quote?.author ?? quote?.name ?? "Unknown author";
            const category =
              quote?.category ?? quote?.tag ?? quote?.tags?.[0] ?? "General";

            return (
              <article
                key={`${author}-${index}`}
                className="relative flex flex-col bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300 group"
              >
                {/* Large decorative quotation mark */}
                <span className="absolute top-4 left-6 text-8xl text-slate-400 font-serif leading-none select-none pointer-events-none group-hover:text-orange-300 transition-colors duration-300">
                  &ldquo;
                </span>

                {/* Quote Content */}
                <div className="relative z-10 grow pt-6 mb-8">
                  <p className="text-xl text-slate-700 leading-relaxed font-medium">
                    {text}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="relative z-10 flex items-end justify-between border-t border-slate-100 pt-6 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                      Author
                    </span>
                    <span className="font-bold text-slate-900">{author}</span>
                  </div>

                  <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 text-xs font-semibold tracking-wide capitalize">
                    {category}
                  </span>
                </div>
              </article>
            );
          })}
        </main>
      )}

      {/* Footer / Status Count */}
      {status === "success" && quotes.length > 0 && (
        <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-800/50 flex flex-col sm:flex-row justify-between items-center text-sm text-neutral-500">
          <div className="mb-2 sm:mb-0">
            Showing <strong className="text-gray-600">{quotes.length}</strong>{" "}
            quotes loaded successfully.
          </div>
          <div>
            Implemented By{" "}
            <span className="text-neutral-800 font-medium">
              Shivanshu Agrawal
            </span>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
