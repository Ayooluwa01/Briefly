import axios from "axios";

// Gnews api
export const api = axios.create({
  baseURL: "https://gnews.io/api/v4",
  timeout: 10000,
});

// newsAPi
export const newsapi = axios.create({
  baseURL: "https://newsapi.org/v2",
  timeout: 10000,
});
