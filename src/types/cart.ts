import { ICourse } from "./course";
import { IUser } from "./user";

export interface ICoupon {
  _id?: string;
  title?: string;
  isActive?: boolean;
  amount?: number;
  maxDiscount?: number;
  minPrice?: number;
  number?: number;
  remain?: number;
  author?: IUser;
  expireDate?: string;
  startDate?: string;
  type?: "percent" | "money";
  apply?: "author" | "all" | "category" | "new user";
}

export interface ICart {
  _id?: string;
  coupon?: string;
  course?: ICourse;
  wishlist?: boolean;
}

export interface ICartInfo {
  carts?: ICart[];
  wishlist?: ICart[];
  estimatedPrice?: number;
  totalDiscount?: number;
  totalPrice?: number;
  numOfCarts?: number;
}
