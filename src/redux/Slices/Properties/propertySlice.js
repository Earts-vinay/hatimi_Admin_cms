import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Async thunk to fetch properties
export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        "https://server.hatimiretreats.com/v1/property/get-all-properties",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data; // Assuming response.data.data is an array
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching properties");
    }
  }
);

const propertySlice = createSlice({
  name: "properties",
  initialState: {
    properties: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default propertySlice.reducer;
