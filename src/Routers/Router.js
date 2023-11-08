import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorRoute from "../Components/Error/ErrorRoute";
import MainJobDetails from "../Components/MainJobDetails/MainJobDetails";
import AllArticles from "../Pages/AllArticles/AllArticles";
import ArticleDetails from "../Pages/ArticleDetails/ArticleDetails";
import PioneerPersonalData from "../Pages/BusinessPioneer/PersonalData";
import AddAds from "../Pages/Company/AddAds/AddAds";
import EmployDetails from "../Pages/Company/EmployDetails/EmployDetails";
import JobCompanyDetails from "../Pages/Company/JobCompanyDetails/JobCompanyDetails";
import JobsApplication from "../Pages/Company/JobsApplication/JobsApplication";
import OutletCompany from "../Pages/Company/Outlet/Outlet";
import PlatformAds from "../Pages/Company/PlatformAds/PlatformAds";
import SearchInEmployes from "../Pages/Company/SearchInEmployes/SearchInEmployes";
import WelcomYourCompany from "../Pages/Company/WelcomYourCompany/WelcomYourCompany";
import Courses from "../Pages/Courses/Courses";
import CvPage from "../Pages/CvPage/CvPage";
import Employe from "../Pages/Employe/Employe";
import LearningData from "../Pages/Employe/Pages/LearningData";
import PersonalData from "../Pages/Employe/Pages/PersonalData";
import PreviousExperience from "../Pages/Employe/Pages/PreviousExperience";
import Home from "../Pages/Home/Home";
import JobDetails from "../Pages/JobDetails/JobDetails";
import JobFilter from "../Pages/JobFilter/JobFilter";
import ProgramComponent from "../Pages/QualifyingProgram/Components/ProgramComponent";
import QualifyingProgram from "../Pages/QualifyingProgram/QualifyingProgram";
import CreatAccount from "../Pages/Registers/CreatAccountEmploye/CreatAccount";
import CreateAccountAll from "../Pages/Registers/CreateAccountAll/CreateAccountAll";
import ForgetPass from "../Pages/Registers/ForgetPass/ForgetPass";
import Login from "../Pages/Registers/Login/Login";
import NewPass from "../Pages/Registers/NewPass/NewPass";
import RadioBtn from "../Pages/Registers/RadioBtn/RadioBtn";
import Register from "../Pages/Registers/Register";
import Verification from "../Pages/Registers/Verification/Verification";
import AllCenterCourses from "../Pages/TrainingCenters/pages/AllCourses/AllCourses";
import CourseDettails from "../Pages/TrainingCenters/pages/CourseDettails/CourseDettails";
import EnrollmentApplications from "../Pages/TrainingCenters/pages/EnrollmentApplications/EnrollmentApplications.js";
import HomeCenter from "../Pages/TrainingCenters/pages/Home/HomeCenter";
import OutletCenter from "../Pages/TrainingCenters/pages/Outlet/Outlet";
import TraningCenterRegister from "../Pages/TrainingCenters/pages/Register/TraningCenterRegister";
import AllCourses from "../Pages/UserAccount/Pages/AllCourses/AllCourses";
import AllJobs from "../Pages/UserAccount/Pages/AllJobs/AllJobs";
import Cv from "../Pages/UserAccount/Pages/Cv/Cv";
import FavoriteCourses from "../Pages/UserAccount/Pages/FavoriteCourses/FavoriteCourses";
import FavoriteJobs from "../Pages/UserAccount/Pages/FavoriteJobs/FavoriteJobs";
import JobApplication from "../Pages/UserAccount/Pages/JobApplication";
import JoinCourse from "../Pages/UserAccount/Pages/JoinCourse/JoinCourse";
import MainCourseDetails from "../Pages/UserAccount/Pages/MainCourseDetails/MainCourseDetails";
import MyExperienceData from "../Pages/UserAccount/Pages/MyExperienceData";
import MyLearningData from "../Pages/UserAccount/Pages/MyLearningData";
import MyPersonalData from "../Pages/UserAccount/Pages/MyPersonalData";
import Route from "../Pages/UserAccount/Pages/Route";
import StillDontQualify from "../Pages/UserAccount/Pages/StillDontQualify/StillDontQualify";
import Welcom from "../Pages/UserAccount/Pages/Welcom/Welcom";
import UserAccount from "../Pages/UserAccount/UserAccount";
import ConsaltantDetails from "../Pages/whoUs/ConsaltantDetails/ConsaltantDetails";
import WhoUs from "../Pages/whoUs/WhoUs";
import MyApplications from "../Pages/UserAccount/Pages/MyApplications/MyApplications";
import CertificateDone from "../Pages/UserAccount/Pages/Certificate/CertificateDone";
import UpdateMyData from "../Pages/Company/Register/UpdateMyData";
import JobApplicationEdit from "../Pages/UserAccount/Pages/JobApplicationEdit";
import EditAds from "../Pages/Company/EditAdds/EditAds";
import SearchInEmployeDetails from "../Pages/Company/SearchInEmployeDetails/SearchInEmployeDetails";
import CompanyMainRegister from "../Pages/Company/Register/CompanyRegister";
import ProjectData from "../Pages/BusinessPioneer/ProjectData";
import OutletBusnissPioneer from "../Pages/BusinessPioneer/Outlet/OutletBusnissPioneer";
import EditData from "../Pages/BusinessPioneer/EditData/EditData";
import AllProjectes from "../Pages/BusinessPioneer/AllProjectes/AllProjectes";
import EditProjects from "../Pages/BusinessPioneer/EditProjects/EditProjects";
import EditCourses from "../Pages/TrainingCenters/pages/EditCourses/EditCourses";
import PublicInfo from "../Pages/PublicInfo/PublicInfo";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Applicants from "../Pages/Company/Applicants/Applicants";
import ConsultantsRecommendations from "../Pages/UserAccount/Pages/ConsultantsRecommendations/ConsultantsRecommendations";
export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "whoUs",
        element: <WhoUs />,
      },
      {
        path: "consaltant-details/:Id",
        element: <ConsaltantDetails />,
      },
      {
        path: "jobs",
        element: <JobFilter />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "courses/:Id",
        element: (
          <div className="py-5">
            <div className="container">
              <MainCourseDetails />
            </div>
          </div>
        ),
      },
      {
        path: "all-article",
        element: <AllArticles />,
      },
      {
        path: "all-article/details/:id",
        element: <ArticleDetails />,
      },
      {
        path: "job-details/:Id",
        element: <JobDetails />,
      },
      {
        path: "program",
        element: <QualifyingProgram />,
      },
      {
        path: "employ-data",
        element: <Employe />,
        children: [
          {
            path: "",
            element: <PersonalData />,
          },
          {
            path: "learn",
            element: <LearningData />,
          },
          {
            path: "experience",
            element: <PreviousExperience />,
          },
        ],
      },
      {
        path: "job_seeker",
        element: <UserAccount />,
        children: [
          {
            path: "",
            element: <Welcom />,
          },
          {
            path: "dont",
            element: <StillDontQualify />,
          },
          {
            path: "prog",
            element: <ProgramComponent padding={true} />,
          },
          {
            path: "certificate",
            element: <CertificateDone />,
          },
          {
            path: "recommendations",
            element: <ConsultantsRecommendations />,
          },
          {
            path: "my-data",
            element: <Route />,
            children: [
              {
                path: "",
                element: <MyPersonalData />,
              },
              {
                path: "my-learn-data",
                element: <MyLearningData />,
              },
              {
                path: "my-experiens",
                element: <MyExperienceData />,
              },
            ],
          },
          {
            path: "cv",
            element: <Cv />,
          },
          {
            path: "job-application",
            element: (
              <JobApplication
                type="seeker"
                route="/job-seeker/requests-jobs/create"
              />
            ),
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
          },
          {
            path: "favorite-jobs",
            element: <FavoriteJobs />,
          },
          {
            path: "my-requestes",
            element: <MyApplications />,
          },
          {
            path: "my-requestes/details/:Id",
            element: (
              <MainJobDetails
                linkRoute="/job-seeker/requests-jobs/"
                routeEdit="/job_seeker/my-requestes/edit/"
                ButoonBottom={false}
              />
            ),
          },
          {
            path: "my-requestes/edit/:Id",
            element: (
              <div className="container">
                <JobApplicationEdit
                  type="seeker"
                  route="/job-seeker/requests-jobs/update/"
                  routEditGet="/job-seeker/requests-jobs/"
                />
              </div>
            ),
          },
          {
            path: "all-courses",
            element: <AllCourses />,
          },
          {
            path: "favorite-courses",
            element: <FavoriteCourses />,
          },
          {
            path: "interview",
            element: <JoinCourse />,
          },
          {
            path: "course-detail/:Id",
            element: <MainCourseDetails />,
          },
          {
            path: "job-detail/:Id",
            element: <MainJobDetails linkRoute="/job-seeker/jobs/" />,
          },
        ],
      },
      {
        path: "cv",
        element: <CvPage />,
      },
      {
        path: "company",
        children: [
          {
            path: "",
            element: <CompanyMainRegister />,
          },
          {
            path: "add-ads-job",
            element: (
              <div className="container">
                <JobApplication type="company" route="/companies/jobs/create" />
              </div>
            ),
          },
          {
            path: "ads-job-edit/:Id",
            element: (
              <div className="container">
                <JobApplicationEdit
                  type="company"
                  route="/companies/jobs/update/"
                  routEditGet="/companies/jobs/"
                />
              </div>
            ),
          },
          {
            path: "dashboard",
            element: <OutletCompany />,
            children: [
              {
                path: "",
                element: (
                  <WelcomYourCompany api="/companies/jobs" type="welcome" />
                ),
              },
              {
                path: "job-detail/:Id",
                element: <JobCompanyDetails />,
              },
              {
                path: "all-jobs",
                element: (
                  <WelcomYourCompany
                    api="/companies/jobs/approved"
                    type="approved"
                  />
                ),
              },
              {
                path: "applicants/:Id",
                element: (
                  <Applicants
                    url="/companies/jobs/users/applicants/"
                    type="للوظيفة"
                    details="/company/dashboard/employe-approved-details/"
                    api="/companies/jobs/users/approved/user/"
                    typeApi="/job/"
                  />
                ),
              },
              {
                path: "search",
                element: <SearchInEmployes />,
              },
              {
                path: "search-details/:Id",
                element: <SearchInEmployeDetails />,
              },
              {
                path: "employe-details/:Id",
                element: (
                  <EmployDetails
                    approved={false}
                    apiType="/job/"
                    apiApproved="/companies/jobs/users/approved/user/"
                    apiGet="/companies/jobs/users/"
                  />
                ),
              },
              {
                path: "employe-approved-details/:Id/:JobId",
                element: (
                  <EmployDetails
                    approved={true}
                    apiType="/job/"
                    apiApproved="/companies/jobs/users/approved/user/"
                    apiGet="/companies/jobs/users/"
                  />
                ),
              },
              {
                path: "job-app",
                element: <JobsApplication />,
              },
              {
                path: "my-data",
                element: (
                  <UpdateMyData
                    type="company"
                    linkGetData="/companies/data"
                    linkSendData="/companies/data/create-or-update"
                    linkRoute="/company/dashboard/"
                  />
                ),
              },
              {
                path: "add-ads",
                element: <AddAds type="job" api="/companies/ads/create" />,
              },
              {
                path: "ads",
                element: (
                  <PlatformAds
                    addAdsLink="/company/dashboard/add-ads"
                    api="/companies/ads"
                    linkEditRoute="/company/dashboard/ads-edit/"
                    deleteLink="/companies/ads/delete/"
                  />
                ),
              },
              {
                path: "ads-edit/:Id",
                element: (
                  <EditAds
                    type="job"
                    api="/companies/ads/update/"
                    apiShow="/companies/ads/"
                  />
                ),
              },
            ],
          },
        ],
      },
      {
        path: "institute",
        children: [
          {
            path: "",
            element: <TraningCenterRegister />,
          },
          {
            path: "add-course",
            element: (
              <div className="container">
                <JobApplication
                  type="institute"
                  route="/institutes/courses/create"
                />
              </div>
            ),
          },
          {
            path: "dashboard",
            element: <OutletCenter />,
            children: [
              {
                path: "",
                element: <HomeCenter linkGetData="/institutes/courses" />,
              },
              {
                path: "my-data",
                element: (
                  <UpdateMyData
                    type="center"
                    linkGetData="/institutes/data"
                    linkSendData="/institutes/data/create-or-update"
                    linkRoute="/institute/dashboard/"
                  />
                ),
              },
              {
                path: "all-courses",
                element: <AllCenterCourses />,
              },
              {
                path: "courses-approved",
                element: (
                  <HomeCenter linkGetData="/institutes/courses/approved" />
                ),
              },
              {
                path: "add-course",
                element: (
                  <JobApplication
                    type="institute"
                    route="/institutes/courses/create"
                  />
                ),
              },
              // طلبات الالتحاق
              {
                path: "enrollment",
                element: <EnrollmentApplications />,
              },
              {
                path: "course-detail/:Id",
                element: <CourseDettails />,
              },
              {
                path: "applicants/:Id",
                element: (
                  <Applicants
                    url="/institutes/courses/users/applicants/"
                    type="للدورة"
                    details="/institute/dashboard/employe-details/"
                    api="/institutes/courses/users/approved/user/"
                    typeApi="/course/"
                  />
                ),
              },
              {
                path: "employe-details/:Id/:JobId",
                element: (
                  <EmployDetails
                    approved={true}
                    apiType="/course/"
                    apiApproved="/institutes/courses/users/approved/user/"
                    apiGet="/institutes/courses/users/"
                  />
                ),
              },
              {
                path: "ads-course-edit/:Id",
                element: <EditCourses />,
              },
              {
                path: "add-ads",
                element: <AddAds type="course" api="/institutes/ads/create" />,
              },
              {
                path: "ads",
                element: (
                  <PlatformAds
                    addAdsLink="/institute/dashboard/add-ads"
                    api="/institutes/ads"
                    linkEditRoute="/institute/dashboard/ads-edit/"
                    deleteLink="/institutes/ads/delete/"
                  />
                ),
              },
              {
                path: "ads-edit/:Id",
                element: (
                  <EditAds
                    type="course"
                    api="/institutes/ads/update/"
                    apiShow="/institutes/ads/"
                  />
                ),
              },
            ],
          },
        ],
      },
      {
        path: "business_pioneer",
        children: [
          {
            path: "",
            element: <PioneerPersonalData />,
          },

          {
            path: "dashboard",
            element: <OutletBusnissPioneer />,
            children: [
              {
                path: "",
                element: <AllProjectes />,
              },
              {
                path: "my-data",
                element: <EditData />,
              },
              {
                path: "add-project",
                element: <ProjectData />,
              },
              {
                path: "project-edit/:Id",
                element: <EditProjects />,
              },
            ],
          },
        ],
      },
      {
        path: "genral",
        children: [
          {
            path: "",
            element: <PublicInfo type="about" />,
          },
          {
            path: "policy",
            element: <PublicInfo type="policy" />,
          },
          {
            path: "terms",
            element: <PublicInfo type="terms" />,
          },
        ],
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
    ],
    errorElement: <ErrorRoute />,
  },
  {
    path: "register",
    element: <Register />,
    children: [
      {
        path: "",
        element: <RadioBtn />,
      },
      {
        path: "job_seeker",
        element: <CreatAccount />,
      },
      {
        path: "all-create",
        element: <CreateAccountAll />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "recover",
        element: <ForgetPass />,
      },
      {
        path: "verify",
        element: (
          <Verification
            route="/public/password/reset/check-single-code"
            type="register"
          />
        ),
      },
      {
        path: "newpassword",
        element: <NewPass />,
      },
    ],
  },
  {
    path: "verify",
    element: <Verification route="/public/checkcode" />,
  },
  {
    path: "route-error",
    element: <ErrorRoute />,
  },
]);
