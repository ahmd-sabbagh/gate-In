import React, { useEffect, useState } from "react";
import Slider from "react-slick";
// Images
import { basedUrl } from "../../../Api/Apis";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorComponent } from "../../../Others/Error";

function Slide() {
  const navigate = useNavigate();
  const [sponsorsImages, setSponsorsImages] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: sponsorsImages.length < 4 ? sponsorsImages.length : 4,
    slidesToScroll: sponsorsImages.length - 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1170,
        settings: {
          slidesToShow: sponsorsImages.length < 3 ? sponsorsImages.length : 3,
          slidesToScroll:
            sponsorsImages.length < 3 ? sponsorsImages.length - 1 : 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: sponsorsImages.length <= 2 ? sponsorsImages.length : 2,
          slidesToScroll: sponsorsImages.length <= 2 ? 1 : 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }; // get images
  const getSponsorsImages = () => {
    axios
      .get(`${basedUrl}/sponsors`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(({ data }) => {
        setSponsorsImages(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigate);
      });
  };
  useEffect(() => {
    getSponsorsImages();
  }, []);

  return (
    <>
      {sponsorsImages.length >= 1 ? (
        <div
          className="Slider py-5 overflow-hidden"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <Slider {...settings}>
            {sponsorsImages.map((img, idx) => (
              <div key={idx}>
                <div className="flex-c" style={{ opacity: "0.4" }}>
                  <div
                    className="image bg-image"
                    style={{
                      backgroundImage: `url(${img})`,
                      width: "200px",
                      height: "60px",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : null}
    </>
  );
}

export default Slide;
