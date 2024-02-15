import { ComponentType } from "react";
import { Role } from "./user";

export interface Router {
  path: string;
  element?: JSX.Element | ComponentType;
  // element?: LazyExoticComponent<() => JSX.Element>;
  children?: Router[];
  name?: string;
  href?: string;
  role?: Role | string;

  title?: string;
  icon?: string;
}
