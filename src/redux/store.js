import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "../redux/Slices/Properties/propertySlice";
import locationReducer from '../redux/Slices/Properties/locationSlice';
import aminitiesReducer from '../redux/Slices/Properties/aminitySlice';
import reservationReducer from "../redux/Slices/Reservations/reservationSlice";
import invoiceReducer from '../redux/Slices/Reservations/invoiceSlice'

const store = configureStore({
  reducer: {
    properties: propertyReducer,
    locations: locationReducer,
    aminities: aminitiesReducer,
    reservations: reservationReducer,
    invoice: invoiceReducer,
  },
});

export default store;
