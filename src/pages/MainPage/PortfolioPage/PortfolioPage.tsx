import { Avatar, Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import courseApi from "src/apis/courseApi";
import teacherApi from "src/apis/teacherApi";
import BoxContent from "src/components/BoxContent";
import NavigationHeader from "src/components/NavigationHeader";
import Pagination from "src/components/Pagination";
import TextContent from "src/components/TextContent";
import CourseContainer from "src/pages/CoursePage/CourseContainer";
import UpdateDescription from "src/pages/ProfilePage/UpdateDescription";
import { selectAuthorization } from "src/reducers";
import { ICourse, ITeacherPortfolio } from "src/types";
import formatCharacter from "src/utils/formatCharacter";
import isVerifyCharacter from "src/utils/isVerifyCharacter";

import "./PortfolioPage.scss";

const PortfolioPage = () => {
  document.title = "Thông tin chi tiết giảng viên";

  const { id } = useParams();

  const { isRole } = useSelector(selectAuthorization);

  const [teacherInfo, setTeacherInfo] = useState<ITeacherPortfolio>();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const [limitCourse, setLimitCourse] = useState<number>(4);

  useLayoutEffect(() => {
    window.scroll(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //call page
  useEffect(() => {
    window.screen.width <= 430 && setLimitCourse(1);
  }, []);

  useEffect(() => {
    if (!showDescription) {
      getInfoTeacher();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, showDescription]);

  useEffect(() => {
    id && getCourseTeacher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page, limitCourse]);

  const getInfoTeacher = async () => {
    try {
      const response = await teacherApi.getTeacherInfoById(id);
      // console.log("response", response);
      const { user }: any = response;
      // console.log("thông tin giảng viên", user);
      setTeacherInfo({ user });
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const getCourseTeacher = async () => {
    const params = { publish: true, author: id, page, limit: limitCourse };
    setIsLoading(true);
    try {
      const response = await courseApi.getCourses(params);
      // console.log("course teacher", response);
      const { courses, total }: any = response;
      setCourses(courses);
      setIsLoading(false);
      setTotal(formatCharacter.numberRound(total / limitCourse));
    } catch (error) {
      setIsLoading(false);
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <>
      <NavigationHeader />
      <div className="portfolio-page">
        <div className="teacher-info">
          <TextContent.NormalText
            type="title-header"
            content="Thông tin chi tiết giảng viên"
          />
          <div className="info">
            <Avatar
              className="avatar-portfolio"
              alt={teacherInfo?.user?.fullName}
              src={teacherInfo?.user?.avatar}
            />
            <div className="content">
              <BoxContent.ContentInfo
                title="Tên giảng viên: "
                content={teacherInfo?.user?.fullName}
              />

              <BoxContent.ContentInfo
                title="Giới tính: "
                content={isVerifyCharacter.isGender(teacherInfo?.user?.gender)}
              />

              {!teacherInfo?.user?.teacher?.isVerified && (
                <span className="is-verify">Giảng viên chính thức</span>
              )}
              <Divider />
              <TextContent.NormalText
                type="title-header"
                content="Thông tin sơ lược"
              />
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    teacherInfo?.user?.teacher?.description ||
                    "Không có thông tin hiển thị",
                }}
              ></span>
              {isRole === "teacher" && (
                <Button
                  variant="contained"
                  onClick={() => setShowDescription(true)}
                >
                  Chỉnh sửa mô tả
                </Button>
              )}
            </div>
          </div>
        </div>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 90,
          }}
        >
          <CourseContainer
            title="Các khoá học đang bán"
            courses={courses}
            isLoading={isLoading}
            style={{
              maxWidth: "none",
              width: "88%",
            }}
          />
          {total > 0 && (
            <Pagination
              pageActive={page}
              total={total}
              onChangeValue={(value: number) => setPage(value)}
            />
          )}
        </Box>
      </div>
      <UpdateDescription
        value={teacherInfo?.user?.teacher?.description}
        id={id}
        show={showDescription}
        onClose={() => setShowDescription(false)}
        setShow={setShowDescription}
      />
    </>
  );
};

export default PortfolioPage;
