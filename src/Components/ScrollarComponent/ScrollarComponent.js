import "./ScrollarComponent.css";
import React from "react";

function ScrollarComponent(props) {
  return (
    <div
      className={`ScrollarComponent ${props?.padding === "0" && "p-0"}`}
      style={{ maxHeight: props.height }}
    >
      {props.children}
    </div>
  );
}

export default ScrollarComponent;
