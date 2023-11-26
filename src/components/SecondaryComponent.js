import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryComponent = () => {
  const movies = useSelector((store) => store.movie);
  return (
    <div className="bg-black bg-opacity-95 p-14 pb-4">
      <div className="-mt-52">
        <MovieList title="Now Playing" movies={movies?.nowPlayingMovies} />
        <MovieList title="Top Rated" movies={movies?.topRatedMovies} />
        <MovieList title="Popular" movies={movies?.popularMovies} />
        <MovieList title="Upcoming" movies={movies?.upcomingMovies} />
        <MovieList title="Top Searches" movies={movies?.nowPlayingMovies} />
        <MovieList title="Recently Added" movies={movies?.topRatedMovies} />
      </div>
    </div>
  );
};

export default SecondaryComponent;
