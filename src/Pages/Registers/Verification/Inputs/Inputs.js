import VerificationInput from "react-verification-input";
import "./Inputs.css";
import { trans } from "../../../../Components/Navbar/Navbar";
import axios from "axios";
import { basedUrl } from "../../../../Api/Apis";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorComponent, SuccsesComponent } from "../../../../Others/Error";
import { useRecoilState } from "recoil";
import {
  ForgetPasswordStates,
  verfyCodeRegister,
} from "../../../../RecoilState/ForgetPassword/ForgetPasswordStates";

function Inputs({ route, type }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // phone number
  const [phoneNum, setPhoneNum] = useRecoilState(ForgetPasswordStates);
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  const [code, setCodse] = useRecoilState(verfyCodeRegister);
  // Function submit
  var formData;
  if (type === "register") {
    formData = {
      code: code,
      mobile_or_email: phoneNum,
    };
  } else {
    formData = { 
      code: code,
    };
  }
  const submit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${basedUrl}${route}`,
        { ...formData },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (type !== "register") {
        localStorage.removeItem("token");
        localStorage.setItem("token", data.data.token);
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/");
      } else {
        navigate("/register/newpassword");
      }
      SuccsesComponent(data.message);
    } catch (error) {
      ErrorComponent(error, navigate, setErrorValidation);
    }
  };
  // Function submit
  return (
    <div className="Inputs full-width">
      <form
        onSubmit={submit}
        className="d-flex flex-column gap-3 gap-md-4 gap-lg-5"
      >
        <VerificationInput
          length={6}
          passwordMode={true}
          validChars="A-Za-z0-9"
          classNames={{
            container: "container",
            character: "character",
            characterInactive: "character--inactive",
            characterSelected: "character--selected",
          }}
          onChange={(e) => {
            setCodse(e);
          }}
        />
        <button className="resetBtn p-3 r-10 fs-16-700" type="submit">
          {trans("verify.btn")}{" "}
        </button>
      </form>
    </div>
  );
}

export default Inputs;
