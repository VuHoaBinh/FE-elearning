import React from "react";
import { useNavigate } from "react-router-dom";
import MediaContent from "src/components/MediaContent";
import { IDetailInvoice } from "src/types";
import formatCharacter from "src/utils/formatCharacter";
import "./CoursePaymentDetail.scss";

interface CoursePaymentDetailProps {
  data?: IDetailInvoice;
}

const CoursePaymentDetail: React.FC<CoursePaymentDetailProps> = ({ data }) => {
  // console.log("course detail là", data);
  const navigate = useNavigate();
  return (
    <div className="course-payment-item">
      <div
        className="thumbnail"
        onClick={() => navigate(`/courses/${data?.courseSlug}`)}
      >
        <MediaContent.Image width={300} src={data?.courseThumbnail} />
      </div>
      <div className="content">
        <span>
          <b>Mã khoá học: </b>
          {data?.courseId}
        </span>
        <span>
          <b>Tên khoá học: </b>
          {data?.courseName}
        </span>
        <span>
          <b>Tên tác giả: </b>
          {data?.courseAuthor?.fullName}
        </span>
        <span>
          <b>Giá gốc: </b>
          {formatCharacter.numberLocale(data?.courseCurrentPrice, " đồng")}
        </span>
        <span>
          <b>Giá giảm: </b>
          {formatCharacter.numberLocale(data?.discount, " đồng")}
        </span>
        <span>
          <b>Giá thanh toán: </b>
          {formatCharacter.numberLocale(data?.amount, " đồng")}
        </span>
      </div>
    </div>
  );
};

export default CoursePaymentDetail;
