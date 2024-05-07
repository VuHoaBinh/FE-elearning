import { Divider, Typography } from "@mui/material";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaContent from "src/components/MediaContent";
import TextContent from "src/components/TextContent";
import { getQuestionState, setLessonType, setStudyLesson } from "src/reducers";
import { LessonProps } from "src/types";
import "./CourseChapterLesson.scss";

interface CourseChapterLessonProps {
  chapterNumber?: number;
  lessons?: LessonProps[];
}

const CourseChapterLesson: React.FC<CourseChapterLessonProps> = ({
  chapterNumber = 0,
  lessons = [],
}) => {
  const [lesson, setLesson] = useState<LessonProps>();

  const dispatch = useDispatch();

  const { studyLesson } = useSelector(getQuestionState);

  const handleSetLesson = (item: any) => {
    setLesson(item);
    dispatch(setLessonType(item.type));
    dispatch(setStudyLesson(item));
  };

  return (
    <React.Fragment>
      {lessons.map((lesson: LessonProps, index) => {
        return (
          <div
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => handleSetLesson(lesson)}
          >
            <Typography
              sx={{ padding: 10, textTransform: "capitalize" }}
              className={classNames(
                studyLesson?.title === lesson?.title
                  ? "lesson-title-active"
                  : "",
                lesson.complete ? "lesson-title-complete" : ""
              )}
            >
              <TextContent.NormalText
                type="title-content"
                content={`${chapterNumber + 1}.${index + 1} `}
              />
              <TextContent.NormalText
                type="description"
                content={lesson.title + ""}
              />
              {lesson.complete && <MediaContent.Icon icon="check" size={18} />}
            </Typography>
            {index < lessons.length - 1 && <Divider />}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default CourseChapterLesson;
