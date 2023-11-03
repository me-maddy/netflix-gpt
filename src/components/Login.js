import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div className="relative w-full">
      <Header />
      <div>
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/0efe6360-4f6d-4b10-beb6-81e0762cfe81/IN-en-20231030-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="bg_Img"
        />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#000000bf] px-16 py-14 mx-auto mt-28 z-20 flex flex-col gap-y-7 w-4/12 rounded-md">
        <h2 className="text-white text-3xl font-medium">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>
        <form className="flex-col flex gap-y-4">
          {!isSignIn && (
            <input
              type="text"
              placeholder="FullName"
              className="bg-[#333] px-5 py-3 outline-none caret-violet-50 rounded-lg text-violet-50"
            />
          )}
          <input
            type="text"
            placeholder="Email or phone number"
            className="bg-[#333] px-5 py-3 outline-none caret-violet-50 rounded-lg text-violet-50"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-[#333] px-5 py-3 outline-none caret-violet-50 rounded-lg text-violet-50"
          />
          {!isSignIn && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-[#333] px-5 py-3 outline-none caret-violet-50 rounded-lg text-violet-50"
            />
          )}
          <button className="outline-none border-none text-white font-medium bg-red-600 rounded-md py-3 mt-7">
            {isSignIn ? "Sign In" : "Sign Up"}
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
    </div>
  );
};

export default Login;
