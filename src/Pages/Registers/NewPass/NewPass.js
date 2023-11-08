import "./NewPass.css";
import { ReactComponent as NewPassword } from "../Assets/NewPass.svg";
import { ReactComponent as Lock } from "../Assets/Lock.svg";
import { trans } from "../../../Components/Navbar/Navbar";
import { useRecoilState } from "recoil";
import {
  ForgetPasswordStates,
  verfyCodeRegister,
} from "../../../RecoilState/ForgetPassword/ForgetPasswordStates";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiHeaders, basedUrl } from "../../../Api/Apis";
import axios from "axios";
import { ErrorComponent, SuccsesComponent } from "../../../Others/Error";

function NewPass() {
  const [code, setCodse] = useRecoilState(verfyCodeRegister);
  const [phoneNum, setPhoneNum] = useRecoilState(ForgetPasswordStates);
  const [password, setPassword] = useState();
  const [password_confirmation, setConfirmPassword] = useState();
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  const navigat = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${basedUrl}/public/password/reset/check-code`,
        {
          password,
          password_confirmation,
          code,
          mobile_or_email: phoneNum,
        },
        apiHeaders
      );
      SuccsesComponent(data.message);
      navigat("/register/login");
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  };
  return (
    <div className="NewPass py-5 px-3">
      <div className="content mx-auto p-5 d-flex flex-column gap-4 justify-content-evenly align-items-center">
        <div className="icon">
          <NewPassword />
        </div>
        <h4 className="fs-32-700"> {trans("new-pass.tittle")} </h4>
        <p className="fs-20-400 text-center text-color">
          {trans("new-pass.desc")}{" "}
        </p>
        <form className="full-width" onSubmit={onSubmit}>
          <div
            className={`input p-3 r-10 border d-flex gap-2 ${
              errorValidation.hasOwnProperty("password") && "border-red"
            }`}
          >
            <span>
              <Lock />
            </span>
            <input
              type="text"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder={trans("new-pass.place-hold1")}
            />
          </div>
          <span className="text-error fs-14-400">
            {errorValidation.hasOwnProperty("password")
              ? errorValidation.password[0]
              : null}
          </span>
          <div
            className={`input mt-3 p-3 r-10 border d-flex gap-2 ${
              errorValidation.hasOwnProperty("password_confirmation") &&
              "border-red"
            }`}
          >
            <span>
              <Lock />
            </span>
            <input
              type="text"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder={trans("new-pass.place-hold1")}
            />
          </div>
          <span className="text-error fs-14-400">
            {errorValidation.hasOwnProperty("password_confirmation")
              ? errorValidation.password_confirmation[0]
              : null}
          </span>
          <button className="resetBtn full-width mt-4" type="submit">
            {trans("new-pass.btn")}{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPass;
