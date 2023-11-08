// import { ReactComponent as Android } from "../assest/android.svg";
// import { ReactComponent as Apple } from "../assest/apple.svg";
import { trans } from "../../Navbar/Navbar";
import StoreImage from "../assest/appstore.png";

function Store() {
  return (
    <div className="footer-store d-flex flex-column align-items-center align-items-md-end">
      <div className="d-flex flex-column align-items-center align-items-md-start">
        <p className="fs-16-700 mb-4 fit-content">{trans("footer.app")}</p>
        <div className="store-image d-flex fit-content">
          {/* <div className="andriod d-flex align-items-center gap-3 bg-black text-white r-10 py-2 px-4">
          <div className="text">
            <span>GET IT ON</span>
            <p>Google Play</p>
          </div>
          <div className="icon">
            <Android />
          </div>
        </div>
        <div className="andriod d-flex align-items-center gap-3 bg-black text-white r-10 py-2 px-4">
          <div className="text">
            <span>GET IT ON</span>
            <p>Google Play</p>
          </div>
          <div className="icon">
            <Apple />
          </div>
        </div> */}
          <img
            className="mx-auto d-block m-md-0"
            src={StoreImage}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Store;
