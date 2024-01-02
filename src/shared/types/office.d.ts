export declare global {
  namespace AddressModel {
    type Address = {
      region: string;
      city: string;
      street: string;
      house: string;
      office: string;
      postCode: string;
    };

    type FormAddress = {
      id: number;
      notary: Address;
      fias: Address;
      notaryOffice: Address;
    };

    type AddressData = {
      email: string;
      phone?: string;
      mobilePhone?: string;
      address?: AddressModel.Address | null;
      role?: string | null;
      className?: string;
    };

    type FormAddressResponse = Pick<FormAddress, "notary" | "fias" | "notaryOffice">;
  }
  namespace Info {
    type FormInfo = {
      districtFullName: string;
      districtShortName: string;
      chamberName: string;
      phoneNumber: string;
      fullName: string;
      inn: number;
      email: string;
      createAt?: Date;
    };

    type FormInfoResponse = {
      id: number;
      is_active: boolean;
      districtFullName: string;
      districtShortName: string;
      chamberName: string;
      phoneNumber: string;
      email: string;
      created_at: date;
      updated_at: date;
    };
  }
  namespace Schedule {
    type timeSlot = {
      id: number | string;
      value: string | number | boolean | null;
      field: string;
      required: boolean;
    };

    type ScheduleItem = {
      id: number;
      day: string;
      field: string;
      available: boolean;
      timeSlots: timeSlot[];
    };

    type FormSchedule = {
      id: number;
      schedule: Schedule.ScheduleItem[];
    };

    type ScheduleItemResponse = {
      day: string;
      isWork: boolean;
      startedAt: string;
      finishedAt: string;
    };

    type FormScheduleResponse = ScheduleItemResponse[];
  }
  namespace Office {
    type Card = {
      id: number;
      officeNumber: number;
      createdDate: string;
      districtFullName: string;
      districtShortName: string;
      chamberName: string;
      address: Pick<AddressModel.FormAddress, "notary" | "fias" | "notaryOffice"> | null;
      status: Status;
      phoneNumber: string;
      email: string;
      inn: string;
      license: string;
      fullName: string;
      applications: number;
      employees: number;
      clients: number;
    };

    type OfficeFullResponce = {
      id: number;
      isActive: boolean;
      createdAt: Date;
      fullName: string;
      inn: string;
      districtShortName: string;
      districtFullName: string;
      chamberName: string;
      applications: number;
      employees: number;
      clients: number;
      phoneNumber: string;
      email: string;
      inn: string;
      fullName: string;
      license: string;
      address: Pick<AddressModel.FormAddress, "notary" | "fias" | "notaryOffice"> | null;
      status: {
        type: boolean | string;
        name: string;
      };
    } & { schedule: Schedule.ScheduleItemResponse[] };

    type OfficesResponce = {
      address: AddressModel.Address;
    } & Omit<OfficeFullResponce, "address">;

    type Option = {
      value: string;
      name: string;
      count: number;
    };

    type Filters = {
      value: string;
      name: string;
      options: Option[];
    };

    type OfficeResponceData = {
      count: number;
      next?: null;
      previous?: null;
      results: OfficesResponce[];
      filters: Filters[];
    };
  }

  type CreateOfficeData = {
    info: InputData[];
    notary: InputData[];
    fias: InputData[];
    notaryOffice: InputData[];
    schedule: Schedule.ScheduleItem[];
  };

  type ActiveOffice = {
    id?: number;
    isActive: boolean;
    message?: string;
  };

  type addressType = {
    id: number;
    addressType: "notary" | "fias" | "notaryOffice";
    label: string;
    address: InputData[];
  };

  type EditOfficeInfo = {
    id: number | string;
    info: InputData[];
    addresses: addressType[];
    schedule: Schedule.ScheduleItem[];
  };
}
