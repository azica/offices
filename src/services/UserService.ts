import { Endpoints } from "@/api/endpoints";

import $api from "../api";

export const UserService = {
  async getUser(): Promise<Model.User | { errors: ErrorObject[] }> {
    const res = await $api.get<Model.User & { error: ErrorObject }>(`${Endpoints.GET_USER}`);
    return res.data;
  },
  async updateUser(data: Model.UpdateUser): Promise<Model.User | { errors: ErrorObject[] }> {
    const res = await $api.put<Model.User & { error: ErrorObject }>(`${Endpoints.GET_USER}`, data);
    return res.data;
  },
};
