import Welcom from "./Welcom";
import axios from "axios";
import { useEffect } from "react";
import { ErrorComponent } from "../../../../Others/Error";
import { basedUrl } from "../../../../Api/Apis";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { InstitutesHomeCourses } from "../../../../RecoilState/InstitutesHomeCourses";

function HomeCenter({ linkGetData }) {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  const location = useLocation().pathname;
  // State Data
  const [corses, setCourses] = useRecoilState(InstitutesHomeCourses);
  // State Data
  const getCourses = () => {
    axios
      .post(
        `${basedUrl}${linkGetData}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        setCourses(data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  useEffect(() => {
    getCourses();
  }, [location]);
  return <Welcom data={corses} linkGetData={linkGetData} getData={getCourses}/>;
}

export default HomeCenter;
