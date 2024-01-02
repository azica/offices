import { useMemo } from "react";
import { useSelector } from "react-redux";

import {
  selectUser,
  selectUserAvatar,
  selectUserId,
  selectUserRole,
  isUserSystemAdmin,
  isUserOfficeAdmin,
} from "@/store/slices/userSlice";

export const useUser = () => {
  const { user } = useSelector(selectUser);
  return useMemo(() => user, [user]);
};

export const useUserAvatar = () => {
  const avatar = useSelector(selectUserAvatar);
  return useMemo(() => avatar, [avatar]);
};

export const useUserId = () => {
  const id = useSelector(selectUserId);
  return useMemo(() => id, [id]);
};

export const useUserRole = () => {
  const role = useSelector(selectUserRole);
  return useMemo(() => role, [role]);
};

export const useUserIsSystemAdmin = () => {
  const role = useSelector(isUserSystemAdmin);
  return useMemo(() => role, [role]);
};

export const useUserIsOfficeAdmin = () => {
  const role = useSelector(isUserOfficeAdmin);
  return useMemo(() => role, [role]);
};
