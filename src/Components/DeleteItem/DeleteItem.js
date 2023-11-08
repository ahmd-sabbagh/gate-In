import axios from "axios";
import { basedUrl } from "../../Api/Apis";
import { useNavigate } from "react-router-dom";
import { ErrorComponent, SuccsesComponent } from "../../Others/Error";

function DeleteItem({ setView, deleteLink, getData, itemId }) {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  function deleteItem(id) {
    axios
      .post(
        `${basedUrl}${deleteLink}${id}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        SuccsesComponent(data.data.message);
        if (getData !== undefined) {
          getData();
        }
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }
  return (
    <div className="alert-delete d-flex flex-column justify-content-around position-fixed top-50 start-50 translate-middle flex-c">
      <div className="cont d-flex flex-column justify-content-around bg-white border p-4 r-10">
        <h3 className="text-center fs-16-700 main-color">هل انت متأكد؟</h3>
        <div className="buttons border-top p-3 r-10 d-flex justify-content-around">
          <div
            className="yes pointer bg-danger text-white py-2 px-4 r-10"
            onClick={() => {
              deleteItem(itemId);
              setView(false);
            }}
          >
            نعم
          </div>
          <div
            className="no pointer bg-main text-white py-2 px-4 r-10"
            onClick={() => {
              setView(false);
            }}
          >
            لا
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteItem;
