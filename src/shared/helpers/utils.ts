export const getDateString = (date: Date): string => {
  const dateObject = date && new Date(date);
  const day = String(dateObject.getUTCDate()).padStart(2, "0");
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
  const year = String(dateObject.getUTCFullYear());

  return `${day}.${month}.${year}`;
};

export const isApiResponse = (error: unknown): error is ErrorResponse => {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    // eslint-disable-next-line prettier/prettier
    typeof(error as ErrorResponse).status === "number"
  ) {
    return true;
  }

  return false;
};

export const getDefaultStatus = (status: { type: string | boolean; name: string }): Status => {
  const statusType: Record<string, string> = {
    true: "active",
    false: "deactive",
    new: "new",
  };

  const statusName: Record<string, string> = {
    true: "АКТИВНЫЙ",
    false: "НЕАКТИВНЫЙ",
    new: "НOВЫЙ",
  };

  return {
    type: statusType[status?.type.toString()] as Status["type"],
    name: statusName[status?.type.toString()] as Status["type"],
  };
};

export const isAllDaysNotAvailable = (array: Schedule.ScheduleItem[]) => {
  return array.every((el) => el.available === false);
};

export const hasNewStatus = (array: OfficesCard[]) => {
  return array && array?.some((el: OfficesCard) => el.status.type === "new");
};

export const formatPhoneNumber = (phoneNumber: string) => {
  const numericPhoneNumber = phoneNumber?.replace(/\D/g, "");

  if (numericPhoneNumber?.length >= 11) {
    const formattedPhoneNumber = `+${numericPhoneNumber.slice(0, 1)} ${numericPhoneNumber.slice(
      1,
      4,
    )} ${numericPhoneNumber.slice(4, 7)} ${numericPhoneNumber.slice(7, 9)} ${numericPhoneNumber.slice(9, 11)}`;

    return formattedPhoneNumber;
  } else {
    return phoneNumber;
  }
};

export const checkErrorStep = (errors: ErrorObject[]): string | undefined => {
  const fields = {
    info: ["districtFullName", "districtShortName", "chamberName", "phoneNumber", "email", "fullName", "inn"],
    address: ["region", "city", "street", "house", "office", "postCode"],
  };

  const foundStep = (Object.keys(fields) as (keyof typeof fields)[]).find((step) =>
    errors.some((error) => fields[step].includes(error.attr)),
  );

  return foundStep ? foundStep : undefined;
};

export const declinationOfNumber = <T>(number: number, wordForms: T[]) => {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) {
    return wordForms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return wordForms[1];
  }
  if (n1 === 1) {
    return wordForms[0];
  }
  return wordForms[2];
};

export const getInitials = (fullName: string): string => {
  const names = fullName.split(" ").filter(Boolean);
  let initials = "";

  if (names.length > 0) {
    initials += names[0][0].toUpperCase();

    if (names.length > 1) {
      initials += names[1][0].toUpperCase();
    }
  }

  return initials;
};

export const hasRole = (roles: Model.Role[], roleId: number): boolean => {
  const hasRole = roles && roles.some((role) => role.id === roleId);
  return hasRole;
};

export const formatTime = (input: string) => {
  const [hours, minutes] = input.split(":");
  const formattedHours = Number(hours).toString().padStart(2, "0");
  const formattedMinutes = Number(minutes).toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
};

export const isEmptyObject = (value?: object): boolean => {
  return value ? Object.values(value).length > 0 : false;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${day}.${month}.${year}`;
};

export const calculateAge = (dateString: string): number => {
  const currentDate = new Date();
  const [day, month, year] = dateString.split(".").map(Number);

  const birthDate = new Date(year, month - 1, day); // Month is zero-indexed in Date object

  const currentYear = currentDate.getFullYear();
  const birthYear = birthDate.getFullYear();

  let age = currentYear - birthYear;

  const currentMonth = currentDate.getMonth();
  const birthMonth = birthDate.getMonth();

  if (birthMonth > currentMonth || (birthMonth === currentMonth && birthDate.getDate() > currentDate.getDate())) {
    age--;
  }

  return age;
};

const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split(".").map(Number);
  return new Date(year, month - 1, day);
};
export const isPassportExpired = (inputs: InputData[]) => {
  let dateOfBirth = "";
  let passportIssueDate = "";
  let isUnder20 = false;

  inputs.forEach((el) => {
    if (el.field === "dateOfBirth") {
      dateOfBirth = String(el.value);
      const birthDate = parseDate(dateOfBirth); // Parsing date string to Date object
      const today = new Date();
      const ageDifference = today.getFullYear() - birthDate.getFullYear();

      if (ageDifference < 20) {
        isUnder20 = true;
      }
    } else if (el.field === "passportIssueDate") {
      passportIssueDate = String(el.value);
    }
  });

  if (isUnder20) {
    return false;
  }

  const birthDate = parseDate(dateOfBirth);
  const issueDate = parseDate(passportIssueDate);

  const age20Date = new Date(birthDate);
  age20Date.setFullYear(age20Date.getFullYear() + 20);

  const age45Date = new Date(birthDate);
  age45Date.setFullYear(age45Date.getFullYear() + 45);

  const isOver20 = issueDate < age20Date;
  const isOver45 = issueDate < age45Date;

  return isOver20 && isOver45;
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) {
    return "0";
  } else {
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["байт", "КБ", "МБ", "ГБ", "ТБ"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
};
