import React, { memo, useRef, useCallback } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Body } from "@/components/ThemedText";

// ─── Header ───────────────────────────────────────────────────────────────────
const Header = memo(() => (
  <View className="flex-row items-center justify-center mb-section relative">
    <TouchableOpacity
      onPress={() => router.back()}
      className="absolute left-0"
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      activeOpacity={0.6}
    >
      <Ionicons name="arrow-back" size={24} color="#111827" />
    </TouchableOpacity>
    <Body>Account Information</Body>
  </View>
));
Header.displayName = "Header";

// ─── Profile Photo Section ────────────────────────────────────────────────────
const ProfilePhotoSection = memo(() => (
  <View className="items-center mb-section">
    <View className="relative">
      <Image
        source={{ uri: "https://i.pravatar.cc/96?img=5" }}
        className="w-24 h-24 rounded-full border-4 border-orange-100"
      />
      <View className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-[7px]">
        <Ionicons name="camera" size={15} color="#111827" />
      </View>
    </View>
    <TouchableOpacity className="mt-4" activeOpacity={0.7}>
      <Text className="text-blue-500 font-semibold text-sm">
        Change Profile Photo
      </Text>
    </TouchableOpacity>
  </View>
));
ProfilePhotoSection.displayName = "ProfilePhotoSection";

// ───
interface FormFieldProps {
  label: string;
  defaultValue: string;
  iconName: keyof typeof Ionicons.glyphMap;
  editable?: boolean;
  inputRef?: React.RefObject<TextInput | null>;
  keyboardType?: "default" | "email-address" | "phone-pad";
}

const FormField = memo(
  ({
    label,
    defaultValue,
    iconName,
    editable = true,
    inputRef,
    keyboardType = "default",
  }: FormFieldProps) => (
    <View className="mb-5">
      <Text className="text-[11px] font-bold text-gray-400 tracking-widest mb-2.5">
        {label}
      </Text>
      <View className="flex-row items-center bg-white rounded-xl px-4 py-[13px] border border-gray-200">
        <TextInput
          ref={inputRef}
          defaultValue={defaultValue}
          editable={editable}
          keyboardType={keyboardType}
          className={`flex-1 text-[15px] ${editable ? "text-gray-800" : "text-gray-500"}`}
          placeholderTextColor="#9ca3af"
          autoCorrect={false}
          autoCapitalize="none"
          style={{ paddingVertical: 0 }}
        />
        <Ionicons name={iconName} size={20} color="#9ca3af" />
      </View>
    </View>
  ),
);
FormField.displayName = "FormField";

// ─── Email Field with verified badge ─────────────────────────────────────────
const EmailField = memo(({ email }: { email: string }) => (
  <View className="mb-5">
    <Text className="text-[11px] font-bold text-gray-400 tracking-widest mb-2.5">
      EMAIL ADDRESS
    </Text>
    <View className="flex-row items-center bg-white rounded-xl px-4 py-[13px] border border-gray-200">
      <TextInput
        defaultValue={email}
        editable={false}
        className="flex-1 text-[15px] text-gray-500"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={{ paddingVertical: 0 }}
      />
      <Ionicons name="mail-outline" size={20} color="#9ca3af" />
    </View>
    <View className="flex-row items-center mt-2 ml-1">
      <Ionicons name="checkmark-circle" size={16} color="#10b981" />
      <Text className="text-emerald-500 text-sm font-medium ml-1">
        Verified email
      </Text>
    </View>
  </View>
));
EmailField.displayName = "EmailField";

// ─── Account Form
const AccountForm = memo(() => {
  const fullNameRef = useRef<TextInput>(null);
  const usernameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  const handleUpdate = useCallback(() => {
    console.log("Submitting update…");
  }, []);

  return (
    <View>
      <FormField
        label="FULL NAME"
        defaultValue="Isabella Rossi"
        iconName="person-outline"
        inputRef={fullNameRef}
      />

      <FormField
        label="USERNAME"
        defaultValue="@isabella_r"
        iconName="at"
        inputRef={usernameRef}
      />

      <EmailField email="isabella.r@example.com" />

      <FormField
        label="PHONE NUMBER"
        defaultValue="+1 (555) 012-3456"
        iconName="call-outline"
        keyboardType="phone-pad"
        inputRef={phoneRef}
      />

      <View className=" mt-section mb-section">
        <Text className="text-gray-400 text-xs text-center leading-[18px]">
          Personal details are used to personalize your experience.
        </Text>
        <Text className="text-gray-400 text-xs text-center leading-[18px]">
          Your data is protected under our Privacy Policy.
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleUpdate}
        activeOpacity={0.85}
        className="bg-blue-500 rounded-full py-4 items-center mb-10"
      >
        <Text className="text-white font-bold text-base tracking-wide">
          Update Information
        </Text>
      </TouchableOpacity>
    </View>
  );
});
AccountForm.displayName = "AccountForm";

// ─── Screen Root ─────────────────────────────────────────────────────────────
const Information = () => (
  <ScrollView
    className="flex-1 p-screen-edge bg-gray-100"
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
    <Header />
    <ProfilePhotoSection />
    <AccountForm />
  </ScrollView>
);

export default Information;
