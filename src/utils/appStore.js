import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import languageReducer from "./languageSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
    gpt: gptReducer,
    language: languageReducer,
  },
});

export default appStore;
