import "./EmployCard.css";
import React from "react";
import ProfileEmployeImage from "../ProfileEmployeImage/ProfileEmployeImage";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Tag from "../Tag/Tag";

const TagData = ["photoshop", "photoshop", "photoshop"];

function EmployCard({ image, name, title, type = "job" }) { 
  return (
    <div className="EmployCard p-4 r-10 border position-relative">
      {/* Like */}
      <div className="icon-like flex-c position-absolute">
        <AiOutlineHeart />
      </div>
      <div className="d-flex flex-column flex-lg-row align-items-center align-items-lg-start gap-3">
        {/* Card */}
        <ProfileEmployeImage />
        <div className="desc d-flex flex-column gap-2">
          <h4 className=" fs-20-500">أحمد ابراهيم محمد</h4>
          <p className=" fs-14-500 text-main">
            UI/UX Designer For nofal seo Company
          </p>
          {/* Status */}
          <div className="status d-flex align-items-center gap-2">
            <span className="">خبرة 3 سنوات</span>
            {type === "job" && (
              <>
                <span className="circle"></span>
                <span className="red">دوام كلى</span>
              </>
            )}

            <span className="circle"></span>
            <span className="red">منذ 3 ساعات</span>
          </div>
          {/* Tags */}
          {type === "job" && <Tag Array={TagData} />}
        </div>
      </div>
      {/* Button */}
      {type === "job" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="buttons flex-column flex-sm-row d-flex align-items-center gap-3 mt-3 justify-content-between"
        >
          <button className="resetBtn r-10 bg-main p-2 text-white full-width">
            الترشيح للوظيفة
          </button>
          <Link
            to="/company/dashboard/employe-details"
            className="resetBtn flex-c r-10 border border-main p-2 text-main full-width"
          >
            الاطلاع على بيانات الموظف
          </Link>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="mt-3"
        >
          <Link
            to=""
            className="resetBtn flex-c r-10 border border-main p-2 text-main full-width"
          >
            التواصل مع الطالب
          </Link>
        </form>
      )}
    </div>
  );
}

export default EmployCard;
