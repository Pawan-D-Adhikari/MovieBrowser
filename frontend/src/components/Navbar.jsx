import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [search]);
  useEffect(() => {
    if (!debouncedSearch.trim()) return;
    navigate(`/search?q=${encodeURIComponent(debouncedSearch.trim())}`);
  }, [debouncedSearch, navigate]);
  return (
    <div className="flex items-center justify-between px-6 py-4 w-full bg-zinc-900/95 backdrop-blur-sm  border-zinc-700/50">
      <span
        className="text-white font-extrabold text-2xl tracking-tight cursor-pointer select-none hover:opacity-80 transition-opacity"
        onClick={() => navigate("/")}
      >
        🎬 Movie<span className="text-red-500">Browser</span>
      </span>

      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍  Search movies..."
          className="bg-zinc-800 text-white placeholder-zinc-500 text-sm px-4 py-2.5 rounded-xl border border-zinc-700 focus:border-red-500 focus:ring-1 focus:ring-red-500/40 outline-none w-72 transition-all duration-200"
        />
      </form>
    </div>
  );
}

export default Navbar;
