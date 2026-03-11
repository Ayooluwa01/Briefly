// components/inputs/CountryPickerField.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/store/themestore";

interface CountryPickerFieldProps {
  value: CountryCode;
  onChange: (country: Country) => void;
  error?: string;
  touched?: boolean;
}

export const CountryPickerField = ({
  value,
  onChange,
  error,
  touched,
}: CountryPickerFieldProps) => {
  const [visible, setVisible] = useState(false);
  const [countryName, setCountryName] = useState<string>(""); // ← track name separately
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  const hasError = touched && error;

  // value is the cca2 code ("US", "GB" etc.) — truthy means a country is selected
  const isSelected = !!value && value !== ("" as CountryCode);
  const placeholderColor = isDark ? "#64748b" : "#94a3b8";
  const iconColor = isDark ? "#9BA1A6" : "#687076";

  const handleSelect = (country: Country) => {
    setCountryName(country.name as string); // ← store name for display
    onChange(country);
    setVisible(false);
  };

  return (
    <View className="w-full mb-4">
      <TouchableOpacity
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
        className="flex-row items-center w-full bg-main-bg-secondary rounded-3xl px-4 py-4"
      >
        <CountryPicker
          countryCode={isSelected ? value : "NG"}
          withFlag
          withFilter
          withAlphaFilter
          withEmoji
          onSelect={handleSelect}
          visible={visible}
          onClose={() => setVisible(false)}
          containerButtonStyle={{ marginRight: 10 }}
          theme={{
            backgroundColor: isDark ? "#151718" : "#ffffff",
            onBackgroundTextColor: isDark ? "#ECEDEE" : "#11181C",
            fontSize: 14,
            fontFamily: "Inter_400Regular",
            filterPlaceholderTextColor: placeholderColor,
            activeOpacity: 0.7,
            itemHeight: 52,
          }}
        />

        <Text
          className="flex-1 font-inter text-base"
          style={{
            color: isSelected
              ? isDark
                ? "#ECEDEE"
                : "#11181C"
              : placeholderColor,
          }}
        >
          {isSelected ? countryName || value : "Select country"}
        </Text>

        <Ionicons name="chevron-down-outline" size={18} color={iconColor} />
      </TouchableOpacity>

      {hasError && (
        <Text className="text-error text-xs mt-1 ml-2 font-inter-medium">
          {error}
        </Text>
      )}
    </View>
  );
};
