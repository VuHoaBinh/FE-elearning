import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import chapterApi from "src/apis/chapterApi";
import courseApi from "src/apis/courseApi";
import teacherApi from "src/apis/teacherApi";
import LayoutContainer from "src/layouts/LayoutContainer";
import { isPending, isSuccess } from "src/reducers";
import { TeacherPage } from "src/types";
import { handleLocalStorage, notificationMessage } from "src/utils";
import { IChapterUpload } from "./Chapter";
import CourseDetailSideBar, {
  CourseDetailSideBarData,
  CourseDetailSideBarItemType,
} from "./CourseDetailSideBar";
import CourseDetailSideBarItem from "./CourseDetailSideBarItem";
import "./TeacherCourseDetail.scss";

const TeacherCourseDetail = () => {
  document.title = "Quản lý khóa học";

  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [navbar, setNavbar] = useState<CourseDetailSideBarItemType>(
    (handleLocalStorage.getLocalStorageItem(
      TeacherPage.createCourseDetail.sideBarItem
    ) as CourseDetailSideBarItemType) ?? "COURSE_INFORMATION"
  );
  const [isChapterUpdated, setIsChapterUpdated] = useState(false);
  const [isInformationCourseUpdated, setIsInformationCourseUpdated] =
    useState(false);
  const [chapters, setChapters] = useState<IChapterUpload[]>([]);
  const [slug, setSlug] = useState("");
  const [courseStatus, setCourseStatus] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      category: "",
      originalPrice: 0,
      currentPrice: 0,
      thumbnail: "",
    },
    onSubmit: () => {},
  });

  const getCourseDetails = useCallback(async () => {
    dispatch(isPending());
    try {
      const response = await teacherApi.getCourseDetails(id);

      const { course }: any = response;
      const {
        name,
        description,
        category,
        slug: _slugCourse,
        chapters: chapterCourse,
        status,
        originalPrice,
        currentPrice,
        thumbnail,
      } = course;

      dispatch(isSuccess());
      setSlug(_slugCourse);
      formik.setValues({
        name,
        description,
        originalPrice,
        currentPrice,
        category: category._id,
        thumbnail,
      });
      setChapters(chapterCourse);
      setCourseStatus(status);
    } catch (error) {
      console.log("Lỗi rồi");
      notificationMessage("error", error as string);
      dispatch(isSuccess());
      nav("/teacher/info");
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      getCourseDetails();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleLocalStorage.setLocalStorage(
      TeacherPage.createCourseDetail.sideBarItem,
      navbar
    );
  }, [navbar]);

  useEffect(() => {
    if (isInformationCourseUpdated) {
      getCourseDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInformationCourseUpdated]);

  useEffect(() => {
    if (isChapterUpdated) {
      chapterApi.getChapters(id).then((res: any) => {
        dispatch(isSuccess());
        setChapters(res.chapters);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isChapterUpdated]);

  const handleSubmitReview = () => {
    dispatch(isPending());
    courseApi
      .updateCourse(slug, {
        status: "pending",
      })
      .then(() => {
        getCourseDetails();
        notificationMessage("success", "Chờ admin duyệt khóa học của bạn");
      });
  };

  const handleDeleteCourse = () => {
    dispatch(isPending());
    courseApi
      .deleteCourse(slug)
      .then(() => {
        notificationMessage("success", "Xóa khóa học thành công");
        dispatch(isSuccess());
        nav("/teacher/course");
      })
      .catch((error) => {
        console.log("lỗi rồi", error);
        notificationMessage("error", error);
        dispatch(isSuccess());
      });
  };

  const renderCourseDetailContent = (
    courseDetailSideBar: CourseDetailSideBarItemType
  ) => {
    switch (courseDetailSideBar) {
      case "COURSE_INFORMATION":
        return (
          <CourseDetailSideBarItem.CourseInformation
            slug={slug}
            courseStatus={courseStatus}
            isUpdateCompleted={(status) =>
              setIsInformationCourseUpdated(status)
            }
            courseInformationValue={formik.values}
          />
        );

      case "LEARNING_CONTENT":
        return (
          <CourseDetailSideBarItem.LearningContent
            chapters={chapters}
            isUpdateCompleted={(status) => setIsChapterUpdated(status)}
          />
        );
      case "INTENDED_LEARNERS":
        return <CourseDetailSideBarItem.IntendedLearners />;

      case "REQUIREMENTS":
        return <CourseDetailSideBarItem.Requirements />;
      case "TARGETS":
        return <CourseDetailSideBarItem.Targets />;

      default:
        return <CourseDetailSideBarItem.CourseDetailSideBarContentNotFound />;
    }
  };

  return (
    <LayoutContainer titleShow={false} footerShow={false}>
      <Box className="teacher-course-detail">
        <CourseDetailSideBar
          defaultSideBarId={navbar}
          sideBarContent={CourseDetailSideBarData}
          getSideBarId={(sideBarId) => setNavbar(sideBarId)}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: 45,
            }}
            onClick={handleSubmitReview}
          >
            Xuất bản khoá học
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              height: 45,
            }}
            onClick={handleDeleteCourse}
          >
            Xóa khóa học
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              height: 45,
            }}
            onClick={() => nav(-1)}
          >
            Quay lại trang trước
          </Button>
        </CourseDetailSideBar>
        <Box className="teacher-course-detail-content">
          {renderCourseDetailContent(navbar)}
        </Box>
      </Box>
    </LayoutContainer>
  );
};

export default TeacherCourseDetail;
