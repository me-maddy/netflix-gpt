import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,
    movieNames: null,
    userOpenaiKey: null,
    searchWithMovieName: false,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieResults = movieResults;
      state.movieNames = movieNames;
    },
    removeGptMovieResult: (state) => {
      state.movieResults = null;
      state.movieNames = null;
    },
    addUserOpenaiKey: (state, action) => {
      state.userOpenaiKey = action.payload;
    },
    toggleSearchWithMovieName: (state) => {
      state.searchWithMovieName = !state.searchWithMovieName;
    },
  },
});

export default gptSlice.reducer;
export const {
  toggleGptSearchView,
  addGptMovieResult,
  removeGptMovieResult,
  addUserOpenaiKey,
  toggleSearchWithMovieName,
} = gptSlice.actions;
