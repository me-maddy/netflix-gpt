import useNowPlayingMovies from "../hooks/useNowPlayingMovies";

import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryComponent from "./SecondaryComponent";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div className="w-full relative">
      <Header browse={true} />
      <MainContainer />
      <SecondaryComponent />
    </div>
  );
};

export default Browse;
