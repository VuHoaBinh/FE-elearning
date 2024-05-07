import { Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import myCourseApi from "src/apis/myCourseApi";
import LoadingContent from "src/components/LoadingContent";
import { selectAuthorization } from "src/reducers";

interface BtnAddCartProps {
  courseId?: string;
  isBought?: boolean;
}

const BtnAddCart: React.FC<BtnAddCartProps> = ({ courseId, isBought }) => {
  const { isAuth, isRole } = useSelector(selectAuthorization);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCart = async () => {
    if (!isAuth) {
      navigate("/register");
    } else {
      const params = { course: courseId };
      setIsLoading(true);
      try {
        await myCourseApi.postMyCourse(params);
        setIsLoading(false);
        toast.success("Đăng kí khóa học thành công", {
          position: "bottom-right",
        });
      } catch (error) {
        console.log("lỗi rồi", { error });
        setIsLoading(false);
        toast.warning(`${error}`, {
          position: "bottom-right",
        });
      }
    }
  };

  if (isBought) {
    return (
      <Button variant="contained" color="warning" disabled>
        Bạn đã sở hữu khoá học này
      </Button>
    );
  }
  if (isRole !== "student" && isRole !== "") {
    return (
      <Button variant="contained" color="warning" disabled>
        Học sinh mới được đăng kí này
      </Button>
    );
  }
  return (
    <Button
      variant="contained"
      color="warning"
      onClick={handleAddCart}
      disabled={isLoading}
    >
      {!isLoading ? "Đăng kí tư vấn khóa học" : <LoadingContent.Loading />}
    </Button>
  );
};
export default BtnAddCart;
