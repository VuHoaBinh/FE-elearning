import { Button } from "@mui/material";
import React from "react";
import MediaContent from "src/components/MediaContent";
import { SliderBanner } from "src/types";

import "./SlideItem.scss";

interface SlideItemProps {
  imageContent: SliderBanner;
}

const SlideItem: React.FC<SlideItemProps> = ({ imageContent }) => {
  const showContent = imageContent.name && imageContent.description;

  return (
    <div className="slide-item">
      <MediaContent.Image
        className="slide-item-banner"
        src={imageContent.image}
      />
      {showContent && (
        <div className="slide-item-content">
          <span className="title">{imageContent.name}</span>
          <span className="description">{imageContent.description}</span>
          <Button
            variant={imageContent.btn ? "contained" : "outlined"}
            color="success"
            disabled={!imageContent.btn}
          >
            {imageContent.btn ? "Mua ngay" : "Hiện tại chưa mở"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SlideItem;
