import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import courseApi from "src/apis/courseApi";
import ArticleReadMore from "src/components/ArticleReadMore";
import BoxContent from "src/components/BoxContent";
import MediaContent from "src/components/MediaContent";
import NavigationHeader from "src/components/NavigationHeader";
import TextContent from "src/components/TextContent";
import { getPanelActive } from "src/reducers";
import { ICourse } from "src/types";
import formatCharacter from "src/utils/formatCharacter";
import translateVi from "src/utils/translateVi";
import BtnAddCart from "../BtnAddCart";
import CourseSummary from "../CourseSummary";
import CourseTarget from "../CourseTarget";
import "./CourseDetail.scss";

const CourseDetail = () => {
  document.title = "Thông tin chi tiết khoá học";
  const { id } = useParams();
  const dispatch = useDispatch();

  const [courseDetail, setCourseDetail] = useState<ICourse>({});
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPanelActive(""));
  }, [id]);

  useEffect(() => {
    getCourseDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getCourseDetail = async () => {
    setIsLoadingDetail(true);
    try {
      const response = await courseApi.getCourseDetail(id);
      const { course }: any = response;
      setCourseDetail(course);
      setIsLoadingDetail(false);
      // console.log("course", course);
    } catch (error) {
      setIsLoadingDetail(false);
      console.log("lỗi", { error });
    }
  };

  return (
    <>
      <NavigationHeader />
      <div className="courses-detail">
        <TextContent.NormalText
          type="title-header-large"
          content="Thông tin chi tiết khoá học"
        />
        <div className="course-preview">
          <div className="info">
            <MediaContent.Image src={courseDetail.thumbnail} />
            <TextContent.NormalText content={courseDetail.name as string} />
            <span className="description">
              <ArticleReadMore
                title="Mô tả khoá học"
                content={courseDetail.description}
              />
            </span>
          </div>
          <div className="content-detail">
            <div className="detail-info">
              <TextContent.NormalText content="Thông tin khoá học" />
              <BoxContent.ContentInfo
                responsive={false}
                type="fit-content"
                title="Dành cho: "
                content={translateVi(courseDetail.level)}
              />

              {/* btn add cart */}
              <BtnAddCart
                courseId={courseDetail._id}
                isBought={courseDetail.isBought}
              />
            </div>
            <CourseSummary
              title="Thông tin chi tiết khoá học"
              chapters={courseDetail.chapters}
            />
            <CourseTarget
              title="Đối tượng nào nên học?"
              content={courseDetail.intendedLearners}
              isLoading={isLoadingDetail}
            />
            <CourseTarget
              title="Kiến thức bắt buộc cần có?"
              content={courseDetail.requirements}
              isLoading={isLoadingDetail}
            />
            <CourseTarget
              title="Bạn sẽ học được gì?"
              content={courseDetail.targets}
              isLoading={isLoadingDetail}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default CourseDetail;
