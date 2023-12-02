import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    lan: "english",
  },
  reducers: {
    toggleLanguage: (state, action) => {
      state.lan = action.payload;
    },
  },
});

export default languageSlice.reducer;
export const { toggleLanguage } = languageSlice.actions;
