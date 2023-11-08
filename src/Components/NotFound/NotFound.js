import React from "react";
import { ReactComponent as Icon } from "./Assets/Frame.svg";
import { Link } from "react-router-dom";
function NotFound({ link, text, btnText }) {
  return (
    <div className="d-flex flex-column gap-4 align-items-center justify-content-center full-height my-auto">
      <div>
        <Icon />
      </div>
      <h3 className="fs-20-600 text-center" style={{maxWidth:'400px'}}>{text}</h3>
      {typeof btnText !== 'undefined' && (
        <>
          <Link to={link} className="py-2 px-4 bg-main r-10 text-white">
            {btnText}
          </Link>
        </>
      )}
    </div>
  );
}

export default NotFound;
