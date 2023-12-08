import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopular from "../hooks/usePopular";
import useTopRated from "../hooks/useTopRated";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";

import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryComponent from "./SecondaryComponent";
import Footer from "./Footer";

const Browse = () => {
  useNowPlayingMovies();
  usePopular();
  useTopRated();
  useUpcomingMovies();
  const toggleGpt = useSelector((store) => store.gpt.showGptSearch);
  // console.log(toggleGpt);

  return (
    <div className="w-full min-h-screen relative">
      <Header browse={true} />
      {toggleGpt ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryComponent />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Browse;
