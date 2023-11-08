import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { basedUrl } from "../../Api/Apis";
import { ErrorComponent } from "../../Others/Error";
import { Link, useNavigate } from "react-router-dom";
import { BiMessageRounded } from "react-icons/bi";
import {
  MdDownloadDone,
  MdOutlineCancel,
  MdOutlineWavingHand,
} from "react-icons/md";
import ScrollarComponent from "../ScrollarComponent/ScrollarComponent";
import { useRecoilState } from "recoil";
import { NotificationCount } from "../../RecoilState/Notifications/NotificationCount";
function Notification() {
  const navigat = useNavigate();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const menuNotification = useRef();
  const closeRef = useRef();
  // get notificatin
  const [data, setData] = useState();
  const getNotifications = () => {
    axios
      .get(`${basedUrl}/public/notifications`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setData(data.data.notifications.data);
        if (data.data.count_not_open) {
          setCount(true);
        } else {
          setCount(false);
        }
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  // get count
  const [count, setCount] = useRecoilState(NotificationCount);
  const notificationOpenAll = () => {
    axios
      .post(
        `${basedUrl}/public/notifications/open-all`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  // useEefect
  useEffect(() => {
    getNotifications();
    const menuLanguageHandler = (e) => {
      if (
        !menuNotification?.current?.contains(e.target) &&
        !closeRef?.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", menuLanguageHandler);
    return () => {
      document.removeEventListener("mousedown", menuLanguageHandler);
    };
  }, []);
  return (
    <div className="position-relative notification-cont">
      <div
        className={`notification flex-c pointer ${
          open && "bg-white text-main box-sh"
        }`}
        onClick={() => {
          setOpen(!open);
          if (count) {
            getNotifications();
            notificationOpenAll();
          }
          setCount(false);
        }}
        ref={closeRef}
      >
        <IoNotificationsOutline />
      </div>
      {/* coount */}
      {count && <div className="count"></div>}

      {/* window */}
      {open && (
        <div
          className="window p-3 r-10 bg-white position-absolute box-sh"
          ref={menuNotification}
        >
          <ScrollarComponent height="400px">
            {data?.map((item) => (
              <Link
                className="d-flex align-items-center gap-2 mb-1"
                key={item.id}
              >
                <div className="icon flex-c">
                  {item.icon === "message" ? (
                    <BiMessageRounded />
                  ) : item.icon === "welcome" ? (
                    <MdOutlineWavingHand />
                  ) : item.icon === "reject" ? (
                    <MdOutlineCancel />
                  ) : (
                    <MdDownloadDone />
                  )}
                </div>
                <span>{item.content}</span>
              </Link>
            ))}
          </ScrollarComponent>
        </div>
      )}
    </div>
  );
}

export default Notification;
