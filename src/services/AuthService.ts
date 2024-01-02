import { Endpoints } from "@/api/endpoints";
import { clearLocalStorage } from "@/helpers/localStorage";

import $api, { $withoutTokenApi } from "../api";

export const AuthService = {
  async login({ email, password }: Request.Login): Promise<Response.LoginResponse | { errors: ErrorObject[] }> {
    const res = await $withoutTokenApi.post<Response.LoginResponse & { error: ErrorObject }>(Endpoints.LOGIN, {
      email,
      password,
    });
    return res.data;
  },
  async passwordRecovery(data: Request.PasswordRecovery): Promise<ResponseSuccess | { errors: ErrorObject[] }> {
    const res = await $api.post<ResponseSuccess & { error: ErrorObject }>(Endpoints.PASSWORD_RECOVERY, data);
    return res.data;
  },
  async passwordCreate(data: Request.PasswordCreate): Promise<ResponseSuccess | { errors: ErrorObject[] }> {
    const res = await $api.post<ResponseSuccess & { error: ErrorObject }>(Endpoints.FORGET_PASSOWRD, data);
    return res.data;
  },
  async logout(): Promise<void> {
    clearLocalStorage();
    const res = await $api.postForm(Endpoints.LOGOUT);
    return res.data;
  },
  async checkPasswordVerify(data: { token: string }): Promise<ResponseSuccess & { error: ErrorObject }> {
    const res = await $api.post<ResponseSuccess & { error: ErrorObject }>(Endpoints.PASSWORD_TOKEN_VERIFY, data);
    return res.data;
  },
};
