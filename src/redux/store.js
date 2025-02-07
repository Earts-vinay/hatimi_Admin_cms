import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "../redux/Slices/Properties/propertySlice";

const store = configureStore({
  reducer: {
    properties: propertyReducer,
  },
});

export default store;
