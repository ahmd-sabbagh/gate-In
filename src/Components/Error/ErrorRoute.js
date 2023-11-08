import React from "react";
import Error from "../../Assets/Json/Error.json";
import Lottie from "lottie-react";
function ErrorRoute() {
  return (
    <div className="ErrorRoute position-absolute top-0 start-0 full-height full-width bg-white flex-c">
      <Lottie animationData={Error} loop={true} />
    </div>
  );
}

export default ErrorRoute;
