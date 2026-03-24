import { Stack } from "expo-router";

export default function Settingslayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="settings" />
      <Stack.Screen name="Information" />
      <Stack.Screen name="Interest" />
      <Stack.Screen name="Subscription" />
    </Stack>
  );
}
