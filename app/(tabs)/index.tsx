import { ThemedText } from "@/components/ThemedText";
import { useThemeStore } from "@/store/themestore";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const { theme, setTheme } = useThemeStore();

  return (
    <View className="p-4">
      <Text className="text-lg mb-2 dark:text-white">
        Current theme: {theme}
      </Text>
      <Button title="Switch to Light" onPress={() => setTheme("light")} />
      <Button title="Switch to Dark" onPress={() => setTheme("dark")} />
    </View>
  );
}
