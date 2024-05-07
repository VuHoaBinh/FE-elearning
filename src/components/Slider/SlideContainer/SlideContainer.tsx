import React from "react";
import Slider from "react-slick";
import SlideItem from "../SlideItem";
import { SliderBanner } from "src/types";

//icon
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SlideContainer.scss";

interface SlideContainerProps {
  listSlideShow: SliderBanner[];
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <div className="btns-slider slider-left" onClick={onClick}>
      <KeyboardArrowLeftIcon />
    </div>
  );
}

function PrevArrow(props: any) {
  // const { className, style, onClick } = props;
  const { onClick } = props;
  return (
    <div className="btns-slider slider-right" onClick={onClick}>
      <KeyboardArrowRightIcon />
    </div>
  );
}

const PaginationSlider = () => (
  <div className="paging-icon">
    <FiberManualRecordIcon />
  </div>
);

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 3000,
  autoplay: true,
  cssEase: "linear",
  prevArrow: <NextArrow />,
  nextArrow: <PrevArrow />,
  customPaging: PaginationSlider,
};

const SlideContainer: React.FC<SlideContainerProps> = ({ listSlideShow }) => {
  return (
    <Slider {...settings} className="slide-show">
      {listSlideShow.length > 0 &&
        listSlideShow.map((imageContent, index) => (
          <SlideItem key={index} imageContent={imageContent} />
        ))}
    </Slider>
  );
};

export default SlideContainer;
