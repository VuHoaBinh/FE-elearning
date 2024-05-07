import { IAccount } from "./auth";
import { ICourse } from "./course";
import { IDetailInvoice } from "./invoice";
import { IUser } from "./user";

export interface IYearStatistic {
  value?: number;
  year?: number;
}

export interface IUserStatistic {
  activating?: number;
  file?: string;
  message?: string;
  newUsers?: IYearStatistic[];
  notActivating?: number;
  raise?: number;
}

export interface ITeacher {
  _id?: string;
  account?: IAccount;
  count?: number;
  fullName?: string;
  birthday?: string;
  phone?: string;
  total?: number;
  revenue?: number;
  numOfDetailInvoice?: number;
  detailInvoices?: IDetailInvoice[];
  gender?: boolean;
}

export interface ITeacherPortfolio {
  user?: IUser;
  userCourse?: ICourse[];
}
