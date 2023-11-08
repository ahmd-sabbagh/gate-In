import { NavLink } from "react-router-dom";
import { trans } from "../../../Components/Navbar/Navbar";

function Header() {
  return (
    <div className="Header-data bg-white r-10 p-4">
      <h3 className="fs-24-600 mb-4">
        {trans("my_personal_data_user.My_personal_data")}
      </h3>
      <div className="links mx-auto d-flex flex-column flex-md-row gap-3 align-items-center .">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/job_seeker/my-data/"
        >
          {trans("my_personal_data_user.the_personal_data")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="my-learn-data"
        >
          {trans("my_personal_data_user.the_lerning_data")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="my-experiens"
        >
          {trans("my_personal_data_user.exp")}
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
