import { Box, Button, Divider } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { linearIMG, quotes } from "src/assets";
import MediaContent from "../MediaContent";
import TextContent from "../TextContent";
import "./ArticleReadMore.scss";

interface ArticleReadMoreProps {
  title?: string;

  short_description?: string;
  content?: string;
}

const ArticleReadMore: React.FC<ArticleReadMoreProps> = ({
  content,
  short_description,
  title = "Chưa đặt title",
}) => {
  const [isShowContent, setIsShowContent] = React.useState<boolean>(false);

  return (
    <Box>
      <Box>
        <MediaContent.Image src={quotes} width={18} />
        <TextContent.NormalText
          content={title}
          type="title-content"
          style={{ marginLeft: 10 }}
        />
        <Divider style={{ marginTop: 5, marginBottom: 2 }} />
      </Box>
      <Box className="short-description">
        <i>{short_description}</i>
      </Box>
      <Box
        className={classNames("content-article", isShowContent && "show")}
        dangerouslySetInnerHTML={{
          __html: content as string,
        }}
      />

      {!isShowContent && (
        <Box
          style={{
            width: "100%",
            height: 64,
            marginTop: -64,
          }}
        >
          <MediaContent.Image src={linearIMG} height={64} />
        </Box>
      )}

      <Button
        color="inherit"
        className={classNames("btn-seeMore", isShowContent && "show")}
        onClick={() => setIsShowContent(!isShowContent)}
      >
        {isShowContent ? "THU GỌN" : "ĐỌC TIẾP"}
      </Button>
    </Box>
  );
};

export default ArticleReadMore;
