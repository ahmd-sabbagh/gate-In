import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { codeVerfy } from "../../RecoilState/Verification";

function Register() {
  const language = window.localStorage.i18nextLng;
  const [login, setLogin] = useRecoilState(codeVerfy);
  // const user = localStorage.getItem("user");
  return (
    <>
      {!login ? (
        <div className="Register" dir={language === "ar" ? "rtl" : "ltr"}>
          <Outlet />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default Register;
