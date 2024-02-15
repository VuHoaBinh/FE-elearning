import React from "react";
import Slider from "src/components/Slider";
import { listSlideShow } from "src/data/mainPageInfo";

const HomePage = () => {
  return <Slider.SlideContainer listSlideShow={listSlideShow} />;
};
export default HomePage;
