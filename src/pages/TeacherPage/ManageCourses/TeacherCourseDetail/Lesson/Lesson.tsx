import { Button } from "@mui/material";
import classNames from "classnames";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import uploadDocumentApi from "src/apis/uploadDocumentApi";
import BoxContent from "src/components/BoxContent";
import FormControl from "src/components/FormControl";
import MediaContent from "src/components/MediaContent";
import TextContent from "src/components/TextContent";
import { isPending, isSuccess } from "src/reducers";
import { DocumentType } from "src/types";
import { notificationMessage } from "src/utils";
import "./Lesson.scss";
import { IVideoUpload, LessonUploadProps } from "./Lesson.type";

const Lesson: React.FC<LessonUploadProps> = ({
  lesson,
  index,
  handleDeleteLesson,
  handleUpdateLesson,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [contentType, setContentType] = useState<DocumentType>("none");
  const [description, setDescription] = useState(lesson.description);

  const [video, setVideo] = useState<IVideoUpload>();
  const [slide, setSlide] = useState<string>();

  const [value, setValue] = useState("");

  const handleUploadFile = (e: React.FormEvent<HTMLInputElement>) => {
    const _target = e.target as HTMLInputElement;
    if (_target.files && _target.files.length !== 0) {
      const convertBtoMB = Math.floor(
        _target.files[0].size / Math.pow(1024, 2)
      );
      if (convertBtoMB > 10) {
        notificationMessage("error", "Video tối đa upload là 10Mb");
      } else {
        uploadVideo(lesson._id, _target.files[0]);
      }
    }
  };

  const handleUploadDocument = (e: React.FormEvent<HTMLInputElement>) => {
    const _target = e.target as HTMLInputElement;
    if (_target.files && _target.files.length !== 0) {
      const convertBtoMB = Math.floor(
        _target.files[0].size / Math.pow(1024, 2)
      );
      if (convertBtoMB > 10) {
        notificationMessage("error", "Tài liệu tối đa upload là 10Mb");
      } else {
        uploadDocument(_target.files[0]);
      }
    }
  };

  const uploadVideo = async (lesson_id: string, video: File) => {
    dispatch(isPending());
    try {
      const response = await uploadDocumentApi.uploadVideo(lesson_id, video);
      const { video: videoURL, videoInfo }: any = response;
      // console.log("response", response);
      // console.log(" videoURL", videoURL);

      dispatch(isSuccess());
      //Link mp4
      // setVideoUrl(videoURL[1]);

      handleUpdateLesson(
        lesson.title,
        index + 1,
        lesson._id,
        lesson.description,
        videoURL,
        "video",
        videoInfo
      );
    } catch (error) {
      console.log("Lỗi rồi", { error });
      dispatch(isSuccess());
      notificationMessage("error", error as string);
    }
  };

  const handleUploadQuiz = () => {
    handleUpdateLesson(
      lesson.title,
      index + 1,
      lesson._id,
      lesson.description,
      "",
      "quiz"
    );
    navigate(`${lesson._id}/quiz`);
  };

  const uploadDocument = async (document: File) => {
    dispatch(isPending());
    try {
      const response = await uploadDocumentApi.uploadFile(document);
      const { url }: any = response;

      dispatch(isSuccess());

      handleUpdateLesson(
        lesson.title,
        index + 1,
        lesson._id,
        lesson.description,
        url,
        "slide"
      );
    } catch (error) {
      console.log("Lỗi rồi", { error });
      dispatch(isSuccess());
      notificationMessage("error", error as string);
    }
  };

  const checkTypeLesson = (type: DocumentType) => {
    // console.log("type", type, lesson);

    if (type === "video") {
      setVideo(lesson.videoInfo || "");
      setContentType(lesson.videoInfo ? "video" : "none");
    }
    if (type === "quiz") {
      setContentType("quiz");
    }
    if (type === "slide") {
      setSlide(lesson.slide);
      setContentType("slide");
    }
  };

  useEffect(() => {
    if (lesson.title === "default") {
      setValue("");
      setEditTitle(true);
    }

    checkTypeLesson(lesson.type as DocumentType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  return (
    <div className="lesson">
      <div className="top">
        <div className="left">
          <span>Lecture {index + 1}:</span>

          {editTitle ? (
            <FormControl.Input
              style={{ height: 34 }}
              value={value}
              onChange={(e) => setValue((e.target as HTMLInputElement).value)}
            />
          ) : (
            <React.Fragment>
              <MediaContent.Icon icon="file-text-o" size={15} />
              <span>{lesson.title}</span>

              <div className="icons">
                <MediaContent.Icon
                  icon="edit"
                  size={15}
                  color="black"
                  className="icon"
                  onClick={() => {
                    setValue(lesson.title);
                    setEditTitle(true);
                  }}
                />
                <MediaContent.Icon
                  icon="trash"
                  size={15}
                  color="black"
                  className="icon"
                  onClick={() => handleDeleteLesson(lesson._id)}
                />
              </div>
              {lesson.publish && <div className="active">Đã kích hoạt</div>}
            </React.Fragment>
          )}
        </div>
        {!editTitle && (
          <div className="right">
            {isContent && !video ? (
              <span>
                {contentType === "none"
                  ? "Select content type"
                  : contentType === "video"
                  ? "Upload Video"
                  : "Upload tài liệu"}
                <MediaContent.Icon
                  icon="close"
                  size={15}
                  className="icon"
                  onClick={() => {
                    setIsContent(false);
                    setContentType("none");
                  }}
                />
              </span>
            ) : (
              <React.Fragment>
                <></>
              </React.Fragment>
            )}
          </div>
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
                : notificationMessage("error", "Vui lòng nhập tiêu đề bài học");
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
                handleUpdateLesson(value, index + 1, lesson._id);
              } else {
                notificationMessage("error", "Vui lòng nhập tiêu đề bài học");
              }
            }}
          >
            Save Lecture
          </Button>
        </div>
      )}


      {show && (
        <div className="bottom">
          <BoxContent.NormalContent style={{ gap: 0, padding: 0, height: 200 }}>
            <TextContent.Label label="Nội dung khóa học" />
            <FormControl.FormEditor
              style={{
                height: 120,
              }}
              value={description}
              onChange={setDescription}
              placeholder="Thêm một mô tả. Bao gồm những gì học sinh sẽ có thể làm sau khi hoàn thành bài giảng."
            />
          </BoxContent.NormalContent>

          <div className="btns">
            <Button
              variant="text"
              sx={{
                textTransform: "capitalize",
                color: "black",
                fontWeight: "bold",
              }}
              onClick={() => setShow(false)}
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
                handleUpdateLesson(
                  lesson.title,
                  index,
                  lesson._id,
                  description
                );
                setShow(false);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lesson;
