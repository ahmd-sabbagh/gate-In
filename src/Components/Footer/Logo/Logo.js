import { Link } from "react-router-dom";
import Logoimg from "../../../Assets/Images/mainLogo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useRecoilState } from "recoil";
import { settingLinks } from "../../../RecoilState/RepeatFormData";
import { trans } from "../../Navbar/Navbar";

function Logo() {
  const [rLinks, setRlinks] = useRecoilState(settingLinks);
  return (
    <div className="footer-logo d-flex flex-column">
      <div className="logo-image mx-auto" style={{ maxWidth: "128px" }}>
        <img className="mx-auto d-block" src={Logoimg} alt="" />
      </div>
      <div className="text-center mt-2 text-main">{trans("footer.title")}</div>
      <p className="mt-4">{trans("home.store.disc")}</p>
      <div className="social-icons mt-4 d-flex align-items-center gap-3 justify-content-center justify-content-sm-start">
        <Link className="icon flex-c" to={rLinks.facebook_link} target="_blank">
          <FaFacebookF />
        </Link>
        <Link className="icon flex-c" to={rLinks.twitter_link} target="_blank">
          <FaTwitter />
        </Link>
        <Link
          className="icon flex-c"
          to={rLinks.instagram_link}
          target="_blank"
        >
          <FaInstagram />
        </Link>
        <Link className="icon flex-c" to={rLinks.linkedin_link} target="_blank">
          <FaLinkedinIn />
        </Link>
      </div>
    </div>
  );
}

export default Logo;
