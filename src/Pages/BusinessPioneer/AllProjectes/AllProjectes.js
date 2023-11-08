import axios from "axios";
import React from "react";
import { basedUrl } from "../../../Api/Apis";
import { ErrorComponent, SuccsesComponent } from "../../../Others/Error";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import WelcomNoAdJobs from "../../../Components/WelcomNoAdJobs/WelcomNoAdJobs";
import ProjectCard from "./ProjectCard/ProjectCard";
import { trans } from "../../../Components/Navbar/Navbar";

// WelcomNoAdJobs
const WelcomData = {
  header: trans("business_pioneer.WelcomData.header"),
  startNow: trans("business_pioneer.WelcomData.startNow"),
  hent: trans("business_pioneer.WelcomData.hent"),
  linkTitle: trans("business_pioneer.WelcomData.linkTitle"),
  linkTo: "/business_pioneer/dashboard/add-project",
};

function AllProjectes() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigat = useNavigate();
  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get(`${basedUrl}/business-pioneer/projects`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setData(data.data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  useEffect(() => {
    if (user?.data_status !== "waiting") {
      getData();
    }
  }, []);
  return (
    <>
      {data.length > 0 ? (
        <>
          <h3 className="mb-4">{trans("business_pioneer.all_projects")}</h3>
          <div className="row g-4">
            {data?.map((item) => (
              <div className="col-12 col-md-6" key={item.id}>
                <ProjectCard
                  item={item}
                  link={`/business_pioneer/dashboard/project-edit/${item.id}`}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <WelcomNoAdJobs {...WelcomData} />
      )}
    </>
  );
}

export default AllProjectes;
