import axios from "axios";
import { useEffect, useState } from "react";
import { basedUrl } from "../../../../Api/Apis";
import CourseFilterComponents from "../../../../Components/CourseFilterComponents/CourseFilterComponents";
import JobAndCourseCard from "../../../../Components/Job/JobAndCourseCard";
import { ErrorComponent } from "../../../../Others/Error";
import { useNavigate } from "react-router-dom";
import { trans } from "../../../../Components/Navbar/Navbar";
function AllCourses() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  // Data State
  // const [FilterData, setFilterData] = useRecoilState(CoursesFilterData);
  const [FilterData, setFilterData] = useState([]);
  // Data State
  const formData = {};
  const getData = () => {
    axios
      .post(`${basedUrl}/courses`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setFilterData(data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  // CourseFilterComponents
  return (
    <div className="AllJobs AllFilter row">
      <div className="col-12 col-lg-8">
        <div className="body bg-white p-3 p-md-4 r-10">
          <h3 className="fs-32-600 mb-4">{trans("courses.title")}</h3>
          <div className="job-cards d-flex flex-column gap-4">
            {FilterData?.data?.map((item) => (
              <JobAndCourseCard
                key={item.id}
                item={item}
                Btn={{
                  btn1: trans("courses.btn1"),
                  btn2: trans("courses.btn2"),
                }}
                Share={true}
                detailsUrl="/job_seeker/course-detail/"
                applyLink="/job-seeker/courses/apply/"
                likeLink="/job-seeker/courses/favorite/"
                getData={getData}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <CourseFilterComponents
          setData={setFilterData}
          api="/courses"
          JobClassification={false}
        />
      </div>
    </div>
  );
}

export default AllCourses;
