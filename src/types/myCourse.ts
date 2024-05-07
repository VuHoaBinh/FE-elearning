import { ICourse } from "./course";

export interface IMyCourse {
  _id?: string;
  course?: ICourse;
  percentProgress?: number;
  progressPaid?: {datePaid: string, amount: number}[];
}

