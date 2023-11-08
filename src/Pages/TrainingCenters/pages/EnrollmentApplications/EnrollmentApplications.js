import EmployCard from "../../../../Components/EmployCard/EmployCard";

const NumberFakeArray = [1, 2, 3];
function EnrollmentApplications() {
  return (
    <div className=" bg-white p-4 r-10 full-height">
        <h3 className="fs-24-700 mb-4">طلبات الالتحاق</h3>
      <div className="row g-4">
        {NumberFakeArray.map((idx) => (
          <div className="col-12 col-lg-6" key={idx}>
            <EmployCard type="courses" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnrollmentApplications;
