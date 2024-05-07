import { TextField } from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import BoxContent from "src/components/BoxContent";
import { notificationMessage } from "src/utils";
import formatDate from "src/utils/formatDate";
import { DateRangePickerProps, ONE_DAY } from "./DateRangePicker.type";

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startTime = new Date(Date.now() - 31 * ONE_DAY),
  endTime = new Date(),
  minDate,
  maxDate = new Date(),
  onChange,
  pickerMode = "DatePicker",
  inputFormat = "dd-MM-yyyy HH:mm:ss",
}) => {
  const Picker = pickerMode === "DatePicker" ? DatePicker : DateTimePicker;

  const [startDay, setStartDay] = useState(startTime);
  const [endDay, setEndDay] = useState(endTime);

  useEffect(() => {
    if (startDay > endDay) {
      notificationMessage("error", "Ngày bắt đầu phải bé hơn ngày kết thúc");
      setStartDay(0);
      setEndDay(0);
      return;
    }

    onChange?.({
      start: startDay,
      end: endDay,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDay, endDay]);

  const handleStartDay = (startDay: any) => {
    // console.log("start day", formatDate.getDateTime(startDay));
    setStartDay(formatDate.getDateTime(startDay));
  };
  const handleEndDay = (endDay: any) => {
    // console.log("end day", formatDate.getDateTime(endDay));
    setEndDay(formatDate.getDateTime(endDay));
  };

  return (
    <BoxContent.NormalContent
      style={{ flexDirection: "row", width: "max-content", padding: 0 }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Picker
          label="Chọn ngày bắt đầu"
          inputFormat={inputFormat}
          value={startDay}
          onChange={handleStartDay}
          renderInput={(params: any) => <TextField {...params} />}
          maxDate={endDay || maxDate}
        />
        <DateTimePicker
          label="Chọn ngày kết thúc"
          inputFormat={inputFormat}
          value={endDay}
          onChange={handleEndDay}
          renderInput={(params: any) => <TextField {...params} />}
          minDate={startDay || minDate}
          maxDate={maxDate}
        />
      </LocalizationProvider>
    </BoxContent.NormalContent>
  );
};

export default DateRangePicker;
