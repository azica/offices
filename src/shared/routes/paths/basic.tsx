import { LoginForm, PassCreateForm, PassRecoveryForm, SuccessLetter } from "@/blocks/AuthForms";
import { Clients, Employees, OfficeDetailInfo, OfficeApplications } from "@/blocks/index";
import {
  Auth,
  CreateOffice,
  NotaryActions,
  RolesAndAccess,
  Office,
  OfficeDetail,
  PageNotFound,
  OfficeInfoEdit,
  Employee,
  AddAndEditEmployee,
  AddClient,
  Client,
  ActionEdit,
  AddApplication,
  Application,
  Applications,
} from "@/pages/index";

import PrivateRoute from "../PrivateRoute";
import Redirect from "../Redirect";

export const basicPaths = [
  { path: "*", id: 0, element: <PageNotFound /> },
  {
    path: "/auth",
    id: 1,
    element: <Auth />,
    children: [
      { id: 2, path: "login", element: <LoginForm /> },
      { id: 3, path: "password-recovery", element: <PassRecoveryForm /> },
      { id: 4, path: "success", element: <SuccessLetter /> },
      { id: 5, path: "reset-password", element: <PassCreateForm /> },
    ],
  },
  {
    id: 6,
    path: "/offices/:id/",
    element: <OfficeDetail />,
    children: [
      {
        id: 7,
        path: "",
        element: <OfficeDetailInfo />,
      },
      {
        id: 8,
        path: "applications",
        element: <OfficeApplications />,
      },
      {
        id: 9,
        path: "employees",
        element: <Employees />,
      },
      {
        id: 10,
        path: "clients",
        element: <Clients />,
      },
    ],
  },
  { id: 11, path: "/create-office", element: <CreateOffice /> },
  {
    id: 12,
    path: "/offices",
    element: (
      <PrivateRoute>
        <Office />
      </PrivateRoute>
    ),
  },
  {
    id: 13,
    path: "/roles-and-access",
    element: <RolesAndAccess />,
  },
  { id: 14, path: "/notary-actions", element: <NotaryActions /> },
  {
    id: 15,
    path: "/",
    element: (
      <PrivateRoute>
        <Redirect link={"/auth"} />
      </PrivateRoute>
    ),
  },
  { id: 15, path: "/offices/:id/edit-office-info", element: <OfficeInfoEdit /> },
  { id: 16, path: "/offices/:officeId/add-employee", element: <AddAndEditEmployee /> },
  { id: 17, path: "/offices/:officeId/employees/:employeeId", element: <Employee /> },
  { id: 18, path: "/offices/:officeId/employees/:employeeId/edit-employee", element: <AddAndEditEmployee /> },
  { id: 18, path: "/offices/:officeId/employees/:employeeId/quick-edit-employee", element: <AddAndEditEmployee /> },
  { id: 19, path: "/applications/:id", element: <Applications /> },
  { id: 20, path: "/offices/:officeId/clients/:clientId", element: <Client /> },
  { id: 21, path: "/offices/:officeId/add-client", element: <AddClient /> },
  { id: 22, path: "/notary-actions/edit/:actionId", element: <ActionEdit /> },
  { id: 23, path: "/not-found", element: <PageNotFound /> },
  { id: 24, path: "/applications/:officeId/add-application", element: <AddApplication /> },
  { id: 24, path: "/applications/:officeId/application/:applicationId", element: <Application /> },
];

export default basicPaths;
