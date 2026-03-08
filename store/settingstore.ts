import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FirstLaunchState {
  firstLaunch: boolean;
  setFirstLaunch: (value: boolean) => void;
}

export const useFirstLaunch = create<FirstLaunchState>()(
  persist(
    (set) => ({
      firstLaunch: true,
      setFirstLaunch: (value) => set({ firstLaunch: value }),
    }),
    {
      name: "first-launch-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
