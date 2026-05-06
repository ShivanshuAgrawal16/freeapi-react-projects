import { useState, useEffect } from "react";

const API_URL = "https://api.freeapi.app/api/v1/public/randomproducts";

function App() {
  const [products, setProducts] = useState([]);
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

    async function getProducts() {
      setStatus("loading");
      try {
        const response = await fetch(API_URL, options);
        if (!response.ok) {
          throw new Error(`Unable to fetch Products data (${response.status})`);
        }

        const payload = await response.json();

        // Fixed the payload extraction and variable typo
        if (payload?.data?.data && Array.isArray(payload.data.data)) {
          setProducts(payload.data.data);
        } else {
          setProducts([]);
        }

        setStatus("success");
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message || "Failed to load products data");
        setStatus("error");
      }
    }

    getProducts();

    return () => controller.abort();
  }, [clicked]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
        {/* Header Section */}
        <header className="py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Featured Products
          </h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Discover our handpicked collection of top-tier items. Quality and
            elegance combined in one place.
          </p>
          <button
            onClick={() => setClicked(!clicked)}
            className="mt-6 inline-flex items-center justify-center px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-semibold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Refresh Products
          </button>
        </header>

        {/* Status Indicators */}
        <div className="flex justify-center mb-8">
          {status === "loading" && (
            <div className="flex items-center space-x-2 text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
              <svg
                className="animate-spin h-5 w-5 text-slate-600"
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
              <span className="font-medium">Fetching Products...</span>
            </div>
          )}

          {status === "error" && (
            <div className="px-6 py-4 bg-red-50 text-red-700 rounded-xl border border-red-100 font-medium text-center shadow-sm">
              {error}
            </div>
          )}
        </div>

        {/* Product Grid */}
        {status === "success" && (
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-16">
            {products.map((product) => {
              const category = product.category;
              const price = product.price;
              const thumbnail = product.thumbnail;
              const title = product.title;
              const productId = product.id;
              const images = product.images;

              // Fallback to first image in array if thumbnail is missing
              const displayImage =
                thumbnail || (images && images.length > 0 ? images[0] : "");

              return (
                <article
                  key={productId}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col group"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={displayImage}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                        {category}
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 flex flex-col flex-1">
                    <h2
                      className="text-lg font-bold text-slate-900 line-clamp-1 mb-1"
                      title={title}
                    >
                      {title}
                    </h2>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="text-2xl font-extrabold text-slate-900">
                        ${price}
                      </span>
                      <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
                        View
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </main>
        )}
      </div>

      {/* Footer */}
      {status === "success" && products.length > 0 && (
        <footer className="mt-auto bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-sm">
            <div className="mb-3 sm:mb-0">
              Showing{" "}
              <strong className="text-slate-900 font-semibold">
                {products.length}
              </strong>{" "}
              products loaded successfully.
            </div>
            <div className="flex items-center space-x-1">
              <span>Implemented By</span>
              <span className="font-semibold text-slate-900">
                Shivanshu Agrawal
              </span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
