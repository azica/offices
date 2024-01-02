import * as RolesActions from "@/store/services/rolesService";
import * as ApplicationActions from "@/store/slices/applicationSlice";
import * as AuthAction from "@/store/slices/authSlice";
import * as ClientActions from "@/store/slices/clientSlice";
import * as DocumentActions from "@/store/slices/documentSlice";
import * as EmployeeActions from "@/store/slices/employeeSlice";
import * as OfficeActions from "@/store/slices/officeSlice";
import { actions as RolesReducerActions } from "@/store/slices/rolesSlice";
import * as UserActions from "@/store/slices/userSlice";

export default {
  ...OfficeActions,
  ...UserActions,
  ...RolesActions,
  ...RolesReducerActions,
  ...AuthAction,
  ...EmployeeActions,
  ...ClientActions,
  ...DocumentActions,
  ...ApplicationActions,
};
