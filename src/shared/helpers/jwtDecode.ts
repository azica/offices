import type { JwtPayload } from "jwt-decode";

import jwtDecode from "jwt-decode";

import { getTokensFromStorage } from "./localStorage";

interface JwtDecodeProps extends JwtPayload {
  user_id: number;
  avatar: string;
  role: Model.Role[];
  full_name: string;
  office?: number;
}

export const getUserByJwt = (access?: string) => {
  const token = access || getTokensFromStorage()?.access;
  const userData = {} as Model.User;

  if (token) {
    const data: AuthData = jwtDecode<JwtDecodeProps>(token);
    userData.fullName = data.full_name;
    userData.role = data.role;
    userData.image = data.avatar;
    userData.officeId = data.office;
    userData.id = data.user_id;
  }

  return userData;
};

export const decodeToken = (access?: string) => {
  const token = access || getTokensFromStorage()?.access;
  let data;
  if (token) {
    data = jwtDecode<JwtDecodeProps>(token);
  }
  return data;
};

export const getDecodedOfficeId = (access?: string) => {
  const token = access || getTokensFromStorage()?.access;
  let officeId;
  if (token) {
    officeId = jwtDecode<JwtDecodeProps>(token).office;
  }
  return officeId;
};

export const getDecodedUserRoles = (access?: string) => {
  const token = access || getTokensFromStorage()?.access;
  let userRole;
  if (token) {
    userRole = jwtDecode<JwtDecodeProps>(token).role;
  }
  return userRole;
};
