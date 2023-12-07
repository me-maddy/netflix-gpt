import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Logo, Profile_Logo } from "../utils/constant";
import { removeGptMovieResult, toggleGptSearchView } from "../utils/gptSlice";
import { toggleLanguage } from "../utils/languageSlice";
import { Supported_Lng } from "../utils/constant";

const Header = (props) => {
  const { browse } = props;
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in/signed up
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unSubscribe to onAuthStateChanged when component unmounts
    return () => {
      unSubscribe();
    };
  }, []);

  const handleGptSearchClick = () => {
    if (showGptSearch) dispatch(removeGptMovieResult());
    dispatch(toggleGptSearchView());
  };

  const handleLanguageClick = (e) => {
    dispatch(toggleLanguage(e.target.value));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <header
      className={` top-0 left-0 w-full items-center absolute z-30 flex sm:flex-row flex-col bg-gradient-to-b ${
        browse
          ? "min-[330px]:py-2 py-1 lg:py-2.5 lg:px-8 xl:px-12 md:px-4 min-[330px]:px-3 px-1.5  from-black to-transparent"
          : "py-3  px-6 from-black"
      }`}
    >
      <img
        src={Logo}
        alt="Logo"
        className={`${
          browse
            ? "lg:w-[120px] w-20 min-[330px]:w-24 sm:w-[88px] md:w-[104px] cursor-pointer"
            : "w-56"
        } `}
      />
      {browse && (
        <div className="flex w-full sm:flex-row flex-col justify-between items-center">
          <nav className="ml-0 sm:ml-3 lg:ml-8 ">
            <ul className="text-gray-50 font-semibold  gap-x-2 min-[330px]:gap-x-3 lg:gap-x-5 items-center text-xs min-[330px]:text-sm lg:text-base flex">
              <li>
                <Link className="visited:text-gray-50 visited:opacity-100 hover:opacity-60 transition-opacity duration-150 ease-in">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:opacity-60 transition-opacity duration-150 ease-in">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link className="hover:opacity-60 transition-opacity duration-150 ease-in">
                  Movies
                </Link>
              </li>
              <li>
                <Link className="hover:opacity-60 transition-opacity duration-150 ease-in">
                  New & Popular
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex w-full justify-between  mt-2 sm:mt-0 sm:justify-normal sm:w-auto sm:gap-x-3 md:gap-x-4 lg:gap-x-5 items-center">
            <button
              className="lg:px-3 px-2 py-1 md:py-1.5 hover:opacity-70 transition-opacity text-xs min-[330px]:text-sm lg:text-base duration-200 ease-in text-white bg-violet-800 rounded"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Homepage" : "GPT Search"}
            </button>
            <div className="hidden md:block">
              <SearchIcon
                sx={{ fontSize: 28, color: "#fafafa" }}
                className="cursor-pointer"
              />
            </div>
            <div className="hidden md:block">
              <NotificationsNoneIcon
                sx={{ fontSize: 28, color: "#fafafa" }}
                className="cursor-pointer"
              />
            </div>
            <div className="flex  items-center gap-x-2 sm:gap-x-2.5 md:gap-x-4 lg:gap-x-5">
              <div className={`relative  ${!showGptSearch && "pr-2"}`}>
                <div
                  className="group peer flex gap-x-1 sm:gap-x-2 cursor-pointer"
                  onClick={() => {
                    setIsVisible(!isVisible);
                  }}
                >
                  <img
                    src={Profile_Logo}
                    alt="Profile Logo"
                    className="rounded-md lg:w-8 lg:h-8 w-6 h-6 object-cover"
                  />
                  <div className="relative group-hover:after:rotate-180 group-hover:after:-bottom-[5px]  lg:group-hover:after:-bottom-1.5 group-hover: -translate-y-1/2 after:content-[''] after:absolute  after:border-solid after:border-[5px] lg:after:border-[6px]  after:border-transparent after:-bottom-2.5 lg:after:-bottom-3 after:border-t-gray-50 after:transition-transform after:duration-150 after:ease-linear"></div>
                </div>
                <div
                  className={`absolute pointer-events-none hover:opacity-100 hover:pointer-events-auto opacity-0 peer-hover:pointer-events-auto peer-hover:opacity-100 transition-opacity delay-300 duration-600 ease-out after:content-[''] after:absolute after:border-solid after:border-[6px] lg:after:border-8 after:border-transparent after:border-b-gray-200  after:-top-3 lg:after:-top-4 w-56 text-xs md:text-sm font-medium  bg-black bg-opacity-80 text-white top-9 lg:top-[52px] ${
                    isVisible && "pointer-events-auto opacity-100"
                  } ${
                    showGptSearch
                      ? "-right-[18px] sm:-right-3.5 lg:-right-3 after:right-7"
                      : "lg:-right-1 right-[2px] sm:-right-1.5 after:right-4 sm:after:right-7"
                  }`}
                >
                  <div className="w-full flex flex-col gap-y-1 sm:gap-y-2 py-1.5 sm:py-3 px-1 sm:px-2">
                    <div className="flex items-center gap-x-1.5 sm:gap-x-2">
                      <EditOutlinedIcon
                        sx={{ fontSize: 26 }}
                        className="cursor-pointer peer"
                      />{" "}
                      <span className="peer-hover:underline hover:underline cursor-pointer">
                        Manage Profile
                      </span>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <PersonOutlineOutlinedIcon
                        sx={{ fontSize: 26 }}
                        className="cursor-pointer peer"
                      />{" "}
                      <span className="peer-hover:underline hover:underline cursor-pointer">
                        Account
                      </span>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <ContactSupportOutlinedIcon
                        sx={{ fontSize: 26 }}
                        className="cursor-pointer peer"
                      />{" "}
                      <span className="peer-hover:underline cursor-pointer hover:underline">
                        Help Center
                      </span>
                    </div>
                  </div>
                  <p
                    className="text-center cursor-pointer hover:underline border-t-gray-600 border-t-[0.1px] border-solid w-full py-2 sm:py-3"
                    onClick={handleSignOut}
                  >
                    Sign out of Netflix
                  </p>
                </div>
              </div>
              {showGptSearch && (
                <div className="relative ml-2">
                  <select
                    className="bg-transparent text-white text-xs min-[330px]:text-sm sm:text-base lg:text-lg px-2 py-1 outline-none [-webkit-appearance]:none appearance-none peer cursor-pointer"
                    onChange={handleLanguageClick}
                  >
                    {Supported_Lng.map((language) => (
                      <option
                        value={language.identifier}
                        key={language.identifier}
                        className="bg-black px-2"
                      >
                        {language.name}
                      </option>
                    ))}
                  </select>
                  <span className="absolute peer-hover:opacity-100 opacity-0 transition-opacity duration-200 ease-in text-gray-400 text-[10px] lg:text-xs right-0 -top-1.5 sm:-right-1 lg:-right-4 lg:-top-2 ">
                    Language
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
