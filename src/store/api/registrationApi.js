import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

const registrationApi = createApi({
  reducerPath: 'registrations',
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      import.meta.env.VITE_API_BASE_URL
    }/api/registrations`,
    fetchFn: async (...args) => fetch(...args)
  }),
  endpoints(builder) {
    return {
      addRegistrations: builder.mutation({
        invalidatesTags: () => ['Registrations'],
        query: body => {
          return {
            method: 'POST',
            body
          }
        },
        transformErrorResponse: response =>
          response.data?.errors
      }),
      fetchRegistration: builder.query({
        providesTags: () => ['Registrations'],
        transformResponse: response =>
          response.data,
        transformErrorResponse: response =>
          response.data?.errors,
        query: npwp => ({
          url: `/${npwp}`
        })
      }),
      fetchListRegistration: builder.query({
        providesTags: () => ['Registrations'],
        // transformResponse: response =>
        //   response.data,
        transformErrorResponse: response =>
          response.data?.errors,
        query: token => ({
          headers: {
            Authorization: token
          }
        })
      })
    }
  }
})

export const {
  useAddRegistrationsMutation,
  useFetchRegistrationQuery,
  useFetchListRegistrationQuery
} = registrationApi
export { registrationApi }
