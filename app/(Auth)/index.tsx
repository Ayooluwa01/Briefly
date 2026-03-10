import { StyleSheet, View } from "react-native";
import React from "react";
import { Logo } from "@/components/icons/logo";
import { BodySmall, H1, H2 } from "@/components/ThemedText";

export default function Loginscreen() {
  return (
    <View className="flex-1 justify-center items-center px-6 bg-white">
      <View className="items-center">
        <Logo width={170} height={170} />

        <View className="items-center -mt-7">
          <H1 className="text-center mb-2">Briefly.</H1>
          <BodySmall className="text-center mt-1 text-gray-500">
            Intelligence, distilled.
          </BodySmall>
        </View>
      </View>
    </View>
  );
}
