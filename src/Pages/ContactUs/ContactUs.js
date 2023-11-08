import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ContactUs.css";
import { FiUploadCloud } from "react-icons/fi";
import axios from "axios";
import { basedUrl } from "../../Api/Apis";
import { ErrorComponent, SuccsesComponent } from "../../Others/Error";
import { useRecoilState } from "recoil";
import { PopubSendData } from "../../RecoilState/PopubSendData";
import SendDataDone from "../../Components/SendDataDone/SendDataDone";
import { ReactComponent as Icon } from "./Assets/Frame.svg";
// Popub Data
const popubData = {
  icon: <Icon />,
  desc: "تم ارسالة الرسالة بنجاح سيتم الرد عليك في اقرب وقت",
  btn1To: "/",
  btn1: "حسنا",
};
function ContactUs() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  // Done Data
  const [done, setDone] = useRecoilState(PopubSendData);
  // Done Data
  // State Form
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setPhoneNum] = useState();
  const [message, setMessage] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [image, setImage] = useState("");
  // function submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      image,
      name,
      email,
      mobile,
      message,
    };

    try {
      const { data } = await axios.post(
        `${basedUrl}/public/contact-us`,
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
  return (
    <>
      {done && <SendDataDone {...popubData} />}
      <div className="ContactUs pb-5">
        <div className="container">
          <div className="mt-5">
            <h3 className="fs-32-700 text-center">تواصل معنا</h3>
            <div className="mx-auto mt-5 bg-form p-3 p-md-5 r-10">
              <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
                {/* Name */}
                <div className="full-width d-flex flex-column gap-2">
                  <input
                    className={`full-width input-data r-10 p-3 border fit-height ${
                      errorValidation.hasOwnProperty("name") &&
                      "border-red"
                    }`}
                    type="text"
                    placeholder="الاسم"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("name")
                      ? errorValidation.name[0]
                      : null}
                  </span>
                </div>
                {/* Email */}
                <div className="full-width d-flex flex-column gap-2">
                  <input
                    className={`full-width input-data r-10 p-3 border fit-height ${
                      errorValidation.hasOwnProperty("email") &&
                      "border-red"
                    }`}
                    type="email"
                    placeholder="البريد الالكتروني"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("email")
                      ? errorValidation.email[0]
                      : null}
                  </span>
                </div>
                {/* phone */}
                <div className="full-width d-flex flex-column gap-2">
                  <input
                    className={`full-width input-data r-10 p-3 border fit-height ${
                      errorValidation.hasOwnProperty("mobile") &&
                      "border-red"
                    }`}
                    type="number"
                    placeholder="رقم الهاتف"
                    onChange={(e) => {
                      setPhoneNum(e.target.value);
                    }}
                  />
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("mobile")
                      ? errorValidation.mobile[0]
                      : null}
                  </span>
                </div>
                {/* Message */}
                <div className="full-width d-flex flex-column gap-2">
                  <textarea
                    className={`full-width input-data r-10 p-3 border fit-height ${
                      errorValidation.hasOwnProperty("message") &&
                      "border-red"
                    }`}
                    placeholder="الرسالة"
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  ></textarea>
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("message")
                      ? errorValidation.message[0]
                      : null}
                  </span>
                </div>
                {/* Upload Photo */}
                <div className="window px-2">
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
                      قم باضافة صورة المشكلة
                      <span>هنا</span>
                    </p>
                    {image && (
                      <div className="image p-3 r-10 border border-main">
                        <img src={URL.createObjectURL(image)} alt="" />
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
                <button
                  type="submit"
                  className="resetBtn bg-main text-white fit-content py-3 mx-auto px-5 r-10"
                >
                  ارسال
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
