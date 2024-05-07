import { useSelector } from "react-redux";
import { getToggleState } from "src/reducers/toggleSlice";
import { Router } from "src/types";
import SidebarSection from "../SidebarSection";
import "./SidebarMobile.scss";

interface SidebarMobileProps {
  dashboard: Router[];
}

const SidebarMobile: React.FC<SidebarMobileProps> = ({ dashboard }) => {
  const { toggleState } = useSelector(getToggleState);

  if (!toggleState) return <div></div>;

  return (
    <div className="sidebar-mobile">
      <SidebarSection sidebarSection={dashboard} />
    </div>
  );
};

export default SidebarMobile;
