import type { ReactNode, FC, SyntheticEvent } from "react";
declare global {
  namespace Blocks {
    type Profile = {
      fullName?: string;
      role: Model.Role[];
      img?: string;
    };

    type Sort = {
      options: Option[];
      className?: string;
    };

    type HeadOffice = {
      id: number;
      isActive: boolean;
      back: string;
      status: Status;
      size?: string;
      officeTitle?: string;
      chamberName: string;
      number: number;
      dateCreated: string;
      districtFullName: string;
      buttons?: Button[];
    };

    type HeaderButtons = {
      offices: string;
      rolesAndAccess: string;
      notaryActions: string;
    };

    type NotFound = {
      url: string;
      title?: string;
      buttonName: string;
    };

    type ErrorResult = {
      url?: string;
      title?: string;
      subtext?: string;
      button?: string;
    };

    type ListItem = {
      id: number;
      icon?: string;
      text?: string;
      subtext?: string;
    };

    type List = {
      title: string;
      children?: ReactNode;
      list?: ListItem[];
      textFlex?: boolean;
      textReverse?: boolean;
    };

    type AlertType = "contora" | "success" | "error" | "attention" | "registered" | "warning";

    type AlertProps = {
      message: string;
      id: number | string;
      variant: AlertType;
      point?: boolean;
    };

    type ClientFormValues = {
      id: string | number;
      title?: string;
      inputs: InputData[];
    };

    type InputList = FC<{
      values: InputData[];
      changeHandle: InputOnChange;
      title?: string;
      titleBeforeField?: string;
      clientOptions?: Option[];
      selectedClient?: Option;
      legalForms?: Option[];
      selectedLegalForm?: Option;
      formId: string;
    }>;

    type DetailHead = {
      status: Status;
      name: string;
      number: number;
      date: string;
      image: string | undefined;
      id: number;
      isDelete?: boolean;
      backLink: string;
      editLink?: string;
      priory?: number;
      deleteClickHandle?: MouseEventHandler<HTMLButtonElement>;
      setIsEdit?: (val: boolean) => void;
    };

    type AddressForm = {
      notary: InputData[];
      fias: InputData[];
      notaryOffice: InputData[];
      updateFields: (fields: Partial<CreateOfficeData>) => void;
    };

    type ListHead = FC<{
      title: string;
      count: number;
      options: Option[];
      button: Button;
      onChange?: InputOnChange;
      children?: ReactElement;
    }>;

    type SearchWithSuggestions = FC<{
      className?: string;
      setLinkedPersonId: (val: number) => void;
      isEdit?: boolean;
      editMember?: Model.Client | null;
      linkedPersonId?: number | null;
    }>;

    type SearchClient = FC<
      {
        setSelectedClient: (val: Model.Client | Model.Employee | string) => void;
        isEmployeee?: boolean;
      } & InputData
    >;

    type ActionBlock = {
      id: number;
      blockName: string;
      isErrorBlock?: boolean;
      documents: {
        id: number | null;
        block: InputData[];
      }[];
    };
    type HistoryBlock = FC<{
      createdAt: string;
      imageUrl: string;
      fullName: string;
      statuses: Model.ApplicationStatuses;
    }>;

    type AddLock = FC<{
      isChecked: boolean;
      changeHandle: (val: { field: string; value: boolean | string | number; id: number | string }) => void;
      field: string;
      id: number;
    }>;

    type AddDocumentOrMember = FC<{
      setShowModal: (val: boolean) => void;
      isDocument: boolean;
      memberData?: Model.Member;
      documentData?: Model.Document;
      isEdit?: boolean;
    }>;

    type AddEditClientForm = FC<{
      isEditForm?: boolean;
      client?: Response.ClientResponse;
      senData: (formData: FormData, position: string) => void;
      onReset: () => void;
      errors?: ErrorObject[];
      isLoading: boolean;
      isSuccess: boolean;
      formId: string;
    }>;

    type ApplicationClientForm = FC<{
      applicationClient?: Model.ApplicationClient;
      deleteHandle?: (formId: number) => void;
      formId: number;
      clientBlockText: string;
      memberId: number;
    }>;
  }
}
