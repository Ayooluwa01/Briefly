import { View, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";

export default function reader() {
  return (
    <WebView
      source={{ uri: "https://reactnative.dev/" }}
      style={{ flex: 1 }}
      className="p-screen-edge"
    />
  );
}
