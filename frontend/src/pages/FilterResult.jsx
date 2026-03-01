import { useEffect, useState } from "react";
import { getFilteredMovies, getGenre } from "../api/movie";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import { useFilterStore } from "../store/filterStore";

function FilterResult() {
  const {
    sort,
    year,
    minRating,
    maxRating,
    genres: selectedIds,
  } = useFilterStore();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const filters = {
          sort,
          year: year || null,
          minRating: minRating !== 0 ? minRating : null,
          maxRating: maxRating !== 10 ? maxRating : null,
          genres: selectedIds.length > 0 ? selectedIds.join(",") : null,
        };

        const data = await getFilteredMovies(filters);

        const GenreData = await getGenre();
        setGenres(GenreData);

        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [sort, year, minRating, maxRating, selectedIds.join(",")]);

  if (loading) return <div className="text-white p-6">Loading...</div>;

  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="bg-gray-950 min-h-screen p-6 pt-24">
        <h1 className="text-white text-xl font-bold mb-6">Filter Results</h1>

        {movies.length === 0 ? (
          <p className="text-gray-400">No movies found</p>
        ) : (
          <div className="flex flex-wrap gap-4 ">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} genres={genres} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default FilterResult;
