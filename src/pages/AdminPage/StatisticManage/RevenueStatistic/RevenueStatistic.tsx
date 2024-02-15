import { Box, Divider } from "@mui/material";
import React from "react";
import RevenueByEveryMonth from "./RevenueByEveryMonth";
import RevenueByRangeDate from "./RevenueByRangeDate";
import RevenueByRangeYear from "./RevenueByRangeYear";

export default function RevenueStatistic() {
  document.title = "Thống kê doanh thu";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingBottom: 10,
      }}
    >
      <RevenueByRangeDate />
      <Divider />
      <RevenueByEveryMonth />
      <Divider />
      <RevenueByRangeYear />
    </Box>
  );
}
