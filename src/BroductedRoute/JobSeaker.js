const user = JSON.parse(localStorage.getItem("user"));
export function JobSeekerRout() {
  if (user) {
    if (user.data_status === "approved") {
      return true;
    } else {
      return false;
    }
  }
}
