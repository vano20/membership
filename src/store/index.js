import { configureStore } from "@reduxjs/toolkit";
import provinceApi from "./api/provinceApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { registrationApi } from "./api/registrationApi";

export const store = configureStore({
  reducer: {
    [provinceApi.reducerPath]: provinceApi.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(provinceApi.middleware).concat(registrationApi.middleware)
})

setupListeners(store.dispatch)

export { useFetchProvincesQuery, useFetchCitiesQuery } from './api/provinceApi'
export { useAddRegistrationsMutation } from './api/registrationApi'