import ConsultantHeader from "../../Components/ConsultantHeader/ConsultantHeader.js";
import { trans } from "../../Components/Navbar/Navbar.js";
import AdvisorsTeam from "./AdvisorsTeam/AdvisorsTeam.js";
import HowStart from "./HowStart/HowStart";
import "./WhoUs.css";
import MeetingImage from "./Meeting.png";
import Person from "./Assets/Person.png";
import axios from "axios";
import { basedUrl } from "../../Api/Apis.js";
import { useNavigate } from "react-router-dom";
import { ErrorComponent } from "../../Others/Error.js";
import { useEffect } from "react";
import { useState } from "react";
const Data = [
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

const consaltantHeader = {
  name: trans("whoUs.name"),
  qualification: trans("whoUs.qualification"),
  title: trans("whoUs.desc"),
  description: trans("whoUs.desc1"),
  description2: trans("whoUs.desc2"),
  image: MeetingImage,
};

function WhoUs() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // State
  const [advisor,setAdvisor] = useState([])
  const getAdvisors = () => {
    axios
      .get(`${basedUrl}/public/data/advisors`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({data}) => {
        setAdvisor(data.data)
      })
      .catch((error) => {
        ErrorComponent(error, navigate);
      });
  };
  useEffect(() => {
    getAdvisors();
  }, []);
  return (
    <div className="WhoUs">
      <ConsultantHeader Data={consaltantHeader} />
      <HowStart />
      <AdvisorsTeam Data={advisor} tittle={trans("consultant.tittle1")} />
    </div>
  );
}

export default WhoUs;
