import './all.css'
import { Link } from "react-router-dom";

function Btn(props) {
  return <Link className='register-btn text-center d-block' to={props.path}>{props.text}</Link>;
}

export default Btn;
