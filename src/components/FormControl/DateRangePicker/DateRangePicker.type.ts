export const ONE_DAY = 3600 * 1000 * 24;

export type DateTypeFormat =
  | "dd/MM/yyyy"
  | "dd/MM/yyyy HH:mm:ss"
  | "dd-MM-yyyy HH:mm"
  | "dd-MM-yyyy HH:mm:ss"
  | "yyyy"
  | "MM-yyyy"
  | "dd-MM-yyyy";

export type PickerMode = "DatePicker" | "DateTimePicker";

export interface DateRangePickerProps {
  startTime?: any;
  endTime?: any;
  onChange?: (value: any) => void;
  minDate?: string;
  maxDate?: string;
  inputFormat?: DateTypeFormat;
  pickerMode?: PickerMode;
}
