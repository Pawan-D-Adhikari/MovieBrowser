import { useNavigate } from "react-router-dom";
const IMG_BASE = "https://image.tmdb.org/t/p/original";

function Hero({ movie }) {
  const navigate = useNavigate();
  if (!movie) return null;
  const backdrop = movie.backdrop_path
    ? `${IMG_BASE}${movie.backdrop_path}`
    : "";

  const year = movie.release_date.split("-")[0];
  const rating = movie.vote_average.toFixed(1);

  return (
    <div className="relative w-full h-125 overflow-hidden rounded-2xl">
      <img src={`${backdrop}`} className="absolute w-full h-full "></img>
      <div className="absolute  bottom-0 left-0 flex flex-col gap-3 p-8">
        <div className="flex items-center gap-3 flex-wrap ">
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
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:-translate-y-0.5"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
export default Hero;
