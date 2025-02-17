import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const BaseUrl = process.env.REACT_APP_API_URL;

// Async thunk to fetch properties
export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `${BaseUrl}/v1/property/get-all-properties`,
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
    selectedPropertyUid: localStorage.getItem("selectedPropertyUid") || "", // Retrieve from localStorage
  },
  reducers: {
    setSelectedPropertyUid: (state, action) => {
      state.selectedPropertyUid = action.payload;
      localStorage.setItem("selectedPropertyUid", action.payload); // Persist in localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
        if (!state.selectedPropertyUid && action.payload.length > 0) {
          state.selectedPropertyUid = action.payload[0].property_uid;
          localStorage.setItem("selectedPropertyUid", action.payload[0].property_uid);
        }
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedPropertyUid } = propertySlice.actions;
export default propertySlice.reducer;
