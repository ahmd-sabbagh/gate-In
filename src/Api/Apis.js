export const basedUrl = "https://gateinjobs.com/jhjjh/public/api";
export const apiHeaders = {
  headers: {
    Accept: "application/json",
  },
};
const token = localStorage.getItem("token");
export const apiHeadersToken = {
  headers: {
    Accept: "application/json",
    Authorization:`Bearer ${token}`,
  },
};
