import { useNavigate } from "react-router-dom";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie, genres = [] }) {
  const navigate = useNavigate();
  const movieGenres = (movie.genre_ids || [])
    .slice(0, 2)
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter(Boolean);

  const poster = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : "https://placehold.co/300x450?text=No+Image";

  const rating = movie.vote_average?.toFixed(1);
  const year = movie.release_date?.split("-")[0];

  return (
    <div
      onClick={() => navigate(`/movie?q=${encodeURIComponent(movie.id)}`)}
      className="bg-zinc-900 rounded-xl w-40 mb-1  cursor-pointer hover:scale-101 mt-1 ml-1 hover:ring-2 hover:ring-yellow-400 transition-all duration-200"
    >
      <div className="relative rounded-xl overflow-hidden h-64">
        <img
          src={poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs font-bold px-2 py-1 rounded-md">
          ⭐ {rating}
        </span>
      </div>
      <div className="p-3">
        <h3 className="text-white text-sm font-semibold truncate ">
          {movie.title}
        </h3>
        <p className="text-zinc-400 text-xs mt-1">{year}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {movieGenres.map((genre) => (
            <span
              key={genre}
              className="bg-zinc-700 text-zinc-300 text-[10px] px-2 py-0.5 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
