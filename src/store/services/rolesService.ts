import type { AxiosResponse } from "axios";
import type { NavigateFunction } from "react-router-dom";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { Endpoints } from "@/api/endpoints";
import { $api } from "@/api/index";
import { ActionType } from "@/types/enums";

export const fetchRoles = createAsyncThunk(ActionType.GET_ROLES, async (_, { rejectWithValue }) => {
  try {
    const url = Endpoints.FETCH_ROLES;
    const { data }: AxiosResponse<Model.Role[]> = await $api.get(url);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchRolePermissions = createAsyncThunk(
  ActionType.GET_ROLE_PERMISSIONS,
  async (id: number | string, { rejectWithValue }) => {
    try {
      const url = `${Endpoints.FETCH_ROLES}${id}/`;
      const { data }: AxiosResponse<Model.CurrentRole> = await $api.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchPermissions = createAsyncThunk(
  ActionType.GET_PERMISSIONS,
  async (navigate: NavigateFunction, { rejectWithValue }) => {
    try {
      const url = Endpoints.FETCH_PERMISSIONS;
      const { data }: AxiosResponse<Model.Permission[]> = await $api.get(url);
      navigate("/roles-and-access?role=create");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createRole = createAsyncThunk(
  ActionType.CREATE_ROLE,
  async ({ params, navigate }: { params: Reducer.UpdatePermissions; navigate: NavigateFunction }, { rejectWithValue }) => {
    try {
      const url = Endpoints.FETCH_ROLES;
      const { data }: AxiosResponse<Model.CurrentRole> = await $api.post(url, params);
      navigate(`/roles-and-access?role=${data.id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateRole = createAsyncThunk(
  ActionType.UPDATE_ROLE,
  async ({ id, params }: { id: number | string; params: Reducer.UpdatePermissions }, { rejectWithValue }) => {
    try {
      const url = `${Endpoints.FETCH_ROLES}${id}/`;
      const { data }: AxiosResponse<Model.CurrentRole> = await $api.put(url, params);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const removeRole = createAsyncThunk(
  ActionType.REMOVE_ROLE,
  async ({ id, navigate }: { id: number | string; navigate: NavigateFunction }, { rejectWithValue }) => {
    try {
      const url = `${Endpoints.FETCH_ROLES}${id}/`;
      const { data }: AxiosResponse<Response.Ordinary> = await $api.delete(url);
      navigate("/roles-and-access");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchNotAdminRoles = createAsyncThunk(
  ActionType.GET_NOT_ADMIN_ROLES,
  async (officeId: number, { rejectWithValue }) => {
    try {
      const url = `${Endpoints.NOTARIES}${officeId}/roles/`;
      const { data }: AxiosResponse<Model.Role[]> = await $api.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
