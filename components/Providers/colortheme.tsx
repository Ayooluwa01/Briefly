import { useThemeStore } from "@/store/themestore";
import React, { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme as useNativeWindColor } from "nativewind";

export function ColorTheme({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useNativeWindColor();
  const theme = useThemeStore((state) => state.theme);

  const isDark = theme === "dark";

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <SafeAreaView
        className="flex-1 "
        edges={["top", "left", "right", "bottom"]}
      >
        <View className="flex-1 bg-main-bg">{children}</View>
      </SafeAreaView>
      <StatusBar style={isDark ? "light" : "dark"} />
    </ThemeProvider>
  );
}
