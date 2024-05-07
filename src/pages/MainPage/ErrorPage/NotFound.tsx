import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.scss";

const NotFound = () => {
  return (
    <div className="error-page">
      <div className="warning">
        <span>
          <b>404</b> - Hiện tại hệ thống không có trang này
        </span>
        <p>
          Mọi góp ý xin vui lòng hãy liên hệ với admin để nhận được sự hỗ trợ
          sớm nhất.
        </p>
      </div>
      <div className="btns">
        <Button variant="contained">
          <Link to="/">Quay về trang chủ?</Link>
        </Button>
      </div>
    </div>
  );
};
export default NotFound;
