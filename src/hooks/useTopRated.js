import { useDispatch } from "react-redux";
import { API_Options } from "../utils/constant";
import { useEffect } from "react";
import { addTopRatedMovies } from "../utils/movieSlice";

const useTopRated = () => {
  const dispatch = useDispatch();
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      API_Options
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    getMovieVideo();
  }, []);
};

export default useTopRated;
