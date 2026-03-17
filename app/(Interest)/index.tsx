import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useCallback, memo } from "react";
import { BodyLarge, Label } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/store/themestore";
import { MotiView, AnimatePresence } from "moti";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";

const OPTIONS = [
  { name: "Technology", icon: "hardware-chip-outline" },
  { name: "Science", icon: "flask-outline" },
  { name: "Business", icon: "briefcase-outline" },
  { name: "Health", icon: "heart-outline" },
  { name: "Politics", icon: "megaphone-outline" },
  { name: "Sports", icon: "football-outline" },
  { name: "Arts", icon: "color-palette-outline" },
  { name: "World", icon: "globe-outline" },
];

interface OptionCardProps {
  name: string;
  icon: string;
  isSelected: boolean;
  onPress: (name: string) => void;
  index: number;
  isDark: boolean;
}

const OptionCard = memo(
  ({ name, icon, isSelected, onPress, index, isDark }: OptionCardProps) => {
    return (
      <MotiView
        key={name}
        from={{ opacity: 0, scale: 0.85, translateY: 20 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{ type: "spring", delay: index * 60, damping: 14 }}
        style={{ width: "47%" }}
      >
        <MotiView
          animate={{ scale: isSelected ? 1.03 : 1 }}
          transition={{ type: "spring", damping: 12 }}
        >
          <TouchableOpacity
            onPress={() => onPress(name)}
            activeOpacity={0.8}
            className={` items-center gap-2  p-5 rounded-2xl border ${
              isSelected ? "border-info" : "border-main-border bg-card-bg"
            }`}
            style={
              isSelected
                ? { backgroundColor: isDark ? "#0a2540" : "#e8f1ff" }
                : {}
            }
          >
            <MotiView
              animate={{ rotate: isSelected ? "360deg" : "0deg" }}
              transition={{ type: "timing", duration: 400 }}
            >
              <Ionicons
                name={icon as any}
                size={20}
                color={isSelected ? "#067BF9" : isDark ? "#9BA1A6" : "#687076"}
              />
            </MotiView>

            <Label
              className=""
              style={{
                color: isSelected ? "#067BF9" : isDark ? "#ECEDEE" : "#11181C",
              }}
            >
              {name}
            </Label>

            <AnimatePresence>
              {isSelected && (
                <MotiView
                  from={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: "spring", damping: 12 }}
                >
                  <Ionicons name="checkmark-circle" size={16} color="#067BF9" />
                </MotiView>
              )}
            </AnimatePresence>
          </TouchableOpacity>
        </MotiView>
      </MotiView>
    );
  },
);

OptionCard.displayName = "OptionCard";

// ─────────────────────────────────────────────────────────────────────────────

export default function InterestScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  // useCallback
  const handlePress = useCallback((name: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // if (selected.includes(name)) {
    //   setSelected(selected.filter((value) => value !== name));
    // } else {
    //   setSelected([...selected, name]);
    // }
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      className="p-screen-edge"
    >
      <TouchableOpacity className="items-end mb-big">
        <Text>Skip</Text>
      </TouchableOpacity>
      <MotiView
        from={{ opacity: 0, translateY: -16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
      >
        <BodyLarge className="font-inter-bold text-main-text mb-2">
          What interests you?
        </BodyLarge>
        <Text className="text-main-text-secondary font-inter text-sm mb-8">
          Pick as many as you like — we&apos;ll tailor your feed.
        </Text>
      </MotiView>

      <View className="flex-row flex-wrap gap-3">
        {OPTIONS.map((option, index) => (
          <OptionCard
            key={option.name}
            name={option.name}
            icon={option.icon}
            index={index}
            isDark={isDark}
            isSelected={selected.includes(option.name)}
            onPress={handlePress}
          />
        ))}
      </View>

      <View className="flex-1 justify-end pb-4">
        <AnimatePresence>
          {selected.length > 0 && (
            <MotiView
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 10 }}
              transition={{ type: "spring", damping: 14 }}
              className="flex-row justify-center mb-3 gap-2 flex-wrap"
            >
              {selected.map((name) => (
                <MotiView
                  key={name}
                  from={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ type: "spring", damping: 14 }}
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: isDark ? "#0a2540" : "#e8f1ff" }}
                >
                  <Text
                    className="text-xs font-inter-medium"
                    style={{ color: "#067BF9" }}
                  >
                    {name}
                  </Text>
                </MotiView>
              ))}
            </MotiView>
          )}
        </AnimatePresence>

        <MotiView
          animate={{ scale: selected.length > 0 ? 1 : 0.97 }}
          transition={{ type: "spring", damping: 14 }}
        >
          <TouchableOpacity
            disabled={selected.length === 0}
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)")}
            className="w-full p-4 rounded-3xl items-center"
            style={{
              backgroundColor:
                selected.length > 0
                  ? "#067BF9"
                  : isDark
                    ? "#1c1c28"
                    : "#e2e8f0",
            }}
          >
            <Label
              style={{
                color:
                  selected.length > 0 ? "#fff" : isDark ? "#334155" : "#94a3b8",
              }}
            >
              {selected.length > 0
                ? `Continue with ${selected.length} topic${selected.length > 1 ? "s" : ""}`
                : "Select at least one"}
            </Label>
          </TouchableOpacity>
        </MotiView>
      </View>
    </ScrollView>
  );
}
