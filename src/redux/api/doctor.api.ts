import { tagTypes } from "../tag.tpes";
import { baseApi } from "./baseApi";

const doctorApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDoctor: build.mutation({
            query: (data) => ({
                url: "/user/create-doctor",
                method: "POST",
                contentType: "multipart/form-data",
                data,
            }),
            invalidatesTags: [tagTypes.doctor],
        }),

        getAllDoctors: build.query({
            query: (params) => {
                console.log(params)
                return ({
                    url: "/doctor",
                    method: "GET",
                    params: params
                })
            },
            providesTags: [tagTypes.doctor],
        }),

        deleteDoctor: build.mutation({
            query: (id) => ({
                url: `/doctor/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.doctor],
        }),
    }),
});

export const {
    useCreateDoctorMutation,
    useDeleteDoctorMutation,
    useGetAllDoctorsQuery
} = doctorApi;
