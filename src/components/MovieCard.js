import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ img_id }) => {
  return (
    <div className="w-48 mr-3 relative after:content-[''] after:h-0 after:w-full after:bg-black after:absolute after:bottom-0 after:left-0 after:bg-opacity-30 after:hover:h-full after:transition-all after:ease-in after:duration-300 after:cursor-pointer">
      <img
        src={IMG_CDN_URL + img_id}
        alt=""
        className="object-cover rounded cursor-pointer"
      />
    </div>
  );
};

export default MovieCard;
