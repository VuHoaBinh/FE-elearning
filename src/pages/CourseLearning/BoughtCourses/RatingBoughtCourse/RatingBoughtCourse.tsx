import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ratingApi from "src/apis/ratingApi";
import ModalContainer from "src/components/ModalContainer";
import Rating from "src/components/Rating/Rating";
import { isPending, isSuccess } from "src/reducers/authSlice";
import { IRating } from "src/types/myCourse";
import "./RatingBoughtCourse.scss";

interface RatingBoughtCourseProps {
  id?: string | number;
  slug?: string;
  show?: boolean;
  value?: IRating;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdate: (status: boolean) => void;
  onClose?: () => void;
}

const RatingBoughtCourse: React.FC<RatingBoughtCourseProps> = ({
  id,
  slug,
  onClose,
  value,
  show,
  isUpdate,
  setShow,
}) => {
  const dispatch = useDispatch();
  // console.log("value", value);

  const [star, setStar] = useState();
  const [content, setContent] = useState<string>();

  const checkRating = (rating: any) => !rating.value || rating.value === 0;

  const handleRating = async (e: any) => {
    e.preventDefault();
    const { rating } = e.target;

    if (checkRating(rating)) {
      toast.warning("Số sao rating phải lớn hơn 0", {
        position: "bottom-right",
      });
      return;
    }
    const params = { rate: rating.value * 1, content, slug };
    // console.log("params truyền là", params);
    dispatch(isPending());
    isUpdate?.(false);
    setShow?.(true);
    try {
      await ratingApi.postRate(params);
      toast.success("Đánh giá khoá học thành công", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log("lỗi rồi", { error });
      toast.warning("Đánh giá khoá học thất bại, hãy thử lại sau", {
        position: "bottom-right",
      });
    } finally {
      setShow?.(false);
      dispatch(isSuccess());
      isUpdate?.(true);
    }
  };

  const handleRerating = async (e: any) => {
    e.preventDefault();
    const { rating } = e.target;
    if (checkRating(rating)) {
      toast.warning("Số sao rating phải lớn hơn 0", {
        position: "bottom-right",
      });
      return;
    }

    const params = { rate: rating.value * 1, content };
    // console.log("params truyền là", params);
    dispatch(isPending());
    isUpdate?.(false);
    setShow?.(true);
    try {
      await ratingApi.updateRate(value?._id, params);
      // console.log("adsa", response);

      toast.success("Đánh giá khoá học thành công", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log("lỗi rồi", { error });
      toast.warning("Đánh giá khoá học thất bại, hãy thử lại sau", {
        position: "bottom-right",
      });
    } finally {
      setShow?.(false);
      dispatch(isSuccess());
      isUpdate?.(true);
    }
  };

  return (
    <React.Fragment>
      {!value ? (
        <ModalContainer title="Đánh giá khoá học" open={show} onClose={onClose}>
          <form onSubmit={handleRating}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span style={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <b>Đánh giá:</b>
                <Rating
                  isReadOnly={false}
                  isShowTotalRating={false}
                  average_rating={star}
                  onChange={(e: any) => setStar(e.target.value)}
                />
              </span>

              <ReactQuill
                defaultValue={content}
                theme="snow"
                onChange={(value) => setContent(value)}
                placeholder="Nhập nội dung đánh giá."
              />
              <Button type="submit" variant="contained">
                Đánh giá ngay
              </Button>
            </Box>
          </form>
        </ModalContainer>
      ) : (
        <ModalContainer
          title="Đánh giá lại khoá học"
          open={show}
          onClose={onClose}
        >
          <form onSubmit={handleRerating}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span style={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <b>Đánh giá:</b>
                <Rating
                  isReadOnly={false}
                  isShowTotalRating={false}
                  average_rating={star ? star : value.rate}
                  onChange={(e: any) => setStar(e.target.value)}
                />
              </span>
              <div className="editor">
                <h2>
                  Nội dung đánh giá <span>*</span>
                </h2>
                <ReactQuill
                  // style={{
                  //   height: 70,
                  // }}
                  defaultValue={value.content}
                  theme="snow"
                  onChange={(value) => setContent(value)}
                />
              </div>
              <Button type="submit" variant="contained" color="warning">
                Đánh giá lại
              </Button>
            </Box>
          </form>
        </ModalContainer>
      )}
    </React.Fragment>
  );
};

export default RatingBoughtCourse;
