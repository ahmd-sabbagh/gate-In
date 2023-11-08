import "./AddAds.css";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { PopubSendData } from "../../../RecoilState/PopubSendData";
import SendDataDone from "../../../Components/SendDataDone/SendDataDone";
import { ReactComponent as Icon } from "./Assets/Frame.svg";
import { ErrorComponent, SuccsesComponent } from "../../../Others/Error";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { basedUrl } from "../../../Api/Apis";
import { useEffect } from "react";
import { trans } from "../../../Components/Navbar/Navbar";

function EditAds({ type, api, apiShow }) {
  // Popub Data
  const popubData = {
    icon: <Icon />,
    desc: trans("company_ads.done"),
    btn1To:
      type === "job" ? "/company/dashboard/ads" : "/institute/dashboard/ads",
    btn1: trans("company_ads.right"),
  };
  // Popup Data
  const prams = useParams();
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  // Done Data
  const [done, setDone] = useRecoilState(PopubSendData);
  // Done Data
  //state select image
  const [image, setImage] = useState("");
  //state select image
  // Arabic
  const [link, setLink] = useState();
  // Function Get Data
  useEffect(() => {
    axios
      .get(`${basedUrl}${apiShow}${prams.Id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setLink(data.data.data.link);
        setImage(data.data.data.image);
      })
      .catch((error) => {
        ErrorComponent(error, navigat, setErrorValidation);
      });
  }, []);
  // Function Get Data
  // Function Onsubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      image: typeof image !== "string" ? image : null,
      link,
      page: type,
    };

    try {
      const { data } = await axios.post(
        `${basedUrl}${api}${prams.Id}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      SuccsesComponent(data.message);
      setDone(true);
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  };
  // Function Onsubmit
  return (
    <>
      {done && <SendDataDone {...popubData} />}
      <div className="AddAds p-3 p-md-4 bg-white r-10">
        <h3 className=" fs-32-600 mb-4">{trans("company_ads.edit_ads")}</h3>
        <form className="d-flex flex-column gap-4" onSubmit={onSubmit}>
          {/* Taps */}
          <div className="d-flex flex-column gap-2">
            <label className="input-lable" htmlFor="job-adress">
              {trans("company_ads.ads_link")}
            </label>
            <input
              className={`input-data border r-10 p-3 ${
                errorValidation.hasOwnProperty("link") && "border-red"
              }`}
              type="url"
              id="job-adress"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
              placeholder={trans("company_ads.ads_link_place")}
            />
            <span className="text-error fs-14-400">
              {errorValidation.hasOwnProperty("link")
                ? errorValidation.link[0]
                : null}
            </span>
          </div>
          {/* Upload Photo */}
          <div className="window px-2">
            <h4 className=" fs-16-500 mb-3">
              {trans("company_ads.upload_image")}
            </h4>
            <label
              htmlFor="select"
              className={`d-flex flex-column gap-3 align-items-center px-4 py-5 r-10 border border-main ${
                errorValidation.hasOwnProperty("image") && "border-red"
              }`}
            >
              <div className="icon">
                <FiUploadCloud />
              </div>
              <p className=" fs-14-400 text-color text-center">
                {trans("company_ads.upload_image_text")}
                <span>{trans("company_ads.here")}</span>
              </p>
              {image && (
                <div className="image p-3 r-10 border border-main">
                  {typeof image === "string" ? (
                    <img src={image} alt="" />
                  ) : (
                    <img src={URL.createObjectURL(image)} alt="" />
                  )}
                </div>
              )}
            </label>
            <span className="text-error fs-14-400">
              {errorValidation.hasOwnProperty("image")
                ? errorValidation.image[0]
                : null}
            </span>
            {/* Input Display None */}
            <input
              id="select"
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              style={{ display: "none" }}
            />
          </div>
          {/* Submit */}
          <button
            type="submit"
            className=" resetBtn bg-main r-10 text-white py-3 px-4"
          >
            {trans("my_personal_data_user.save")}
          </button>
        </form>
      </div>
    </>
  );
}

export default EditAds;
