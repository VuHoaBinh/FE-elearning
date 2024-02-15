import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import _ from "lodash";
import { Bar } from "react-chartjs-2";
import { toast } from "react-toastify";
import statisticApi from "src/apis/statisticApi";
import { getOptionsCharBar, getValueChartVertical } from "src/utils";
import { dateTypes, LINK_DOMAIN } from "src/data";
import LoadingContent from "src/components/LoadingContent";
import FormControl from "src/components/FormControl";

export default function RevenueByRangeDate() {
  const [dateType, setDateType] = useState<any>("day");
  const [dateRange, setDateRange] = useState<any>();
  const [excelHref, setExcelHref] = useState<string>();

  const [data, setData] = useState<any>({});
  const [options, setOptions] = useState<any>();

  useEffect(() => {
    // console.log("dataRange", dateRange);

    const options = getOptionsCharBar(
      `Biểu đồ thể hiện doanh thu theo ${dateType === "day" ? "ngày" : "tháng"}`
    );

    setOptions(options);

    getRevenueByDateRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateType, dateRange]);

  const getRevenueByDateRange = async () => {
    const params = { ...dateRange, type: dateType, exports: true };
    // console.log("params nè", params);

    try {
      const response = await statisticApi.getRevenueByRangeDate(params);
      const { result, file }: any = response;
      // console.log("ád", result);
      const data = getValueChartVertical(
        result,
        "date",
        "value",
        "Tổng doanh thu"
      );
      setData(data);
      setExcelHref(file);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };
  const goToExcel = () => {
    if (!excelHref) {
      toast.warning("Link bị lỗi, hãy chọn ngày lại", {
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
      {/* <h4>Doanh thu bán khoá học của hệ thống</h4> */}

      {/* search input */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "end",
        }}
      >
        <FormControl.DateRangePicker onChange={(date) => setDateRange(date)} />
        <FormControl.InputSelect
          defaultValue={dateType}
          hideErrorMessage={true}
          list={dateTypes}
          onChange={(type) => setDateType(type)}
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

      {!_.isEmpty(data) ? (
        <Box sx={{ width: 900 }}>
          <Bar options={options} data={data} />
        </Box>
      ) : (
        <LoadingContent.Loading />
      )}
    </Box>
  );
}
