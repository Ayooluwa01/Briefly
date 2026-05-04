import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";

export default function Reader() {
  const { url } = useLocalSearchParams<{ url: string }>();
  if (!url) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <WebView
      source={{ uri: url }}
      style={{ flex: 1 }}
      className="p-screen-edge"
      startInLoadingState={true}
      renderLoading={() => (
        <ActivityIndicator
          style={{ position: "absolute", top: "50%", left: "50%" }}
        />
      )}
    />
  );
}
