import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthorization } from "src/reducers/authSlice";
import { DASHBOARD_ROUTE } from "src/routes";
import { Router } from "src/types";
import SidebarLargeScreen from "./SidebarLargeScreen";
import SidebarMobile from "./SidebarMobile";
import "./DashboardSidebar.scss";
import { useMediaQuery } from "@mui/material";

const DashboardSidebar = () => {
  const { isRole } = useSelector(selectAuthorization);
  const [dashboard, setDashboard] = useState<Router[]>([]);

  useEffect(() => {
    const dashboardRoleIndex = DASHBOARD_ROUTE.findIndex(
      (dashboard) => dashboard.role === isRole
    );
    setDashboard(DASHBOARD_ROUTE[dashboardRoleIndex].children as Router[]);
  }, [isRole]);

  if (useMediaQuery("(min-width:837px)")) {
    return <SidebarLargeScreen dashboard={dashboard} />;
  }

  return <SidebarMobile dashboard={dashboard} />;
};

export default DashboardSidebar;
