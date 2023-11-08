import "./ConsaltantDetails.css";
import { trans } from "../../../Components/Navbar/Navbar";

function Certificate(props) {
  return (
    <div className="Certificate py-5">
      <div className="container">
        <div className="head mb-5">
          <h3 className="fs-32-700 text-center">
            {trans("consaltant-details.tittle")}
          </h3>
          <p className="fs-24-400 text-color text-center mt-3">
            {trans("consaltant-details.desc")}
          </p>
        </div>
        <div className="content">
          <div className="row g-4">
            {props.Data.map((item, idx) => (
              <div className="col-12 col-sm-6 col-lg-4" key={idx}>
                <div className="cont p-3 border r-10">
                  <h4 className=" fs-24-500 text-center">{item.tittle}</h4>
                  <p className=" fs-16-400 text-color text-center mt-3">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
