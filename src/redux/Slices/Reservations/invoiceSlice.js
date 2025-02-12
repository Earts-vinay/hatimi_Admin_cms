import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"; 
const token = Cookies.get("token");
const BaseUrl = process.env.REACT_APP_API_URL;

// Thunk to fetch invoice
export const fetchInvoice = createAsyncThunk(
  "invoice/fetchInvoice",
  async ({ bookingId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/v1/booking/updated-invoice/${bookingId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      return { fileURL: URL.createObjectURL(response.data) };
    } catch (error) {
      return rejectWithValue("Failed to fetch the invoice.");
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    loadingId: null,
    fileURL: null,
    error: null,
  },
  reducers: {
    clearInvoice: (state) => {
      state.fileURL = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoice.pending, (state, action) => {
        state.loadingId = action.meta.arg.bookingId;
        state.error = null;
      })
      .addCase(fetchInvoice.fulfilled, (state, action) => {
        state.loadingId = null;
        state.fileURL = action.payload.fileURL;
      })
      .addCase(fetchInvoice.rejected, (state, action) => {
        state.loadingId = null;
        state.error = action.payload;
      });
  },
});

export const { clearInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
