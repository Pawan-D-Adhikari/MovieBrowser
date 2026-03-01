import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Filter from "./FilterCard";
import { useSearchParams } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  const filterButtonRef = useRef(null);
  const inputRef = useRef(null);
  const isSearchPage = location.pathname === "/search";

  useEffect(() => {
    if (!isSearchPage) {
      setSearch("");
      return;
    }
    const urlQuery = searchParams.get("q") ?? "";
    setSearch((prev) => (prev !== urlQuery ? urlQuery : prev));
    if (urlQuery) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timeout);
  }, [search]);
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
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
    <nav className="fixed top-0 left-0 z-50 w-full h-16 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-700/50 shadow-md shadow-black/30">
      <div className="flex items-center justify-between h-full px-6 max-w-screen-2xl mx-auto">
        <span
          className="text-white font-extrabold text-2xl tracking-tight cursor-pointer select-none hover:opacity-75 transition-opacity shrink-0"
          onClick={() => navigate("/")}
        >
          🎬 Movie<span className="text-red-500">Browser</span>
        </span>

        <div className="flex items-center gap-3">
          <input
            type="text"
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍  Search movies..."
            className="bg-zinc-800 text-white placeholder-zinc-500 text-sm px-4 py-2 rounded-xl border border-zinc-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none w-64 sm:w-80 transition-all duration-200"
          />

          <div
            ref={filterButtonRef}
            onClick={() => setShowFilter((prev) => !prev)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium cursor-pointer select-none transition-all duration-200 whitespace-nowrap
              ${
                showFilter
                  ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/25"
                  : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-red-500/70 hover:text-white hover:bg-zinc-700"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filter
          </div>
        </div>
      </div>

      {showFilter && (
        <div
          ref={filterRef}
          className="absolute right-6 top-[calc(100%+6px)] w-96 rounded-2xl shadow-2xl border border-zinc-700/60 overflow-hidden z-50"
        >
          <Filter />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
