export { setTokenFromStorage, getTokensFromStorage, clearLocalStorage } from "./localStorage";
export { getUserByJwt, getDecodedOfficeId, getDecodedUserRoles } from "./jwtDecode";
export {
  getValueFromArray,
  addedErrorOnField,
  checkForRussianLetters,
  updatedInputsData,
  updatedScheduleData,
  updateAddressInputs,
  clearValues,
  isFormFilled,
  // formValidation,
} from "./form";
export {
  getInitials,
  hasRole,
  declinationOfNumber,
  checkErrorStep,
  formatPhoneNumber,
  hasNewStatus,
  isAllDaysNotAvailable,
  getDateString,
  getDefaultStatus,
  formatTime,
  isEmptyObject,
  formatDate,
  calculateAge,
  isPassportExpired,
  formatBytes,
} from "./utils";
export { downloadRequest } from "./downloadRequest";
