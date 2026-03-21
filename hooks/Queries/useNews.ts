// hooks/Queries/useNews.ts
import { fetchNews } from "@/services/newsService";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchNews = () =>
  useInfiniteQuery({
    queryKey: ["news", "general"],
    queryFn: fetchNews,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.flatMap((p) => p.articles).length;
      return fetched < lastPage.totalArticles ? allPages.length + 1 : undefined;
    },
    refetchInterval: 1 * 60 * 1000,
    refetchIntervalInBackground: false,
  });

// Fetch
