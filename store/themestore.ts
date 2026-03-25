import { Dimensions } from "react-native";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (value: Theme) => void;
}

interface DeviceSettingsState {
  isDeviceNotificationsEnabled: boolean;
  toggleDeviceNotifications: () => void;
  isBiometricAvailable: boolean;
  isBiometricAuthEnabled: boolean;
  toggleBiometricAuth: () => void;

  isEmailNotificationsEnabled: boolean;
  toggleEmailNotifications: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (value) => set({ theme: value }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useDevicesettingsStore = create<DeviceSettingsState>()(
  persist(
    (set) => ({
      isDeviceNotificationsEnabled: true,
      toggleDeviceNotifications: () =>
        set((state) => ({
          isDeviceNotificationsEnabled: !state.isDeviceNotificationsEnabled,
        })),
      isBiometricAvailable: false,
      isBiometricAuthEnabled: false,
      toggleBiometricAuth: () =>
        set((state) => ({
          isBiometricAuthEnabled: !state.isBiometricAuthEnabled,
        })),

      isEmailNotificationsEnabled: true,
      toggleEmailNotifications: () =>
        set((state) => ({
          isEmailNotificationsEnabled: !state.isEmailNotificationsEnabled,
        })),
    }),
    {
      name: "device-settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

// Store device width and height for responsive design

interface DeviceDimensionsState {
  width: number;
  height: number;
}

export const useDeviceDimensionsStore = create<DeviceDimensionsState>()(
  persist(
    (set) => {
      const { width, height } = Dimensions.get("window");
      return { width, height };
    },
    {
      name: "device-dimensions-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
