import { Router } from "src/types";
import AvatarUser from "../../AvatarUser";
import SidebarSection from "../SidebarSection";
import "./SidebarLargeScreen.scss";

interface SidebarLargeScreenProps {
  dashboard: Router[];
}
const SidebarLargeScreen: React.FC<SidebarLargeScreenProps> = ({
  dashboard,
}) => {
  return (
    <div className="dashboard-sidebar">
      <div className="content-info">
        <div className="content-info-user">
          <AvatarUser />
        </div>
        <div className="content-info-nav">
          <SidebarSection sidebarSection={dashboard} />
        </div>
      </div>
    </div>
  );
};

export default SidebarLargeScreen;
