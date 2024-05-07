export interface InputCheckBoxValue {
  value?: string;
  checked?: boolean;
}

export interface InputCheckBoxProps {
  label?: string;
  value?: string;
  errorMessage?: string;
  style?: React.CSSProperties;
  checked?: boolean;
  disabled?: boolean;
  hint?: string;
  onChange?: (value: InputCheckBoxValue) => void;
}
