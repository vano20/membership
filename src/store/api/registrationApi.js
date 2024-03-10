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
      })
    }
  }
})

export const { useAddRegistrationsMutation } =
  registrationApi
export { registrationApi }
