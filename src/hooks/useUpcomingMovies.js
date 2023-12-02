import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../utils/constant";
import { useEffect } from "react";
import { addUpcomingMovies } from "../utils/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movie.upcomingMovies);
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming",
      API_Options
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    if (!upcomingMovies) getMovieVideo();
  }, []);
};

export default useUpcomingMovies;
