import React from "react";
import { saveAs } from "file-saver";
import NotFound from "../../../../Components/NotFound/NotFound";
import { trans } from "../../../../Components/Navbar/Navbar";

function CertificateDone() {
  const certificate = JSON.parse(localStorage.getItem("user"))?.certificate;
  // Function Download Image
  const handleDownload = () => {
    let url = certificate;
    saveAs(url, "certificate.jpg");
  };
  // Function Download Image
  return (
    <div
      className={`bg-white p-4 r-10 d-flex flex-column gap-4 `}
      style={{ minHeight: "100%" }}
    >
      {certificate !== null ? (
        <>
          <div
            className="image"
            style={{ maxWidth: "100%", minHeight: "100%" }}
          >
            <img src={certificate} alt="" />
          </div>
          <button
            onClick={() => {
              handleDownload();
            }}
            className="resetBtn d-block px-5 py-2 mx-auto bg-main r-10 text-white fs-20-500"
          >
            {trans("user_profile.download")}
          </button>
        </>
      ) : (
        <NotFound
          link="/job_seeker/prog"
          btnText="اشترك الان"
          text="انت غير مشترك في البرنامج التأهيلي أو ربما لم تجتاز الدورة"
        />
      )}
    </div>
  );
}

export default CertificateDone;
