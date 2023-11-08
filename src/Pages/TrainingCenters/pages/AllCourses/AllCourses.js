import { useState } from "react";
import WelcomNoAdJobs from "../../../../Components/WelcomNoAdJobs/WelcomNoAdJobs";
import Welcom from "../Home/Welcom";

// WelcomNoAdJobs

const WelcomData = {
  header: "أهلا بك, نيوب للتكنولوجيا",
  startNow: "ابدأ الآن بوضع اول أعلان للدورات واحصل على المتدربين ",
  hent: "يمكنك الآن عمل اعلان جديد بوضع الدورة التى تريد عرضها للمتدربين  واستقبل الطلبات  من المتدربين ",
  linkTitle: "اضافة دورة جديدة",
  linkTo: "/company/add-ads-job",
};

function AllCenterCourses() {
  // State Data Request Fack
  const [Fack, setFack] = useState(true);
  // State Data Request Fack
  return (
    <div className="mt-4">
      {Fack ? <Welcom api='' /> : <WelcomNoAdJobs {...WelcomData} />}
    </div>
  );
}

export default AllCenterCourses;
