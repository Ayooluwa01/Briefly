import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo } from "react";
import { Body } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

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
    <Body>Subscription</Body>
  </View>
));
Header.displayName = "Header";

const Subscription = () => {
  return (
    <View className="flex-1 ">
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-screen-edge"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Header />
      </ScrollView>
    </View>
  );
};

export default Subscription;

const styles = StyleSheet.create({});
