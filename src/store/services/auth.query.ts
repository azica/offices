import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseApiUrl } from "@/api/index";
import { setTokenFromStorage } from "@/helpers/localStorage";
import { AuthService } from "@/services/AuthService";
import { UserService } from "@/services/UserService";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<Response.LoginResponse | { errors: ErrorObject[] }, Request.Login>({
      queryFn: async ({ email, password }) => {
        try {
          const res = await AuthService.login({ email, password });
          if (res) {
            setTokenFromStorage(res as Response.LoginResponse);
            return { data: res };
          }
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      invalidatesTags: ["Auth"],
    }),
    passwordRecovery: builder.mutation<ResponseSuccess | { errors: ErrorObject[] }, Request.PasswordRecovery>({
      queryFn: async (data) => {
        try {
          const res = await AuthService.passwordRecovery(data);
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
    }),
    createPassword: builder.mutation<ResponseSuccess | { errors: ErrorObject[] }, Request.PasswordCreate>({
      queryFn: async (data) => {
        try {
          const res = await AuthService.passwordCreate(data);
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data,
          };
        }
      },
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          const res = await AuthService.logout();
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      invalidatesTags: ["Auth"],
    }),
    checkPasswordVerify: builder.mutation<ResponseSuccess | { errors: ErrorObject[] }, { token: string }>({
      queryFn: async (data) => {
        try {
          const res = await AuthService.checkPasswordVerify(data);
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
    }),
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
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  usePasswordRecoveryMutation,
  useCreatePasswordMutation,
  useLogoutMutation,
  useCheckPasswordVerifyMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
} = authApi;
