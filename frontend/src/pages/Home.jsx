import { useEffect, useState } from "react";
import { getTrending, getTopRated, getUpcoming } from "../api/movie";
import MovieCard from "../components/MovieCard";
import Hero from "../components/Hero";

function Home() {
  const [trending, setTrending] = useState([]);
  const [toprated, setToprated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="">
      <h1>🎬 Movie Browser</h1>
      {trending.length > 0 && <Hero movie={trending[0]} />}

      {loading && <p>Loading Movies...</p>}

      {error && <p>{error}</p>}

      <div className="flex flex-col ">
        <p>Trending This Week</p>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {trending.map((movie) => (
            <div key={movie.id} className="shrink-0">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col ">
        <p>Top Rated Moives</p>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide mt-1 mb-1">
          {toprated.map((movie) => (
            <div key={movie.id} className="shrink-0">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col ">
        <p>Upcoming</p>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {upcoming.map((movie) => (
            <div key={movie.id} className="shrink-0">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
