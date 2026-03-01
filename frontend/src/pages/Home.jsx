import { useEffect, useState } from "react";
import {
  getTrending,
  getTopRated,
  getUpcoming,
  getGenre,
  getPopular,
} from "../api/movie";
import MovieCard from "../components/MovieCard";
import Hero from "../components/Hero";
import { Carousel } from "@mantine/carousel";
import Navbar from "../components/Navbar";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const [trending, setTrending] = useState([]);
  const [toprated, setToprated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [otherMovies, setOtherMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
        const PopularData = await getPopular(1);
        setOtherMovies(PopularData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);
  const fetchMoreMovies = async () => {
    const nextPage = page + 1;
    const newMovies = await getPopular(nextPage);

    if (newMovies.length === 0) {
      setHasMore(false);
      return;
    }

    setOtherMovies((prev) => [...prev, ...newMovies]);
    setPage(nextPage);
  };
  return (
    <div className="overflow-x-hidden overflow-y-auto w-full">
      <Navbar />
      {trending.length > 0 && <Hero movie={trending[0]} />}

      {loading && (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
          Loading...
        </div>
      )}

      {error && <p>{error}</p>}
      {trending.length > 0 && (
        <div className="flex flex-col px-4 py-3 min-w-0 w-full ">
          <p className="text-white font-bold text-lg mb-2">
            Trending This Week
          </p>

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
      )}
      {toprated.length > 0 && (
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
      )}
      {upcoming.length > 0 && (
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
      )}
      {otherMovies?.length > 0 && (
        <div className="flex flex-col px-4 py-3 min-w-0 w-full">
          <p className="text-white font-bold text-lg mb-4">Other Movies</p>

          <InfiniteScroll
            dataLength={otherMovies.length}
            next={fetchMoreMovies}
            hasMore={hasMore}
            loader={
              <p className="text-gray-400 text-center mt-4">Loading more...</p>
            }
            endMessage={
              <p className="text-gray-500 text-center mt-4">
                No more movies to show
              </p>
            }
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 md:gap-4">
              {otherMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="w-1/2 sm:w-1/3 md:w-1/5 lg:w-1/7"
                >
                  <MovieCard movie={movie} genres={genres} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}
export default Home;
