import { Endpoints } from "@/api/endpoints";

import $api from "../api";

export const useUserUpdate = () => {
  return $api.get(`${Endpoints.GET_USER}`).then((res) => res.data);
};

export default useUserUpdate;
