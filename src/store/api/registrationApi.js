import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: `${
    import.meta.env.VITE_API_BASE_URL
  }/api/registrations`,
  fetchFn: async (...args) => fetch(...args)
})
const baseQueryHandler = async (
  args,
  api,
  opts
) => {
  const result = await baseQuery(args, api, opts)
  if (result?.error?.status === 401) {
    localStorage.setItem('isLoggedIn', null)
    window.location.replace('/')
  }
  return result
}

const registrationApi = createApi({
  reducerPath: 'registrations',
  baseQuery: baseQueryHandler,
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
      updateRegistrationsStatus: builder.mutation(
        {
          invalidatesTags: () => [
            'Registrations'
          ],
          transformResponse: response =>
            response.data,
          transformErrorResponse: response =>
            response.data?.errors,
          query: ({ token, body }) => ({
            method: 'PUT',
            url: `/${body.id}`,
            body: {
              status: body.status,
              membership_id: body.membership_id
            },
            headers: {
              Authorization: token
            }
          })
        }
      ),
      fetchRegistration: builder.query({
        providesTags: () => ['Registrations'],
        transformResponse: response =>
          response.data,
        transformErrorResponse: response =>
          response.data?.errors,
        query: ({ npwp, period }) => {
          const query = period
            ? `period=${period}`
            : ''
          return {
            url: `/${npwp}?${query}`
          }
        }
      }),
      fetchListRegistration: builder.query({
        providesTags: () => ['Registrations'],
        // transformResponse: response =>
        //   response.data,
        transformErrorResponse: response =>
          response.data?.errors,
        query: ({
          token,
          page = 1,
          size = 10
        }) => ({
          url: `?page=${page}&size=${size}`,
          headers: {
            Authorization: token
          }
        })
      }),
      fetchSummary: builder.query({
        providesTags: () => ['Registrations'],
        transformResponse: response =>
          response.data,
        transformErrorResponse: response =>
          response.data?.errors,
        query: period => {
          const query = period
            ? new URLSearchParams({
                period
              }).toString()
            : ''
          return {
            url: `/summary?${query}`
          }
        }
      }),
      fetchSummaryCity: builder.query({
        providesTags: () => ['Registrations'],
        transformResponse: response =>
          response.data,
        transformErrorResponse: response =>
          response.data?.errors,
        query: ({ period, provinceCode }) => {
          const query = new URLSearchParams({
            period
          }).toString()
          return {
            url: `/summary/city/${provinceCode}?${query}`
          }
        }
      })
    }
  }
})

export const {
  useAddRegistrationsMutation,
  useFetchRegistrationQuery,
  useFetchListRegistrationQuery,
  useUpdateRegistrationsStatusMutation,
  useFetchSummaryQuery,
  useFetchSummaryCityQuery
} = registrationApi
export { registrationApi }
