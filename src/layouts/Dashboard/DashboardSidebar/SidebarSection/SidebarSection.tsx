import { Router } from "src/types";
import SidebarItem from "../SidebarItem";
import "./SidebarSection.scss";

interface SidebarSectionProps {
  sidebarSection: Router[];
  other?: any;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  sidebarSection,
  ...other
}) => {
  return (
    <div className="nav-section">
      {sidebarSection.map((sidebarItem, index) => (
        <SidebarItem
          className="sidebar-item"
          key={index}
          sidebarItem={sidebarItem}
        />
      ))}
    </div>
  );
};
export default SidebarSection;
