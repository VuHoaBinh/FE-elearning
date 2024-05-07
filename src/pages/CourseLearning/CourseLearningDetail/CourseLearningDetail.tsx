import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import courseApi from "src/apis/courseApi";
import myCourseApi from "src/apis/myCourseApi";
import teacherApi from "src/apis/teacherApi";
import NavigationHeader from "src/components/NavigationHeader";
import {
  getPanelActive,
  getQuestionState,
  selectAuthorization,
  setStudyLesson,
} from "src/reducers";
import { ICourse, Role } from "src/types";
import AcceptCourseLearning from "../AcceptCourseLearning";
import "./CourseLearningDetail.scss";

const CourseLearningDetail = () => {
  document.title = "Thông tin khoá học chi tiết";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [course, setCourse] = useState<ICourse>({});
  const [chapter, setChapter] = useState<any>();
  const { isRole } = useSelector(selectAuthorization);
  const { studyLesson } = useSelector(getQuestionState);
  const [showAccept, setShowAccept] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkByRole(isRole as Role);
    }, 500);
    return () => {
      clearTimeout(timeout);
      dispatch(setStudyLesson({}));
    };
  }, [id]);

  const checkByRole = (isRole: Role) => {
    switch (isRole) {
      case "student":
        getMyCourseDetail();
        break;
      case "teacher":
        getTeacherCourseDetails();
        break;
      case "admin":
        getAdminCourseDetail();
        break;

      default:
        console.log(`Role ${isRole} doesn't have initial`);
        navigate("/login");
        break;
    }
  };

  const getTeacherCourseDetails = async () => {
    try {
      const response = await teacherApi.getCourseDetails(id);
      // console.log("response", response);
      const { course }: any = response;
      const { chapters }: any = course;
      // console.log(" course nek", course);
      setCourse(course);
      setChapter(chapters);
      dispatch(setStudyLesson(chapters[0].lessons[0]));
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const getAdminCourseDetail = async () => {
    try {
      const response = await courseApi.viewCheckCourse(id);
      const { course }: any = response;
      const { chapters }: any = course;
      setCourse(course);
      setChapter(chapters);
      dispatch(setStudyLesson(chapters[0].lessons[0]));
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const getMyCourseDetail = async () => {
    try {
      const response = await myCourseApi.getMyCourseDetail(id);
      const { myCourse }: any = response;
      const { course, chapters, chapterOfLastView, lastView }: any = myCourse;

      setCourse(course);
      setChapter(chapters);
      dispatch(setStudyLesson(chapters[0].lessons[0]));
      dispatch(getPanelActive("panel" + (chapterOfLastView?.number - 1)));
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <React.Fragment>
      <NavigationHeader />
      <div className="my-course-detail">
        <div className="info">
          <span className="title">{course.name}</span>
          {/* for teacher */}
          {course.name && isRole === "admin" && (
            <Button variant="contained" onClick={() => setShowAccept(true)}>
              Duyệt khoá học
            </Button>
          )}
        </div>
      </div>
      {isRole === "admin" && (
        <AcceptCourseLearning
          slug={course.slug}
          show={showAccept}
          onClose={() => setShowAccept(false)}
          setShow={setShowAccept}
        />
      )}
    </React.Fragment>
  );
};
export default CourseLearningDetail;
