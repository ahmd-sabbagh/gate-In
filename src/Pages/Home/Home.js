import React from "react";
import Application from "./Application/Application.js";
import Articles from "./Articles/Articles.js";
import Bosses from "./Bosses/Bosses.js";
import EducationProgra from "./EducationProgramme/EducationProgra.js";
import Landing from "./Landing/Landing";
import PortalPlatform from "./PortalPlatform/PortalPlatform";
import PremiumServices from "./PremiumServices/PremiumServices.js";
import SearchWork from "./SearchWork/SearchWork.js";
import Slide from "./Slider/Slider.js";

function Home() { 
  return (
    <div className="home-page">
      <Landing />
      <PortalPlatform />
      <SearchWork />
      <EducationProgra />
      {/* <PremiumServices /> */}
      <Bosses />
      <Articles />
      <Slide />
      <Application />
    </div>
  );
}

export default Home;
