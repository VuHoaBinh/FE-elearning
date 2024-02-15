import { Box, Divider } from "@mui/material";
import React from "react";
import UserStaticByEveryMonth from "./UserStaticByEveryMonth";
import UserStaticByRangeYear from "./UserStaticByRangeYear";

export default function UserStatistic() {
  document.title = "Thống kê người dùng";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingBottom: 10,
      }}
    >
      <UserStaticByRangeYear />
      <Divider />
      <UserStaticByEveryMonth />
    </Box>
  );
}
