import { useNavigate } from "react-router-dom";
import { useState } from "react";
const IMG_BASE = "https://image.tmdb.org/t/p/original";

function Hero({ movie }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  if (!movie) return null;
  const backdrop = movie.backdrop_path
    ? `${IMG_BASE}${movie.backdrop_path}`
    : "";

  const year = movie.release_date.split("-")[0];
  const rating = movie.vote_average.toFixed(1);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div className="relative w-full h-120 overflow-hidden ">
      {backdrop && (
        <img
          src={backdrop}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />
      <div className="absolute top-0 left-0 right-0 flex items-center px-5 py-3">
        <span className="text-white font-extrabold text-lg drop-shadow">
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
            className="bg-red-500 hover:bg-red-400 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
            style={{ backgroundColor: search.trim() ? undefined : "#6b7280" }}
          >
            Search
          </button>
        </form>
      </div>
      <div className="absolute  bottom-0 left-0 flex flex-col gap-2.5 p-7">
        <div className="flex items-center gap-2.5  ">
          <span className="bg-red-600 text-white text-xs  font-bold uppercase px-2.5 py-1 rounded">
            {" "}
            🔥Trending
          </span>
          {year && <span className="text-white/70 text-sm">{year}</span>}
          {rating && <span className="text-white/70 text-sm">⭐ {rating}</span>}
        </div>
        <h2 className="text-4xl font-extrabold text-white leading-tight drop-shadow-lg">
          {movie.title}
        </h2>
        <p className="text-white/75 text-sm leading-relaxed line-clamp-3">
          {movie.overview}
        </p>
        <div className="flex gap-3 mt-2">
          <div
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="inline-block bg-red-500  active:bg-red-600 text-white hover:text-white text-sm font-bold px-6 py-2.5 rounded-lg border-2 border-transparent hover:bg-black hover:border-zinc-400 shadow-lg transition-all cursor-pointer select-none mt-1"
          >
            View Details
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;
