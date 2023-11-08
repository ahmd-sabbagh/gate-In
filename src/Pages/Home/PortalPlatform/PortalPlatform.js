import "./PortalPlatform.css";
// Svg
import { ReactComponent as ProgIcon } from "./Assets/Prog.svg";
import { ReactComponent as Employes } from "./Assets/Employ.svg";
import { ReactComponent as Search } from "./Assets/Search.svg";
// Svg
import Section from "./Components/Section";
import { FaHandsHelping } from "react-icons/fa";
import { trans } from "../../../Components/Navbar/Navbar";
function PortalPlatform() {
  // Data
  const PortalPlatformData = [
    {
      id: "1",
      icon: <ProgIcon />,
      head: trans("home.platform.card_title1"),
      desc: trans("home.platform.card_desc1"),
    },
    {
      id: "2",
      icon: <Employes />,
      head: trans("home.platform.card_title2"),
      desc: trans("home.platform.card_desc2"),
    },
    {
      id: "3",
      icon: <Search />,
      head: trans("home.platform.card_title3"),
      desc: trans("home.platform.card_desc3"),
    },
    {
      id: "4",
      icon: <FaHandsHelping style={{ fontSize: "34px", color: "#018543" }} />,
      head: trans("home.platform.card_title4"),
      desc: trans("home.platform.card_desc4"),
    },
  ];
  // Data
  return (
    <div className="PortalPlatform py-5">
      <div className="container" data-aos="fade-up" data-aos-duration="1000">
        {/* Start Header */}
        <div className="header text-center mx-auto mb-5">
          <h3 className="fs-32-700 mb-3">{trans("home.platform.title")}</h3>
          <p className="fs-20-500 text-center text-color">
            {trans("home.platform.desc")}
          </p>
        </div>
        {/* End Header */}
        <div className="row g-3 justify-content-center">
          {PortalPlatformData.map((section) => (
            <div className=" col-12 col-md-6 col-lg-3" key={section.id}>
              <Section
                icon={section.icon}
                head={section.head}
                desc={section.desc}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PortalPlatform;
