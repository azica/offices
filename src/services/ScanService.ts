import { Endpoints } from "@/api/endpoints";
import { clearLocalStorage } from "@/helpers/localStorage";

import $api, { $withoutTokenApi } from "../api";

export const AuthService = {
  //   async login({ email, password }: Request.Login): Promise<Response.LoginResponse | { errors: ErrorObject[] }> {
  //     const res = await $withoutTokenApi.post<Response.LoginResponse & { error: ErrorObject }>(Endpoints.LOGIN, {
  //       email,
  //       password,
  //     });
  //     return res.data;
  //   },
};
