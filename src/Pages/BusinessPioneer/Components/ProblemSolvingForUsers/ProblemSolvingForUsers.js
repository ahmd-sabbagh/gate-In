import React from "react";
import CheckBox from "../CheckBox/CheckBox";
function ProblemSolvingForUsers({ arrayState, name, label }) {
  return (
    <div className="pt-4">
      <span className="input-lable d-block mb-3">{label}</span>
      <div className="row g-4">
        {arrayState.map((item, index) => (
          <div className="col-12 col-md-6" key={index}>
            <CheckBox
              {...item}
              type="checkbox"
              name={name}
              index={`${index}-${name}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProblemSolvingForUsers;
