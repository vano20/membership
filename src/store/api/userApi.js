import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

const userApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: `${
      import.meta.env.VITE_API_BASE_URL
    }/api/users`,
    fetchFn: async (...args) => fetch(...args)
  }),
  endpoints(builder) {
    return {
      login: builder.mutation({
        invalidatesTags: () => ['Users'],
        query: body => {
          return {
            url: '/login',
            method: 'POST',
            body
          }
        },
        transformResponse: response =>
          response.data,
        transformErrorResponse: response =>
          response.data?.errors
      }),
      logout: builder.mutation({
        invalidatesTags: () => ['Users'],
        query: token => {
          return {
            url: '/logout',
            method: 'DELETE',
            headers: {
              Authorization: token
            }
          }
        },
        transformResponse: response =>
          response.data,
        transformErrorResponse: response =>
          response.data?.errors
      }),
      fetchUser: builder.query({
        providesTags: () => ['Users'],
        transformResponse: response =>
          response.data,
        transformErrorResponse: response =>
          response.data?.errors,
        query: token => ({
          url: '/current',
          headers: {
            Authorization: token
          }
        })
      })
    }
  }
})

export const {
  useLoginMutation,
  useFetchUserQuery,
  useLogoutMutation
} = userApi
export { userApi }
