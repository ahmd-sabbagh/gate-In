import "./ForgetPass.css";
import { trans } from "../../../Components/Navbar/Navbar";
import { ReactComponent as ForgetIcon } from "../Assets/ForgetPass.svg";
import { ReactComponent as Sms } from "../Assets/Phone.svg";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ForgetPasswordStates } from "../../../RecoilState/ForgetPassword/ForgetPasswordStates";
import { ErrorComponent, SuccsesComponent } from "../../../Others/Error";
import axios from "axios";
import { apiHeaders, basedUrl } from "../../../Api/Apis";
import { useState } from "react";

function ForgetPass() {
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  const [phoneNum, setPhoneNum] = useRecoilState(ForgetPasswordStates);
  const navigat = useNavigate();
  const onSubmit = async (e) => { 
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${basedUrl}/public/password/reset/send-code`,
        {
          mobile_or_email: phoneNum,
        },
        apiHeaders
      );
      SuccsesComponent(data.message); 
      navigat("/register/verify");
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  };
  return (
    <div className="ForgetPass py-5 px-3">
      <div className="content mx-auto p-5 d-flex flex-column gap-4 justify-content-evenly align-items-center">
        <div className="icon">
          <ForgetIcon />
        </div>
        <h4 className="fs-32-700"> {trans("forget-pass.tittle")} </h4>
        <p className="fs-20-400 text-center"> {trans("forget-pass.desc")} </p>
        <form onSubmit={onSubmit} className="full-width">
          <div
            className={`input p-3 r-10 border d-flex gap-2 ${
              errorValidation.hasOwnProperty("mobile_or_email") && "border-red"
            }`}
          >
            <span>
              <Sms />
            </span>
            <input
              type="number"
              onChange={(e) => {
                setPhoneNum(e.target.value);
              }}
              placeholder={trans("forget-pass.placeholder")}
            />
          </div>
          <span className="text-error fs-14-400">
            {errorValidation.hasOwnProperty("mobile_or_email")
              ? errorValidation.mobile_or_email[0]
              : null}
          </span>
          <button className="resetBtn full-width mt-4" type="submit">
            {trans("forget-pass.btn")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPass;
