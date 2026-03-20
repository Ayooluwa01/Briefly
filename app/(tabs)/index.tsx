import PopupExample from "@/components/modals/welcome";
import { BodyLarge, ThemedText } from "@/components/ThemedText";
import { useThemeStore } from "@/store/themestore";
import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { Button, Text, View } from "react-native";

// Topicons---Usericon, Searchicon, Bellicon, Messageicon, Settingicon, etc.
const Topicon = memo(() => {
  return (
    <View className="flex-row items-center justify-between ">
      {/* Profile icon */}
      <View className="w-10 h-10 rounded-full bg-red-700">
        <Text className="text-white text-center leading-10">U</Text>
      </View>

      {/* Briefly Text */}
      <View>
        <BodyLarge className="font-extrabold">Briefly.</BodyLarge>
      </View>
      {/* Search Icon */}
      <View>
        <View>
          <Ionicons name="search" size={24} color="black" />
        </View>
      </View>
    </View>
  );
});

Topicon.displayName = "Topicon";

export default function HomeScreen() {
  const { theme, setTheme } = useThemeStore();

  return (
    <View className="p-screen-edge">
      <Topicon />
      {/* <PopupExample /> */}
      {/* <Text className="text-lg mb-2 dark:text-white">
        Current theme: {theme}
      </Text>
      <Button title="Switch to Light" onPress={() => setTheme("light")} />
      <Button title="Switch to Dark" onPress={() => setTheme("dark")} /> */}
    </View>
  );
}
