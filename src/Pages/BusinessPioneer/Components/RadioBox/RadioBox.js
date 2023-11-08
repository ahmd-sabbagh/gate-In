import React from "react";

function RadioBox({ index, setState, value, state, label, name }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <input
        value={value}
        checked={state === value}
        onChange={(e) => {
          setState(e.target.value);
        }}
        id={`pioneer-${index}`}
        type="radio"
        name={name}
      />
      <label className="pointer text-color" htmlFor={`pioneer-${index}`}>
        {label}
      </label>
    </div>
  );
}

export default RadioBox;
