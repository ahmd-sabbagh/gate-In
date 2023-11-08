import React, { useState } from "react";
import "./CreatAccount.css";
import { Link, useNavigate } from "react-router-dom";
import { trans } from "../../../Components/Navbar/Navbar";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { RadioCreateAccount } from "../../../RecoilState/RadioCreateAccount";
import { apiHeaders, basedUrl } from "../../../Api/Apis";
import { ErrorComponent } from "../../../Others/Error";

function CreatAccount() {
  const navigat = useNavigate();
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  // Type
  const [type, setType] = useRecoilState(RadioCreateAccount);
  // Type
  // Use Effect
  useEffect(() => {
    if (type === "") {
      navigat("/register");
    }
  }, []);
  // Use Effect
  // State Form
  const [firstN, setFirstN] = useState();
  const [lasttN, setLastN] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const formData = {
    first_name: firstN,
    last_name: lasttN,
    mobile: phoneNum,
    password: password,
    password_confirmation: confirmPassword,
    type: type,
    fcm_token: "fcm",
  };
  // State Form
  // function Submit
  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${basedUrl}/public/register`,
        { ...formData },
        apiHeaders
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
    <div className="CreatAccount py-5 px-3">
      <div className="content mx-auto py-5 px-3 px-md-5 d-flex flex-column gap-3 gap-md-4 align-items-center justify-content-evenly">
        <h4 className="fs-32-700 mb-3 text-center">{trans("create-account.tittle")}</h4>
        <form
          onSubmit={onsubmit}
          className="d-flex flex-column gap-3 gap-md-4 full-width"
        >
          {/* names */}
          <div className="names d-flex gap-4 flex-column flex-md-row">
            {/* first */}
            <div className="full-width d-flex flex-column gap-2">
              <input
                className={`full-width fit-height ${
                  errorValidation.hasOwnProperty("first_name") && "border-red"
                }`}
                type="text"
                placeholder={trans("create-account.place-name1")}
                onChange={(e) => {
                  setFirstN(e.target.value);
                }}
              />
              <span className="text-error fs-14-400">
                {errorValidation.hasOwnProperty("first_name")
                  ? errorValidation.first_name[0]
                  : null}
              </span>
            </div>
            {/* Second */}
            <div className="full-width d-flex flex-column gap-2">
              <input
                className={`full-width fit-height ${
                  errorValidation.hasOwnProperty("last_name") && "border-red"
                }`}
                type="text"
                placeholder={trans("create-account.place-name2")}
                onChange={(e) => {
                  setLastN(e.target.value);
                }}
              />
              <span className="text-error fs-14-400">
                {errorValidation.hasOwnProperty("last_name")
                  ? errorValidation.last_name[0]
                  : null}
              </span>
            </div>
          </div>
          {/* phone number */}
          <div className="full-width d-flex flex-column gap-2">
            <input
              className={`${
                errorValidation.hasOwnProperty("mobile") && "border-red"
              }`}
              type="number"
              placeholder={trans("create-account.phone-num")}
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
              className={`${
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
          {/* confirm password */}
          <div className="full-width d-flex flex-column gap-2">
            <input
              className={`${
                errorValidation.hasOwnProperty("password_confirmation") &&
                "border-red"
              }`}
              type="password"
              placeholder={trans("create-account.password")}
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

export default CreatAccount;
