import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { trans } from "../../../Components/Navbar/Navbar";
import { ReactComponent as Lock } from "./Assets/Lock.svg";
import { ReactComponent as Phone } from "./Assets/Phone.svg";
import { useState } from "react";
import { apiHeaders, basedUrl } from "../../../Api/Apis";
import axios from "axios";
import { ErrorComponent } from "../../../Others/Error";

function Login() {
  const navigat = useNavigate();
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  // State Form
  const [phoneNum, setPhoneNum] = useState();
  const [password, setPassword] = useState();
  // State Form
  // FormData
  const formData = {
    mobile: phoneNum,
    password: password,
    fcm_token: "fcm",
  };
  // FormData
  // OnSubmit
  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${basedUrl}/public/login`,
        { ...formData },
        apiHeaders
      );
      localStorage.removeItem("token");
      localStorage.setItem("token", data.data.token);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(data.data));
      if (data.data.mobile_verified_at) {
        navigat("/");
      } else {
        navigat("/verify");
      }
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  };
  // OnSubmit
  return (
    <div className="Login py-5 px-3 flex-c">
      <div className="content mx-auto py-5 px-3 px-md-5 d-flex flex-column gap-4 justify-content-around align-items-center">
        <h3 className="fs-32-700"> {trans("login.tittle")} </h3>
        {/* form */}
        <form
          onSubmit={onsubmit}
          className="d-flex flex-column gap-4 full-width"
        >
          {/* Mobile */}
          <div className="d-flex flex-column gap-2">
            <div
              className={`mobil-number d-flex gap-3 p-3 border r-10  ${
                errorValidation.hasOwnProperty("mobile") && "border-red"
              }`}
            >
              <span className="icon">
                <Phone />
              </span>
              <input
                className={`full-width`}
                type="number"
                placeholder={trans("login.placeholdermobile")}
                onChange={(e) => {
                  setPhoneNum(e.target.value);
                }}
              />
            </div>
            <span className="text-error fs-14-400">
              {errorValidation.hasOwnProperty("mobile")
                ? errorValidation.mobile[0]
                : null}
            </span>
          </div>
          {/* Password */}
          <div className="d-flex flex-column gap-2">
            <div
              className={`password d-flex gap-3 p-3 border r-10  ${
                errorValidation.hasOwnProperty("password") && "border-red"
              }`}
            >
              <span className="icon">
                <Lock />
              </span>
              <input
                className="full-width"
                type="password"
                placeholder={trans("login.placeholderpassword")}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <span className="text-error fs-14-400">
              {errorValidation.hasOwnProperty("password")
                ? errorValidation.password[0]
                : null}
            </span>
          </div>
          <Link
            className="text-black d-flex justify-content-end fs-16-500"
            to="/register/recover"
          >
            {trans("login.forgetpass")}
          </Link>
          <button className="fs-16-700" type="submit">
            {trans("Btns.login")}{" "}
          </button>
        </form>
        <div className="bottom">
          <span className="fs-20-400 text-color">
            {trans("login.nohaveaccount")}{" "}
          </span>
          <Link className="fs-20-500 text-black" to={"/register"}>
            {trans("login.craeteaccount")}{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
