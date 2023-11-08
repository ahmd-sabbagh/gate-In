import { Link } from "react-router-dom";

function RoundBtn(props) {
  return (
    <Link to={props.link} className={`${props.btn} RoundBtn d-block`}>
      {props.text}
    </Link>
  );
}

export default RoundBtn;
