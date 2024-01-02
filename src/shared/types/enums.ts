export enum StatusEnum {
  ACTIVE = "active",
  DEACTIVE = "deactive",
  NEW = "new",
}

export enum NotificationEnum {
  Draft = "Черновик",
  InProcess = "В работе",
  Postponed = "Отложена",
  ReadyToForm = "Готова к оформлению",
  Signed = "Подписана",
  SentToFNS = "Отправлена в фнс",
  SentToRegistry = "Отправлена в росреестр",
  Registered = "Зарегистрирована",
  Suspended = "Приостановлена",
  Completed = "Завершена",
}

export enum ActionType {
  GET_ROLES = "GET ROLES",
  GET_NOT_ADMIN_ROLES = "GET_NOT_ADMIN_ROLES",
  GET_ROLE_PERMISSIONS = "GET ROLE PERMISSIONS",
  GET_PERMISSIONS = "GET PERMISSIONS",
  UPDATE_ROLE = "UPDATE ROLE",
  CREATE_ROLE = "CREATE ROLE",
  REMOVE_ROLE = "REMOVE_ROLE",
}

export enum DaysOfWeek {
  "Понедельник" = "ПН",
  "Вторник" = "ВТ",
  "Среда" = "СР",
  "Четверг" = "ЧТ",
  "Пятница" = "ПТ",
  "Суббота" = "СБ",
  "Воскресенье" = "ВС",
}
