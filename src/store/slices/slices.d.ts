export declare global {
  import { document } from "./../../components/blocks/AddDocumentOrMemberForm/mockData";
  type AuthData = {
    user_id: number;
    avatar: string;
    role: Model.Role[];
    full_name: string;
    office?: number;
  };

  type AuthSlice = {
    authData: AuthData | null;
    successEmail: string;
  };

  type CreateOfficeSlice = {
    info: Info.FormInfoResponse;
    address: Address.FormAddressResponse;
    schedule: Schedule.FormScheduleResponse;
  };

  type OfficeFullCard = {
    schedule: Schedule.ScheduleItemResponse[];
    isActive: boolean;
  } & Office.Card;

  type OfficesCard = {
    address: AddressModel.Address;
  } & Omit<Office.Card, "address">;

  type OfficeSlice = {
    offices: OfficesCard[];
    filters: Office.Option[];
    office: OfficeFullCard;
    hasNewStatus: boolean;
    succesEmail: string;
  };

  type UserSlice = {
    user: Model.User | null;
    isOfficeAdmin: boolean | null;
    isSystemAdmin: boolean | null;
  };

  type EmployeeSlice = {
    employees: Model.Employee[];
    employee: Model.Employee;
  };

  type ClientsSlice = {
    clients: Model.Client[];
    client: Response.ClientResponse;
    members: Model.Member[];
    cards: Model.LinkedPerson[];
    clientCount: number;
  };

  type DocumentSlice = {
    documents: Model.Document[];
    document: Model.Document;
  };

  type ApplicationSlice = {
    applications: Model.ApplicationCard[];
    applicationCount: number;
  };
}
