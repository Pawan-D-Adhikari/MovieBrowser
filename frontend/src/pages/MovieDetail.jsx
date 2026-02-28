import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovieDetail, getSimilarMovies, getGenre } from "../api/movie";
import Navbar from "../components/Navbar";
import ActorCard from "../components/ActorCard";
import { Carousel } from "@mantine/carousel";
import MovieCard from "../components/MovieCard";
function MovieDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("q");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [similargenres, setSimilarGenres] = useState([]);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieDetail(id);
        setResults(data);
        const similarmovie = await getSimilarMovies(id);
        setSimilar(similarmovie);
        const GenreData = await getGenre();
        setSimilarGenres(GenreData);
      } catch (err) {
        setError("Failed to fetch results.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);
  if (loading)
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  if (error) return <p>{error}</p>;
  if (!results)
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-red-400">
        {error || "Movie not found."}
      </div>
    );

  const cast = results.credits?.cast?.slice(0, 10) || [];
  const genres = results.genres?.map((g) => g.name) || [];
  const backdropUrl = results.backdrop_path
    ? `https://image.tmdb.org/t/p/original${results.backdrop_path}`
    : null;
  const posterUrl = results.poster_path
    ? `https://image.tmdb.org/t/p/w500${results.poster_path}`
    : null;
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="relative h-80 overflow-hidden">
        {backdropUrl && (
          <img
            src={backdropUrl}
            className="w-full h-full object-cover object-top opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 to-transparent" />
      </div>
      <div className=" px-4 -mt-20 pb-16 relative">
        <div className="flex gap-5 items-end">
          {posterUrl && (
            <img
              src={posterUrl}
              alt={results.title}
              className="w-50 rounded-lg shadow-2xl shrink-0"
            />
          )}
          <div className="pb-1">
            <h1 className="text-2xl font-bold leading-tight">
              {results.title}
            </h1>
            {results.tagline && (
              <p className="text-sm text-gray-400 italic mt-1">
                {results.tagline}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {genres.map((g) => (
                <span
                  key={g}
                  className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-5 text-sm text-gray-400">
          {results.vote_average != null && (
            <>
              <span className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="font-semibold text-white">
                  {results.vote_average.toFixed(1)}
                </span>
                <span>/10</span>
              </span>
              <span>·</span>
            </>
          )}
          {results.release_date && (
            <>
              <span>{new Date(results.release_date).getFullYear()}</span>
              <span>·</span>
            </>
          )}
          {results.runtime > 0 && (
            <span>
              {Math.floor(results.runtime / 60)}h {results.runtime % 60}m
            </span>
          )}
        </div>
        {results.overview && (
          <p className="mt-5 text-sm text-gray-300 leading-relaxed">
            {results.overview}
          </p>
        )}
      </div>
      <div className="px-4 pb-16">
        <h2 className="text-base font-semibold mb-3 text-gray-300">Cast</h2>
        <Carousel
          slideSize={{ base: "25%", sm: "20%", md: "16.666%", lg: "12.5%" }}
          slideGap="md"
          align="start"
          loop
        >
          {cast.map((member) => (
            <Carousel.Slide key={member.id}>
              <ActorCard cast={member} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
      <h2 className="text-base font-semibold mb-3 px-4  text-gray-300">
        Similar Movies
      </h2>
      <div className="flex flex-wrap gap-4 ">
        {similar.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={similargenres} />
        ))}
      </div>
    </div>
  );
}

export default MovieDetail;
