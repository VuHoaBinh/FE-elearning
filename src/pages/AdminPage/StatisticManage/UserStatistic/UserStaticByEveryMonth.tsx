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
import { getOptionsCharBar, getValueChartVerticalMultiColumn } from "src/utils";

export default function UserStaticByEveryMonth() {
  const [year, setYear] = useState<any>(new Date());
  const [excelHref, setExcelHref] = useState<string>();

  const [userData, setUserData] = useState<any>([]);
  const [options, setOptions] = useState<any>();

  useEffect(() => {
    const params = {
      year: new Date(year).getFullYear(),
      exports: true,
    };

    const options = getOptionsCharBar(
      `Biểu đồ thể hiện số lượng tài khoản mới trong năm ${new Date(
        year
      ).getFullYear()} so với năm ${new Date(year).getFullYear() - 1}
    `
    );

    setOptions(options);

    // console.log("lấy được data là", params);

    getUserByRangeYear(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  const getUserByRangeYear = async (params?: any) => {
    try {
      const response = await statisticApi.getUserByMonth(params);
      // console.log("dá", response);
      const { file }: any = response;
      // const { lastYear, thisYear, file }: any = response;

      const data = getValueChartVerticalMultiColumn(response, [
        new Date(year).getFullYear() - 1,
        new Date(year).getFullYear(),
      ]);
      // console.log("đã lấy được là", data);
      setUserData(data);
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
            maxDate={new Date()}
            minDate={new Date("2018-06-01")}
            label="Chọn năm"
            value={year}
            onChange={(newYear: any) => {
              setYear(newYear);
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

      {!_.isEmpty(userData) ? (
        <Box sx={{ width: 900 }}>
          <Bar options={options} data={userData} />
        </Box>
      ) : (
        <LoadingContent.Loading />
      )}
    </Box>
  );
}
