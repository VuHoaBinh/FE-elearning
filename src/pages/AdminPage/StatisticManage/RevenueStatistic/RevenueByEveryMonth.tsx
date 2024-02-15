import { Box, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { toast } from "react-toastify";
import statisticApi from "src/apis/statisticApi";
import FormControl from "src/components/FormControl";
import LoadingContent from "src/components/LoadingContent";
import { LINK_DOMAIN, yearNumberCompare } from "src/data";
import { getOptionsCharBar, getValueChartVerticalMultiColumn } from "src/utils";

export default function RevenueByEveryMonth() {
  const [year, setYear] = useState<any>(new Date());
  const [yearNumber, setYearNumber] = useState<number>(2);
  const [excelHref, setExcelHref] = useState<string>();

  const [options, setOptions] = useState<any>();
  const [revenueData, setRevenueData] = useState<any>();

  useEffect(() => {
    const params = {
      exports: true,
      number: yearNumber,
    };
    // console.log("params", params);

    const options = getOptionsCharBar(
      `Biểu đồ thể hiện doanh so với ${yearNumber} năm trước`
    );

    setOptions(options);

    // console.log("lấy được data là", params);

    getRevenueByRangeYear(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, yearNumber]);

  const getRevenueByRangeYear = async (params?: any) => {
    // console.log("params", params);
    try {
      const response = await statisticApi.getRevenueByRangeMonth(
        new Date(year).getFullYear(),
        params
      );
      // console.log("response", response);
      const { result, file }: any = response;
      // console.log("result", result);

      //combineData object
      let newData: any[] = [];
      let yearRange: any[] = [];

      result.forEach((element: any) => {
        // newData.push({ [element.year]: element.data });
        newData.push(element.data);
      });

      yearRange = result.map(
        (_: any, index: number) => new Date(year).getFullYear() - index
      );

      // console.log("yearRange", yearRange.reverse());

      //const get year

      const data = getValueChartVerticalMultiColumn(
        newData.reverse(),
        yearRange.reverse()
      );

      // console.log("data", data);

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
        <FormControl.InputSelect
          label="Phạm vi"
          hideErrorMessage={true}
          list={yearNumberCompare}
          defaultValue={yearNumber}
          onChange={(range_year) => setYearNumber(range_year)}
        />
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
