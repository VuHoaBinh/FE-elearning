import { CSSProperties } from "react";

export type ValueInputSelectType = boolean | string | number;
export type ValueInputRangeSelectType = {
  min?: number;
  max?: number;
};
export type ListInputValueType = {
  value: ValueInputSelectType | ValueInputRangeSelectType;
  name: string;
};

export interface InputSelectProps {
  disabled?: boolean;
  label?: string;
  icon?: string;
  required?: boolean;
  list: ListInputValueType[];
  name?: string;
  border?: boolean;
  defaultValue?: ValueInputSelectType;
  errorMessage?: string;
  style?: CSSProperties;
  onChange?: (value: any) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => void;
  placeholder?: string;
}
