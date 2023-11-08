import { BsCheck } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import "./SuggestedEmployeesComponent.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileEmployeImage from "../../../Components/ProfileEmployeImage/ProfileEmployeImage";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { basedUrl } from "../../../Api/Apis";
import { ErrorComponent, SuccsesComponent } from "../../../Others/Error";
import { useRecoilState } from "recoil";
import { JobApplicationUser } from "../../../RecoilState/JobApplicationUser";
import { trans } from "../../../Components/Navbar/Navbar";

function SuggestedEmployeesComponent({
  image,
  name,
  major,
  type = "",
  course_success,
  id,
  api,
  typeApi,
  route,
  setData
}) {
  const prams = useParams();
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  // State Of Users
  const [applicantsEmploye, setApplicants] = useRecoilState(JobApplicationUser);
  // Approved User
  const approvedUser = () => {
    axios
      .post(
        `${basedUrl}${api}${id}${typeApi}${prams.Id}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        SuccsesComponent(data.message);
        const filterUser = applicantsEmploye.filter((item) => item.id !== id);
        setApplicants(filterUser);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  return (
    <div className="SuggestedEmployeesComponent  d-flex flex-lg-column flex-xl-row gap-2 py-3 align-items-center">
      {/* image */}
      <ProfileEmployeImage image={image} status={course_success} />
      {/* text */}
      <div
        className={`d-flex justify-content-between full-width flex-1 ${
          type !== "Proposal" && "align-items-center"
        }`}
      >
        <div className="text d-flex flex-column">
          <h3 className="fs-14">{name}</h3>
          <p className=" fs-12 main-color">{major}</p>
          {/* cv */}
          {type === "Proposal" && (
            <div className="main-color fs-12 mt-1 pointer">
              تحميل السيرة الذاتية
            </div>
          )}
        </div>
        {/* like */}
        {type === "Proposal" ? (
          <div className="icon">
            <AiOutlineHeart />
          </div>
        ) : type === "all" ? (
          <Link
            to={`/company/dashboard/employe-details/${id}`}
            className="px-3 py-1 r-10 bg-main text-white"
            style={{ fontSize: "12px" }}
          >
            {trans("company_profile.view")}
          </Link>
        ) : (
          <div className="controlar d-flex gap-1">
            <span
              className="flex-c"
              onClick={() => {
                approvedUser();
              }}
            >
              <BsCheck />
            </span>
            <Link
              // employe-approved-details/:Id/aprovedd:Job-Id
              to={`${route}${id}/${prams.Id}`}
              className="flex-c main-color"
            >
              <FaEye />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SuggestedEmployeesComponent;
