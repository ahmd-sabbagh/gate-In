import { Link } from "react-router-dom";
import JobAndCourseCard from "../../../../Components/Job/JobAndCourseCard";
import { useRecoilState } from "recoil";
import { InstitutesHomeCourses } from "../../../../RecoilState/InstitutesHomeCourses";
import CourseFilterComponents from "../../../../Components/CourseFilterComponents/CourseFilterComponents";
import Loader from "../../../../Components/Loader/Loader";
import WelcomNoAdJobs from "../../../../Components/WelcomNoAdJobs/WelcomNoAdJobs";
import { useState } from "react";
import { trans } from "../../../../Components/Navbar/Navbar";
// WelcomNoAdJobs
const WelcomData = {
  header: "أهلا بك, نيوب للتكنولوجيا",
  startNow: "ابدأ الآن بوضع اول أعلان للدورات واحصل على المتدربين ",
  hent: "يمكنك الآن عمل اعلان جديد بوضع الدورة التى تريد عرضها للمتدربين  واستقبل الطلبات  من المتدربين ",
  linkTitle: "اضافة دورة جديدة",
  linkTo: "/institute/add-course",
};

function Welcom({ linkGetData, data, getData }) {
  const user = JSON.parse(localStorage.getItem("user"));
  // State Data
  const [corses, setCourses] = useRecoilState(InstitutesHomeCourses);
  // const [corses, setCourses] =  useState();
  // State Data
  return (
    <div className="Welcom">
      <div className="row">
        {/* Content */}
        <div className="col-12 col-lg-8">
          {!corses?.empty ? (
            <>
              {corses?.courses?.data.length > 0 ? (
                <div className="body bg-white r-10 p-3 p-md-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fs-16-700">{user?.first_name}</h3>
                    <Link
                      to={"/institute/add-course"}
                      className="d-block fit-content bg-main py-2 px-4 text-white r-10"
                    >
                      {trans("center_company.add_course")}
                    </Link>
                  </div>
                  <div className="job-cards d-flex flex-column gap-4">
                    {data.courses.data?.map((item) => (
                      <JobAndCourseCard
                        key={item.id}
                        Share={false}
                        controler={true}
                        item={item}
                        application={true}
                        deleteLink="/institutes/courses/delete/"
                        editLink={`/institute/dashboard/course-detail/${item.id}`}
                        getData={getData}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <Loader />
              )}
            </>
          ) : (
            <WelcomNoAdJobs {...WelcomData} />
          )}
        </div>
        {/* SideBar */}
        <div className="col-lg-4">
          <CourseFilterComponents
            setData={setCourses}
            api={linkGetData}
            JobClassification={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Welcom;
