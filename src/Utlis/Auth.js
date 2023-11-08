var user = localStorage.getItem("user");
export function isAuthenticated() {
  if (user) {
    return true;
  } else {
    return false;
  }
}

export default isAuthenticated;

