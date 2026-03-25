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
import { AppState, Platform, View, Text } from "react-native";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
  focusManager,
} from "@tanstack/react-query";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import Preloader from "@/components/preloader/preloader";

SplashScreen.preventAutoHideAsync();
if (__DEV__) {
  require("../ReactotronConfig");
}

// 1.  Online Manager (Refetch on reconnect)
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

// 2. Setup Focus Manager (Refetch when app comes to foreground)
function onAppStateChange(status: string) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

// 3. Subscribe to AppState changes
const subscription = AppState.addEventListener("change", onAppStateChange);

// Queryclient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 3, // 3 minutes
    },
  },
});
// Persiting query client with async storage
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});
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
  const { isInternetReachable } = useNetInfo();

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
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        {isInternetReachable === false && <Preloader />}
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="(Splash)" />
          <Stack.Screen name="(Onboarding)" /> */}
          <Stack.Screen name="(MainScreens)" />
          <Stack.Screen name="(Auth)" />
          <Stack.Screen name="(Interest)" />
        </Stack>
      </PersistQueryClientProvider>
    </ColorTheme>
  );
}
