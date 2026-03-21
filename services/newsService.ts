/**
 * News Service Module
 *
 * This module handles fetching news articles from multiple news APIs.
 * It provides utility functions to retrieve top headlines with pagination
 * and category filtering capabilities.
 */

import { api } from "./api";

const PAGE_SIZE = 5;
const GNEWS_API_KEY = process.env.EXPO_PUBLIC_GNEWS_API_KEY || "";
const NEWSAPI_KEY = process.env.EXPO_PUBLIC_NEWSAPI_KEY || "";

/**
 * Fetches top headlines from GNews API
 *
 * GNews API is an alternative to NewsAPI with different parameter names.
 * This function fetches general news from Nigeria with pagination support.
 *
 * @param {Object} params - The request parameters
 * @param {number} [params.pageParam=1] - The page number for pagination (1-indexed)
 * @returns {Promise<Object>} Response containing news articles (format depends on GNews API)
 *
 * @example
 * const newsData = await fetchNews({ pageParam: 1 });
 * console.log(newsData.articles);
 */
export const fetchNews = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const response = await api.get("/top-headlines", {
    params: {
      category: "general",
      country: "ng",
      apikey: GNEWS_API_KEY,
      page: pageParam,
      max: PAGE_SIZE,
    },
  });
  return response.data;
};

/**
 * Fetches top headlines from NewsAPI
 *
 * Supports filtering by category, country, or search keywords.
 * @param {Object} params - The request parameters
 * @param {string} [params.category] - News category: "business", "entertainment", "general", "health", "science", "sports", "technology"
 * @param {string} [params.country="ng"] - 2-letter ISO 3166-1 country code (default: "ng" for Nigeria)
 * @param {string} [params.q] - Search keywords or phrase (cannot be used with category or country)
 * @param {number} [params.pageSize=20] - Number of results per page (1-100, default: 20)
 * @param {number} [params.page=1] - Page number for pagination
 * @returns {Promise<Object>} Response containing status, totalResults, and articles array
 *

 *
 * @example
 
 */
export const fetchNewsapi = async ({
  category,
  country = "ng",
  q,
  pageSize = 10,
  page = 1,
}: {
  category?: string;
  country?: string;
  q?: string;
  pageSize?: number;
  page?: number;
} = {}) => {
  // Validate that q is not mixed with category/country
  if (q && (category || country !== "ng")) {
    console.warn(
      "Warning: 'q' parameter cannot be mixed with 'category' or 'country'. Using 'q' parameter only.",
    );
  }

  const params: Record<string, string | number | undefined> = {
    apiKey: NEWSAPI_KEY,
    pageSize: Math.min(Math.max(pageSize, 1), 100),
    page,
  };

  // Only add category/country if q is not provided
  if (!q) {
    if (category) params.category = category;
    if (country) params.country = country;
  } else {
    params.q = q;
  }

  const response = await api.get("/top-headlines", { params });
  return response.data;
};
