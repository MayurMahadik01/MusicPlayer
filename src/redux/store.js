import { configureStore } from "@reduxjs/toolkit";
import spotifyReducer from "./spotifyReducer";

export const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
  },
});
