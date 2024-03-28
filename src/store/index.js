import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import provinceApi from './api/provinceApi'
import { registrationApi } from './api/registrationApi'
import { userApi } from './api/userApi'

export const store = configureStore({
  reducer: {
    [provinceApi.reducerPath]:
      provinceApi.reducer,
    [registrationApi.reducerPath]:
      registrationApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: getDefault =>
    getDefault()
      .concat(provinceApi.middleware)
      .concat(registrationApi.middleware)
      .concat(userApi.middleware)
})

setupListeners(store.dispatch)

export {
  useFetchProvincesQuery,
  useFetchCitiesQuery
} from './api/provinceApi'
export {
  useAddRegistrationsMutation,
  useUpdateRegistrationsStatusMutation,
  useFetchSummaryQuery,
  useFetchSummaryCityQuery
} from './api/registrationApi'
export {
  useLoginMutation,
  useLogoutMutation
} from './api/userApi'
