import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://127.0.0.1:8000";

let authTokens = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;
let refresh = localStorage.getItem("refresh")
  ? JSON.parse(localStorage.getItem("refresh"))
  : null;
const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null;
    req.headers.Authorization = `Bearer ${authTokens}`;
  }

  const user = jwt_decode(authTokens);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  const response = await axios.post(`${baseURL}/api/token/refresh/`, {
    refresh: refresh,
  });

  localStorage.setItem("token", JSON.stringify(response.data.access));
  localStorage.setItem("refresh", JSON.stringify(response.data.refresh));
  req.headers.Authorization = `Bearer ${response.data.access}`;
  return req;
});

export default axiosInstance;
