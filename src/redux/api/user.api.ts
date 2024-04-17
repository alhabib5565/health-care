import { tagTypes } from "../tag.tpes";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => ({
                url: '/user/me'
            }),
            providesTags: [tagTypes.user]
        })
    })
})

export const { useGetUserProfileQuery } = userApi