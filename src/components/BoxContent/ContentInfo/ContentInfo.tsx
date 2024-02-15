import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import TextContent from "../../TextContent";

type ContentInfoType = "fit-content" | "equal-divide";

interface ContentInfoProps {
  title: string;
  content?: string | number;
  className?: string;
  responsive?: boolean;
  type?: ContentInfoType;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

const ContentInfo: React.FC<ContentInfoProps> = ({
  title,
  content = "Chưa có thông tin",
  className,
  style,
  responsive = true,
  type = "equal-divide",
  titleStyle,
  contentStyle,
}) => {
  if (useMediaQuery("(max-width: 536px)") && responsive) {
    return (
      <Box className={className} style={style}>
        <TextContent.NormalText
          type="description"
          style={{ flex: 1, ...contentStyle }}
          content={content as string}
        />
      </Box>
    );
  }

  return (
    <Box
      className={className}
      display="flex"
      width="100%"
      style={style}
      gap={type === "equal-divide" ? 0 : 20}
    >
      <TextContent.NormalText
        className="title"
        type="title-content"
        content={title}
        style={
          type === "equal-divide"
            ? { flex: 1, ...titleStyle }
            : { width: "fit-content", ...titleStyle }
        }
      />
      <TextContent.NormalText
        type="description"
        style={
          type === "equal-divide"
            ? { flex: 1, ...contentStyle }
            : { width: "fit-content", ...contentStyle }
        }
        content={content as string}
      />
    </Box>
  );
};
export default ContentInfo;
