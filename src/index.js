import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import "aos/dist/aos.css"; 
// React Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min";
// Custom Css
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Routers/Router";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={Router} />
    </RecoilRoot>
  </React.StrictMode>
);
reportWebVitals();
