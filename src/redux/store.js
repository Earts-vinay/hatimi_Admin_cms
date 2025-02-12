import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "../redux/Slices/Properties/propertySlice";
import reservationReducer from "../redux/Slices/Reservations/reservationSlice";
import invoiceReducer from '../redux/Slices/Reservations/invoiceSlice'

const store = configureStore({
  reducer: {
    properties: propertyReducer,
    reservations: reservationReducer,
    invoice: invoiceReducer,
  },
});

export default store;
