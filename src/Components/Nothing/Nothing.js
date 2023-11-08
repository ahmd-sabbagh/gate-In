import React from "react";
import "./Nothing.css";
import Lottie from "lottie-react";
function Nothing({ josnFile, text }) {
  return (
    <div className="Nothing p-4 r-10">
      <div className="icon mx-auto">
        <Lottie animationData={josnFile} loop={true} />
      </div>
      <h3 className=" fs-24-700 text-center">{text}</h3>
    </div>
  );
}

export default Nothing;
