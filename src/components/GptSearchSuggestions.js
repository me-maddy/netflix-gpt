import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptSearchSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) {
    return null;
  }
  return (
    <div className="bg-black bg-opacity-90 text-white sm:px-6 sm:py-4 px-4 py-2 md:px-8 md:py-6 mt-20">
      <div>
        {Array.isArray(movieNames) ? (
          movieNames.map((movieName, index) => (
            <MovieList
              key={movieName}
              title={movieName}
              movies={movieResults[index].results}
            />
          ))
        ) : (
          <MovieList title={movieNames} movies={movieResults.results} />
        )}
      </div>
    </div>
  );
};

export default GptSearchSuggestions;
