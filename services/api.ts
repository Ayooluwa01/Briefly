import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.yourdomain.com",
  timeout: 10000,
});
