import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import { capitalize } from '/src/helper/string'

const provinceApi = createApi({
  reducerPath: 'provinces',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL
      }/api/provinces`,
    fetchFn: async (...args) => fetch(...args)
  }),
  endpoints(builder) {
    return {
      fetchProvinces: builder.query({
        providesTags: result => {
          return result.map(prov => ({
            type: 'Province',
            id: prov.id
          }))
        },
        transformResponse: (
          response,
          meta,
          arg
        ) =>
          response.data.map(
            ({ code, name, id }) => ({
              id,
              value: code,
              label: capitalize(name)
            })
          ),
        query: () => ({})
      }),
      fetchCities: builder.query({
        providesTags: result => {
          return (
            result?.data?.map(city => ({
              type: 'City',
              id: city.id
            })) || []
          )
        },
        transformResponse: (
          response,
          meta,
          arg
        ) =>
          response.data.map(
            ({ code, name, id }) => ({
              id,
              value: code,
              label: capitalize(name)
            })
          ),
        query: prov => ({
          url: `/cities/${prov?.value || 0}`
        })
      })
    }
  }
})

export const {
  useFetchProvincesQuery,
  useFetchCitiesQuery
} = provinceApi
export default provinceApi
