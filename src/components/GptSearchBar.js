import { useDispatch, useSelector } from "react-redux";
import lan from "../utils/languageConstant";
import { useRef, useState } from "react";
import { useOpenaiKey } from "../utils/openai";
import { API_Options } from "../utils/constant";
import {
  addGptMovieResult,
  toggleSearchWithMovieName,
} from "../utils/gptSlice";

const GptSearchBar = () => {
  const language = useSelector((store) => store.language.lan);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const openai = useOpenaiKey();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchWithMovieName = useSelector(
    (store) => store.gpt.searchWithMovieName
  );

  const handleToggleSearch = () => {
    dispatch(toggleSearchWithMovieName());
    dispatch(
      addGptMovieResult({
        movieNames: null,
        movieResults: null,
      })
    );
  };

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_Options
    );
    const json = await data.json();
    return json;
  };

  const handleSearchGpt = async () => {
    if (searchText.current.value === "") {
      setMessage("Enter a correct movie name!");
      return;
    }

    // Search movie using movie name without gpt api
    if (searchWithMovieName) {
      try {
        setLoading(true);
        const movieResponse = searchMovieTMDB(searchText.current.value);
        const resolveResponse = await Promise.resolve(movieResponse);
        if (!resolveResponse.results || resolveResponse.results.length === 0) {
          setMessage("I think there is no movie available with this name.");
          setLoading(false);
          return;
        }
        setLoading(false);
        setMessage(null);
        dispatch(
          addGptMovieResult({
            movieNames: searchText.current.value,
            movieResults: resolveResponse,
          })
        );
        searchText.current.value = "";
        return;
      } catch (error) {
        setMessage(error.message);
      }
    }

    // Make an Api call to GPT API and get movie results
    const gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of five movies, comma separated like the example result given ahead. Example Result : Gadar, Don, RRR, Pushpa, Koi Mil Gya";

    try {
      setLoading(true);
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });
      if (gptResults) {
        if (!gptResults.choices) return;
        const gptMovieNames =
          gptResults?.choices?.[0]?.message?.content?.split(",");
        setLoading(false);
        // const movieNames = ["Spider", "Pushpa", "KGF", "RRR", "Golmaal"];
        const pendingApiMovies = gptMovieNames.map((movie) =>
          searchMovieTMDB(movie)
        );
        const movieResults = await Promise.all(pendingApiMovies);
        setMessage(null);
        dispatch(
          addGptMovieResult({
            movieNames: gptMovieNames,
            movieResults: movieResults,
          })
        );
      }
    } catch (error) {
      if (error.status === 429) {
        setMessage(
          "Error 429! You exceeded your current quota, please check your plan and billing details on openai platform."
        );
      } else {
        setMessage(error.message);
      }
    }
    setLoading(false);
    searchText.current.value = "";

    // if (!gptResults.choices) {
    // }
  };

  return (
    <div className="z-10">
      <form
        className=" pt-[40%] min-[330px]:pt-[35%] min-[430px]:pt-[27%] sm:pt-[10%] lg:pt-[8%]"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="w-3/4 lg:w-1/2 bg-black bg-opacity-70 pt-2 sm:pt-4 p-2 min-[480px]:p-4 mx-auto">
          <h1 className="sm:text-2xl text-lg lg:text-4xl text-white mb-1.5 md:mb-2.5 lg:mb-4 text-center">
            Search
          </h1>
          <div className="flex w-full">
            <input
              ref={searchText}
              type="text"
              placeholder={
                searchWithMovieName
                  ? "What movie do you want to watch today?"
                  : lan[language].placeholderText
              }
              className="lg:px-4 px-1 sm:px-2.5 py-2 w-9/12 font-medium outline-none text-gray-600 text-[10px] min-[450px]:text-sm sm:text-base "
            />
            <button
              className="bg-red-700 text-white flex justify-center items-center px-4 py-2 w-3/12 hover:opacity-70 transition-opacity duration-200 ease-in sm:text-base text-[10px] min-[450px]:text-sm"
              onClick={handleSearchGpt}
            >
              {loading ? (
                <span className="sm:w-5 w-4 animate-spin h-4 sm:h-5 relative z-20 border-4 rounded-full border-gray-600 border-solid border-t-gray-100 inline-block"></span>
              ) : (
                lan[language].Search
              )}
            </button>
          </div>

          {(searchWithMovieName || message) && (
            <div className="mt-2">
              <p
                className={` p-1 text-gray-300 text-[10px] min-[450px]:text-xs sm:text-sm font-medium ${
                  message && "text-red-600"
                } `}
              >
                {message ? message : "Write a movie name to search movie."}
              </p>
              {searchWithMovieName && (
                <p className=" p-1 text-gray-300 text-[10px] min-[450px]:text-xs sm:text-sm font-medium pt-0">
                  Do you want to search movie using query & gpt api?{" "}
                  <span
                    className="text-red-600 cursor-pointer hover:opacity-60 transition-opacity duration-200 ease-in-out"
                    onClick={handleToggleSearch}
                  >
                    GPT Search
                  </span>
                </p>
              )}
            </div>
          )}

          {}
        </div>
      </form>
    </div>
  );
};

export default GptSearchBar;
