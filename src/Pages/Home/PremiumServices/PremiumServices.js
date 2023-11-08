import "./PremiumServices.css";
// Svg
import { ReactComponent as ProgIcon } from "./Assets/Prog.svg";
import { ReactComponent as Employes } from "./Assets/Employ.svg";
import { ReactComponent as Search } from "./Assets/Search.svg";
// Svg
import Section from "./Components/Section";

function PremiumServices() {
  // Data
  const PremiumServicesData = [
    {
      id: "1",
      icon: <Search />,
      head: "فرص العمل",
      desc: "منصة تم انشائها من اجلك لمساعدتك فى الحصول على الوظائف المناسبة كما يتوفر لدينا مميزات وخدمات نوفرها لك  :",
    },
    {
      id: "2",
      icon: <ProgIcon />,
      head: "التدريب",
      desc: "منصة تم انشائها من اجلك لمساعدتك فى الحصول على الوظائف المناسبة كما يتوفر لدينا مميزات وخدمات نوفرها لك  :",
    },
    {
      id: "3",
      icon: <Employes />,
      head: "التأهيل",
      desc: "منصة تم انشائها من اجلك لمساعدتك فى الحصول على الوظائف المناسبة كما يتوفر لدينا مميزات وخدمات نوفرها لك  :",
    },
  ];
  // Data
  return (
    <div className="PremiumServices py-5">
      <div className="container" data-aos="fade-up" data-aos-duration="1000">
        <div className="header text-center mx-auto">
          <h3 className="fs-32-700">تعرف على الخدمات المميزة التى نقدمها لك</h3>
          <p className="text-color fs-20-500 mt-4">
            منصة تم انشائها من اجلك لمساعدتك فى الحصول على الوظائف المناسبة كما
            يتوفر لدينا مميزات وخدمات نوفرها لك :
          </p>
        </div>
        <div className="row mt-5">
          {PremiumServicesData.map((section) => (
            <div className=" col-12 col-md-6 col-lg-4 px-5" key={section.id}>
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

export default PremiumServices;
