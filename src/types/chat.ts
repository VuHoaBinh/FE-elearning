import { IUser } from "./user";

export interface IMessage {
  _id?: string;
  conversation?: string;
  createdAt?: string;
  seen?: boolean;
  sender?: IUser;
  text?: string;
  type?: string;
  updatedAt?: string;
}

export interface IConservation {
  _id?: string;
  member?: IUser[];
  message?: IMessage;
  receiver?: IUser;
}
