import ConsultantPersonCart from "../../../Components/ConsultantPersonCart/ConsultantPersonCart";

function AdvisorsTeam(props) {
  return (
    <div className="AdvisorsTeam py-5">
      <div className="container" data-aos="fade-up" data-aos-duration="1000">
        <h3 className="fs-32-700 mb-5">{props.tittle}</h3>
        <div className="row g-4">
          {props.Data.map((info) => (
            <div className="col-12 col-sm-6 col-lg-4" key={info.id}>
              <ConsultantPersonCart
                id={info.id}
                image={info.image}
                name={info.name}
                title={info.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdvisorsTeam;
