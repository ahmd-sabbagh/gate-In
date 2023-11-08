import { useNavigate } from "react-router-dom";
import FilterComponnents from "../../../Components/FilterComponnents/FilterComponnents";
import "./SearchInEmployes.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { basedUrl } from "../../../Api/Apis";
import { ErrorComponent } from "../../../Others/Error";
import JobAndCourseCard from "../../../Components/Job/JobAndCourseCard";
import { trans } from "../../../Components/Navbar/Navbar";

function SearchInEmployes() {
  const navigat = useNavigate();
  const token = localStorage.getItem("token");
  // const [filterData, setFilterData] = useRecoilState(JobFilterData);
  const [filterData, setFilterData] = useState([]);
  // Get Data
  useEffect(() => {
    axios
      .post(
        `${basedUrl}/companies/jobs/requests`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        setFilterData(data.data.data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }, []);
  // Get Data
  return (
    <div className="SearchInEmployes">
      <div className="row">
        {/* Content */}
        <div className="col-12 col-lg-8">
          <div className="p-3 p-md-4 bg-white r-10">
            <h3 className="fs-32-600 mb-4">{trans("company_profile.side_bar.employer_search")}</h3>
            {/* Search */}
            <div className="job-cards d-flex flex-column gap-4">
              {filterData.map((item) => (
                <JobAndCourseCard
                  key={item.id}
                  item={item}
                  Share={false}
                  controler={false}
                  application={false}
                  searchEmploy="/company/dashboard/search-details/"
                />
              ))}
            </div>
          </div>
        </div>
        {/* SideBar */}
        <div className="col-lg-4">
          <FilterComponnents
            JobClassification={true}
            api="/companies/jobs/requests"
            setData={setFilterData}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchInEmployes;
