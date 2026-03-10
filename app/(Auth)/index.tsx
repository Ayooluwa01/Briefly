// screens/Loginscreen.tsx
import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/store/themestore";

import { H2, BodySmall } from "@/components/ThemedText";
import { Logo } from "@/components/icons/logo";
import { AppFormField } from "@/components/inputs/Forminput";

interface LoginValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email address"),
  password: Yup.string().required().min(8).label("Password"),
});

const initialValues: LoginValues = { email: "", password: "" };
const { height } = Dimensions.get("window");

export default function Loginscreen() {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  const handleLogin = (values: LoginValues) => {
    console.log("Login Values:", values);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ minHeight: height }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraScrollHeight={30}
      bounces={false}
    >
      <View
        className="flex-1 px-8 justify-center"
        style={{ minHeight: height }}
      >
        {/* Header */}
        <View className="items-center mb-12">
          <Logo width={170} height={170} />
          <View className="items-center -mt-8">
            <H2>Briefly</H2>
            <BodySmall
              className="mt-1 text-main-text-secondary"
              style={{ fontStyle: "italic" }}
            >
              Intelligence, distilled.
            </BodySmall>
          </View>
        </View>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <>
              <AppFormField
                name="email"
                placeholder="Email"
                keyboardType="email-address"
                icon="mail-outline"
              />
              <AppFormField
                name="password"
                placeholder="Password"
                secureTextEntry
                icon="lock-closed-outline"
              />
              <TouchableOpacity
                onPress={() => handleSubmit()}
                className="bg-['#067BF9'] w-full p-4 rounded-3xl mt-4 active:opacity-80"
              >
                <Text className="text-white text-center font-inter-bold text-lg">
                  Sign In
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        {/* Divider */}
        <View className="flex-row items-center my-12">
          <View className="flex-1 h-px bg-main-border" />
          <Text className="mx-4 text-main-text-tertiary text-sm font-inter">
            Or
          </Text>
          <View className="flex-1 h-px bg-main-border" />
        </View>

        {/* Social + Biometric */}
        <View className="gap-3">
          <TouchableOpacity className="flex-row items-center justify-center w-full p-4 rounded-2xl border  border-gray-300 bg-card-bg active:opacity-70">
            <Ionicons name="logo-google" size={20} color="#EA4335" />
            <Text className="ml-3 font-inter-semibold text-main-text">
              Google
            </Text>
          </TouchableOpacity>

          {Platform.OS === "ios" && (
            <TouchableOpacity
              className={`flex-row items-center justify-center w-full p-4 rounded-2xl active:opacity-70 ${isDark ? "bg-white" : "bg-black"}`}
            >
              <Ionicons
                name="logo-apple"
                size={20}
                color={isDark ? "#000" : "#fff"}
              />
              <Text
                className={`ml-3 font-inter-semibold ${isDark ? "text-black" : "text-white"}`}
              >
                Continue with Apple
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity className="flex-col gap-6 items-center justify-center w-full p-4 rounded-2xl  bg-card-bg active:opacity-70">
            <Ionicons
              name={
                Platform.OS === "ios" ? "scan-outline" : "finger-print-outline"
              }
              size={22}
              color={isDark ? "#9BA1A6" : "#687076"}
            />
            <Text className="ml-3 font-inter-semibold text-main-text">
              {Platform.OS === "ios" ? "Use Face ID" : "Tap to unlock"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
