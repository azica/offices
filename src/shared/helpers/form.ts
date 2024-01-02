import { fieldsForCheckRussianLetters } from "../constants";

export const getValueFromArray = <T>(array: InputValue[] | undefined): T => {
  let values: Partial<T> = {};

  array?.forEach(({ field, value }) => {
    values = { ...values, [field]: value };
  });

  return values as T;
};

export const addedErrorOnField = (errors: ErrorObject[], inputs: InputData[]) => {
  const newInputs = inputs.map((item) => {
    const errorItem = errors?.find((error) => error.attr === item.field);
    return errorItem
      ? {
          ...item,
          helperText: errorItem.detail,
          invalid: true,
        }
      : {
          ...item,
          helperText: "",
          invalid: false,
        };
  });

  return newInputs;
};

export const checkTimePickersForEmpty = (array: Schedule.ScheduleItem[]) => {
  let isEmpty = true;
  const emptyDays: Schedule.ScheduleItem[] = array.map((el) => {
    if (el.available) {
      const timeSlots = el.timeSlots.map((item) => {
        if (item.value === "") {
          isEmpty = true;
          return { ...item, invalid: true };
        } else {
          return { ...item, invalid: false };
        }
      });

      return { ...el, timeSlots };
    }
    return el;
  });

  return {
    emptyDays,
    isEmpty,
  };
};

export const checkForRussianLetters = (inputs: InputData[]) => {
  let isError = false;
  const regex = /[А-Яа-я]/g;
  const license = /^(?=.*\d)[\d№-]{1,25}$/u;
  const newInputs =
    inputs &&
    inputs?.map((item) => {
      let newItem = item;

      if (!item.disabled && fieldsForCheckRussianLetters.includes(item.field) && !item.value?.toString().match(regex)) {
        isError = true;
        newItem = {
          ...item,
          invalid: true,
          helperText: "Введите текст на русском",
        };
      }
      if (item.pattern === "[А-Яа-яЁё\\s-]+") {
        newItem = {
          ...item,
          invalid: true,
          helperText: "Введите только буквы",
        };
      }
      if (item.field === "license" && !item.value?.toString().match(license)) {
        isError = true;
        newItem = {
          ...item,
          invalid: true,
          helperText: "Введите только цифры, тире и №",
        };
      }
      return newItem;
    });
  if (!isError) {
    isError = false;
  }

  return { isError, newInputs };
};

export const updatedInputsData = <T extends Record<string, unknown>>(
  inputsData: InputData[],
  data: Partial<T> = {},
): InputData[] => {
  if (data !== null && Object.keys(data).length > 0) {
    return inputsData.map((input) => {
      const newInput = { ...input };

      if (input.field in data) {
        const fieldValue = data[input.field as keyof T];

        if (fieldValue !== null && fieldValue !== undefined && typeof fieldValue === "object") {
          const optionValue = fieldValue as unknown as Option;

          newInput.value = optionValue.value == undefined ? Number(optionValue.id) : optionValue.value;
          newInput.defaultOption = { name: optionValue.name, value: optionValue.value || Number(optionValue.id) };
        } else if (typeof fieldValue === "string" || typeof fieldValue === "number") {
          newInput.value = fieldValue;
        } else if (typeof fieldValue === "boolean") {
          newInput.value = Number(fieldValue);
        }
      }

      return newInput;
    });
  }

  return inputsData;
};

export const updateAddressInputs = (adressFields: addressType[], data: Office.OfficeFullResponce): addressType[] => {
  return adressFields.map((el) => {
    if (data && (data.address as Pick<AddressModel.FormAddress, "notary" | "fias" | "notaryOffice">)[el.addressType]) {
      return {
        ...el,
        address: data.address ? updatedInputsData(el.address, data.address[el.addressType]) : el.address,
      };
    }
    return el;
  });
};

export const updatedScheduleData = (
  scheduleData: Schedule.ScheduleItem[],
  data: Schedule.ScheduleItemResponse[],
): Schedule.ScheduleItem[] => {
  return scheduleData.map((schedule: Schedule.ScheduleItem) => {
    const matchingData = data.find((item) => item.day === schedule.day);
    if (matchingData) {
      return {
        ...schedule,
        available: matchingData.isWork,
        timeSlots: schedule.timeSlots.map((el: Schedule.timeSlot) =>
          el.field === "startedAt"
            ? {
                ...el,
                id: `${schedule.field}_${el.id}`,
                value: matchingData.startedAt,
                field: "start",
              }
            : {
                ...el,
                id: `${schedule.field}_${el.id}`,
                value: matchingData.finishedAt,
                field: "end",
              },
        ),
      };
    }
    return schedule;
  });
};

export const clearValues = (inputs: InputData[]): InputData[] => {
  const newInputs = inputs.map((el) => ({ ...el, value: "" }));
  return newInputs;
};
