import { Rating as MuiRating } from "@mui/material";
import React from "react";
import "./Rating.scss";

interface RatingProps {
  name?: string;
  average_rating?: number;
  total_rating?: number;
  isReadOnly?: boolean;
  isShowTotalRating?: boolean;
  precision?: number;
  onChange?: (e: any) => void;
}

const Rating: React.FC<RatingProps> = ({
  name = "rating",
  average_rating = 0,
  isShowTotalRating = true,
  total_rating = 0,
  isReadOnly = true,
  precision = 1,
  onChange,
}) => {
  // console.log(average_rating);

  return (
    <div className="rating-container">
      {/* <MuiRating
        name={name}
        onChange={onChange}
        className="ratings"
        defaultValue={average_rating}
        value={average_rating}
        readOnly={isReadOnly}
        precision={precision}
      />
      {isShowTotalRating && (
        <span className="reviewers">{total_rating} người đánh giá</span>
      )} */}
    </div>
  );
};

export default Rating;
