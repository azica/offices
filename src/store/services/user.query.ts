import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { UserService } from "@/services/UserService";

import { BASE_API_URL } from "./constant";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  tagTypes: ["User", "Auth", "Employee"],
  endpoints: (builder) => ({
    getUser: builder.query<Model.User | { errors: ErrorObject[] }, void>({
      queryFn: async () => {
        try {
          const res = await UserService.getUser();
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      providesTags: ["User", "Auth"],
    }),
  }),
});
