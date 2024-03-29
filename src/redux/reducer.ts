import { baseApi } from "./api/baseApi";

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    middleware: (getDefaultMeddleware: any) => getDefaultMeddleware().concat(baseApi.middleware)
}