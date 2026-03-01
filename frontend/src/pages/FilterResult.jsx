import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilteredMovies, getGenre } from "../api/movie";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";

function FilterResult() {
  const [searchParams] = useSearchParams();

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
          sort: searchParams.get("sort"),
          year: searchParams.get("year"),
          minRating: searchParams.get("minRating"),
          maxRating: searchParams.get("maxRating"),
          genres: searchParams.get("genres"),
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
  }, [searchParams]);

  if (loading) return <div className="text-white p-6">Loading...</div>;

  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="bg-gray-950 min-h-screen p-6">
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
