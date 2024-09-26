import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSpotifyData = createAsyncThunk(
  "data/fetchData",
  async () => {
    const response = await axios.get(
      "https://cms.samespace.com/items/songs",
    );
    // console.log(`================================>`, response);
    return response.data;
  }
);

const spotifySlice = createSlice({
  name: "spotify",
  initialState: {
  isLoading: false,
  isSuccess: false,
  error: null,
  spotifyData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpotifyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSpotifyData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.spotifyData = action.payload.data;
      })
      .addCase(fetchSpotifyData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default spotifySlice.reducer;
