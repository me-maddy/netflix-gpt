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
import { useDispatch } from "react-redux";

const Header = (props) => {
  const { browse } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
  }, []);

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
      className={`top-0 left-0 w-full items-center absolute flex bg-gradient-to-b ${
        browse
          ? "py-2.5 px-12 from-black to-transparent"
          : "py-3  px-6 from-black"
      }`}
    >
      <img
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Logo"
        className={`${browse ? "w-[120px]" : "w-56"} `}
      />
      {browse && (
        <div className="flex w-full justify-between items-center pr-3">
          <nav className="ml-8">
            <ul className="text-gray-50 font-semibold gap-x-5 items-center text-base flex">
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
              <li>
                <Link className="hover:opacity-60 transition-opacity duration-150 ease-in">
                  My List
                </Link>
              </li>
              <li>
                <Link className="hover:opacity-60 transition-opacity duration-150 ease-in">
                  Browse by Languages
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex gap-x-5 items-center">
            <div>
              <SearchIcon sx={{ fontSize: 30, color: "#fafafa" }} />
            </div>
            <div>
              <NotificationsNoneIcon sx={{ fontSize: 30, color: "#fafafa" }} />
            </div>
            <div className="relative ">
              <div
                className="group peer flex gap-x-2 cursor-pointer"
                onClick={() => {
                  setIsVisible(!isVisible);
                }}
              >
                <img
                  src="https://occ-0-6246-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdYJV5wt63AcxNaDoqDXUhqZb55oN5Dxt1m-Zdn_z5rn_hIq9m8dA8JB2xdcPmrY3yXnlVWYKPXnOrbv2QN4aEVU28dESJg.png?r=1d4"
                  alt="Profile Logo"
                  className="rounded-md"
                />
                <div className="relative group-hover:after:rotate-180 group-hover:after:-bottom-1.5 group-hover: -translate-y-1/2 after:content-[''] after:absolute  after:border-solid after:border-[6px]  after:border-transparent after:-bottom-3 after:border-t-gray-50 after:transition-transform after:duration-150 after:ease-linear"></div>
              </div>
              <div
                className={`absolute pointer-events-none hover:opacity-100 hover:pointer-events-auto opacity-0 peer-hover:pointer-events-auto peer-hover:opacity-100 transition-opacity delay-300 duration-600 ease-out after:content-[''] after:absolute after:border-solid after:border-8 after:border-transparent after:border-b-gray-200  after:right-7 after:-top-4 w-56 text-sm font-medium -right-3 bg-black bg-opacity-80 text-white top-[52px] ${
                  isVisible && "pointer-events-auto opacity-100"
                }`}
              >
                <div className="w-full flex flex-col gap-y-2 py-3 px-2">
                  <div className="flex items-center gap-x-2">
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
                  className="text-center cursor-pointer hover:underline border-t-gray-600 border-t-[0.1px] border-solid w-full py-3"
                  onClick={handleSignOut}
                >
                  Sign out of Netflix
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
