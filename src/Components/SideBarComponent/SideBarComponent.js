import { useState } from "react";
import "./SideBarComponent.css";

function SideBarComponent(props) {
  // State open And Close Side Bar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State open And Close Side Bar
  return (
    <div
      className={`SideBarComponent pt-5 pt-lg-0 full-height side-bar-position ${
        props.padding
      } ${sidebarOpen && "side-bar-0"}`}
    >
      {/* Icon */}
      <div className="icon-open d-lg-none position-relative">
        <div
          style={{
            borderRadius: "6px",
            top: props.top,
            fontSize: props.fontSizeIcon,
          }}
          className="flex-c position-absolute bg-main text-white p-2 pointer"
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
        >
          {props.icon}
        </div>
      </div>
      {/* Icon */}
      {/* Props Children */}
      {props.children}
      {/* Props Children */}
    </div>
  );
}

export default SideBarComponent;
