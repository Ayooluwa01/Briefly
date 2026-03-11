// import { create } from "zustand";
// import { persist, createJSONStorage,devtools } from "zustand/middleware";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// interface FirstLaunchState {
//   firstLaunch: boolean;
//   setFirstLaunch: (value: boolean) => void;
// }

// export const useFirstLaunch = create<FirstLaunchState>()(
//   persist(
//     (set) => ({
//       firstLaunch: true,
//       setFirstLaunch: (value) => set({ firstLaunch: value }),
//     }),
//     {
//       name: "first-launch-storage",
//       storage: createJSONStorage(() => AsyncStorage),
//     }
//   ),
// );

import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FirstLaunchState {
  firstLaunch: boolean;
  setFirstLaunch: (value: boolean) => void;
}

export const useFirstLaunch = create<FirstLaunchState>()(
  // 1. Wrap everything in devtools
  devtools(
    // 2. Then wrap your logic in persist
    persist(
      (set) => ({
        firstLaunch: true,
        setFirstLaunch: (value) =>
          set({ firstLaunch: value }, false, "setFirstLaunch"),
      }),
      {
        name: "first-launch-storage",
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
    // 3. Devtools config (this makes it show up in Reactotron)
    { enabled: __DEV__, name: "First Launch Store" },
  ),
);
