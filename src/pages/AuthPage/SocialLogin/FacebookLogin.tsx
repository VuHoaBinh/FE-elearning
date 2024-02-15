import { Button } from "@mui/material";
import React from "react";
import MediaContent from "src/components/MediaContent";
import TextContent from "src/components/TextContent";

const FacebookLogin = () => {
  return (
    <Button variant="contained" color="secondary">
      <MediaContent.Icon icon="facebook" size={25} color="white" />
      <TextContent.NormalText
        style={{
          fontSize: 14,
          textTransform: "none",
          fontWeight: 500,
          padding: 3,
        }}
        content="Đăng nhập bằng Facebook"
      />
    </Button>
  );
};
export default FacebookLogin;
