import { useState, useEffect } from "react";

const url = "https://api.freeapi.app/api/v1/public/randomusers";

function App() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
      signal: controller.signal,
    };

    async function getUser() {
      setStatus("loading");
      setError(null);

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Unable to fetch User (${response.status})`);
        }
        const payload = await response.json();
        let userInfo = [];
        if (Array.isArray(payload.data.data)) {
          userInfo = payload.data.data;
        }
        setUsers(userInfo);
        setStatus("success");
      } catch (fetchError) {
        if (fetchError.name === "AbortError") return;
        setError(fetchError.message || "Failed to load users");
        setStatus("error");
      }
    }

    getUser();
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans p-6 md:p-10">
      <header className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
          Profiles
        </h1>
        <p className="text-neutral-400 text-lg">
          Here are a few random profiles for you
        </p>
      </header>

      <div className="flex justify-center mb-8">
        {status === "loading" && (
          <span className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm font-medium text-neutral-300 shadow-sm">
            <svg
              className="w-5 h-5 animate-spin text-neutral-500"
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
            Fetching Users...
          </span>
        )}

        {status === "error" && (
          <span className="flex items-center gap-2 px-4 py-2 bg-red-950/30 border border-red-900/50 rounded-full text-sm font-medium text-red-400">
            <svg
              className="w-5 h-5"
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

      {status === "success" && (
        <main className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => {
            const email = user.email;
            const gender = user.gender;
            const age = user.dob.age;

            const name = `${user.name.title} ${user.name.first} ${user.name.last}`;
            const username = user.login.username;
            const phone = user.phone;
            const userAddress = `${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`;
            const imageUrl = user.picture.large;

            return (
              <div
                key={user.login.uuid}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="relative mb-4">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-neutral-800 shadow-md"
                  />
                </div>

                <h2 className="text-xl font-bold text-white mb-1">{name}</h2>
                <p className="text-indigo-400 text-sm font-medium mb-4">
                  @{username}
                </p>

                <div className="flex gap-2 mb-6">
                  <span className="px-3 py-1 bg-neutral-800 text-neutral-300 text-xs font-semibold rounded-md capitalize">
                    {gender}
                  </span>
                  <span className="px-3 py-1 bg-neutral-800 text-neutral-300 text-xs font-semibold rounded-md">
                    {age} yrs
                  </span>
                </div>

                <div className="w-full bg-neutral-950/50 rounded-xl p-4 text-left space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-neutral-500 text-lg leading-none">
                      📧
                    </span>
                    <p className="text-sm text-neutral-400 break-all">
                      {email}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-neutral-500 text-lg leading-none">
                      📞
                    </span>
                    <p className="text-sm text-neutral-400">{phone}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-neutral-500 text-lg leading-none">
                      📍
                    </span>
                    <p
                      className="text-sm text-neutral-400 line-clamp-2"
                      title={userAddress}
                    >
                      {userAddress}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      )}

      {status === "success" && users.length > 0 && (
        <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-800/50 flex flex-col sm:flex-row justify-between items-center text-sm text-neutral-500">
          <div className="mb-2 sm:mb-0">
            Showing <strong className="text-neutral-300">{users.length}</strong>{" "}
            users loaded successfully.
          </div>
          <div>
            Implemented By{" "}
            <span className="text-neutral-300 font-medium">
              Shivanshu Agrawal
            </span>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
