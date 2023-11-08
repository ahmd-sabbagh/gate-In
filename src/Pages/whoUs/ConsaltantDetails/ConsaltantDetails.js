import ConsultantHeader from "../../../Components/ConsultantHeader/ConsultantHeader";
import AdvisorsTeam from "../AdvisorsTeam/AdvisorsTeam";
import Certificate from "./Certificate";
import "./ConsaltantDetails.css";
import { trans } from "../../../Components/Navbar/Navbar";

import Person from "../Assets/Person.png";
import MeetingImage from "./Meeting.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { basedUrl } from "../../../Api/Apis";
import { ErrorComponent } from "../../../Others/Error";

const DataTeam = [
  {
    id: 1,
    image: Person,
    name: trans("consultant.name"),
    tittle: trans("consultant.desc"),
  },
  {
    id: 2,
    image: Person,
    name: trans("consultant.name"),
    tittle: trans("consultant.desc"),
  },
  {
    id: 3,
    image: Person,
    name: trans("consultant.name"),
    tittle: trans("consultant.desc"),
  },
];

// const Data = [
//   {
//     tittle: "شهادة فى الادراة العامة للشركات والتطويرات ",
//     desc: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث ",
//   },
//   {
//     tittle: "شهادة فى الادراة العامة للشركات والتطويرات ",
//     desc: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث ",
//   },
//   {
//     tittle: "شهادة فى الادراة العامة للشركات والتطويرات ",
//     desc: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث ",
//   },
//   {
//     tittle: "شهادة فى الادراة العامة للشركات والتطويرات ",
//     desc: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث ",
//   },
//   {
//     tittle: "شهادة فى الادراة العامة للشركات والتطويرات ",
//     desc: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث ",
//   },
//   {
//     tittle: "شهادة فى الادراة العامة للشركات والتطويرات ",
//     desc: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث ",
//   },
// ];

const consaltantHeader = {
  name: trans("whoUs.name"),
  qualification: trans("whoUs.qualification"),
  title: trans("whoUs.desc"),
  description: trans("whoUs.desc1"),
  description2: trans("whoUs.desc2"),
  image: MeetingImage,
};
function ConsaltantDetails() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const prams = useParams();
  // State
  const [advisorInfo, setAdvisorInfo] = useState();
  const [loader, setLoader] = useState(false);
  const getAdvisorsInfo = () => {
    axios
      .get(`${basedUrl}/public/data/advisors/${prams.Id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setAdvisorInfo(data.data);
        setLoader(true);
      })
      .catch((error) => {
        ErrorComponent(error, navigate);
      });
  };
  useEffect(() => {
    getAdvisorsInfo();
  }, [prams.Id]);
  return (
    <div className="ConsaltantDetails">
      {loader ? (
        <>
          <ConsultantHeader Data={advisorInfo?.data} />
          {/* <Certificate Data={Data} /> */}
          <AdvisorsTeam
            Data={advisorInfo.advisors}
            tittle={trans("recommendations.more")}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ConsaltantDetails;
