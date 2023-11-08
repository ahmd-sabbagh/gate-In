/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import AOS from "aos"; 
import { useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { apiHeaders, basedUrl } from "./Api/Apis";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Loader from "./Components/Loader/Loader";
import Navbar from "./Components/Navbar/Navbar";
import Pusher from "pusher-js";

import {
  repeatCoins,
  repeatCountries,
  repeatLanguage,
  repeatMajors,
  repeatNationalities,
  repeatPersonalSiklss,
  repeatTipsProject,
  repeatTypesEducation,
  settingLinks,
} from "./RecoilState/RepeatFormData";
import ScrollToTop from "./ScrollToTopRouter/ScrollToTopRouter";
import { NotificationCount } from "./RecoilState/Notifications/NotificationCount";
import { TextNotification } from "./Others/Error";

function App() {
  const [count, setCount] = useRecoilState(NotificationCount);
  // Pusher
  const user = JSON.parse(localStorage.getItem("user"));
  const pusher = new Pusher("4a363effc03c8f7f6775", {
    cluster: "eu",
  });
  const pusherFunction = () => {
    if (user) {
      const channel = pusher.subscribe(`user-data-${user?.id}`);
      channel.bind("user", (user_realtime) => {
        var data = user_realtime.data;
        data.token = user.token;
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data));
      });
      channel.bind("notify", (notify) => {
        setCount(true);
        TextNotification(notify.message);
      });
    }
  };
  //Pusher
  // Language
  const language = window.localStorage.i18nextLng;
  // State Loder
  const [loder, setLoder] = useState(false);
  // State Loder
  // Get All Repeat Form Data
  // States
  const [rl, setRlanguage] = useRecoilState(repeatLanguage);
  const [rm, setRmajors] = useRecoilState(repeatMajors);
  const [rn, setRnationalities] = useRecoilState(repeatNationalities);
  const [rp, setRcountries] = useRecoilState(repeatCountries);
  const [rt, setRtypesEducation] = useRecoilState(repeatTypesEducation);
  const [rs, setRPersonalSiklls] = useRecoilState(repeatPersonalSiklss);
  const [rTp, setRtipsProject] = useRecoilState(repeatTipsProject);
  const [rCoins, setRcoins] = useRecoilState(repeatCoins);
  const [rLinks, setRlinks] = useRecoilState(settingLinks);
  // States
  // Get Reapet Data
  const getReapetData = () => {
    axios
      .get(`${basedUrl}/public/data/all`, apiHeaders)
      .then(({ data }) => {
        setRlanguage(data.data.languages);
        setRmajors(data.data.majors);
        setRnationalities(data.data.nationalities);
        setRcountries(data.data.countries);
        setRtypesEducation(data.data.types_education);
        setRPersonalSiklls(data.data.personal_skills);
        setRtipsProject(data.data.types_project);
        setRcoins(data.data.currency);
        setRlinks(data.data.settings);
        setLoder(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Get Reapet Data
  useEffect(() => {
    pusherFunction();
    getReapetData();
    AOS.init();
  }, []);
  // Get All Repeat Form Data
  return (
    <>
      {loder ? (
        <div
          className="App position-relative"
          style={{ minHeight: "100vh" }}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <ScrollToTop />
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
