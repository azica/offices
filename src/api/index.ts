import type { AxiosResponse, AxiosInstance } from "axios";

import axios from "axios";

import { setTokenFromStorage, getTokensFromStorage } from "@/helpers/index";

import { Endpoints } from "./endpoints";

// Create an axios instance
export const baseApiUrl = process.env.REACT_APP_API_URL;

export const $api: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: baseApiUrl,
  headers: { "Content-Type": "application/json" },
});

// eslint-disable-next-line require-await
$api.interceptors.request.use(async (config) => {
  const storage: string | null = localStorage.getItem("token");
  const token: Response.Tokens | null = storage ? JSON.parse(storage) : null;
  if (token?.access) {
    config.headers.Authorization = `Bearer ${token.access}`;
  }

  return config;
});

export const refreshToken = async ({ response, token }: { response: AxiosResponse; token: string }) => {
  try {
    const { data }: AxiosResponse<Response.Tokens> = await axios.post(baseApiUrl + Endpoints.REFRESH_TOKEN, {
      refresh: token,
    });
    setTokenFromStorage(data);
    return axios({
      ...response.config,
      headers: {
        ...response.config.headers,
        Authorization: `Bearer ${data.access}`,
      },
    });
  } catch (error) {
    if (!location.pathname.includes("/auth")) {
      location.href = "/auth";
    }

    return response;
  }
};

const storage = localStorage.getItem("token");
const token = storage ? JSON.parse(storage) : null;
$api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const token = getTokensFromStorage();
    if (error.response.status === 401) {
      if (token?.refresh) {
        return refreshToken({ response: error, token: token.refresh });
      } else {
        if (!location.pathname.includes("/auth")) {
          location.href = "/auth";
        }
        return error;
      }
    }
    return Promise.reject(error);
  },
);

export default $api;

export const $withoutTokenApi: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: baseApiUrl,
  headers: { "Content-Type": "application/json" },
});
