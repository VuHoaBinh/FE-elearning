import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import statisticApi from "src/apis/statisticApi";
import FormControl from "src/components/FormControl";
import { numberRangeTypes } from "src/data";
import { ITeacher } from "src/types";
import formatDate from "src/utils/formatDate";
import "./RevenueTeacherStatistic.scss";

const TeacherShowColumn = (data: any) => {
  // console.log("data nek", data);

  const renderDataEachRow = (data: any[]) => {
    // console.log("saddas", data);
    return (
      data.length > 0 &&
      data.map((dataItem: any, index: number) => (
        <span className="data-row-item" key={index}>
          {dataItem.account.email}
        </span>
      ))
    );
  };

  return <div className="data-row">{renderDataEachRow(data.data)}</div>;
};

const TopTeacherByEveryMonth = () => {
  const [topTeachers, setTopTeachers] = useState<ITeacher[]>([]);

  //for search
  const [year, setYear] = useState(new Date());
  const [top, setTop] = useState<number>(5);

  useEffect(() => {
    const params = { year: new Date(year).getFullYear(), top };

    getTopTeacherByEveryMonth(params);
  }, [year, top]);

  const getTopTeacherByEveryMonth = async (params?: any) => {
    // console.log("params là", params);

    try {
      const response = await statisticApi.getTopTeacherRevenueByEveryMonth(
        params
      );
      // console.log("response", response);
      const { result }: any = response;
      // console.log("result", result);
      setTopTeachers(result);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const renderInfoTopTeacher = (topTeachers: ITeacher[]) => {
    return (
      topTeachers.length > 0 &&
      topTeachers.map((topTeacher, index) => (
        <div className="teacher-row-show" key={index}>
          <span className="title-row">Tháng {index + 1}</span>
          <TeacherShowColumn data={topTeacher} />
        </div>
      ))
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <h3>
        Top giảng viên có doanh thu cao các tháng trong năm{" "}
        {formatDate.getDate(year, "yyyy")}
      </h3>
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

      <div className="teacher-column-show">
        <div className="teacher-column-header">
          <span className="month-name">Tên tháng</span>
          <span className="teacher-name">Tên giảng viên</span>
        </div>
        {renderInfoTopTeacher(topTeachers)}
      </div>
    </Box>
  );
};
export default TopTeacherByEveryMonth;
