import { useState, useEffect } from "react";
import MealModal from "./components/MealModal.jsx";
import MealCard from "./components/MealCard.jsx";
const url = "https://api.freeapi.app/api/v1/public/meals";

function App() {
  const [meals, setMeals] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null); // New state for modal

  useEffect(() => {
    const controller = new AbortController();
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
      signal: controller.signal,
    };

    async function getMeals() {
      setStatus("loading");
      setError(null);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Unable to fetch meals (${response.status})`);
        }

        const payload = await response.json();
        let mealInfo = [];
        if (Array.isArray(payload.data.data)) {
          mealInfo = payload.data.data;
        }

        setMeals(mealInfo);
        setStatus("success");
      } catch (error) {
        if (error.name === "AbortError") return;
        setError(error.message || "Failed to load meals.");
        setStatus("error");
      }
    }
    getMeals();
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      <header className="pt-16 pb-12 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-4 tracking-tight">
          Meal Options
        </h1>
        <p className="text-lg text-stone-500 font-medium">
          Click on any meal to view the full recipe and ingredients.
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-4 flex justify-center">
        {status === "loading" && (
          <h3 className="text-xl font-semibold text-orange-500 animate-pulse bg-orange-50 py-3 px-6 rounded-full">
            Fetching delicious meals...
          </h3>
        )}

        {status === "error" && (
          <p className="text-red-600 bg-red-100 border border-red-200 py-4 px-6 rounded-xl font-medium shadow-sm">
            {error}
          </p>
        )}
      </div>

      {status === "success" && (
        <main className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
          {meals.map((meal) => (
            <MealCard
              key={meal.idMeal || meal.strMeal}
              meal={meal}
              onSelect={setSelectedMeal} // Pass the setter function
            />
          ))}
        </main>
      )}

      {status === "success" && meals.length > 0 && (
        <footer className="bg-white border-t border-stone-200 py-8 px-4 text-center text-sm text-stone-500 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12">
          <div className="bg-stone-100 px-4 py-2 rounded-full">
            Showing <strong className="text-stone-800">{meals.length}</strong>{" "}
            meals.
          </div>
          <div className="font-medium">
            Implemented By{" "}
            <span className="text-orange-600 font-bold ml-1">
              Shivanshu Agrawal
            </span>
          </div>
        </footer>
      )}

      {/* Render Modal conditionally */}
      {selectedMeal && (
        <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
}

export default App;
