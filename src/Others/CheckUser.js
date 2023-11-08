const user = localStorage.getItem("uset");

const CheckUser = () => {
  if (user) {
    return true;
  } else {
    return false;
  }
};

export default CheckUser;
