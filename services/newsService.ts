// api/news.ts

import { api } from "./api";

const PAGE_SIZE = 5;

export const fetchNews = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const response = await api.get("/top-headlines", {
    params: {
      category: "general",
      country: "ng",
      apikey: "6d090aa4fc4b0bf525b77dcc70173ec2",
      page: pageParam,
      max: PAGE_SIZE,
    },
  });
  return response.data;
};
