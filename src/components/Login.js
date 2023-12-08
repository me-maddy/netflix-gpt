import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidation } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Browse_Bg } from "../utils/constant";
import Footer from "./Footer";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isErrorMsg, setIsErrorMsg] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
    setIsErrorMsg(null);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();

    if (email.current.value === "" || password.current.value === "") {
      setIsErrorMsg("Input fields should not be empty.");
      return;
    }

    if (isSignIn) {
      const result = checkValidation(
        email.current.value,
        password.current.value
      );

      setIsErrorMsg(result);
      if (result) return;
    } else {
      const result = checkValidation(
        email.current.value,
        password.current.value,
        name.current.value
      );

      setIsErrorMsg(result);
      if (result) return;
    }

    if (!isSignIn) {
      // If Sign Up form is there
      setLoading(true);
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              setLoading(false);
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          setIsErrorMsg(errorCode + " : " + errorMessage);
        });
      name.current.value = "";
    } else {
      // If Sign In form is there
      setLoading(true);
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setIsErrorMsg("User not found!");
        });
    }

    email.current.value = "";
    password.current.value = "";
  };
  return (
    <div className="relative w-full">
      <Header />
      <div className="w-full">
        <img
          src={Browse_Bg}
          alt="bg_Img"
          className="min-h-screen object-cover w-full"
        />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#000000bf] md:px-10 sm:px-7 px-3  min-[300px]:px-4 py-4 xl:px-16 sm:py-5 xl:py-14 mx-auto sm:mt-20 mt-24 xl:mt-28 z-20 flex flex-col gap-y-4 sm:gap-y-5 lg:gap-y-7 sm:w-6/12 lg:w-5/12 xl:w-4/12 min-[350px]:w-10/12 w-11/12 rounded-md">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-medium">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>
        <form className="flex-col flex gap-y-3 sm:gap-y-4">
          {!isSignIn && (
            <input
              ref={name}
              type="text"
              placeholder="FullName"
              className="bg-[#333] px-2.5 md:px-5 sm:py-3 py-2 outline-none caret-violet-50 rounded-lg text-violet-50"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email or phone number"
            className="bg-[#333] px-2.5 md:px-5 sm:py-3 py-2 outline-none caret-violet-50 rounded-lg text-violet-50"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="bg-[#333] px-2.5 md:px-5 py-2 sm:py-3 outline-none caret-violet-50 rounded-lg text-violet-50"
          />

          {isErrorMsg && (
            <p className="text-red-500 font-semibold pl-2 text-sm">
              {isErrorMsg}
            </p>
          )}
          <button
            className={`outline-none border-none text-white flex justify-center items-center font-medium bg-red-600 rounded-md py-2 sm:py-3 mt-3 lg:mt-7 ${
              loading && "bg-opacity-50"
            }`}
            onClick={handleButtonClick}
          >
            {loading ? (
              <span className="sm:w-5 w-4 animate-spin h-4 sm:h-5 relative z-20 border-4 rounded-full border-gray-600 border-solid border-t-gray-100 inline-block"></span>
            ) : isSignIn ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="flex">
            <p className="text-slate-400 mr-1.5">
              {isSignIn ? "New to Netflix?" : "Already registered?"}
            </p>
            <span className="text-white cursor-pointer" onClick={handleToggle}>
              {isSignIn ? "Sign up now." : "Sign in now."}
            </span>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
