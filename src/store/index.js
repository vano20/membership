import { configureStore } from "@reduxjs/toolkit";
import provinceApi from "./api/provinceApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [provinceApi.reducerPath]: provinceApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(provinceApi.middleware)
})

setupListeners(store.dispatch)

export { useFetchProvincesQuery, useFetchCitiesQuery } from './api/provinceApi'