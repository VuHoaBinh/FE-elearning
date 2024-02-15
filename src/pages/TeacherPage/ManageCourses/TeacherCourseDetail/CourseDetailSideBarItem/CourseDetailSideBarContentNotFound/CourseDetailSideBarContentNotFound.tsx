import { Box } from "@mui/material";
import TextContent from "src/components/TextContent";

const CourseDetailSideBarContentNotFound = () => {
  return (
    <Box
      height={550}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <TextContent.NormalText content="Content này chưa được thiết lập" />
    </Box>
  );
};
export default CourseDetailSideBarContentNotFound;
