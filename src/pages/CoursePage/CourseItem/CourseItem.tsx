import { Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "src/components/Rating";
import { useHover } from "src/hooks";
import { ICourse } from "src/types";
import formatCharacter from "src/utils/formatCharacter";
import translateVi from "src/utils/translateVi";
import BtnAddCart from "../BtnAddCart";
import CourseModal from "../CourseModal";

import "./CourseItem.scss";

interface CourseItemProps {
  courseInfo: ICourse;
}
const CourseItem: React.FC<CourseItemProps> = ({ courseInfo }) => {
  const navigate = useNavigate();

  const { nodeRef, show } = useHover();

  return (
    <div className="course-item" >
      <div className="img" ref={nodeRef}  style={{borderRadius:"40px"}}>
        {/* {formatCharacter.numberRound(courseInfo.saleOff) > 0 && (
          <span className="sale-off">
            -{formatCharacter.numberRound(courseInfo.saleOff)}%
          </span>
        )} */}
        <img
          style={{borderRadius:"40px"}} 
          src={courseInfo.thumbnail}
          alt="img"
          // onClick={() => navigate(`/courses/${courseInfo._id}`)}
          onClick={() => navigate(`/courses/${courseInfo.slug}`)}
        />
        {show && <CourseModal course={courseInfo} />}
      </div>
      <div className="content">
        <Tooltip title={courseInfo.name || ""}>
          <span className="name">{courseInfo.name}</span>
        </Tooltip>
        {/* <Tooltip
          title="Xem trang cá nhân"
          onClick={() =>
            courseInfo.author?._id &&
            navigate(`/user/${courseInfo.author?._id}`)
          }
        >
          
          <span className="author" style={{ cursor: "pointer" }}>
            <b>Tác giả: </b>
            {courseInfo.author?.fullName}
          </span>
        </Tooltip> */}
        {/* <span className="level">
          <b>Dành cho: </b>
          {translateVi(courseInfo.level)}
        </span> */}
        {/* hot tags */}
        {/* <span className="sell-number">
          <span className="amount">
            <b>Số lượng bán được: </b>
            {courseInfo.sellNumber}
          </span>
          {courseInfo.type && (
            <span className="tags">Đang {courseInfo.type}</span>
          )}
        </span> */}
        {/* <span
          className="level"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <b>Đánh giá: </b>
          <Rating
            average_rating={courseInfo.rating?.rate}
            total_rating={courseInfo.rating?.numOfRate}
          />
        </span> */}
        {(courseInfo.currentPrice || 0) > 0 ? (
          <span className="current_price" style={{color:"orange", fontWeight:"bold"}}>
            <b style={{color:"black", fontWeight:"bold"}}>Giá: </b>
            {formatCharacter.numberLocale(courseInfo.currentPrice, " đồng")}
            <span className="original_price">
              {formatCharacter.numberLocale(courseInfo.originalPrice, " đồng")}
            </span>
          </span>
        ) : (
          <span className="current_price">
            <b>Giá:</b> <span className="free">Miễn phí</span>
          </span>
        )}

        {/* <BtnAddCart courseId={courseInfo._id} isBought={courseInfo.isBought} /> */}
      </div>
    </div>
  );
};

export default CourseItem;
