import { Tabs, useRouter, usePathname } from "expo-router";
import React, { useCallback, memo } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";

// ─── Config ───────────────────────────────────────────────────────────────────
const ACCENT = "#ffffff";
const INACTIVE = "#454560";
const BORDER = "rgba(255,255,255,0.07)";
const PILL_BG = "#B7D3F2";
const GLOW = "#007AFF";

const TABS = [
  {
    route: "/home",
    name: "home",
    label: "Home",
    icon: "home",
    iconOff: "home-outline",
  },
  {
    route: "/search",
    name: "search",
    label: "Search",
    icon: "search",
    iconOff: "search-outline",
  },
  {
    route: "/saved",
    name: "saved",
    label: "Saved",
    icon: "bookmark",
    iconOff: "bookmark-outline",
  },
  {
    route: "/settings",
    name: "settings",
    label: "Profile",
    icon: "person",
    iconOff: "person-outline",
  },
] as const;

const TabItem = memo(function TabItem({
  label,
  icon,
  iconOff,
  route,
  focused,
}: {
  label: string;
  icon: string;
  iconOff: string;
  route: string;
  focused: boolean;
}) {
  const router = useRouter();

  const handlePress = useCallback(() => {
    router.push(route as any);
  }, [route]);

  return (
    <MotiView className="flex-1">
      <Pressable
        onPress={handlePress}
        className="flex-1 items-center justify-center"
        style={{ paddingVertical: 10 }}
      >
        {/* Icon zone */}
        <View
          className="items-center justify-center"
          style={{ width: 56, height: 38 }}
        >
          {/* Pill */}
          <MotiView
            animate={{ opacity: focused ? 1 : 0, scale: focused ? 1 : 0.6 }}
            transition={{ type: "spring", damping: 22, stiffness: 240 }}
            style={{
              position: "absolute",
              width: 52,
              height: 34,
              borderRadius: 17,
              backgroundColor: PILL_BG,
            }}
          />

          {/* Glow */}
          <MotiView
            animate={{ opacity: focused ? 1 : 0, scale: focused ? 1.5 : 0.4 }}
            transition={{ type: "timing", duration: 300 }}
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: GLOW,
            }}
          />

          {/* Icon */}
          <MotiView
            animate={{
              scale: focused ? 1.12 : 1,
              translateY: focused ? -1 : 1,
            }}
            transition={{ type: "spring", damping: 16, stiffness: 240 }}
          >
            <Ionicons
              name={(focused ? icon : iconOff) as any}
              size={21}
              color={focused ? ACCENT : INACTIVE}
            />
          </MotiView>
        </View>

        {/* Label */}
        <MotiView
          animate={{ opacity: focused ? 1 : 0.35, translateY: focused ? 0 : 3 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          style={{ marginTop: 2 }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "700",
              letterSpacing: 0.6,
              textTransform: "uppercase",
              color: focused ? "#007AFF" : INACTIVE,
            }}
          >
            {label}
          </Text>
        </MotiView>

        {/* Active dot */}
        <MotiView
          animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          transition={{ type: "spring", damping: 18, stiffness: 240 }}
          style={{
            marginTop: 4,
            width: 16,
            height: 3,
            borderRadius: 2,
            backgroundColor: ACCENT,
          }}
        />
      </Pressable>
    </MotiView>
  );
});

const CustomTabBar = memo(function CustomTabBar() {
  const pathname = usePathname();

  const isActive = useCallback(
    (route: string) => {
      if (route === "/") return pathname === "/" || pathname === "/index";
      return pathname.startsWith(route);
    },
    [pathname],
  );

  return (
    <View
      className="bg-main-bg"
      style={{
        position: "absolute",
        bottom: 16,
        left: 20,
        right: 20,
        height: 72,
        borderRadius: 26,
        borderWidth: 1,
        borderColor: BORDER,
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "stretch",
        shadowColor: "#FF6B9D",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
        overflow: "hidden",
        ...Platform.select({ android: { elevation: 16 } }),
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 24,
          right: 24,
          height: 1,
          borderRadius: 1,
          backgroundColor: "rgba(255,255,255,0.06)",
          zIndex: 1,
        }}
      />

      {TABS.map((tab) => (
        <TabItem
          key={tab.name}
          label={tab.label}
          icon={tab.icon}
          iconOff={tab.iconOff}
          route={tab.route}
          focused={isActive(tab.route)}
        />
      ))}
    </View>
  );
});

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        {TABS.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{ title: tab.label }}
          />
        ))}
      </Tabs>

      <CustomTabBar />
    </>
  );
}

// import { Tabs, useRouter, usePathname } from "expo-router";
// import React, { useCallback, memo } from "react";
// import { Platform, Pressable, Text, View } from "react-native";
// import { MotiView } from "moti";

// // ─── Config ───────────────────────────────────────────────────────────────────
// const ACCENT = "#FF6B9D";
// const INACTIVE = "#454560";
// const BORDER = "rgba(255,255,255,0.07)";
// const PILL_BG = "rgba(255,107,157,0.13)";
// const GLOW = "rgba(255,107,157,0.22)";

// const TABS = [
//   { route: "/", name: "index", label: "Home", emoji: "🏠" },
//   { route: "/search", name: "search", label: "Search", emoji: "🔍" },
//   { route: "/saved", name: "saved", label: "Saved", emoji: "🔖" },
//   { route: "/profile", name: "profile", label: "Profile", emoji: "👤" },
// ] as const;

// // ─── Tab Item ─────────────────────────────────────────────────────────────────
// const TabItem = memo(function TabItem({
//   label,
//   emoji,
//   route,
//   focused,
// }: {
//   label: string;
//   emoji: string;
//   route: string;
//   focused: boolean;
// }) {
//   const router = useRouter();

//   const handlePress = useCallback(() => {
//     router.push(route as any);
//   }, [route]);

//   return (
//     <MotiView className="flex-1">
//       <Pressable
//         onPress={handlePress}
//         className="flex-1 items-center justify-center"
//         style={{ paddingVertical: 10 }}
//       >
//         {/* Icon zone */}
//         <View
//           className="items-center justify-center"
//           style={{ width: 56, height: 38 }}
//         >
//           {/* Pill */}
//           <MotiView
//             animate={{ opacity: focused ? 1 : 0, scale: focused ? 1 : 0.6 }}
//             transition={{ type: "spring", damping: 22, stiffness: 240 }}
//             style={{
//               position: "absolute",
//               width: 52,
//               height: 34,
//               borderRadius: 17,
//               backgroundColor: PILL_BG,
//             }}
//           />

//           {/* Glow */}
//           <MotiView
//             animate={{ opacity: focused ? 1 : 0, scale: focused ? 1.5 : 0.4 }}
//             transition={{ type: "timing", duration: 300 }}
//             style={{
//               position: "absolute",
//               width: 30,
//               height: 30,
//               borderRadius: 15,
//               backgroundColor: GLOW,
//             }}
//           />

//           {/* Emoji */}
//           <MotiView
//             animate={{
//               scale: focused ? 1.2 : 1,
//               translateY: focused ? -1 : 1,
//             }}
//             transition={{ type: "spring", damping: 16, stiffness: 240 }}
//           >
//             <Text style={{ fontSize: focused ? 20 : 18 }}>{emoji}</Text>
//           </MotiView>
//         </View>

//         {/* Label */}
//         <MotiView
//           animate={{ opacity: focused ? 1 : 0.35, translateY: focused ? 0 : 3 }}
//           transition={{ type: "spring", damping: 20, stiffness: 200 }}
//           style={{ marginTop: 2 }}
//         >
//           <Text
//             style={{
//               fontSize: 10,
//               fontWeight: "700",
//               letterSpacing: 0.6,
//               textTransform: "uppercase",
//               color: focused ? ACCENT : INACTIVE,
//             }}
//           >
//             {label}
//           </Text>
//         </MotiView>

//         {/* Active dot */}
//         <MotiView
//           animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
//           transition={{ type: "spring", damping: 18, stiffness: 240 }}
//           style={{
//             marginTop: 4,
//             width: 16,
//             height: 3,
//             borderRadius: 2,
//             backgroundColor: ACCENT,
//           }}
//         />
//       </Pressable>
//     </MotiView>
//   );
// });

// // ─── Custom Tab Bar ───────────────────────────────────────────────────────────
// const CustomTabBar = memo(function CustomTabBar() {
//   const pathname = usePathname();

//   const isActive = useCallback(
//     (route: string) => {
//       if (route === "/") return pathname === "/" || pathname === "/index";
//       return pathname.startsWith(route);
//     },
//     [pathname],
//   );

//   return (
//     <View
//       className="bg-main-bg"
//       style={{
//         position: "absolute",
//         bottom: 16,
//         left: 20,
//         right: 20,
//         height: 72,
//         borderRadius: 26,
//         borderWidth: 1,
//         borderColor: BORDER,
//         backgroundColor: "#ffffff",
//         flexDirection: "row",
//         alignItems: "stretch",
//         shadowColor: "#FF6B9D",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.12,
//         shadowRadius: 24,
//         overflow: "hidden",
//         ...Platform.select({ android: { elevation: 16 } }),
//       }}
//     >
//       {/* Top shimmer line */}
//       <View
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 24,
//           right: 24,
//           height: 1,
//           borderRadius: 1,
//           backgroundColor: "rgba(255,255,255,0.06)",
//           zIndex: 1,
//         }}
//       />

//       {TABS.map((tab) => (
//         <TabItem
//           key={tab.name}
//           label={tab.label}
//           emoji={tab.emoji}
//           route={tab.route}
//           focused={isActive(tab.route)}
//         />
//       ))}
//     </View>
//   );
// });

// // ─── Layout ───────────────────────────────────────────────────────────────────
// export default function TabLayout() {
//   return (
//     <>
//       <Tabs
//         screenOptions={{
//           headerShown: false,
//           tabBarStyle: { display: "none" },
//         }}
//       >
//         {TABS.map((tab) => (
//           <Tabs.Screen
//             key={tab.name}
//             name={tab.name}
//             options={{ title: tab.label }}
//           />
//         ))}
//       </Tabs>

//       <CustomTabBar />
//     </>
//   );
// }
