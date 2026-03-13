// components/inputs/Numpad.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/store/themestore";
import * as Haptics from "expo-haptics";

interface NumpadProps {
  onPress: (key: string) => void;
}

const KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["", "0", "del"],
];

export const Numpad = ({ onPress }: NumpadProps) => {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";
  const iconColor = isDark ? "#9BA1A6" : "#687076";

  return (
    <View className="w-full pb-6">
      {KEYS.map((row, ri) => (
        <View key={ri} className="flex-row justify-between mb-2">
          {row.map((key, ki) => {
            if (key === "") {
              return <View key={ki} style={{ flex: 1, marginHorizontal: 6 }} />;
            }
            return (
              <TouchableOpacity
                key={ki}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  onPress(key);
                }}
                activeOpacity={0.6}
                style={{ flex: 1, marginHorizontal: 6 }}
                className="items-center justify-center py-4 rounded-2xl bg-main-bg-secondary"
              >
                {key === "del" ? (
                  <Ionicons
                    name="backspace-outline"
                    size={22}
                    color={iconColor}
                  />
                ) : (
                  <Text
                    className="font-inter-semibold text-xl"
                    style={{ color: isDark ? "#ECEDEE" : "#11181C" }}
                  >
                    {key}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};
