import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import rootReducer from "./rootReducer";

const store = configureStore(
  {
    reducer: {
      ...rootReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
  }
);

export default store;
