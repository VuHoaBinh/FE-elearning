import { IAccount } from "./auth";
import { IMyCourse } from "./myCourse";
import { ITeacherStatus } from "./teacher";

export interface IGetUser {
  page?: string | number;
  limit?: string | number;
  email?: string;
  role?: string;
  sort?: string;
}
export interface ICreateNewUser {
  email: string;
  password: string;
  fullName: string;
  birthday?: string;
  gender?: boolean | string;
  phone?: string;
}

export interface IUser {
  _id?: string;
  account?: IAccount;
  fullName?: string;
  birthday?: string;
  gender?: boolean;
  phone?: string;
  avatar?: any;
  createdAt?: string;
  updatedAt?: string;
  teacher?: ITeacherStatus;
  myCourse?: IMyCourse;
}

export type Role =
  | "admin"
  | "user"
  | "teacher"
  | "student"
  | "director"
  | "page";

export const convertRole = (role: Role) => {
  switch (role) {
    case "admin":
      return "admin";
    case "user":
      return "user";
    case "teacher":
      return "teacher";
    case "director":
      return "director";
    case "page":
      return "page";

    default:
      console.log(`Role ${role} is not defined`);
      break;
  }
};

export enum ROLE {
  STUDENT = "student",
  TEACHER = "teacher",
}
