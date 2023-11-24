import { useSelector } from "react-redux";
import useTrailer from "../hooks/useTrailer";

const VideoBackground = ({ id }) => {
  useTrailer(id);

  const trailer = useSelector((store) => store.movie.movieTrailer);
  // console.log(trailer);

  return (
    <div className="w-full">
      <iframe
        className="w-full bg-opacity-80 aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailer?.key +
          "?autoplay=1&mute=1&controls=0"
        }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
