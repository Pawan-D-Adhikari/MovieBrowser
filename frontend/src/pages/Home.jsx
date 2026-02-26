import { useEffect, useState } from "react";
import { getTrending } from "../api/movie";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrending();
        setMovies(data);
      } catch (err) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div>
      <h1>🎬 Movie Browser</h1>
      <p>Trending This Week</p>

      {loading && <p>Loading Movies...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div>
          {movies.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
