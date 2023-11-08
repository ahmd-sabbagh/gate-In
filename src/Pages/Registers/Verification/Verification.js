import "./Verification.css";
import Inputs from "./Inputs/Inputs";
import { ReactComponent as ResetIcon } from "../Assets/ResendCode.svg";
import { trans } from "../../../Components/Navbar/Navbar";
import { ValidationMobileNumber } from "../../../RecoilState/ValidationMobileNumber";
import { useRecoilState } from "recoil";
import { codeVerfy } from "../../../RecoilState/Verification";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ForgetPasswordStates } from "../../../RecoilState/ForgetPassword/ForgetPasswordStates";
import axios from "axios";
import { apiHeaders, basedUrl } from "../../../Api/Apis";
import { ErrorComponent, SuccsesComponent } from "../../../Others/Error";

function Verification({ type = "", route }) {
  const navigat = useNavigate();
  const mobNumber = JSON.parse(localStorage.getItem("user"))?.mobile;
  const [phoneNum, setPhoneNum] = useRecoilState(ForgetPasswordStates);
  // Validation Mobile Number
  const [login, setLogin] = useRecoilState(codeVerfy);
  const [validationMobile, setValidationMobile] = useRecoilState(
    ValidationMobileNumber
  );
  const validatinMobile = () => {
    const userAccount = JSON.parse(localStorage.getItem("user"));
    if (type !== "register") {
      if (userAccount) {
        setLogin(true);
        if (userAccount.mobile_verified_at) {
          setValidationMobile(false);
          navigat("/");
        } else {
          setValidationMobile(true);
        }
      } else {
        setLogin(false);
        navigat("/");
      }
    }
  };
  // Validation Mobile Number
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    validatinMobile();
    //interval
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    //interval

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  // Resend Code Function
  const resendOTP = () => {
    setMinutes(1);
    setSeconds(30);
    axios
      .post(
        `${basedUrl}/public/password/reset/send-code`,
        {
          mobile_or_email: phoneNum || mobNumber,
        },
        apiHeaders
      )
      .then(({ data }) => SuccsesComponent(data.message))
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };

  return (
    <div className="Verification flex-c py-5 px-3">
      <div className="content mx-auto p-3 p-lg-5 d-flex flex-column gap-4 align-items-center">
        <div className="icon">
          <ResetIcon />
        </div>
        <h4 className="fs-24-700"> {trans("verify.tittle")} </h4>
        <p className="fs-16-400">
          {trans("verify.desc")} <br />
          <span className=" d-block text-center main-color mt-1">
            {mobNumber || phoneNum}
          </span>
        </p>
        <Inputs route={route} type={type} />
        <div className="">
          {seconds > 0 || minutes > 0 ? (
            <p>
              الوقت المتبقي: {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p>
          ) : (
            <p>{trans("no_reseve_code")}</p>
          )}

          <button
            className="resetBtn bg-transparent mx-auto d-block py-3"
            disabled={seconds > 0 || minutes > 0}
            style={{
              color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
            }}
            onClick={resendOTP}
          >
            {trans("resend_code")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verification;
