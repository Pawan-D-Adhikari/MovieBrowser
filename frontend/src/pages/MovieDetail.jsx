import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovieDetail, getGenre } from "../api/movie";
import Navbar from "../components/Navbar";
function MovieDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("q");
  const [results, setResults] = useState(null);
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
    if (!id) return;
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieDetail(id);
        setResults(data);
      } catch (err) {
        setError("Failed to fetch results.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!results) return <p>No movie found.</p>;

  return (
    <div>
      <Navbar />
      <pre className="text-white text-xs p-4">
        {JSON.stringify(results, null, 2)}
      </pre>
    </div>
  );
}

export default MovieDetail;
