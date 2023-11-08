import { useRef } from "react";
import "./Tag.css";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

function Tag({ Array = [], type = "" }) {
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(true);

  const myRef = useRef();
  var scrollLeft;
  const scroll = (scrollOffset) => {
    myRef.current.scrollLeft += scrollOffset;
    scrollLeft = myRef.current.scrollLeft;
  };
  return (
    <>
      {Array.length >= 7 && type === "card" && (
        <>
          {state && (
            <div
              className="left-button flex-c"
              onClick={(e) => {
                scroll(-40);
                if (scrollLeft === 0) {
                  setState(false);
                  setState2(true);
                }
              }}
            >
              <IoIosArrowDown />
            </div>
          )}
          {state2 && (
            <div
              className="right-button flex-c"
              onClick={(e) => {
                scroll(40);
                if (scrollLeft === 0) {
                  setState(true);
                }
                setState(true);
              }}
            >
              <IoIosArrowDown />
            </div>
          )}
        </>
      )}

      <div
        dir="ltr"
        className="tags card-tags d-flex align-items-center gap-2"
        ref={myRef}
      >
        {Array.map((text, idx) => (
          <div
            key={idx}
            className="main-tag rounded-5"
            style={{
              padding: "7px 15px",
              backgroundColor: "#F7F7F7",
              fontSize: "12px",
            }}
          >
            {text.label}
          </div>
        ))}
      </div>
    </>
  );
}

export default Tag;
