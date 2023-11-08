import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { PopubSendData } from "../../RecoilState/PopubSendData";
import './SendDataDone.css'

function SendDataDone({ icon, title, desc, btn1To, btn1, btn2To, btn2 }) { 
  const [done, setDone] = useRecoilState(PopubSendData);
  return (
    <div className="SendDataDone position-air">
      <div className="container flex-c full-height">
        <div className=" bg-white cont r-10 p-5">
          <div className="icon flex-c mb-5">{icon}</div>
          <div style={{ maxWidth: "400px" }}>
            <h4 className="text-center fs-24-700">{title}</h4>
            <p className="mt-2 fs-16-500 text-color text-center">{desc}</p>
            <div className="buttons mt-4">
              <Link
                to={btn1To}
                className="d-block text-center mx-auto bg-main py-3 px-4 text-white r-10"
                style={{ maxWidth: "315px" }}
                onClick={() => {
                  setDone(false);
                }}
              >
                {btn1}
              </Link>
              {typeof btn2 !== "undefined" && (
                <Link
                  to={btn2To}
                  className="mt-3 d-block text-center mx-auto bg-main py-3 px-4 text-white r-10"
                  style={{ maxWidth: "315px" }}
                  onClick={() => {
                    setDone(false);
                  }}
                >
                  {btn2}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendDataDone;
