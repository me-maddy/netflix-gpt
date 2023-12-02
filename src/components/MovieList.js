import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // console.log(movies);
  if (!movies) return;
  return (
    <div className="mb-12 ">
      <h1 className="font-bold text-lg mb-2 text-white">{title}</h1>
      <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div className="flex">
          {movies.map((movie) => {
            return movie?.poster_path ? (
              <MovieCard key={movie?.id} img_id={movie?.poster_path} />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
