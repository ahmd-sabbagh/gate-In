import "./UserAccount.css";
import SideBar from "./SideBar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { codeVerfy } from "../../RecoilState/Verification";
import { useEffect } from "react";
import axios from "axios";
import { basedUrl } from "../../Api/Apis";
import { ErrorComponent } from "../../Others/Error";

function UserAccount() {
  const token = localStorage.getItem("token");
  const [login, setLogin] = useRecoilState(codeVerfy);
  const navigat = useNavigate();
  useEffect(() => {
    axios
      .get(`${basedUrl}/job-seeker/main-data`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        if (data.data.data.personal_data === null) {
          navigat("/employ-data");
        } else if (data.data.data.learning_data === null) {
          navigat("/employ-data/learn");
        } else if (data.data.data.experiences === null) {
          navigat("/employ-data/experience");
        }
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }, []);

  return (
    <>
      {login ? (
        <div className="UserAccount">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-3">
                <SideBar />
              </div>
              <div className="col-12 col-lg-9">
                <div className="py-4 py-md-5 full-height">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default UserAccount;
