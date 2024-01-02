import type { FetchType, PersonType } from "../dadata";
import type { StatusEnum } from "@/types/enums";
import type { ReactNode, FC, SyntheticEvent } from "react";

declare global {
  type TabData = {
    active?: string;
    link: string;
    name: string;
    value: string;
    notific?: string;
    hasIcon?: boolean;
    count?: number;
  };

  type TabsList = {
    tabsList: TabData[];
  };

  type InputData = {
    id: number;
    value: string | number;
    field: string;
    label?: string;
    type?: string;
    helperText?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    readOnly?: boolean;
    minLength?: number;
    maxLength?: number;
    invalid?: boolean;
    options?: {
      id?: number | string;
      name: string;
      value: number | string;
    }[];
    mask?: string;
    maskProps?: {
      maskChar?: string | null;
      maskPlaceholder?: string | null;
    };
    dateProps?: {
      disablePast?: boolean;
      disableFuture?: boolean;
      limitFutureMonths?: number;
      limitPastMonths?: number;
    };
    suggest?: FetchType;
    personType?: PersonType;
    changeable?: boolean;
    autoComplete?: string;
    textarea?: {
      multiline: boolean;
      rows: number;
    };
    multiple?: boolean;
    inputSize?: string;
    hasLabelMark?: boolean;
    iconLeft?: boolean;
    pattern?: string;
    className?: string;
    name?: string;
    isErrorTooltip?: boolean;
    isNewInput?: boolean;
    defaultOption?: Option;
  };

  type InputOnChange = {
    (value: { field: string; value: string | number; id: number | string; suggestion?: { [name: string]: any } }): void;
  };

  type InputsSpreader = {
    onChange: InputOnChange;
  } & InputData;

  type InfoEditInput = {
    id: number;
    field: string;
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
    value: string;
  };

  type InputValue = {
    field: string;
    value: string | number;
  };

  type CheckboxOnChange = {
    (value: { field: string; value: boolean; id: number | string }): void;
  };

  type Checkbox = {
    isChecked: boolean;
    selectedValue?: string;
    onChange: CheckboxOnChange;
    label?: string;
    id: number;
    field: string;
    isLabelRight?: boolean;
    className?: string;
  };

  type Input = {
    endAdornment?: ReactNode;
    startAdornment?: ReactNode;
    onChange: InputOnChange;
    onKeyDown?: (event: KeyboardEvent) => void;
  } & InputData;

  type Button = {
    type?: "button" | "submit" | "reset";
    size?: "big" | "medium" | "small";
    variant?: "primary" | "secondary" | "secondaryRed" | "bordered" | "blue" | "white";
    disabled?: boolean;
    children: ReactNode;
    bordered?: boolean;
    href?: string;
    loader?: boolean;
    onClick?: (e: SyntheticEvent) => void;
    notific?: boolean;
    isFullWidth?: boolean;
  };

  type Option = {
    id?: number;
    name: string;
    value: number | string;
  };

  type Select = FC<{
    className?: string;
    id?: number;
    value: string | number;
    field: string;
    label?: string;
    options: Option[];
    defaultValue: Option | null;
    size?: "big" | "medium" | "small";
    onSelect: InputOnChange;
    hasLabelMark?: boolean;
    unactive?: boolean;
    required?: boolean;
    helperText?: string;
    disabled?: boolean;
    placeholder?: string;
    readOnly?: boolean;
    invalid?: boolean;
    withDots?: boolean;
  }>;

  type RadioButton = {
    option: string;
    selectedOption?: string;
    onOptionChange: (option: string) => void;
  };

  type FormWrapper = {
    title?: string;
    subtitle?: string;
    changeHandle?: InputOnChange;
    values?: InputData[] | null;
    children?: ReactNode;
  };

  type Time = {
    hours: number;
    minutes: number;
  };

  type TimePicker = {
    value: string | number | boolean | null;
    id: string | number;
    field: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    onChange: (value: { field: string; value: string | number | boolean; id: number | string }) => void;
    className?: string;
  };

  type Status = {
    type: `${StatusEnum}`;
    name: string;
    size?: string;
  };

  type Step = {
    step: number;
    title: string;
  };

  type StepsList = {
    steps: Step[];
    activeStep: number;
    className?: string;
  };

  type Tabs = FC<{
    buttons: InputData;
    onChange: InputOnChange;
    field: string;
  }>;

  type IconButton = FC<{
    disabled?: boolean;
    icon: ReactNode;
    href?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }>;

  type Uploader = FC<
    {
      size?: "lg" | "sm";
      onClick?: () => void;
      fromCard?: boolean;
      onChange?: (data: File[]) => void;
      isSuccess?: boolean;
    } & Omit<UploaderBig, "onChange">
  >;

  type UploaderBig = {
    multiple?: boolean;
    accept?: string;
    onChange: (data: File[]) => void;
    isSuccess: boolean;
    isLoading: boolean;
  };

  type Suggestion = { id: number; name: string };

  type SearchWithSuggestions = FC<{
    inputData: InputData;
    onSearch: InputOnChange;
    suggestions: Model.Client[];
    className?: string;
    setClientId: (val: number) => void;
  }>;
}
