import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { memo, ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

interface BackButtonProps extends TouchableOpacityProps {
  name?: keyof typeof Ionicons.glyphMap;
  children?: ReactNode;
  size?: number; // Added size prop
}

export const Backbutton = memo(
  ({ name = "arrow-back", children, size = 24, ...props }: BackButtonProps) => {
    return (
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center"
        {...props}
      >
        <Ionicons name={name} size={size} className="text-main-text" />
        {children}
      </TouchableOpacity>
    );
  },
);

Backbutton.displayName = "Backbutton";
