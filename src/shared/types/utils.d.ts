import type NotificationEnum from "./enums";
declare global {
  type ResponseSuccess = {
    status: string;
    message: string;
  };

  type ErrorObject = {
    attr: string;
    code: string;
    detail: string;
  };

  type ErrorResponse = {
    status: number;
    data: { message: string; errors: ErrorObject[] };
  };

  type RefetchFunction = () => Promise<void>;

  type ObjectType = { id: number; key: string; value: string };
}
