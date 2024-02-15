import { Box, Divider } from "@mui/material";
import React from "react";
import CoursesHotByMonth from "./CoursesHotByMonth";
import CoursesHotByYear from "./CoursesHotByYear";
import CourseTotal from "./CourseTotal";

export default function CoursesStatistic() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <CourseTotal />
      <Divider />
      <CoursesHotByMonth />
      <Divider />
      <CoursesHotByYear />
    </Box>
  );
}
