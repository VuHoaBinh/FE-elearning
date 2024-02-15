import { ICourse } from "./course";
import { IUser } from "./user";

export interface IMyCourse {
  _id?: string;
  course?: ICourse;
  percentProgress?: number;
  rating?: IRating;
}

export interface IRating {
  _id?: string;
  rate?: number;
  createdAt?: string;
  updatedAt?: string;
  content?: string;
  author?: IUser;
}
