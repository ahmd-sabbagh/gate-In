import React from "react";
import RadioBox from "../RadioBox/RadioBox";

function RadioBoxComponent({ state, setState, arrayState, name, label }) {
  return (
    <div className="pt-4">
      <span className="input-lable d-block mb-3">{label}</span>
      <div className="row g-4">
        {arrayState.map((item, index) => (
          <div className="col-12 col-ms-6 col-md-4" key={index}>
            <RadioBox
              {...item}
              name={name}
              index={`${index}-${name}`}
              state={state}
              setState={setState}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RadioBoxComponent;
