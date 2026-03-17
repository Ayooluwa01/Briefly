import { Tabs, useRouter, usePathname } from "expo-router";
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Config ───────────────────────────────────────────────────────────────────
const ACCENT = "#FF6B9D";
const INACTIVE = "#454560";
const BAR_BG = "#0D0D18";
const BORDER = "rgba(255,255,255,0.07)";
const PILL_BG = "rgba(255,107,157,0.13)";
const GLOW = "rgba(255,107,157,0.22)";

const TABS = [
  {
    route: "/",
    name: "index",
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
    route: "/profile",
    name: "profile",
    label: "Profile",
    icon: "person",
    iconOff: "person-outline",
  },
] as const;

function TabItem({
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
  const [pressed, setPressed] = React.useState(false);

  return (
    <MotiView
      animate={{ scale: pressed ? 0.87 : 1 }}
      transition={{ type: "spring", damping: 12, stiffness: 280 }}
      className="flex-1"
    >
      <Pressable
        onPress={() => router.push(route as any)}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        className="flex-1 items-center justify-center"
        style={{ paddingVertical: 10 }}
      >
        <View
          className="items-center justify-center"
          style={{ width: 56, height: 38 }}
        >
          {/* Pill background */}
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

          {/* Glow orb */}
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
              color: focused ? ACCENT : INACTIVE,
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
}

// ─── Custom Tab Bar ───────────────────────────────────────────────────────────
function CustomTabBar() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const isActive = (route: string) => {
    if (route === "/") return pathname === "/" || pathname === "/index";
    return pathname.startsWith(route);
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: Math.max(insets.bottom, 16) + 8,
        left: 20,
        right: 20,
        height: 72,
        borderRadius: 26,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: BORDER,
        flexDirection: "row",
        alignItems: "stretch",
        shadowColor: "#FF6B9D",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
        overflow: "hidden",
        ...Platform.select({
          android: { elevation: 16 },
        }),
      }}
      className="bg-main-bg"
    >
      {/* Subtle top shimmer line */}
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
}

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
