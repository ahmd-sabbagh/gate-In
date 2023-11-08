import React from "react";

function CheckBox({ index, setState, state, label, type, name }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <input
        value={state}
        checked={state === true}
        onChange={() => {
          setState(!state);
        }}
        id={`pioneer-${index}`}
        type={type}
        name={name}
      />
      <label className="pointer text-color" htmlFor={`pioneer-${index}`}>{label}</label>
    </div>
  );
}

export default CheckBox;
