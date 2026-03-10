// components/inputs/FormInput.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { useFormikContext } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/store/themestore";

interface AppFormFieldProps extends TextInputProps {
  name: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const AppFormField = ({
  name,
  icon,
  ...otherProps
}: AppFormFieldProps) => {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext<Record<string, string>>();

  const [showPassword, setShowPassword] = useState(false);
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  const isPassword = otherProps.secureTextEntry;
  const hasError = touched[name] && errors[name];
  const isValid = touched[name] && !errors[name] && values[name];

  const iconColor = hasError
    ? "#ef4444"
    : isValid
      ? "#10b981"
      : isDark
        ? "#9BA1A6"
        : "#687076";

  return (
    <View className="w-full mb-4">
      <View
        className={`flex-row items-center w-full bg-main-bg-secondary rounded-3xl px-4`}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={iconColor}
            style={{ marginRight: 10 }}
          />
        )}

        <TextInput
          className="flex-1 py-4 text-main-text font-inter"
          placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
          value={values[name]}
          onChangeText={handleChange(name)}
          onBlur={() => setFieldTouched(name)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={isPassword && !showPassword}
          {...otherProps}
        />

        {isPassword ? (
          <TouchableOpacity
            onPress={() => setShowPassword((p) => !p)}
            hitSlop={8}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={18}
              color={isDark ? "#9BA1A6" : "#687076"}
            />
          </TouchableOpacity>
        ) : hasError ? (
          <Ionicons name="alert-circle-outline" size={18} color="#ef4444" />
        ) : isValid ? (
          <Ionicons name="checkmark-circle-outline" size={18} color="#10b981" />
        ) : null}
      </View>

      {hasError && (
        <Text className="text-error text-xs mt-1 ml-2 font-inter-medium">
          {errors[name] as string}
        </Text>
      )}
    </View>
  );
};

AppFormField.displayName = "AppFormField";
