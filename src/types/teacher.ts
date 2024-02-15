import { IPayment } from "./payment";

export interface ITeacherStatus {
  _id?: string;
  description?: string;
  isVerified?: boolean;
  payments?: IPayment;
}
