import "./ProfileEmployeImage.css";
import React from "react";
import { BsPatchCheckFill } from "react-icons/bs";

function ProfileEmployeImage({ image, status }) {
  return (
    <div className="ProfileEmployeImage flex-c position-relative">
      <div className="image-profile" style={{ backgroundImage: `url(${image})` }}>{/* <img src={image} alt="" /> */}</div>
      <div
        className="icon"
        style={status ? { color: "#49ADF4" } : { color: "#B8BCBC" }}
      >
        <BsPatchCheckFill />
      </div>
    </div>
  );
}

export default ProfileEmployeImage;
