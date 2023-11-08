import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { basedUrl } from "../../../Api/Apis";
import { trans } from "../../../Components/Navbar/Navbar";
import { RadioCreateAccount } from "../../../RecoilState/RadioCreateAccount";
import "../CreatAccountEmploye/CreatAccount.css";
import { ErrorComponent } from "../../../Others/Error";

function CreateAccountAll() {
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  // Type
  const [type, setType] = useRecoilState(RadioCreateAccount);
  // Type
  // State Form
  const [name, setName] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  // State Form
  // Form Data
  const formData = {
    first_name: name,
    mobile: phoneNum,
    password: password,
    password_confirmation: confirmPassword,
    type: type,
    fcm_token: "fcm",
  };
  // Form Data
  // function Submit
  const navigat = useNavigate();
  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${basedUrl}/public/register`,
        { ...formData },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.data.token);
      if (localStorage.getItem("user")) {
        navigat("/verify");
      }
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  };
  // function Submit
  return (
    <div className="CreatAccount flex-c py-5 px-3">
      <div className="content mx-auto py-5 px-3 px-md-5 d-flex flex-column gap-3 gap-md-4 align-items-center justify-content-evenly">
        <h4 className="fs-32-700 mb-3 text-center">
          {trans("create-account.tittle")}
        </h4>
        <form
          onSubmit={onsubmit}
          className="d-flex flex-column gap-3 gap-md-4 full-width"
        >
          {/* names */}
          <div className="full-width d-flex flex-column gap-2">
            <input
              className={`full-width fit-height ${
                errorValidation.hasOwnProperty("first_name") && "border-red"
              }`}
              type="text"
              placeholder={trans("name")}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <span className="text-error fs-14-400">
              {errorValidation.hasOwnProperty("first_name")
                ? errorValidation.first_name[0]
                : null}
            </span>
          </div>

          {/* phone number */}
          <div className="full-width d-flex flex-column gap-2">
            <input
              className={`full-width fit-height ${
                errorValidation.hasOwnProperty("mobile") && "border-red"
              }`}
              type="number"
              placeholder={trans("login.phonenumber")}
              onChange={(e) => {
                setPhoneNum(e.target.value);
              }}
            />
            <span className="text-error fs-14-400">
              {errorValidation.hasOwnProperty("mobile")
                ? errorValidation.mobile[0]
                : null}
            </span>
          </div>
          {/* password */}
          <div className="full-width d-flex flex-column gap-2">
            <input
              className={`full-width fit-height ${
                errorValidation.hasOwnProperty("password") && "border-red"
              }`}
              type="password"
              placeholder={trans("create-account.password")}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span className="text-error fs-14-400">
              {errorValidation.hasOwnProperty("password")
                ? errorValidation.password[0]
                : null}
            </span>
          </div>
          {/* Confirm password */}
          <div className="full-width d-flex flex-column gap-2">
            <input
              className={`full-width fit-height ${
                errorValidation.hasOwnProperty("password_confirmation") &&
                "border-red"
              }`}
              type="password"
              placeholder={trans("confirm_pass")}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <span className="text-error fs-14-400">
              {errorValidation.hasOwnProperty("password_confirmation")
                ? errorValidation.password_confirmation[0]
                : null}
            </span>
          </div>
          {/* submit */}
          <button className="fs-16-700" type="submit">
            {trans("Btns.loginnow")}
          </button>
        </form>
        <div className="conditions">
          <span className="fs-14-400 text-color">
            {trans("create-account.conditons")}
          </span>
          <Link className="fs-14-400 text-danger" to={"/genral/terms"} target="_blank">
            {trans("create-account.condition-btn")}
          </Link>
        </div>
        <div className="bottom">
          <span className="fs-20-400 text-color">
            {trans("Btns.haveaemail")}
          </span>
          <Link className="fs-20-500 text-black" to={"/register/login"}>
            {trans("Btns.login")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountAll;
