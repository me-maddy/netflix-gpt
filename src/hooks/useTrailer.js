import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../utils/constant";
import { addMovieTrailer } from "../utils/movieSlice";
import { useEffect } from "react";

const useTrailer = (id) => {
  const dispatch = useDispatch();
  const movieTrailer = useSelector((store) => store.movie.movieTrailer);
  const getMovieVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      API_Options
    );
    const json = await data.json();
    const filteredData = json?.results?.filter(
      (element) => element.type === "Trailer"
    );
    const trailer = filteredData.length ? filteredData[1] : json?.results[0];
    dispatch(addMovieTrailer(trailer));
  };

  useEffect(() => {
    if (!movieTrailer) getMovieVideo();
  }, []);
};

export default useTrailer;
