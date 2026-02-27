import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div className="flex items-center justify-between px-5 py-3 w-full">
      <span
        className="text-white font-extrabold text-lg drop-shadow cursor-pointer"
        onClick={() => navigate("/")}
      >
        🎬 Movie<span className="text-red-500">Browser</span>
      </span>
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies..."
          className="bg-white/10 text-white placeholder-white/50 text-sm px-4 py-2 rounded-lg border border-white/20 focus:border-white/50 outline-none w-64 transition-all"
        />
        <button
          type="submit"
          className="text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
          style={{ backgroundColor: search.trim() ? "#ef4444" : "#6b7280" }}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Navbar;
