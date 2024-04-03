import { tagTypes } from "../tag.tpes";
import { baseApi } from "./baseApi";


const specialtiesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSpeciality: builder.mutation({
            query: (data) => ({
                url: '/specialties',
                method: 'POST',
                contentType: 'multipart/formData',
                data
            }),
            invalidatesTags: [tagTypes.specialties]
        }),
        getSpecialties: builder.query({
            query: () => ({
                url: '/specialties'
            }),
            providesTags: [tagTypes.specialties]
        }),
        deleteSpecialties: builder.mutation({
            query: (id) => ({
                url: `/specialties/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.specialties]
        })
    })
})

export const { useCreateSpecialityMutation, useGetSpecialtiesQuery, useDeleteSpecialtiesMutation } = specialtiesApi
