import { Outlet } from "react-router-dom";

function OutletData() { 
  return (
    <div className="OutletData py-4" style={{ backgroundColor: "whitesmoke" }}>
      <div className="container">
        <h3 className=" fs-32-600">استكمال التسجيل</h3>
        <div className="header"></div>
        {/* Personal Data */}
        <div className="personal-data p-4 r-10 bg-white mt-4">
          <Outlet />
        </div>
      </div>
    </div> 
  );
}

export default OutletData;
