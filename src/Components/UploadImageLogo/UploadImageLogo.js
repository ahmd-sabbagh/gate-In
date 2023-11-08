import React from "react";
import { ReactComponent as Import } from "./Assets/import.svg";
import { trans } from "../Navbar/Navbar";

function UploadImageLogo({ logo, setLogo, errorValidation }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="head-profile-image my-5 d-flex align-items-center gap-4 justify-content-center">
      {/* image */}
      <div className="image flex-c overflow-hidden">
        {logo ? (
          <img src={URL.createObjectURL(logo)} alt="" />
        ) : (
          <img src={user?.image} alt="" />
        )}
      </div>
      {/* input select image */}
      <div className="select-image d-flex flex-column gap-2">
        <label
          htmlFor="select"
          className=" d-flex align-items-center justify-content-between py-2 px-3 r-10 pointer"
        >
          {trans("my_personal_data_user.add_photo")}
          <span className="flex-c icon">
            <Import />
          </span>
        </label>
        <p>{trans("my_personal_data_user.mega")}</p>
        <span className="text-error fs-14-400">
          {errorValidation.hasOwnProperty("logo")
            ? errorValidation.logo[0]
            : null}
        </span>
        <input
          id="select"
          type="file"
          onChange={(e) => {
            setLogo(e.target.files[0]);
          }}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}

export default UploadImageLogo;
