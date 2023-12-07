import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addUserOpenaiKey, toggleSearchWithMovieName } from "../utils/gptSlice";

const GetUserOpenaiKey = () => {
  const keyRef = useRef();
  const dispatch = useDispatch();
  const [keyMessage, setKeyMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleToggleSearch = () => {
    dispatch(toggleSearchWithMovieName());
  };

  const handleOpenaiKey = async () => {
    if (!keyRef.current.value) {
      setKeyMessage("Openai key is needed to search movie by query.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("https://api.openai.com/v1/engines", {
        headers: {
          Authorization: `Bearer ${keyRef.current.value}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        dispatch(addUserOpenaiKey(keyRef.current.value));
        setKeyMessage(null);
      } else {
        setKeyMessage("Your Api key is not valid!");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setKeyMessage("Your Api key is not valid!");
      } else {
        // console.log(
        //   "Error occurred while checking API key validity:",
        //   error.message
        // );
        setKeyMessage("Error occurred while checking API key validity");
      }
    }
    keyRef.current.value = "";
    setLoading(false);
  };
  return (
    <div className="">
      <form
        className="pt-[40%] min-[330px]:pt-[35%] min-[450px]:pt-[25%] sm:pt-[10%] lg:pt-[8%]"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="w-3/4 md:w-1/2 bg-black bg-opacity-70 p-2  min-[430px]:p-4 mx-auto">
          <div className="w-full flex">
            <input
              ref={keyRef}
              type="text"
              placeholder="Enter your Openai key"
              className="sm:px-4 px-2 py-2 w-9/12 font-medium outline-none text-gray-600 min-[480px]:text-sm min-[390px]:text-xs text-[10px] sm:text-base"
            />
            <button
              className="bg-red-700 flex justify-center items-center text-white px-4 py-2 w-3/12 hover:opacity-70 transition-opacity duration-200 ease-in sm:text-base min-[480px]:text-sm min-[390px]:text-xs text-[10px]"
              onClick={handleOpenaiKey}
            >
              {loading ? (
                <span className="sm:w-5 w-4 animate-spin sm:h-5 h-4 relative z-20 border-4 rounded-full border-gray-600 border-solid border-t-gray-100 inline-block"></span>
              ) : (
                "Search"
              )}
            </button>
          </div>

          <div className="mt-2">
            <p
              className={`p-1 text-gray-300 text-[10px] min-[390px]:text-xs sm:text-sm font-medium ${
                keyMessage && "text-red-600"
              }`}
            >
              {keyMessage
                ? keyMessage
                : "You have to share your Openai Key to get suggested movie as per your query."}
            </p>
            <p className=" p-1 text-gray-300 text-[10px] min-[390px]:text-xs sm:text-sm font-medium pt-0">
              Do you want to search movie without query & gpt?{" "}
              <span
                className="text-red-600 cursor-pointer hover:opacity-60 transition-opacity duration-200 ease-in-out"
                onClick={handleToggleSearch}
              >
                Search with movie name.
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GetUserOpenaiKey;
