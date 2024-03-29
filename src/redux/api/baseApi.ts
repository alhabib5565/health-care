import { axiosBaseQuery } from "@/helpers/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query";


export const baseApi = createApi({
    reducerPath: 'healthCare',
    baseQuery: axiosBaseQuery({ baseUrl: '' }),
    endpoints: (builder) => ({})
})