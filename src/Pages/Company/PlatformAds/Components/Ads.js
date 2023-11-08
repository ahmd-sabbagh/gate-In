import { RiDeleteBin6Line, RiFileEditFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Ads.css";
import { useState } from "react";
import DeleteItem from "../../../../Components/DeleteItem/DeleteItem";

function Ads({ image, link, id, getData, deleteLink, linkEditRoute }) {
  const [view, setViews] = useState(false);
  return (
    <>
      {view && (
        <DeleteItem
          setView={setViews}
          deleteLink={deleteLink}
          getData={getData}
          itemId={id}
        />
      )}
      <div className="Ads-Card r-10 overflow-hidden border">
        <Link to={link} className="image pointer flex-c">
          <img src={image} alt="" />
        </Link>
        <div className="controler">
          <Link to={`${linkEditRoute}${id}`} className="icon flex-c main-color">
            <RiFileEditFill />
          </Link>
          <div
            className="icon flex-c red-color pointer"
            onClick={() => {
              setViews(true);
            }}
          >
            <RiDeleteBin6Line />
          </div>
        </div>
      </div>
    </>
  );
}

export default Ads;
