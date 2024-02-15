import React from "react";
import { ICourse } from "src/types/course";

import "./CourseModal.scss";

interface CourseModalProps {
  title?: string;
  course: ICourse;
}

const CourseModal: React.FC<CourseModalProps> = ({ title, course }) => {
  // console.log("đâs", course);

  return (
    <div className="course-modal">
      {title && <span className="title">{title}</span>}
      <div className="content">
        <span className="name">{course.name}</span>
        {/* <span className="description">({course.description})</span> */}
        <span className="level">
          <b>Mức độ: </b>
          {course.level}
        </span>
        <span className="language">
          <b>Ngôn ngữ: </b>
          {course.language}
        </span>
        <span className="category-name">
          <b>Thể loại: </b>
          {course.category?.name}
        </span>
        <span className="intended-learners">
          <b>Đối tượng học: </b>
          <div className="list">
            {course.intendedLearners?.map(
              (intendedLearner, index) =>
                index < 2 && (
                  <span key={index}>
                    {index + 1}. {intendedLearner}
                  </span>
                )
            )}
            {(course.intendedLearners?.length || []) > 2 && (
              <span className="more">....</span>
            )}
          </div>
        </span>
        <span className="course-summary-content">
          <b>Bạn sẽ học được: </b>
          <div className="list">
            {course.targets?.map(
              (target, index) =>
                index < 2 && (
                  <span key={index}>
                    {index + 1}. {target}
                  </span>
                )
            )}
            {(course.targets?.length || []) > 2 && (
              <span className="more">....</span>
            )}
          </div>
        </span>
      </div>
    </div>
  );
};

export default CourseModal;
