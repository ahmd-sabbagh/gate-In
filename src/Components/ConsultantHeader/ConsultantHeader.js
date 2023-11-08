import "./ConsultantHeader.css";
function ConsultantHeader(props) {
  return (
    <div className="ConsultantHeader py-5">
      <div className="container" data-aos="fade-up" data-aos-duration="1000">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6">
            <div className="text d-flex flex-column gap-2">
              <h3 className="fs-32-700">{props.Data.name}</h3>
              {props.Data?.qualification && (
                <p className="text-color fs-16-400">
                  {props.Data.qualification}
                </p>
              )}
              <p className="fs-16-400">{props.Data.title}</p>
            </div>
            <div className="description mt-4 position-relative">
              <p className="fs-20-400">{props.Data.description}</p>
              <p className="fs-20-400 mt-4">{props.Data.description2}</p>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            {/* <img className="d-block mx-auto" src={props.Data.image} alt="" /> */}
            <div
              className="bg-image r-10"
              style={{
                backgroundImage: `url(${props.Data.image})`,
                height: "300px",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultantHeader;
