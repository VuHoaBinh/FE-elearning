import { Box, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { toast } from "react-toastify";
import statisticApi from "src/apis/statisticApi";
import LoadingContent from "src/components/LoadingContent";
import { LINK_DOMAIN } from "src/data";
import { getOptionsCharBar, getValueChartVertical } from "src/utils";

export default function RevenueByRangeYear() {
  const [startYear, setStartYear] = useState(new Date("2021-06-01"));
  const [endYear, setEndYear] = useState<any>(new Date());
  const [excelHref, setExcelHref] = useState<string>();

  const [revenueData, setRevenueData] = useState<any>([]);
  const [options, setOptions] = useState<any>();

  useEffect(() => {
    const params = {
      start: new Date(startYear).getFullYear(),
      end: new Date(endYear).getFullYear(),
      exports: true,
    };

    const options = getOptionsCharBar(
      `Biểu đồ thể hiện doanh thu từ năm ${new Date(
        startYear
      ).getFullYear()} đến năm ${new Date(endYear).getFullYear()}
    `
    );

    setOptions(options);

    // console.log("lấy được data là", params);

    getRevenueByRangeYear(params);
  }, [startYear, endYear]);

  const getRevenueByRangeYear = async (params?: any) => {
    try {
      const response = await statisticApi.getRevenueByRangeYear(params);
      // console.log("dá", response);
      const { result, file }: any = response;
      // console.log("newUsers", result);

      const data = getValueChartVertical(
        result,
        "year",
        "data",
        "Tổng doanh thu"
      );

      // console.log("đã nhận được data là", data);
      setRevenueData(data);

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
      }}
    >
      {/* <h4>
        Số lượng tài khoản từ năm {new Date(startYear).getFullYear()} đến năm{" "}
        {new Date(endYear).getFullYear()}
      </h4> */}

      {/* search input */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "end",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year"]}
            maxDate={new Date("2021-06-01")}
            minDate={new Date("2018-06-01")}
            label="Chọn năm bắt đầu"
            value={startYear}
            onChange={(newYear: any) => {
              setStartYear(newYear);
            }}
            renderInput={(params) => (
              <TextField sx={{ width: 200 }} {...params} helperText={null} />
            )}
          />
          <DatePicker
            views={["year"]}
            maxDate={new Date()}
            minDate={new Date("2018-06-01")}
            label="Chọn năm kết thúc"
            value={endYear}
            onChange={(newYear: any) => {
              setEndYear(newYear);
            }}
            renderInput={(params) => (
              <TextField sx={{ width: 200 }} {...params} helperText={null} />
            )}
          />
        </LocalizationProvider>
        <Button
          sx={{ height: 36 }}
          variant="contained"
          color="success"
          onClick={goToExcel}
        >
          Xuất excel
        </Button>
      </Box>

      {!_.isEmpty(revenueData) ? (
        <Box sx={{ width: 900 }}>
          <Bar options={options} data={revenueData} />
        </Box>
      ) : (
        <LoadingContent.Loading />
      )}
    </Box>
  );
}
