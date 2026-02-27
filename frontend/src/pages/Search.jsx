import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/movie";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchMovies(query);
        setResults(data);
      } catch (err) {
        setError("Failed to fetch results.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [query]);

  return (
    <div className="px-4 py-6 text-white">
      <div className="bg-zinc-800 border-b border-zinc-700">
        <Navbar />
      </div>
      <p className="text-lg font-bold mb-4">Results for: "{query}"</p>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && results.length === 0 && <p>No results found.</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={[]} />
        ))}
      </div>
    </div>
  );
}

export default Search;
