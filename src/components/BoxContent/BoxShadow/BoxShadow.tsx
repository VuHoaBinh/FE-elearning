import { Box } from "@mui/material";
import React from "react";
import { SHADOW, ShadowType } from "src/styles";

interface BoxShadowProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
  shadow?: ShadowType;
}

const BoxShadow: React.FC<BoxShadowProps> = ({
  style,
  children,
  shadow = "type1",
}) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      gap={20}
      padding={20}
      borderRadius={3}
      boxShadow={SHADOW[shadow]}
      style={style}
    >
      {children}
    </Box>
  );
};

export default BoxShadow;
