import React from "react";
import MainJobDetails from "../../../Components/MainJobDetails/MainJobDetails";
import { useState } from "react";
import ProfileEmployeImage from "../../../Components/ProfileEmployeImage/ProfileEmployeImage";
import { SlCallEnd, SlLocationPin } from "react-icons/sl";
import { HiOutlineMail } from "react-icons/hi";
import { saveAs } from "file-saver";

function SearchInEmployeDetails() {
  const [data, setUser] = useState();
  const handleDownload = (url, name) => {
    saveAs(url, `${name}-cv`);
  };
  return (
    <div className="SearchInEmployeDetails">
      <div className="d-flex full-width bg-white p-4 r-10 mb-4 justify-content-between">
        <div className="top-details d-flex align-items-start flex-column flex-md-row gap-4">
          <ProfileEmployeImage
            image={data?.image}
            status={data?.course_success}
          />
          <div className="d-flex flex-column gap-1 ">
            <h4 className=" fs-24-500">{data?.name}</h4>
            <p className=" fs-16-400">{data?.major}</p>
            <div className="d-flex gap-3 flex-column flex-lg-row">
              <div className="d-flex gap-2 ">
                <div className="icon main-color">
                  <SlCallEnd />
                </div>
                {data?.mobile}
              </div>
              {data?.email && (
                <div className="d-flex gap-2">
                  <div className="icon main-color">
                    <HiOutlineMail />
                  </div>
                  {data?.email}
                </div>
              )}

              <div className="d-flex gap-2">
                <div className="icon main-color">
                  <SlLocationPin />
                </div>
                {`${data?.province},${data?.city}`}
              </div>
            </div>
          </div>
        </div>
        {data?.cv && (
          <div
            className="fit-height r-10 border-none bg-main text-white p-3 d-block text-center pointer"
            style={{ minWidth: "130px" }}
            onClick={() => {
              handleDownload(data.cv, data.name);
            }}
          >
            تحميل السيرة الذاتية
          </div>
        )}
      </div>
      <MainJobDetails
        type="company"
        ButoonBottom={false}
        linkRoute="/companies/jobs/requests/"
        prop={setUser}
      />
    </div>
  );
}

export default SearchInEmployeDetails;
