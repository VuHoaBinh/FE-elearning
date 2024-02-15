import { format } from "date-fns";
import { DateTypeFormat } from "src/components/FormControl/DateRangePicker";

const formatDate = {
  getDate: (value: any, formatDateType: DateTypeFormat): string => {
    if (value === "now") {
      return value && format(new Date(), formatDateType);
    }
    return value && format(new Date(value), formatDateType);
  },

  getDateTime: (day: any) => {
    return new Date(day).getTime();
  },
};

export default formatDate;
