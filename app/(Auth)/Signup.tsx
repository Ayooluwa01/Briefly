// screens/SignupScreen.tsx
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
} from "react-native";
import { Formik, FormikErrors } from "formik";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import { useThemeStore } from "@/store/themestore";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Country, CountryCode } from "react-native-country-picker-modal"; // ← add

import { H2, BodySmall } from "@/components/ThemedText";
import { Logo } from "@/components/icons/logo";
import { AppFormField } from "@/components/inputs/Forminput";
import Google from "../../assets/Svgs/Authentication/Google.svg";
import Apple from "../../assets/Svgs/Authentication/Apple.svg";
import { CountryPickerField } from "@/components/inputs/Countrypicker";

interface SignupValues {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  password: string;
  country: string;
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required().label("Full name"),
  email: Yup.string().required().email().label("Email address"),
  countryCode: Yup.string().required().label("Country code"), // ← add label
  phoneNumber: Yup.string().required().label("Phone number"),
  password: Yup.string().required().min(8).label("Password"),
  country: Yup.string().required().label("Country"),
});

const initialValues: SignupValues = {
  fullName: "",
  email: "",
  countryCode: "+1",
  phoneNumber: "",
  password: "",
  country: "",
};

const { height } = Dimensions.get("window");
const BRAND_BLUE = "#067BF9";

export default function SignupScreen() {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";
  const [step, setStep] = useState<number>(1);

  // ← removed handleSelect — it does not belong here

  const handleSignup = (values: SignupValues) => {
    console.log("Signup Values:", values);
  };

  const handleNextStep = async (
    validateForm: () => Promise<FormikErrors<SignupValues>>,
    setFieldTouched: (field: string, isTouched?: boolean) => void,
    values: SignupValues,
  ) => {
    const errors = await validateForm();
    const isStep1Valid =
      !errors.fullName && !errors.email && values.fullName && values.email;

    if (isStep1Valid) {
      setStep(2);
    } else {
      setFieldTouched("fullName", true);
      setFieldTouched("email", true);
    }
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
        <View className="items-center mb-6">
          <Logo width={140} height={140} />
          <View className="items-center -mt-6">
            <H2>Join Briefly</H2>
            <BodySmall
              className="mt-1 text-main-text-secondary text-center"
              style={{ fontStyle: "italic" }}
            >
              Curated AI news, briefed daily.
            </BodySmall>
          </View>
        </View>

        {/* Step indicator */}
        <View className="mb-8 w-full">
          <View className="flex-row justify-between mb-3 px-1">
            <Text className="text-xs font-inter-semibold text-main-text-tertiary uppercase tracking-tighter">
              Step {step} of 2
            </Text>
            <Text className="text-xs font-inter-semibold text-info">
              {step === 1 ? "Personal Details" : "Account Security"}
            </Text>
          </View>
          <View className="flex-row gap-2 h-1.5 w-full bg-main-border rounded-full overflow-hidden">
            <MotiView
              transition={{ type: "timing", duration: 500 }}
              animate={{
                backgroundColor: step >= 1 ? BRAND_BLUE : "#E5E7EB",
                flex: 1,
              }}
              className="rounded-full"
            />
            <MotiView
              transition={{ type: "timing", duration: 500 }}
              animate={{
                backgroundColor:
                  step >= 2 ? BRAND_BLUE : isDark ? "#333" : "#E5E7EB",
                flex: 1,
              }}
              className="rounded-full"
            />
          </View>
        </View>

        {/* Social buttons */}
        <View className="gap-3">
          <TouchableOpacity className="flex-row items-center justify-center w-full p-4 rounded-2xl bg-card-bg border border-main-border active:opacity-70">
            <Google />
            <Text className="ml-3 font-inter-semibold text-main-text">
              Continue with Google
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
                style={{ color: isDark ? "#000" : "#fff" }}
              >
                Continue with Apple
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-px bg-main-border" />
          <Text className="mx-4 text-main-text-tertiary text-sm font-inter">
            Or
          </Text>
          <View className="flex-1 h-px bg-main-border" />
        </View>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSignup}
          validationSchema={validationSchema}
        >
          {({
            handleSubmit,
            validateForm,
            setFieldTouched,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View>
              {/* ── Step 1 ── */}
              {step === 1 && (
                <MotiView
                  from={{ opacity: 0, translateX: -20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                >
                  <AppFormField
                    name="fullName"
                    placeholder="Full name"
                    icon="person-outline"
                  />
                  <AppFormField
                    name="email"
                    placeholder="Email address"
                    keyboardType="email-address"
                    icon="mail-outline"
                  />
                  <TouchableOpacity
                    onPress={() =>
                      handleNextStep(validateForm, setFieldTouched, values)
                    }
                    className="mt-4 p-4 rounded-3xl active:opacity-80"
                    style={{ backgroundColor: BRAND_BLUE }}
                  >
                    <Text className="text-white text-center font-inter-bold text-lg">
                      Continue
                    </Text>
                  </TouchableOpacity>
                </MotiView>
              )}

              {/* ── Step 2 ── */}
              {step === 2 && (
                <MotiView
                  from={{ opacity: 0, translateX: 20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                >
                  <CountryPickerField
                    value={(values.country as CountryCode) || "NG"}
                    onChange={(country: Country) => {
                      setFieldValue("country", country.cca2);
                      setFieldValue(
                        "countryCode",
                        `+${country.callingCode[0]}`,
                      );
                      setFieldTouched("country", true);
                    }}
                    error={errors.country}
                    touched={touched.country}
                  />

                  <View className="flex-row gap-2 mb-4">
                    <View
                      className="bg-main-bg-secondary rounded-3xl px-4 flex-row items-center"
                      style={{ height: 58 }}
                    >
                      <Text className="text-main-text font-inter-semibold">
                        {values.countryCode || "+1"}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <AppFormField
                        name="phoneNumber"
                        placeholder="Phone number"
                        keyboardType="phone-pad"
                        icon="call-outline"
                      />
                    </View>
                  </View>

                  <AppFormField
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    icon="lock-closed-outline"
                  />

                  {/* Back + Submit */}
                  <View className="flex-row items-center gap-3 mt-4">
                    <TouchableOpacity
                      onPress={() => setStep(1)}
                      className="items-center justify-center rounded-3xl active:opacity-80 bg-card-bg border border-main-border"
                      style={{ height: 58, width: 58 }}
                    >
                      <Ionicons
                        name="arrow-back"
                        size={24}
                        color={isDark ? "#fff" : "#000"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      className="flex-1 p-4 rounded-3xl active:opacity-80"
                      style={{ backgroundColor: BRAND_BLUE }}
                    >
                      <Text className="text-white text-center font-inter-bold text-lg">
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>
                </MotiView>
              )}
            </View>
          )}
        </Formik>

        {/* Login link */}
        <TouchableOpacity
          onPress={() => router.push("/(Auth)")}
          className="mt-8 mb-8"
        >
          <BodySmall className="text-center text-main-text-secondary">
            Already have an account?{" "}
            <Text className="text-info font-inter-semibold">Log In</Text>
          </BodySmall>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
