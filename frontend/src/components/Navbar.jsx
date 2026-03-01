import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "./FilterCard";

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  const filterButtonRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(e.target)
      ) {
        setShowFilter(false);
      }
    };
    if (showFilter) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilter]);

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-between px-6 py-4 w-full bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-700/50">
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
      <div
        ref={filterButtonRef}
        onClick={() => setShowFilter((prev) => !prev)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium cursor-pointer select-none transition-colors duration-200
              ${
                showFilter
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-red-500 hover:text-white"
              }`}
      >
        Filter
      </div>
      {showFilter && (
        <div
          ref={filterRef}
          className="absolute right-4 top-full  w-100 rounded-2xl shadow-2xl border border-zinc-700/60 overflow-hidden"
        >
          <Filter />
        </div>
      )}
    </div>
  );
}

export default Navbar;
