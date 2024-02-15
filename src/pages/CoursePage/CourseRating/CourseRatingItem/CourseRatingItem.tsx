import { Divider } from "@mui/material";
import React from "react";
import Rating from "src/components/Rating";
import { IRating } from "src/types";
import formatDate from "src/utils/formatDate";

import "./CourseRatingItem.scss";

interface CourseRatingItemProps {
  data?: IRating;
  isMobile?: boolean;
}

const CourseRatingItem: React.FC<CourseRatingItemProps> = ({
  data,
  isMobile = false,
}) => {
  //   console.log("đã lấy được course rating item là", data);

  return (
    <div className="course-rating-item">
      <div className="info">
        <span className="name">
          {!isMobile && "Học viên:"} {data?.author?.fullName}
        </span>
        <span className="date">
          {formatDate.getDate(data?.createdAt, "dd-MM-yyyy HH:mm")}
        </span>
      </div>
      <Divider />
      <span className="rating-info">
        <b>Đánh giá:</b>
        <Rating isShowTotalRating={false} average_rating={data?.rate} />
      </span>
      <span>
        <b>Nội dung:</b>
      </span>
      <span
        className="content"
        dangerouslySetInnerHTML={{
          __html: data?.content || "",
        }}
      ></span>
    </div>
  );
};
export default CourseRatingItem;
