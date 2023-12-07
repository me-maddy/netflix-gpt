import OpenAI from "openai";
// import { OpenAI_Key } from "./constant";
import { useSelector } from "react-redux";

export const useOpenaiKey = () => {
  const userOpenaiKey = useSelector((store) => store.gpt.userOpenaiKey);
  const setOpenai = (key) => {
    const openai = new OpenAI({
      apiKey: key, // defaults to process.env["OPENAI_API_KEY"]
      dangerouslyAllowBrowser: true,
    });
    return openai;
  };

  if (!userOpenaiKey) return null;

  return setOpenai(userOpenaiKey);
};

// export const openai = new OpenAI({
//   apiKey: useOpenaiKey, // defaults to process.env["OPENAI_API_KEY"]
//   dangerouslyAllowBrowser: true,
// });
