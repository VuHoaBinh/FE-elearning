import { ICategory } from "./category";
import { IUser } from "./user";

export interface IGetCourse {
  page?: number;
  limit: number;
  sort?: string;
  name?: string;
  category?: string;
  tags?: string;
  price?: string;
  publish?: boolean;
  author?: string;
}

export interface SearchKeyProps {
  original?: string;
  suggestion?: string;
}

export interface LessonProps {
  _id?: string;
  complete?: boolean;
  description?: string;
  number?: number;
  title?: number;
  video?: any;
  type: any;
}

export interface ChaptersProps {
  _id?: string;
  name?: string;
  number?: number;
  lessons?: LessonProps[];
}

export interface ICourseAuthor {
  _id?: string;
  fullName?: string;
}

export type CourseType =
  | "draft"
  | "pending"
  | "approved"
  | "denied"
  | "updating"
  | "update denied";

export enum CourseStatus {
  draft = "Bản nháp",
  pending = "Đang chờ duyệt",
  approved = "Đã duyệt",
  denied = "Từ chối",
  updating = "Đang update",
  "update denied" = "Từ chối cập nhật",
}

export interface ICourse {
  _id?: string;
  author?: IUser;
  chapters?: ChaptersProps[];
  name?: string;
  thumbnail?: string;
  category?: ICategory;
  currentPrice?: number;
  originalPrice?: number;
  description?: string;
  hashtags?: string[];
  intendedLearners?: string[];
  requirements?: string[];
  language?: string;
  level?: string;
  saleOff?: number;
  sellNumber?: string;
  slug?: string;
  isBought?: boolean;
  targets?: string[];
  discount?: number;
  type?: string;
  status?: CourseType;
}
