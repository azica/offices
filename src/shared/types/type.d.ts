import type { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes } from "react";

declare global {
  namespace React {
    type InputElement = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    type DivElement = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  }
  namespace Reducer {
    type UpdatePermissions = {
      name: string;
      permissions: number[];
    };

    type RolesLoading = {
      main: boolean;
      save: boolean;
      remove: boolean;
      create: boolean;
      add: boolean;
    };
  }
  namespace Model {
    type Image = {
      url: string;
      name: string;
    };

    type InputValueFields = {
      name: string;
      value: string;
      id: string | number;
    };

    type Permission = {
      id: number;
      name: string;
      codename: string;
      checked?: boolean;
    };

    type Role = {
      id: number | string;
      name: string;
      countUsers?: number;
    };

    type CurrentRole = {
      id: number | string;
      name: string;
      permissions: Permission[];
    };

    type Error = {
      status: number;
      message: string;
    };

    type Roles = {
      roles: Role[] | null;
      notAdminRoles: Role[] | null;
      currentRole?: CurrentRole;
      permissions?: Permission[];
      loading: Reducer.RolesLoading;
      error: Error | null;
      createdRole: null | CurrentRole;
      action?: string;
    };

    type User = {
      fullName?: string;
      image?: string;
      role?: Role[];
      phoneNumber?: string;
      id: number;
      status?: Status;
      email?: string | null;
      color?: string;
      token: string;
      navigation?: string[];
      createdAt?: string;
      department?: string;
      jobTitle?: string;
      id: number;
      officeId?: number;
    };

    type UpdateUser = Pick<Model.User, "fullName" | "email" | "phoneNumber">;

    type Supervisor = {
      id: number;
      fullName: string;
      phoneNumber: string;
      email: string;
    };

    type Employee = {
      id: number;
      fullName: string;
      phoneNumber: string;
      email: string;
      role: Role[];
      status: Status;
      image?: string;
      jobTitle?: string;
      department?: string;
      supervisor?: Supervisor | string;
      createdAt?: string;
      image?: string;
    };

    type personPosition = {
      position: string;
      name: string;
    };

    type LegalPerson = {
      id?: number;
      inn: number;
      ogrn: number;
      name: string;
      address: string;
      addressFias: string;
      phoneNumber: string;
      email: string;
      legalForm: number;
      legalFormName?: string;
      personPosition: string;
      priority?: number;
      kpp: string;
    };

    type SoleProprietorship = {
      id?: number;
      name: string;
      phoneNumber: string;
      email: string;
      inn: number;
      ogrn: number;
      registrationDepartment: string;
      registrationDate: string;
      linkedPerson: Model.LinkedPerson | number;
      linkedPersonName?: string;
      personPosition: string;
      priority?: number;
    };

    type IndividualPerson = {
      id?: number;
      priority?: number;
      name: string;
      placeOfBirth: string;
      dateOfBirth: string;
      passportIssuedBy: string;
      passportSeries: string;
      passportCode: string;
      passportNumber: string;
      passportIssueDate: string;
      address: string;
      phoneNumber: string;
      email: string;
      snils: string;
      personPosition: string;
      inn: number;
      image?: string;
      status?: Status;
      createdAt?: string;
      birthCertificate?: File;
      legalRepresentative?: Model.LinkedPerson | number;
      legalRepresentativeId?: number;
      legalRepresentativeName?: string;
      isLinkCard?: boolean;
      officeId?: number;
    };

    type Client = Partial<Model.IndividualPerson> & Partial<Model.SoleProprietorship> & Partial<Model.LegalPerson>;

    type Document = {
      name: string;
      issuedBy: string;
      date?: string;
      number: number;
      registrationDepartment: string;
      registrationDate: string;
      registrationNumber: string;
      id?: number;
      createdAt?: string;
      isMember?: boolean;
      linkedPerson?: Model.LinkedPerson;
      editHandle: (id: number) => void;
    };

    type LinkedPerson = {
      id?: number;
      name: string;
      phoneNumber: string;
      email: string;
      createdAt?: string;
      related?: boolean;
      status?: Status;
    };

    type LegalForm = {
      name: string;
      id: number;
    };

    type Member = {
      name: string;
      issuedBy: string;
      number: number;
      registrationDepartment: string;
      registrationDate: string;
      registrationNumber: string;
      linkedPerson: LinkedPerson;
      id?: number;
      createdAt?: string;
    };

    type Scan = {
      document: number;
      file: string;
      size: number;
      id: number;
      name: string;
    };

    type ActionDocument = {
      id: number | null;
      documentName: string;
      required: boolean;
      documentType?: Option | number;
    };

    type FetchDocument = {
      id: number;
      name: string;
      required: boolean;
      scans: Scan[];
    };

    type ActionBlock = {
      id: number;
      blockName: string;
      documents: Model.ActionDocument[];
    };

    type Action = {
      id?: number;
      actionName: string;
      icon?: string;
      isActive: boolean;
      actionType?: Option | string | null;

      blocks?: Model.ActionBlock[];
    };

    type Application = {
      notaryAction: number;
      client?: number;
      type: string;
      name?: string;
      phoneNumber?: string;
      email?: string;
      priority?: number;
    };

    type ExecutionDate = {
      date: string;
      expired: boolean;
    };

    type ActionType = {
      name: string;
      value: string;
    };

    type ApplicationStatus = {
      id: number;
      name: string;
    };

    type ApplicationStatuses = {
      actionType: ActionType;
      applicationStatus: Model.ApplicationStatus;
      executionDate: Model.ExecutionDate;
      priority: number;
    };

    type ApplicationCard = {
      id: number;
      createdAt: string;
      action: {
        name: string;
        id: number;
      };
      status: Model.ApplicationStatuses;
      client: string;
      executor?: {
        avatar: string;
        fullName: string;
        jobTitle: string;
      };
    };

    type ApplicationDetail = {
      id: number;
      createdAt: string;
      action: {
        id: number;
        name: string;
      };
      status: Model.ApplicationStatuses;
      client?: string;
      author: string;
      executor?: string | null;
    };

    type ApplicationHistory = {
      historyType: {
        id: number;
        name: string;
      };
      oldHistory: {
        id: number;
        name: string;
      } | null;
      commentary?: string;
      owner: {
        name: string;
        avatar?: string;
      };
      isActive: boolean;
      createdAt: string;
    };

    type Person = {
      id: number;
      avatar: string | null;
      fullName: string;
      jobTitle: string | null;
    };

    type Executor = {
      executor: number | Model.Person;
      observer?: number | Model.Person;
      executionDate: string;
    };

    type ApplicationClient = {
      id: number;
      isAccepted: boolean;
      memberType: {
        id: number;
        name: string;
      };
      personalMeeting: boolean;
      client: Response.ClientResponse | null;
    };
  }

  namespace Response {
    type ResponseScan = {
      id: number;
      client: number;
      document: number;
      file: string;
      createdAt: string;
    };

    type Document = {
      name: string;
      id: number;
      scans: [
        {
          id: number;
          file: string;
          name: string;
        },
      ];
    };

    type ResponseScans = [
      {
        blocks: string;
        documents: Document[];
      },
    ];

    type Ordinary = {
      status: string | number;
      message: string;
    };

    type Tokens = {
      access: string;
      refresh: string;
    };

    type LoginResponse = {
      user: Model.User;
    } & Tokens;

    type EmployeeResponse = {
      count: 0;
      next: string;
      previous: string;
      results: Model.Employee[];
    };

    type ClientsResponse = {
      results: Model.Client[];
    } & Omit<Response.EmployeeResponse, "results">;

    type ClientResponse = {
      personPosition: {
        position: string;
        name: string;
      };
    } & Omit<Model.Client, "personPosition">;

    type DocumentsResponse = {
      results: Model.Document[];
    } & Omit<Response.EmployeeResponse, "results">;

    type MemberResponse = {
      results: Model.Member[];
    } & Omit<Response.EmployeeResponse, "results">;

    type CardsResponse = {
      results: Model.LinkedPerson[];
    } & Omit<Response.EmployeeResponse, "results">;

    type LegalFormsResponse = {
      results: Model.LegalForm[];
    } & Omit<Response.EmployeeResponse, "results">;

    type ApplicationsResponse = {
      results: Model.ApplicationCard[];
    } & Omit<Response.EmployeeResponse, "results">;
  }

  namespace Request {
    type PasswordCreate = {
      password: string;
      token: string;
    };

    type PasswordRecovery = {
      email: string;
    };

    type Login = {
      email: string;
      password: string;
    };
  }
  type CreateClient = {
    personPosition: string;
  } & Partial &
    Omit<Model.Client, "personPosition">;

  type RequestEmployee = {
    supervisor: number;
  } & Omit<Model.Employee>;

  type ObjectTypeGeneric<T> = {
    id: number;
    key: string;
    value: keyof T;
  };
}
