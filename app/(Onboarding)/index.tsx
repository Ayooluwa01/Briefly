import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
  withSpring,
  withTiming,
  withSequence,
  withRepeat,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import Onboarding1svg from "../../assets/Svgs/Onboarding/Onboarding1.svg";
import Onboarding2svg from "../../assets/Svgs/Onboarding/Onboarding2.svg";
import Onboarding3svg from "../../assets/Svgs/Onboarding/Onboarding3.svg";

import { Body, BodySmall, H2, H3 } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFirstLaunch } from "@/store/settingstore";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const ONBOARDING_DATA = [
  {
    icon: Onboarding1svg,
    iconsize: 300,
    id: 1,
    title: "Stay ahead of\nthe world",
    description: "Briefly brings you the stories that matter, curated by AI",
    accentColor: "#067BF9",
    gradientColors: ["#EBF4FF", "#F0F9FF"],
    features: [
      { icon: "newspaper-outline", text: "Breaking news alerts" },
      { icon: "trending-up-outline", text: "Trending stories" },
      { icon: "globe-outline", text: "Global coverage" },
    ],
  },
  {
    icon: Onboarding2svg,
    iconsize: 400,
    id: 2,
    title: "News in 3 bullets.",
    description:
      "Our AI digests long-form articles into three intelligent takeaways, saving you hours every week.",
    accentColor: "#067BF9",
    gradientColors: ["#F0F9FF", "#EBF4FF"],
    features: [
      { icon: "flash-outline", text: "Instant summaries" },
      { icon: "time-outline", text: "Save 10+ hours/week" },
      { icon: "analytics-outline", text: "AI-powered insights" },
    ],
  },
  {
    icon: Onboarding3svg,
    iconsize: 400,
    id: 3,
    title: "Listen on the go.",
    description:
      "Turn your personalized news feed into a daily audio show. Perfect for your commute or workout.",
    accentColor: "#067BF9",
    gradientColors: ["#EBF4FF", "#F0F9FF"],
    features: [
      { icon: "headset-outline", text: "Audio playback" },
      { icon: "car-outline", text: "Hands-free mode" },
      { icon: "fitness-outline", text: "Perfect for workouts" },
    ],
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const scrollViewRef = React.useRef<Animated.ScrollView>(null);
  const router = useRouter();
  const setFirstLaunch = useFirstLaunch((state) => state.setFirstLaunch);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onMomentumEnd: (event) => {
      const index = Math.round(event.contentOffset.x / width);
      runOnJS(setCurrentIndex)(index);
    },
  });

  const completeOnboarding = () => {
    setFirstLaunch(false);
    router.replace("/(tabs)");
  };

  const goToNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: width * nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      completeOnboarding();
    }
  };

  const skipOnboarding = () => {
    completeOnboarding();
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-950">
      {/* Animated Background Gradient */}
      <AnimatedBackground scrollX={scrollX} data={ONBOARDING_DATA} />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Skip Button - Top Right */}
      {currentIndex < ONBOARDING_DATA.length - 1 && (
        <View className="absolute top-12 right-6 z-20">
          <TouchableOpacity
            onPress={skipOnboarding}
            className="py-2 px-4 bg-white/80 dark:bg-gray-800/80 rounded-full backdrop-blur"
            activeOpacity={0.7}
            style={styles.skipButton}
          >
            <BodySmall className="text-gray-700 dark:text-gray-300 font-semibold">
              Skip
            </BodySmall>
          </TouchableOpacity>
        </View>
      )}

      {/* Progress Bar - Top */}
      <View className="absolute top-12 left-6 right-20 z-20">
        <ProgressBar
          currentIndex={currentIndex}
          total={ONBOARDING_DATA.length}
        />
      </View>

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {ONBOARDING_DATA.map((item, index) => (
          <OnboardingPage
            key={item.id}
            item={item}
            index={index}
            scrollX={scrollX}
          />
        ))}
      </Animated.ScrollView>

      <BottomAnimator
        data={ONBOARDING_DATA}
        scrollX={scrollX}
        currentIndex={currentIndex}
        onNextPress={goToNext}
      />
    </View>
  );
};

const AnimatedBackground = ({ scrollX, data }: any) => {
  const inputRange = data.map((_: any, i: number) => i * width);

  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolate(
      scrollX.value,
      inputRange,
      ["#F8FAFC", "#F0F9FF", "#F8FAFC"],
      Extrapolate.CLAMP,
    );

    return {
      backgroundColor: `rgb(${backgroundColor})`,
    };
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, backgroundStyle]} />
  );
};

const FloatingParticles = () => {
  const particles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {particles.map((particleIndex) => (
        <FloatingParticle key={particleIndex} index={particleIndex} />
      ))}
    </View>
  );
};

const FloatingParticle = ({ index }: { index: number }) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0.1);
  const scale = useSharedValue(1);

  useEffect(() => {
    const duration = 3000 + Math.random() * 2000;
    const delay = Math.random() * 1000;

    translateY.value = withRepeat(
      withSequence(
        withTiming(-30, {
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(30, {
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,
      true,
    );

    translateX.value = withRepeat(
      withSequence(
        withTiming(20, {
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(-20, {
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,
      true,
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: duration / 2 }),
        withTiming(0.1, { duration: duration / 2 }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  const size = 40 + Math.random() * 60;
  const top = Math.random() * height;
  const left = Math.random() * width;

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top,
          left,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "#067BF9",
        },
        animatedStyle,
      ]}
    />
  );
};

const ProgressBar = ({
  currentIndex,
  total,
}: {
  currentIndex: number;
  total: number;
}) => {
  const bars = Array.from({ length: total }, (_, i) => i);

  return (
    <View className="flex-row gap-1.5">
      {bars.map((index) => (
        <View
          key={index}
          className="h-1 flex-1 rounded-full overflow-hidden bg-gray-200/50 dark:bg-gray-700/50"
        >
          <Animated.View
            className="h-full bg-blue-500"
            style={{
              width: currentIndex >= index ? "100%" : "0%",
            }}
          />
        </View>
      ))}
    </View>
  );
};

const OnboardingPage = ({ item, index, scrollX }: any) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const contentAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.7, 1, 0.7],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [80, 0, 80],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ scale }, { translateY }],
      opacity,
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      scrollX.value,
      inputRange,
      [-15, 0, 15],
      Extrapolate.CLAMP,
    );

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolate.CLAMP,
    );

    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [100, 0, -100],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.2, 1, 0.2],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ rotate: `${rotate}deg` }, { scale }, { translateY }],
      opacity,
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      [-50, 0, 50],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ translateX }],
      opacity,
    };
  });

  const descriptionAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      [50, 0, -50],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ translateX }],
      opacity: withTiming(opacity, { duration: 300 }),
    };
  });

  const featuresAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [100, 0, -100],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ translateY }],
      opacity: withTiming(opacity, { duration: 400 }),
    };
  });

  return (
    <View
      style={{ width }}
      className="flex-1 items-center justify-between px-6 pt-32 pb-8"
    >
      {/* Icon Section with Glow Effect */}
      <Animated.View style={iconAnimatedStyle} className="mb-4">
        <View className="relative">
          {/* Glow effect */}
          <View
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: item.accentColor,
              opacity: 0.1,
              transform: [{ scale: 1.3 }],
              shadowColor: item.accentColor,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 40,
              elevation: 10,
            }}
          />
          <item.icon width={item.iconsize} height={item.iconsize} />
        </View>
      </Animated.View>

      {/* Text Content with Card Background */}
      <Animated.View
        style={contentAnimatedStyle}
        className="items-center w-full"
      >
        {/* Title */}
        <Animated.View style={titleAnimatedStyle} className="mb-3">
          <H2 className="text-center leading-tight text-gray-900 dark:text-white">
            {item.title}
          </H2>
        </Animated.View>

        {/* Description */}
        <Animated.View style={descriptionAnimatedStyle} className="mb-8">
          <Body className="text-center px-2 text-gray-600 dark:text-gray-400 leading-relaxed">
            {item.description}
          </Body>
        </Animated.View>

        {/* Features List */}
        <Animated.View style={featuresAnimatedStyle} className="w-full px-4">
          <View className="bg-white/60 dark:bg-gray-800/60 rounded-2xl p-5 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50">
            {item.features.map((feature: any, idx: number) => (
              <View
                key={idx}
                className={`flex-row items-center ${idx !== item.features.length - 1 ? "mb-4" : ""}`}
              >
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: `${item.accentColor}15` }}
                >
                  <Ionicons
                    name={feature.icon as any}
                    size={20}
                    color={item.accentColor}
                  />
                </View>
                <Text className="text-gray-700 dark:text-gray-300 font-medium flex-1">
                  {feature.text}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </Animated.View>

      {/* Page Number Indicator */}
      <Animated.View style={contentAnimatedStyle} className="mt-4">
        <BodySmall className="text-gray-400 dark:text-gray-600">
          {index + 1} of {ONBOARDING_DATA.length}
        </BodySmall>
      </Animated.View>
    </View>
  );
};

const BottomAnimator = ({ data, scrollX, currentIndex, onNextPress }: any) => {
  const isLastSlide = currentIndex === data.length - 1;
  const buttonScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handlePress = () => {
    buttonScale.value = withSequence(
      withSpring(0.95, { damping: 10 }),
      withSpring(1, { damping: 10 }),
    );
    onNextPress();
  };

  return (
    <View className="px-6 pb-10">
      {/* Pagination Dots */}
      <View className="flex-row justify-center items-center mb-6 gap-2">
        {data.map((_: any, index: number) => (
          <Dot
            key={index}
            index={index}
            scrollX={scrollX}
            currentIndex={currentIndex}
          />
        ))}
      </View>

      {/* Next/Get Started Button */}
      <Animated.View style={buttonAnimatedStyle}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={handlePress}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={["#067BF9", "#0560D1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <View className="flex-row items-center justify-center gap-2">
              <Text style={styles.buttonText}>
                {isLastSlide ? "Get Started" : "Next"}
              </Text>
              <Ionicons
                name={isLastSlide ? "checkmark-circle" : "arrow-forward"}
                size={22}
                color="#FFFFFF"
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const Dot = ({ index, scrollX, currentIndex }: any) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const animatedStyle = useAnimatedStyle(() => {
    const dotWidth = interpolate(
      scrollX.value,
      inputRange,
      [8, 32, 8],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolate.CLAMP,
    );

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.8, 1.2, 0.8],
      Extrapolate.CLAMP,
    );

    return {
      width: withSpring(dotWidth, { damping: 15, stiffness: 120 }),
      opacity: withTiming(opacity, { duration: 300 }),
      transform: [{ scale: withSpring(scale, { damping: 12 }) }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        animatedStyle,
        {
          backgroundColor: currentIndex === index ? "#067BF9" : "#CBD5E1",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skipButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  button: {
    borderRadius: 999,
    overflow: "hidden",
    shadowColor: "#067BF9",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  gradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default OnboardingScreen;
