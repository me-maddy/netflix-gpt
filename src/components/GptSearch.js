import { useSelector } from "react-redux";
import { Browse_Bg } from "../utils/constant";
import GptSearchBar from "./GptSearchBar";
import GptSearchSuggestions from "./GptSearchSuggestions";
import GetUserOpenaiKey from "./GetUserOpenaiKey";

const GptSearch = () => {
  const userOpenaiKey = useSelector((store) => store.gpt.userOpenaiKey);
  const searchWithMovieName = useSelector(
    (store) => store.gpt.searchWithMovieName
  );
  return (
    <div className="w-full">
      <div className="fixed w-full -z-10">
        <img
          src={Browse_Bg}
          alt="bg_Img"
          className="h-screen w-full object-cover"
        />
      </div>
      {userOpenaiKey || searchWithMovieName ? (
        <>
          <GptSearchBar />
          <GptSearchSuggestions />
        </>
      ) : (
        <GetUserOpenaiKey />
      )}
    </div>
  );
};

export default GptSearch;
