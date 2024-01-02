import type { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import {
  fetchRoles,
  fetchRolePermissions,
  fetchPermissions,
  fetchNotAdminRoles,
  updateRole,
  createRole,
  removeRole,
} from "../services/rolesService";

const initialState: Model.Roles = {
  roles: null,
  notAdminRoles: null,
  loading: { main: true, save: false, remove: false, create: false, add: false },
  createdRole: null,
  error: null,
};

const RolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoles: (state, { payload }: PayloadAction<Model.Role[]>) => {
      state.roles = payload;
    },
    setCurrentRole: (state, { payload }: PayloadAction<Model.CurrentRole>) => {
      state.currentRole = payload;
    },
    setCreatedRole: (state, { payload }: PayloadAction<Model.CurrentRole | null>) => {
      state.createdRole = payload;
    },
    setLoading: (state, { payload }: PayloadAction<Reducer.RolesLoading>) => {
      state.loading = payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<Model.Roles>) => {
    builder
      .addCase(fetchRoles.fulfilled, (state: Model.Roles, { payload }: PayloadAction<Model.Role[]>) => {
        state.roles = payload;
      })
      .addCase(fetchRolePermissions.pending, (state: Model.Roles) => {
        state.loading = { ...state.loading, main: true };
      })
      .addCase(fetchRolePermissions.fulfilled, (state: Model.Roles, { payload }: PayloadAction<Model.CurrentRole>) => {
        state.currentRole = payload;
        state.loading = { ...state.loading, main: false };
      }) // eslint-disable-next-line
      .addCase(fetchRolePermissions.rejected, (state: Model.Roles, { payload }: PayloadAction<any>) => {
        state.loading = { ...state.loading, main: false }; // @ts-ignore
        state.error =  { status: payload.response ? payload.response.status : 0, message: payload.response ? payload.response.data.message || payload.response.data : "" }; // eslint-disable-line
      })
      .addCase(fetchPermissions.pending, (state: Model.Roles) => {
        state.loading = { ...state.loading, add: true };
      })
      .addCase(fetchPermissions.fulfilled, (state: Model.Roles, { payload }: PayloadAction<Model.Permission[]>) => {
        const newRoles = state.roles ? state.roles : [];
        const role = { id: "create", name: "Новая роль" };
        state.permissions = payload;
        state.roles = [...newRoles, role];
        state.createdRole = { ...role, permissions: state.permissions };
        state.loading = { ...state.loading, add: false };
      })
      .addCase(updateRole.pending, (state: Model.Roles) => {
        state.loading = { ...state.loading, save: true };
      })
      .addCase(updateRole.fulfilled, (state: Model.Roles) => {
        const index = state.roles?.findIndex(({ id }) => id === state.currentRole?.id);
        if (index !== undefined && state.currentRole && state.roles) {
          state.roles[index] = { id: state.currentRole.id, name: state.currentRole.name };
        }
        state.loading = { ...state.loading, save: false };
      }) // eslint-disable-next-line
      .addCase(updateRole.rejected, (state: Model.Roles, { payload }: PayloadAction<any>) => {
        state.loading = { ...state.loading, save: false }; //@ts-ignore
        state.error =  { status: payload.response ? payload.response.status : 0, message: payload.response ? payload.response.data.message || payload.response.data : "" }; // eslint-disable-line
      })
      .addCase(createRole.pending, (state: Model.Roles) => {
        state.loading = { ...state.loading, create: true };
      })
      .addCase(createRole.fulfilled, (state: Model.Roles, { payload }: PayloadAction<Model.CurrentRole>) => {
        state.currentRole = payload;
        state.createdRole = null;
        if (state.roles) {
          state.roles[state.roles.length - 1] = { id: payload.id, name: payload.name };
        }
        state.loading = { ...state.loading, create: false };
      }) // eslint-disable-next-line
      .addCase(createRole.rejected, (state: Model.Roles, { payload }: PayloadAction<any>) => {
        state.loading = { ...state.loading, create: false }; // @ts-ignore
        state.error =  { status: payload.response ? payload.response.status : 0, message: payload.response ? payload.response.data.message || payload.response.data : "" }; // eslint-disable-line
      })
      .addCase(removeRole.pending, (state: Model.Roles) => {
        state.loading = { ...state.loading, remove: true };
      })
      .addCase(removeRole.fulfilled, (state: Model.Roles) => {
        if (state.roles) {
          state.roles = state.roles.filter(({ id }) => id !== state.currentRole?.id);
          state.currentRole = undefined;
          state.loading = { ...state.loading, remove: false };
        }
      }) // eslint-disable-next-line
      .addCase(removeRole.rejected, (state: Model.Roles, { payload }: PayloadAction<any>) => {
        state.loading = { ...state.loading, remove: false }; // @ts-ignore
        state.error =  { status: payload.response ? payload.response.status : 0, message: payload.response ? payload.response.data.message || payload.response.data : "" }; // eslint-disable-line
      })
      .addCase(fetchNotAdminRoles.fulfilled, (state: Model.Roles, { payload }: PayloadAction<any>) => {
        state.notAdminRoles = payload;
      });
  },
});

export const { reducer, actions } = RolesSlice;
