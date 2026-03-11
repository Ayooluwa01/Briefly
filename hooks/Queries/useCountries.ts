import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services/api";

// export const useFetchCountries=()=>{
//     return useQuery({
//         queryKey:['countries'],
//         queryFn:async()=>{
//             const {data}=await api.fetch("")
//         }
//     })
// }

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await api.get("/user/profile");
      return data;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newConfig: any) => api.patch("/user/settings", newConfig),
    onSuccess: () => {
      // Invalidate cache so the app refetches the fresh profile data
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
