import React from "react";
import MediaContent from "src/components/MediaContent";
import { SliderBanner } from "src/types";

import "./SlideItem.scss";

interface SlideItemProps {
  imageContent: SliderBanner;
}

const SlideItem: React.FC<SlideItemProps> = ({ imageContent }) => {
  return (
    <div className="slide-item">
      <MediaContent.Image
        className="slide-item-banner"
        src={imageContent.image}
      />
    </div>
  );
};

export default SlideItem;
