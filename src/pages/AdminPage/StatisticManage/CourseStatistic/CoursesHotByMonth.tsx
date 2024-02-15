import { Box, Button, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { toast } from "react-toastify";
import statisticApi from "src/apis/statisticApi";
import FormControl from "src/components/FormControl";
import LoadingContent from "src/components/LoadingContent";
import { LINK_DOMAIN, topAmountTypes } from "src/data";
import { getOptionsCharBar, getValueChartVertical } from "src/utils";
import formatDate from "src/utils/formatDate";

export default function CoursesHotByMonth() {
  const [monthAndYear, setMonthAndYear] = useState<any>(new Date());
  const [top, setTop] = useState<any>(5);
  const [courseTopByYear, setCourseTopByYear] = useState<any>({});
  const [options, setOptions] = useState<any>();
  const [excelHref, setExcelHref] = useState<string>("");

  useEffect(() => {
    const params = {
      month: new Date(monthAndYear).getMonth() + 1,
      year: new Date(monthAndYear).getFullYear(),
      top,
      exports: true,
    };

    const options = getOptionsCharBar(
      `Biểu đồ thể hiện top khoá học bán chạy trong tháng ${formatDate.getDate(
        monthAndYear,
        "MM-yyyy"
      )}`
    );

    setOptions(options);

    getHotCourses(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthAndYear, top]);

  const getHotCourses = async (params?: any) => {
    // console.log("params", params);

    try {
      const response = await statisticApi.getHotCourseByYear(params);
      // console.log(response);
      const { result, file }: any = response;
      // console.log("result", result);

      const values = getValueChartVertical(
        result,
        "courseName",
        "count",
        "Số lượng bán"
      );
      // console.log("values là", values);

      setCourseTopByYear(values);
      setExcelHref(file);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const goToExcel = () => {
    if (!excelHref) {
      toast.warning("Link bị lỗi, hãy chọn năm lại", {
        position: "bottom-right",
      });
      return;
    }
    //go to excel
    window.location.href = LINK_DOMAIN + excelHref;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      {/* search input */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year", "month"]}
            label="Chọn tháng năm"
            minDate={new Date("2018-06-01")}
            maxDate={new Date()}
            value={monthAndYear}
            onChange={(newMonthAndYear) => {
              setMonthAndYear(newMonthAndYear);
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        <FormControl.InputSelect
          defaultValue={top}
          hideErrorMessage={true}
          list={topAmountTypes}
          onChange={(amount) => setTop(amount)}
        />
        <Button
          sx={{ height: 35 }}
          variant="contained"
          color="success"
          onClick={goToExcel}
        >
          Xuất file
        </Button>
      </Box>

      {!_.isEmpty(courseTopByYear) ? (
        <Box sx={{ width: 1000 }}>
          <Bar options={options} data={courseTopByYear} />
        </Box>
      ) : (
        <LoadingContent.Loading />
      )}
    </Box>
  );
}
