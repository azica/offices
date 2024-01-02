import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { actionApi } from "./services/action.query";
import { applicationApi } from "./services/application.query";
import { authApi } from "./services/auth.query";
import { clientApi } from "./services/client.query";
import { documentApi } from "./services/document.query";
import { employeeApi } from "./services/employee.query";
import { officeApi } from "./services/office.query";
import { userApi } from "./services/user.query";
import applicationReducer from "./slices/applicationSlice";
import authReducer from "./slices/authSlice";
import clientReducer from "./slices/clientSlice";
import documentReducer from "./slices/documentSlice";
import employeeReducer from "./slices/employeeSlice";
import officeReducer from "./slices/officeSlice";
import { reducer as rolesReducer } from "./slices/rolesSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [officeApi.reducerPath]: officeApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
    [actionApi.reducerPath]: actionApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
    auth: authReducer,
    user: userReducer,
    office: officeReducer,
    roles: rolesReducer,
    employees: employeeReducer,
    client: clientReducer,
    document: documentReducer,
    application: applicationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      authApi.middleware,
      userApi.middleware,
      officeApi.middleware,
      employeeApi.middleware,
      clientApi.middleware,
      documentApi.middleware,
      actionApi.middleware,
      applicationApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
