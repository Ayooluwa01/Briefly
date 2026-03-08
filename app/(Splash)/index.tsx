import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Button,
  Text,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Appicon from "../../assets/Svgs/Appicon.svg";
import { BodySmall, H1 } from "@/components/ThemedText";
import { useThemeStore } from "@/store/themestore";

const { height } = Dimensions.get("window");

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.sequence([
      // Logo animation
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Text slide up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View className="flex-1  justify-between items-center ">
      {/* Main Content */}

      <View className="flex-1 justify-center items-center">
        {/* Logo with Animation */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Appicon width={170} height={170} />
        </Animated.View>

        {/* Text Content */}
        <Animated.View
          className="items-center"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <H1 className="text-center mb-2">Briefly.</H1>
          <BodySmall className="text-gray-600 dark:text-gray-400 text-center">
            Intelligent News Curation
          </BodySmall>
        </Animated.View>
      </View>

      {/* Footer */}
      <Animated.View
        className="pb-12 items-center"
        style={{ opacity: fadeAnim }}
      >
        <BodySmall className=" text-center">
          News that respects your time...
        </BodySmall>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
