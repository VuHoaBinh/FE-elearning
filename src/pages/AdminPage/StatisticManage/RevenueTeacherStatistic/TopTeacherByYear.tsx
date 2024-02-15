import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import statisticApi from "src/apis/statisticApi";
import FormControl from "src/components/FormControl";
import LoadingContent from "src/components/LoadingContent";
import { numberRangeTypes } from "src/data";
import { getOptionsCharBar, getValueChartVertical } from "src/utils";
import formatDate from "src/utils/formatDate";

const TopTeacherByYear = () => {
  const [year, setYear] = useState(new Date());
  const [top, setTop] = useState<number>(5);
  const [topTeacherByYear, setTopTeacherByYear] = useState<any>();
  const [options, setOptions] = useState<any>();

  useEffect(() => {
    const params = { year: new Date(year).getFullYear(), top };

    const options = getOptionsCharBar(
      `Biểu đồ thể hiện top giảng viên có doanh thu cao trong năm ${formatDate.getDate(
        year,
        "yyyy"
      )}`
    );

    setOptions(options);

    getTopTeacherByYear(params);
  }, [year, top]);

  const getTopTeacherByYear = async (params?: any) => {
    // console.log("params là", params);

    try {
      const response = await statisticApi.getTopTeacherRevenueByYear(params);
      // console.log("response", response);
      const { result }: any = response;

      // console.log("result", result);
      const data = getValueChartVertical(
        result,
        "fullName",
        "total",
        "Tiền lương theo tháng"
      );
      // console.log("đã lấy được data là", data);

      setTopTeacherByYear(data);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year"]}
            maxDate={new Date()}
            minDate={new Date("2018-06-01")}
            label="Chọn  năm"
            value={year}
            onChange={(newYear: any) => {
              setYear(newYear);
            }}
            renderInput={(params) => (
              <TextField sx={{ width: 200 }} {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        <FormControl.InputSelect
          list={numberRangeTypes}
          defaultValue={top}
          onChange={(amount) => setTop(amount)}
        />
      </Box>

      {topTeacherByYear ? (
        <Box sx={{ maxWidth: 900 }}>
          <Bar options={options} data={topTeacherByYear} />
        </Box>
      ) : (
        <LoadingContent.Loading />
      )}
    </Box>
  );
};
export default TopTeacherByYear;
