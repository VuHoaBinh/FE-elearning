import React from "react";
import LoadingContent from "src/components/LoadingContent";
import TextContent from "src/components/TextContent";
import { ICourse } from "src/types";
import CourseItem from "../CourseItem";
import NoneCourseFound from "../NoneCourseFound";
import "./CourseContainer.scss";

interface CourseContainerProps {
  title: string;
  courses: ICourse[];
  isLoading?: boolean;
  style?: React.CSSProperties;
}

const CourseContainer: React.FC<CourseContainerProps> = ({
  title,
  courses,
  isLoading = false,
  style,
}) => {
  const renderCourses = (courses: ICourse[]) => {
    if (courses.length > 0) {
      return courses.map((course, index) => (
        <CourseItem key={index} courseInfo={course} />
      ));
    }
    return <NoneCourseFound />;
  };

  return (
    <div className="course-container" style={style}>
      <TextContent.NormalText content={title} />
      <div className="courses">
        {!isLoading ? (
          renderCourses(courses)
        ) : (
          <LoadingContent.LoadingSkeleton
            width={300}
            height={160}
            amount={courses.length || 4}
          />
        )}
      </div>
    </div>
  );
};
export default CourseContainer;
