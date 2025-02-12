import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"; 
const token = Cookies.get("token");
const BaseUrl = process.env.REACT_APP_API_URL;

export const fetchReservations = createAsyncThunk(
  "reservations/fetchReservations",
  async ({ selectedPropertyUid, page, rowsPerPage }, { rejectWithValue }) => {
    if (!selectedPropertyUid) return rejectWithValue("No property UID selected");

    try {
      const response = await axios.post(
        `${BaseUrl}/v1/booking/list-reservations/${selectedPropertyUid}`,
        {}, // Empty request body
        {
          params: { page, pageSize: rowsPerPage },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data || { data: [], totalPages: 1 };
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Something went wrong");
    }
  }
);

const reservationSlice = createSlice({
  name: "reservations",
  initialState: {
    reservations: [],
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reservationSlice.reducer;
