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
import { Loader, Center } from "@mantine/core";

function Home() {
  const [trending, setTrending] = useState([]);
  const [toprated, setToprated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

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
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const newMovies = await getPopular(nextPage);

      if (newMovies.length === 0) {
        setHasMore(false);
        return;
      }

      setOtherMovies((prev) => [...prev, ...newMovies]);
      setPage(nextPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };
  return (
    <div className="overflow-y-hidden w-full">
      <Navbar />
      {trending.length > 0 && <Hero movie={trending[0]} />}

      {loading && (
        <Center className="min-h-screen bg-gray-950">
          <Loader size="xl" color="blue" variant="dots" />
        </Center>
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
          <p className="text-white font-bold text-lg mb-2">Top Rated Movies</p>
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
        <div className=" relative w-full px-4 py-3 ">
          {loadingMore && (
            <Center className="mt-4">
              <Loader size="sm" color="blue" variant="dots" />
            </Center>
          )}
          <p className="text-white font-bold text-lg mb-4">Other Movies</p>
          <InfiniteScroll
            dataLength={otherMovies.length}
            next={fetchMoreMovies}
            hasMore={hasMore}
            scrollableTarget={null}
            endMessage={
              <p className="text-gray-500 text-center mt-4">
                No more movies to show
              </p>
            }
          >
            <div
              className="grid gap-3 md:gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              }}
            >
              {otherMovies.map((movie) => (
                <div key={movie.id}>
                  <MovieCard movie={movie} genres={genres} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
          {loadingMore && (
            <Center className="mt-4">
              <Loader size="sm" color="blue" variant="dots" />
            </Center>
          )}
        </div>
      )}
    </div>
  );
}
export default Home;
