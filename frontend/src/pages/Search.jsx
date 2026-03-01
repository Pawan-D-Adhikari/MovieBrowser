import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies, getGenre } from "../api/movie";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import { Loader, Center } from "@mantine/core";
function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const GenreData = await getGenre();
        setGenres(GenreData);
      } catch (err) {
        console.error("Failed to fetch genres");
      }
    };
    fetchGenres();
  }, []);

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
    <div className="  text-white">
      <div className="bg-zinc-800 border-b border-zinc-700 ">
        <Navbar />
      </div>
      <div className="px-4 py-4">
        <p className="text-lg font-bold mb-3">Results for: "{query}"</p>
        {loading && (
          <Center className="min-h-screen bg-gray-950">
            <Loader size="xl" color="blue" variant="dots" />
          </Center>
        )}
        {error && <p className="text-red-400">{error}</p>}
        {!loading && results.length === 0 && <p>No results found.</p>}
        <div className="flex flex-wrap gap-4 ">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
