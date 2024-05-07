import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import lessonApi from "src/apis/lessonApi";
import FormControl from "src/components/FormControl";
import MediaContent from "src/components/MediaContent";
import { isPending, isSuccess } from "src/reducers";
import { DocumentType, VideoInfo } from "src/types";
import { notificationMessage } from "src/utils";
import Lesson, { ILessonUpload } from "../Lesson";
import "./Chapter.scss";
import { ChapterUploadProps } from "./Chapter.type";

const Chapter: React.FC<ChapterUploadProps> = ({
  chapter,
  index,
  handleUpdateChapter,
  handleDeleteChapter,
}) => {
  const [editTitle, setEditTitle] = useState(false);
  const [value, setValue] = useState("");
  const [lessons, setLessons] = useState<ILessonUpload[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (chapter.name === "default") {
      setValue("");
      setEditTitle(true);
    }
    setLessons(chapter.lessons);
  }, [chapter]);

  useEffect(() => {
    dispatch(isPending());
    lessonApi.getLessons(chapter._id).then((res: any) => {
      dispatch(isSuccess());
      setLessons(res.lessons);
    });
  }, [chapter._id, dispatch]);

  const handleAddLesson = (index: number) => {
    dispatch(isPending());
    lessonApi.addLesson(chapter._id, index, "default").then(() => {
      lessonApi.getLessons(chapter._id).then((res: any) => {
        dispatch(isSuccess());
        setLessons(res.lessons);
      });
    });
  };

  const handleUpdateLesson = (
    name: string,
    order: number,
    lessonId: string,
    description?: string,
    file?: string,
    type?: DocumentType,
    videoInfo?: VideoInfo
  ) => {
    dispatch(isPending());
    lessonApi
      .updateLesson(lessonId, order, name, description, file, type, videoInfo)
      .then(() => {
        lessonApi.getLessons(chapter._id).then((res: any) => {
          dispatch(isSuccess());
          setLessons(res.lessons);
        });
      });
  };

  const handleDeleteLesson = (chapterId: string) => {
    dispatch(isPending());
    lessonApi.deleteLesson(chapterId).then(() => {
      lessonApi.getLessons(chapter._id).then((res: any) => {
        dispatch(isSuccess());
        notificationMessage("success", "Xóa lesson thành công");
        setLessons(res.lessons);
      });
    });
  };

  return (
    <div className="chapter">
      <div className="form">
        <div className="chapter_title">
          <h2>Section {index + 1}: </h2>
          {editTitle ? (
            <FormControl.Input
              style={{ height: 34 }}
              value={value}
              onChange={(e) => setValue((e.target as HTMLInputElement).value)}
            />
          ) : (
            <>
              <MediaContent.Icon icon="file-text-o" size={15} />
              <span>{chapter.name}</span>

              <div className="icons">
                <MediaContent.Icon
                  icon="edit"
                  size={15}
                  color="black"
                  className="icon"
                  onClick={() => {
                    setValue(chapter.name);
                    setEditTitle(true);
                  }}
                />
                {/* <MediaContent.Icon
                  icon="trash"
                  size={15}
                  color="black"
                  className="icon"
                  onClick={() => handleDeleteChapter(chapter._id)}
                /> */}
              </div>
            </>
          )}
        </div>
        {editTitle && (
          <div className="btns">
            <Button
              variant="text"
              sx={{
                textTransform: "capitalize",
                color: "black",
                fontWeight: "bold",
              }}
              onClick={() => {
                value
                  ? setEditTitle(false)
                  : notificationMessage(
                      "error",
                      "Vui lòng nhập tiêu đề của chương"
                    );
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                color: "white",
                fontWeight: "bold",
                backgroundColor: "black",
              }}
              onClick={() => {
                if (value) {
                  setEditTitle(false);
                  handleUpdateChapter(value, index + 1, chapter._id);
                } else {
                  notificationMessage(
                    "error",
                    "Vui lòng nhập tiêu đề của chương"
                  );
                }
              }}
            >
              Lưu thông tin Section
            </Button>
          </div>
        )}
      </div>
      <div className="list">
        {lessons.map((lesson, i) => (
          <React.Fragment key={i}>
            <div className="new">
              <div className="icon" onClick={() => handleAddLesson(i + 1)}>
                <MediaContent.Icon icon="plus" color="black" size={20} />
              </div>
            </div>
            <Lesson
              lesson={lesson}
              handleUpdateLesson={handleUpdateLesson}
              handleDeleteLesson={handleDeleteLesson}
              index={i}
            />
          </React.Fragment>
        ))}
      </div>
      <div className="new">
        <div
          className="icon"
          onClick={() => handleAddLesson(lessons.length + 1)}
        >
          <MediaContent.Icon icon="plus" color="black" size={20} />
        </div>
      </div>
    </div>
  );
};

export default Chapter;
