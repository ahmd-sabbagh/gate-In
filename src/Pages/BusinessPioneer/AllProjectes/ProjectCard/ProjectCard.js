import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";
import { trans } from "../../../../Components/Navbar/Navbar";
function ProjectCard({ item, link }) {
  return (
    <div className="ProjectCard full-height d-flex flex-column gap-2 justify-content-between p-4 r-10">
      <h6>{item.title}</h6>

      <p className="fs-14-400  color-main ">
        {item.description.length > 100
          ? `${item.description.slice(0, 90)}...`
          : item.description}
      </p>
      <div className="project-type d-flex align-items-center gap-2 border-bottom pb-3">
        <span className="red-color">{item.type_project}</span>
        <span className="circle-type bg-red"></span>
        <span>{item.nature_projects}</span>
      </div>
      <div className="buttons mt-4">
        <Link
          className="d-block bg-main text-white r-10 text-center py-2"
          to={link}
        >
          {trans("business_pioneer.view_project_details")}
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
