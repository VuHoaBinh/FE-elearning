import { Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface GoToTeacherPortfolioProps {
  user_id?: string;
}

const GoToTeacherPortfolio: React.FC<GoToTeacherPortfolioProps> = ({
  user_id,
}) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Divider />
      {/* <Typography variant="h6" component="span" fontWeight={600}>
        Phần dành riêng cho giảng viên
      </Typography> */}
      {/* <Button
        variant="contained"
        color="inherit"
        onClick={() => navigate(`/user/${user_id}`)}
        sx={{ width: 300 }}
      >
        Xem thử trang portfolio
      </Button> */}
    </React.Fragment>
  );
};

export default GoToTeacherPortfolio;
