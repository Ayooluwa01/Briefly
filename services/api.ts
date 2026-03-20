import axios from "axios";

export const api = axios.create({
  baseURL: "https://gnews.io/api/v4",
  timeout: 10000,
});
