import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.scss";

const AccessDenied = () => {
  return (
    <div className="error-page">
      <div className="warning">
        <span>
          <b>404</b> - Bạn không có quyền truy cập trang này
        </span>
        <p>
          Xin vui lòng hãy liên hệ với admin để nhận được sự hỗ trợ sớm nhất.
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

export default AccessDenied;
