import React from "react";
import { trans } from "../../../../Components/Navbar/Navbar";
import { BiSad } from "react-icons/bi";
function NotExist() {
  return (
    <div className="flex-c mt-5" style={{ height: "450px" }}>
      <div className="d-flex flex-column gap-2 align-items-center">
        <div className="main-color" style={{ fontSize: "85px" }}>
          <BiSad />
        </div>
        <span className="fs-24-700">{trans("recommendations.no")}</span>
      </div>
    </div>
  );
}

export default NotExist;
