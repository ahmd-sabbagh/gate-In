import Swal from "sweetalert2";
const alert_toast = (icon, text, Swal) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: text,
  });
};
export function ErrorComponent(error, navigat, setErrorValidation = null) {
  if (error.response.status === 401) {
    navigat("/register/login");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  } else if (error.response.status === 403) {
    navigat("/verify");
  } else if (error.response.status === 404) {
    navigat("/route-error");
  } else if (error.response.status === 422) {
    setErrorValidation(error.response.data.errors);
    alert_toast("error", error.response.data.message, Swal);
  } else if (error.response.status === 400) {
    alert_toast("warning", error.response.data.message, Swal);
  } else if (error.response.status === 500) {
    alert_toast("error", "Server error occurred", Swal);
  }
}
export function SuccsesComponent(msg) {
  alert_toast("success", msg, Swal);
}
export function TextNotification(msg) {
  alert_toast("info", msg, Swal);
}
