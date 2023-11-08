import "./Footer.css";
import Links from "./Links/Links";
import Logo from "./Logo/Logo";
import Store from "./Store/Store";
function Footer() {
  return (
    <div className="Footer py-5">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-sm-6 col-md-4">
            <Logo />
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <Links />
          </div>
          <div className="col-12 col-md-4">
            <Store />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
