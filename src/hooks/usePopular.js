import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../utils/constant";
import { useEffect } from "react";
import { addPopularMovies } from "../utils/movieSlice";

const usePopular = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movie.popularMovies);
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      API_Options
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    if (!popularMovies) getMovieVideo();
  }, []);
};

export default usePopular;
