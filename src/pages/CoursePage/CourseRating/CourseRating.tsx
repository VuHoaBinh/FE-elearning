import React, { useEffect, useState } from "react";
import { IRating } from "src/types/myCourse";
import "./CourseRating.scss";
import CourseRatingItem from "./CourseRatingItem";

interface CourseRatingProps {
  ratingComments?: IRating[];
}

const CourseRating: React.FC<CourseRatingProps> = ({ ratingComments = [] }) => {
  // console.log("sdasdasdas", ratingComents);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  //call page
  useEffect(() => {
    window.screen.width <= 430 && setIsMobile(true);
  }, []);

  const renderCourseRating = (ratingComments: IRating[]) => {
    return (
      ratingComments.length > 0 &&
      ratingComments.map((ratingComment, index) => (
        <CourseRatingItem
          key={index}
          isMobile={isMobile}
          data={ratingComment}
        />
      ))
    );
  };

  return (
    <div className="course-rating">
      {/* <span className="title">({ratingComments.length} người đánh giá)</span>
      <div className="course-content">{renderCourseRating(ratingComments)}</div> */}
    </div>
  );
};

export default CourseRating;
