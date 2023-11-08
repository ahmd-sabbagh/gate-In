import { Link } from "react-router-dom";

function ConsultantPersonCart(props) {
  return (
    <Link
      to={`/consaltant-details/${props.id}`}
      className="ConsultantPersonCart overflow-hidden border r-10 d-block text-dark"
    >
      <div
        className="image bg-image"
        style={{
          width: "100%",
          height: "153px",
          backgroundImage: `url(${props.image})`,
        }}
      ></div>
      <div className="text text-center p-4">
        <h3 className="name fs-24-500 mb-3">{props.name}</h3>
        <p className="tittle fs-16-500 text-color">{props.title}</p>
      </div>
    </Link>
  );
}

export default ConsultantPersonCart;
