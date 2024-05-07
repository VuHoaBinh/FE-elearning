import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin/info");
  }, [navigate]);

  return <div></div>;
};

export default AdminPage;
