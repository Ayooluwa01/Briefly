import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { memo, useLayoutEffect, useCallback, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { Body, BodyLarge, BodySmall } from "@/components/ThemedText";
import { useDevicesettingsStore, useThemeStore } from "@/store/themestore";

// Top Level Component for the Profile Screen
const Icons = memo(() => {
  const handleBackPress = useCallback(() => {
    router.back();
  }, []);

  return (
    <View className="flex-row items-center justify-between mb-6">
      {/* Back Icon */}
      <TouchableOpacity onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title  */}
      <Body>Profile</Body>

      {/* Three dots */}
      <TouchableOpacity>
        <Ionicons name="ellipsis-horizontal" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
});

Icons.displayName = "Profile Icons";

// Profile Picture, Name, and Member Badge
const ProfileInfo = memo(() => {
  return (
    <View className="flex-col items-center mb-section">
      {/* Profile Picture with Badge */}
      <View className="relative">
        <Image
          source={{ uri: "https://i.pravatar.cc/96?img=5" }}
          className="w-24 h-24 rounded-full border-4 border-white"
        />
        <View className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2">
          <Ionicons name="checkmark" size={16} color="white" />
        </View>
      </View>

      {/* Name and Email */}
      <View className="items-center mt-4">
        <Body className="text-2xl font-bold">Isabella Rossi</Body>
        <Body>isabella.r@example.com</Body>
      </View>

      {/* Member Badge */}
      <View className="bg-yellow-400 rounded-full px-4 py-2 mt-4 flex-row items-center">
        <Ionicons name="shield-checkmark" size={16} color="white" />
        <Body className="text-white font-bold ml-2 text-sm">
          BRIEFLY+ MEMBER
        </Body>
      </View>
    </View>
  );
});

ProfileInfo.displayName = "Profile Info";

// Account Settings Section

const Accountitems = [
  {
    icon: "person",
    label: "Account Information",
    route: "Information",
    color: "#3b82f6",
  },
  {
    icon: "star",
    label: "Manage Interests",
    route: "Interest",
    color: "#9333EA",
  },
  {
    icon: "diamond",
    label: "Manage Subscription",
    route: "Subscription",
    color: "#FBBF24",
  },
];

const AccountSettingsSection = memo(() => {
  const handleNavigation = useCallback((route: string) => {
    router.push(`/settings/${route}` as never);
  }, []);

  return (
    <View className="mb-small-section">
      <Text className="text-gray-400 text-xs font-bold mb-3 ml-1">
        ACCOUNT SETTINGS
      </Text>
      <View className="bg-white rounded-lg overflow-hidden gap-5 p-3">
        {Accountitems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`flex-row items-center justify-between  p-3 mb-2 ${
              index !== Accountitems.length - 1
                ? "border-b border-gray-100"
                : ""
            }`}
            onPress={() => handleNavigation(item.route)}
          >
            <View className="flex-row items-center">
              <Ionicons
                name={item.icon as never}
                size={20}
                color={item.color}
              />
              <Text className="text-gray-800 ml-4">{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

AccountSettingsSection.displayName = "Account Settings";

// Notification Section
const Notificationitems = [
  { icon: "notifications", label: "Push Notifications", color: "#FB923C" },
  { icon: "mail", label: "Email Notifications", color: "#0891B2" },
];

const NotificationSection = memo(() => {
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(false);

  const handlePushToggle = useCallback(() => {
    setPushEnabled((prev) => !prev);
  }, []);

  const handleEmailToggle = useCallback(() => {
    setEmailEnabled((prev) => !prev);
  }, []);

  return (
    <View className="mb-small-section">
      <Text className="text-gray-400 text-xs font-bold mb-3 ml-1">
        NOTIFICATIONS
      </Text>
      <View className="bg-white rounded-lg overflow-hidden  p-3">
        {Notificationitems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`flex-row items-center justify-between  p-3 ${
              index !== Notificationitems.length - 1
                ? "border-b border-gray-100"
                : ""
            }`}
          >
            <View className="flex-row items-center">
              <Ionicons
                name={item.icon as never}
                size={20}
                color={item.color}
              />
              <Text className="text-gray-800 ml-4">{item.label}</Text>
            </View>
            {/* Toggle button*/}
            <Switch
              value={
                item.label === "Push Notifications" ? pushEnabled : emailEnabled
              }
              onValueChange={
                item.label === "Push Notifications"
                  ? handlePushToggle
                  : handleEmailToggle
              }
              thumbColor={item.color}
              trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

NotificationSection.displayName = "Notification Section";

// Device options--Biometrics and toggling dark mode
const Deviceoptions = [
  { icon: "finger-print", label: "Biometric Login", color: "#10B981" },
  { icon: "moon", label: "Dark Mode", color: "#6B7280" },
];

const DeviceSection = memo(() => {
  const { theme, setTheme } = useThemeStore();
  const { isBiometricAuthEnabled, toggleBiometricAuth } =
    useDevicesettingsStore();

  const handleBiometricToggle = useCallback(() => {
    toggleBiometricAuth();
  }, [toggleBiometricAuth]);

  const handleDarkModeToggle = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  return (
    <View className="mb-small-section">
      <Text className="text-gray-400 text-xs font-bold mb-3 ml-1">
        DEVICE SETTINGS
      </Text>
      <View className="bg-white rounded-lg overflow-hidden p-3">
        {Deviceoptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`flex-row items-center justify-between  p-3  ${
              index !== Deviceoptions.length - 1
                ? "border-b border-gray-100"
                : ""
            }`}
          >
            <View className="flex-row items-center">
              <Ionicons
                name={item.icon as never}
                size={20}
                color={item.color}
              />
              <Text className="text-gray-800 ml-4">{item.label}</Text>
            </View>
            {/* Toggle button*/}
            <Switch
              value={
                item.label === "Biometric Login"
                  ? isBiometricAuthEnabled
                  : theme === "dark"
              }
              onValueChange={
                item.label === "Biometric Login"
                  ? handleBiometricToggle
                  : handleDarkModeToggle
              }
              thumbColor={item.color}
              trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});
DeviceSection.displayName = "Security Section";

// Constants for Preferences items
const PREFERENCES_ITEMS = [
  { icon: "time", label: "Activity History", color: "#16A34A" },
  { icon: "shield", label: "Privacy Settings", color: "#475569" },
];

// Preferences Section
const PreferencesSection = memo(() => {
  return (
    <View className="mb-small-section">
      <Text className="text-gray-400 text-xs font-bold mb-3 ml-1">
        PREFERENCES
      </Text>
      <View className="bg-white rounded-lg overflow-hidden gap-6 p-4">
        {PREFERENCES_ITEMS.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`flex-row items-center justify-between  p-3  ${
              index !== PREFERENCES_ITEMS.length - 1
                ? "border-b border-gray-100"
                : ""
            }`}
          >
            <View className="flex-row items-center">
              <Ionicons
                name={item.icon as never}
                size={20}
                color={item.color}
              />
              <Text className="text-gray-800 ml-4">{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

PreferencesSection.displayName = "Preferences";

// Log Out Button
const LogOutButton = memo(() => {
  return (
    <TouchableOpacity className="mb-8">
      <Text className="text-red-500 font-semibold text-center">Log Out</Text>
    </TouchableOpacity>
  );
});

LogOutButton.displayName = "Log Out Button";

// Version Info
const VersionInfo = memo(() => {
  return (
    <View className="items-center mb-24">
      <Text className="text-gray-400 text-xs">Briefly v2.4.0 (192)</Text>
    </View>
  );
});

VersionInfo.displayName = "Version Info";

const Profile = memo(() => {
  return (
    <ScrollView className="flex-1 ">
      <View className="p-screen-edge">
        <Icons />
        <ProfileInfo />
        <AccountSettingsSection />
        <NotificationSection />
        <DeviceSection />
        <PreferencesSection />
        <LogOutButton />
        <VersionInfo />
      </View>
    </ScrollView>
  );
});

Profile.displayName = "Settings Profile";

export default Profile;

const styles = StyleSheet.create({});
