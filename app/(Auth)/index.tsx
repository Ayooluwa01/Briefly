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
import Google from "../../assets/Svgs/Authentication/Google.svg";
import Apple from "../../assets/Svgs/Authentication/Apple.svg";
import { router } from "expo-router";

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
    router.push("/(Auth)/Otp");
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
                placeholder="Enter your email"
                keyboardType="email-address"
                icon="mail-outline"
              />
              <AppFormField
                name="password"
                placeholder="Enter your password"
                secureTextEntry
                icon="lock-closed-outline"
              />
              {/* Forgot password text  */}
              <TouchableOpacity className="self-end">
                <BodySmall className="text-blue-text font-inter-medium">
                  Forgot Password?
                </BodySmall>
              </TouchableOpacity>
              {/* Sign In + Biometric row */}
              <View className="flex-row items-center gap-3 mt-4">
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  className="flex-1 p-4 rounded-3xl active:opacity-80"
                  style={{ backgroundColor: "#067BF9" }}
                >
                  <Text className="text-white text-center font-inter-bold text-lg">
                    Login
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center justify-center p-4 rounded-3xl border border-main-border active:opacity-70">
                  <Ionicons
                    name={
                      Platform.OS === "ios"
                        ? "scan-outline"
                        : "finger-print-outline"
                    }
                    size={24}
                    color={isDark ? "#9BA1A6" : "#687076"}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-px bg-main-border" />
          <Text className="mx-4 text-main-text-tertiary text-sm font-inter">
            Or
          </Text>
          <View className="flex-1 h-px bg-main-border" />
        </View>

        {/* Social buttons */}
        <View className="gap-3">
          <TouchableOpacity className="flex-row items-center justify-center w-full p-4 rounded-2xl  bg-card-bg active:opacity-70">
            <Google />
            <Text className="ml-3 font-inter-semibold text-main-text">
              Google
            </Text>
          </TouchableOpacity>

          {Platform.OS === "ios" && (
            <TouchableOpacity
              className="flex-row items-center justify-center w-full p-4 rounded-2xl active:opacity-70"
              style={{ backgroundColor: isDark ? "#ffffff" : "#000000" }}
            >
              <Apple />
              <Text
                className="ml-3 font-inter-semibold"
                style={{ color: isDark ? "#000000" : "#ffffff" }}
              >
                Continue with Apple
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Signup Bottom Text */}
        <TouchableOpacity
          onPress={() => router.push("/(Auth)/Signup")}
          className="mt-8"
        >
          <BodySmall className="text-center text-main-text-secondary">
            Don&apos;t have an account?{" "}
            <Text className="text-blue-text font-inter-semibold">Sign Up</Text>
          </BodySmall>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
