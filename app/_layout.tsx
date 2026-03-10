// import { useRouter, Stack, useRootNavigationState } from "expo-router";
// import "react-native-reanimated";
// import "../global.css";
// import { ColorTheme } from "@/components/Providers/colortheme";
// import {
//   Inter_100Thin,
//   Inter_200ExtraLight,
//   Inter_300Light,
//   Inter_400Regular,
//   Inter_500Medium,
//   Inter_600SemiBold,
//   Inter_700Bold,
//   Inter_800ExtraBold,
//   Inter_900Black,
//   useFonts,
// } from "@expo-google-fonts/inter";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState } from "react";

// // Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const router = useRouter();
//   const rootNavigationState = useRootNavigationState();

//   const [loaded, error] = useFonts({
//     Inter_100Thin,
//     Inter_200ExtraLight,
//     Inter_300Light,
//     Inter_400Regular,
//     Inter_500Medium,
//     Inter_600SemiBold,
//     Inter_700Bold,
//     Inter_800ExtraBold,
//     Inter_900Black,
//   });

//   const [appReady, setAppReady] = useState(false);

//   // 1. Handle Font Loading & Splash Screen
//   useEffect(() => {
//     if (loaded || error) {
//       SplashScreen.hideAsync();
//       setAppReady(true);
//     }
//   }, [loaded, error]);

//   // 2. Handle Initial Routing safely
//   useEffect(() => {
//     // Wait until fonts are loaded AND the navigation container is completely mounted
//     if (!appReady || !rootNavigationState?.key) return;

//     // Always start at splash - splash screen will handle routing to onboarding or tabs
//     router.replace("/(Splash)");
//   }, [appReady, rootNavigationState?.key, router]);

//   // Do not render the Stack until fonts are loaded
//   if (!loaded && !error) return null;

//   return (
//     <ColorTheme>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="(Splash)" />
//         <Stack.Screen name="(Onboarding)" />
//         <Stack.Screen name="(tabs)" />
//         <Stack.Screen name="(Auth)" />
//       </Stack>
//     </ColorTheme>
//   );
// }

import { Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";
import { ColorTheme } from "@/components/Providers/colortheme";

import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ColorTheme>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(Splash)" />
        <Stack.Screen name="(Onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(Auth)" />
      </Stack>
    </ColorTheme>
  );
}
