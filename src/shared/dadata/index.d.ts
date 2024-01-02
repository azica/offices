import type { ReactElement, SyntheticEvent } from "react";

export interface AddressMetroBlock {
  name: string | null;
  line: string | null;
  distance: number | null;
}

export interface AddressResponseType {
  value: string;
  unrestricted_value: string;
  data: { [key: string]: any } & {
    postal_code?: string | null;
    country?: string | null;
    federal_district?: string | null;
    region_fias_id?: string | null;
    region_kladr_id?: string | null;
    region_with_type?: string | null;
    region_type?: string | null;
    region_type_full?: string | null;
    region?: string | null;
    area_fias_id?: string | null;
    area_kladr_id?: string | null;
    area_with_type?: string | null;
    area_type?: string | null;
    area_type_full?: string | null;
    area?: string | null;
    city_fias_id?: string | null;
    city_kladr_id?: string | null;
    city_with_type?: string | null;
    city_type?: string | null;
    city_type_full?: string | null;
    city?: string | null;
    city_area?: string | null;
    city_district_fias_id?: string | null;
    city_district_kladr_id?: string | null;
    city_district_with_type?: string | null;
    city_district_type?: string | null;
    city_district_type_full?: string | null;
    city_district?: string | null;
    settlement_fias_id?: string | null;
    settlement_kladr_id?: string | null;
    settlement_with_type?: string | null;
    settlement_type?: string | null;
    settlement_type_full?: string | null;
    settlement?: string | null;
    street_fias_id?: string | null;
    street_kladr_id?: string | null;
    street_with_type?: string | null;
    street_type?: string | null;
    street_type_full?: string | null;
    street?: string | null;
    house_fias_id?: string | null;
    house_kladr_id?: string | null;
    house_type?: string | null;
    house_type_full?: string | null;
    house?: string | null;
    block_type?: string | null;
    block_type_full?: string | null;
    block?: string | null;
    flat_type?: string | null;
    flat_type_full?: string | null;
    flat?: string | null;
    flat_area?: string | null;
    square_meter_price?: string | null;
    flat_price?: string | null;
    postal_box?: string | null;
    fias_id?: "HOUSE.HOUSEGUID" | "ADDROBJ.AOGUID" | null;
    fias_code?: string | null;
    fias_level?: "0" | "1" | "3" | "4" | "5" | "6" | "7" | "8" | "65" | "-1" | null;
    fias_actuality_state?: number | null;
    kladr_id?: string | null;
    geoname_id?: string | null;
    capital_marker?: "0" | "1" | "2" | "3" | "4" | null;
    okato?: string | null;
    oktmo?: string | null;
    tax_office?: string | null;
    tax_office_legal?: string | null;
    timezone?: string | null;
    geo_lat?: string | null;
    geo_lon?: string | null;
    beltway_hit?: string | null;
    beltway_distance?: string | null;
    metro?: AddressMetroBlock | null;
    qc_geo?: "0" | "1" | "2" | "3" | "4" | "5" | null;
    qc_complete?: string | null;
    qc_house?: string | null;
    history_values?: (string | null)[];
    unparsed_parts?: string | null;
    source?: string | null;
    qc?: string | null;
  };
}

// types formed by description's from:
// - https://dadata.ru/api/find-party/
export type FinanceTaxSystem = "ENVD" | "ESHN" | "SRP" | "USN" | "ENVD_ESHN" | "USN_ENVD";
export type FinanceBlock = {
  tax_system: FinanceTaxSystem | null;
  income: string | null;
  expense: string | null;
  debt: string | null;
  penalty: string | null;
};
export type OKVED = {
  main: string | null;
  type: string | null;
  code: string | number | null;
  name: string | null;
};

// types formed by description's from:
// - https://dadata.ru/api/suggest/party/
export type PartyStatus = "ACTIVE" | "LIQUIDATING" | "LIQUIDATED" | "REORGANIZING";
export type PartyType = "LEGAL" | "INDIVIDUAL";
export type BranchType = "MAIN" | "BRANCH";
export type PersonType = "LEGAL" | "INDIVIDUAL";

export interface PartySateBlock {
  status: PartyStatus | null;
  actuality_date: number | null;
  registration_date: number | null;
  liquidation_date: null;
}

export interface PartyPerson {
  ogrn: string | number | null;
  inn: string | number | null;
  ogrnip: string | number | null;
  name: string | null;
  fio: string | null;
  hid: string | null;
}

export interface PartyFounder extends PartyPerson {
  type: "LEGAL" | "PHYSICAL" | null;
}

export interface PartyManager extends PartyPerson {
  post: string | number | null;
  type: "EMPLOYEE" | "FOREIGNER" | "LEGAL" | null;
}

export type PartyOpfType = "BANK" | "BANK_BRANCH" | "NKO" | "NKO_BRANCH" | "RKC" | "OTHER";

export interface PartyOpf {
  type: PartyOpfType | null;
  code: string | null;
  full: string | null;
  short: string | null;
}

export interface PartyName {
  full_with_opf: string | null;
  short_with_opf: string | null;
  latin: null;
  full: string | null;
  short: string | null;
}

export interface PartyFtsRegistration {
  type: string | null;
  code: string | number | null;
  name: string | null;
  address: string | null;
}

export interface PartyCapital {
  type: string | null;
  value: string | null;
}

export interface PartyManagement {
  name: string | null;
  post: string | null;
  disqualified: string | null;
}

// types formed by description's from:
// - https://dadata.ru/api/suggest/party/
// - https://dadata.ru/api/find-party/
export interface PartyResponseType {
  value: string | null;
  personType: PersonType;
  data: {
    kpp: string | null;
    capital: PartyCapital | null;
    management: PartyManagement | null;
    founders: PartyFounder[] | null;
    managers: PartyManager[] | null;
    branch_type: BranchType | null;
    branch_count: number | null;
    source: string | null;
    qc: "0" | "1" | "3" | null;
    hid: string | null;
    type: PartyType | null;
    state: PartySateBlock | null;
    opf: PartyOpf | null;
    name: PartyName | null;
    inn: string | null;
    ogrn: string | null;
    ogrnip: string | null;
    okpo: string | null;
    okved: string | null;
    okveds: OKVED[] | null;
    authorities: any | null;
    fts_registration: PartyFtsRegistration | null;
    documents: any[] | null;
    licenses: any[] | null;
    finance: FinanceBlock;
    address: AddressResponseType;
    phones: any[] | null;
    emails: string | null;
    ogrn_date: number | null;
    okved_type: string | null;
    employee_count: string | null;
  };
}

// types formed by description's from:
// - https://dadata.ru/suggestions/usage/bank/
export interface BankName {
  payment: string | null;
  full: string | null;
  short: string | null;
}

export interface BankResponseType {
  value: "АО «Тинькофф Банк»";
  unrestricted_value: "АО «Тинькофф Банк»";
  data: {
    opf: PartyOpf | null;
    name: BankName | null;
    bic: string | null;
    swift: string | null;
    inn: string | null;
    kpp: string | null;
    okpo: string | null;
    correspondent_account: string | null;
    registration_number: string | null;
    payment_city: string | null;
    state: PartySateBlock | null;
    rkc: string | null;
    address: AddressResponseType;
    phones: any[] | null;
  };
}

// types formed by description's from:
// https://dadata.ru/api/suggest/country/
export interface CountryResponseType {
  data: {
    alfa2: string | null;
    alfa3: string | null;
    code: string | null;
    name: string | null;
    name_short: string | null;
  };
  unrestricted_value: string | null;
  value: string | null;
}

// types formed by description's from:
// https://dadata.ru/api/clean/email/
export type EmailType = "PERSONAL" | "CORPORATE" | "ROLE" | "DISPOSABLE";

export interface EmailResponseType {
  value: string;
  unrestricted_value: string | null;
  data: {
    local: string | null;
    domain: string | null;
    type: EmailType | null;
    source: string | null;
    qc: "0" | "1" | "2" | "3" | "4" | null;
  };
}

// types formed by description's from:
// https://dadata.ru/suggestions/usage/name/
export type FioGender = "MALE" | "FEMALE" | "UNKNOWN";

export interface FioResponseType {
  value: string;
  unrestricted_value: string | null;
  data: {
    surname: string | null;
    name: string | null;
    patronymic: string | null;
    gender: FioGender | null;
    source: string | null;
    qc: "0" | "1";
  };
}

// types formed by description's from:
// https://dadata.ru/suggestions/outward/fms_unit/
export interface FmsUnitResponseType {
  data: {
    code: string | null;
    name: string | null;
    region_code: string | null;
    type: "0" | "1" | "2" | "3" | null;
  };
  code: string | null;
  name: string | null;
  region_code: string | null;
  type: string | null;
  unrestricted_value: string | null;
  value: string | null;
}

export type AddressQueryMode = "address";

export type CountryQueryMode = "country";

export type PartyQueryMode = "party";

export type BankQueryMode = "bank";

export type EmailQueryMode = "email";

export type FioQueryMode = "fio";

export type FmsUnitQueryMode = "fms_unit";

export type FetchType =
  | AddressQueryMode
  | CountryQueryMode
  | PartyQueryMode
  | BankQueryMode
  | EmailQueryMode
  | FioQueryMode
  | FmsUnitQueryMode;

export type AbstractResponseType =
  | CountryResponseType
  | PartyResponseType
  | BankResponseType
  | EmailResponseType
  | FioResponseType
  | FmsUnitResponseType;

export type SpecificQueryModeResponse<T extends FetchType> = T extends AddressQueryMode
  ? AddressResponseType
  : T extends CountryQueryMode
    ? CountryResponseType
    : T extends PartyQueryMode
      ? PartyResponseType
      : T extends BankQueryMode
        ? BankResponseType
        : T extends EmailQueryMode
          ? EmailResponseType
          : T extends FioQueryMode
            ? FioResponseType
            : T extends FmsUnitQueryMode
              ? FmsUnitResponseType
              : AddressQueryMode;

interface BasePayload {
  query: string;
  count?: number;
}

interface BaseInputProps<T = HTMLInputElement> {
  autocomplete: boolean | "off";
  className: string;
  onBlur: React.FocusEventHandler<T>;
  onChange: React.ChangeEventHandler<T>;
  onFocus: React.FocusEventHandler<T>;
  onKeyDown: React.KeyboardEventHandler<T>;
  placeholder: string;
  value: string;
  name: string;
}

type BaseProps = {
  allowClear?: boolean;
  autocomplete?: "on" | "off";
  city?: boolean;
  className?: string;
  customStyles?: {
    "react-dadata__custom-action"?: string | React.CSSProperties;
    "react-dadata__suggestion"?: string | React.CSSProperties;
    "react-dadata__suggestion-note"?: string | React.CSSProperties;
    "react-dadata__suggestions"?: string | React.CSSProperties;
  };
  count?: number;
  customEndpoint?: string | { host?: string; api?: string };
  customInput?: (props: BaseInputProps) => React.ReactNode;
  debounce?: number;
  forceOpenList?: boolean;
  onBlur?: (event: SyntheticEvent<HTMLInputElement, FocusEvent>, query: string) => void;
  onIdleOut?: (query: string) => void;
  payloadModifier?: object | ((payload: BasePayload) => BasePayload & object);
  placeholder?: string;
  query?: string;
  showNote?: boolean;
  silentQuery?: string;
  style?: React.CSSProperties;
  token: string;
  type?: FetchType;
  field: string;
  required?: boolean;
  helperText?: string;
  invalid?: boolean;
  id: number | string;
  label?: Element | ReactNode;
  disabled?: boolean;
  name: string;
};

type SpecificModeProps<T extends FetchType> = {
  customActions?: (suggestions: SpecificQueryModeResponse<T>[]) => React.ReactNode;
  onChange?: (suggestion: SpecificQueryModeResponse<T>) => void;
  silentInit?: (suggestions: SpecificQueryModeResponse<T>[]) => number;
};

export type ReactDaDataBoxType<T extends FetchType = AddressQueryMode> = <T extends FetchType = AddressQueryMode>(
  props: BaseProps & SpecificModeProps<T>,
) => ReactElement<BaseProps & SpecificModeProps<T>>;

export const ReactDaDataBox: ReactDaDataBoxType;

export default ReactDaDataBox;
