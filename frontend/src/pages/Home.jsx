import { useEffect, useState } from "react";
import { getTrending, getTopRated, getUpcoming, getGenre } from "../api/movie";
import MovieCard from "../components/MovieCard";
import Hero from "../components/Hero";

function Home() {
  const [trending, setTrending] = useState([]);
  const [toprated, setToprated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const Trendingdata = await getTrending();
        setTrending(Trendingdata);
        const Toprateddata = await getTopRated();
        setToprated(Toprateddata);
        const Upcomingdata = await getUpcoming();
        setUpcoming(Upcomingdata);
        const GenreData = await getGenre();
        setGenres(GenreData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="overflow-x-hidden overflow-y-auto w-full">
      {trending.length > 0 && <Hero movie={trending[0]} />}

      {loading && <p>Loading Movies...</p>}

      {error && <p>{error}</p>}

      <div className="flex flex-col px-4 py-3 min-w-0 w-full">
        <p className="text-white font-bold text-lg mb-2">Trending This Week</p>
        <div className="flex overflow-x-auto overflow-y-hidden gap-3 pb-2 scrollbar-hide">
          {trending.map((movie) => (
            <div key={movie.id} className="shrink-0">
              <MovieCard movie={movie} genres={genres} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col px-4 py-3 min-w-0 w-full">
        <p className="text-white font-bold text-lg mb-2">Top Rated Moives</p>
        <div className="flex overflow-x-auto overflow-y-hidden gap-3 pb-2 scrollbar-hide">
          {toprated.map((movie) => (
            <div key={movie.id} className="shrink-0">
              <MovieCard movie={movie} genres={genres} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col px-4 py-3 min-w-0 w-full">
        <p className="text-white font-bold text-lg mb-2">Upcoming</p>
        <div className="flex overflow-x-auto overflow-y-hidden gap-3 pb-2 scrollbar-hide">
          {upcoming.map((movie) => (
            <div key={movie.id} className="shrink-0">
              <MovieCard movie={movie} genres={genres} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
