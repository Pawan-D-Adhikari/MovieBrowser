import { useEffect, useState } from "react";
import { getTrending, getTopRated, getUpcoming, getGenre } from "../api/movie";
import MovieCard from "../components/MovieCard";
import Hero from "../components/Hero";
import { Carousel } from "@mantine/carousel";

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

      <div className="flex flex-col px-4 py-3 min-w-0 w-full ">
        <p className="text-white font-bold text-lg mb-2">Trending This Week</p>

        <Carousel
          slideSize="10%"
          breakpoints={[
            { maxWidth: 1536, slideSize: "12%" },
            { maxWidth: 1280, slideSize: "15%" },
            { maxWidth: 1024, slideSize: "20%" },
            { maxWidth: 768, slideSize: "30%" },
            { maxWidth: 480, slideSize: "50%" },
          ]}
          slideGap="md"
          align="start"
          loop
        >
          {trending.map((movie) => (
            <Carousel.Slide key={movie.id}>
              <MovieCard movie={movie} genres={genres} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
      <div className="flex flex-col px-4 py-3 min-w-0 w-full">
        <p className="text-white font-bold text-lg mb-2">Top Rated Moives</p>
        <Carousel
          slideSize="10%"
          breakpoints={[
            { maxWidth: 1536, slideSize: "12%" },
            { maxWidth: 1280, slideSize: "15%" },
            { maxWidth: 1024, slideSize: "20%" },
            { maxWidth: 768, slideSize: "30%" },
            { maxWidth: 480, slideSize: "50%" },
          ]}
          slideGap="md"
          align="start"
          loop
        >
          {toprated.map((movie) => (
            <Carousel.Slide key={movie.id}>
              <MovieCard movie={movie} genres={genres} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
      <div className="flex flex-col px-4 py-3 min-w-0 w-full">
        <p className="text-white font-bold text-lg mb-2">Upcoming</p>
        <Carousel
          slideSize="10%"
          breakpoints={[
            { maxWidth: 1536, slideSize: "12%" },
            { maxWidth: 1280, slideSize: "15%" },
            { maxWidth: 1024, slideSize: "20%" },
            { maxWidth: 768, slideSize: "30%" },
            { maxWidth: 480, slideSize: "50%" },
          ]}
          slideGap="md"
          align="start"
          loop
        >
          {upcoming.map((movie) => (
            <Carousel.Slide key={movie.id}>
              <MovieCard movie={movie} genres={genres} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
export default Home;
