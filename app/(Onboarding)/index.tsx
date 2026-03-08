import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Onboarding1svg from "../../assets/Svgs/Onboarding/Onboarding1.svg";
import Onboarding2svg from "../../assets/Svgs/Onboarding/Onboarding2.svg";
import Onboarding3svg from "../../assets/Svgs/Onboarding/Onboarding3.svg";

import { Body, BodySmall, H2 } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const ONBOARDING_DATA = [
  {
    icon: Onboarding1svg,
    iconsize: 300,
    id: 1,
    title: "Stay ahead of\nthe world",
    description: "Briefly brings you the stories that matter, curated by AI",
    accentColor: "#067BF9",
  },
  {
    icon: Onboarding2svg,
    iconsize: 400,
    id: 2,
    title: "News in 3 bullets.",
    description:
      "Our AI digests long-form articles into three intelligent takeaways, saving you hours every week.",
    accentColor: "#067BF9",
  },
  {
    icon: Onboarding3svg,
    iconsize: 400,
    id: 3,
    title: "Listen on the go.",
    description:
      "Turn your personalized news feed into a daily audio show. Perfect for your commute or workout.",
    accentColor: "#067BF9",
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const scrollViewRef = React.useRef<Animated.ScrollView>(null);
  const router = useRouter();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const goToNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: width * (currentIndex + 1),
        animated: true,
      });
    } else {
      router.replace("/(tabs)");
    }
  };

  const goToPage = (index: number) => {
    router.replace("/(tabs)");
  };

  return (
    <View className="flex-1 ">
      {/* Skip Button - Top Right */}
      {currentIndex < ONBOARDING_DATA.length - 1 && (
        <View className="absolute top-12 right-6 z-10">
          <TouchableOpacity
            onPress={() => goToPage(ONBOARDING_DATA.length - 1)}
            className="py-2 px-4"
          >
            <BodySmall className="text-gray-500 dark:text-gray-400">
              Skip
            </BodySmall>
          </TouchableOpacity>
        </View>
      )}

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
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
        onDotPress={goToPage}
        onNextPress={goToNext}
      />
    </View>
  );
};

const OnboardingPage = ({ item, index, scrollX }: any) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const contentAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.8, 1, 0.8],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolate.CLAMP,
    );

    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [50, 0, 50],
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
      [-10, 0, 10],
      Extrapolate.CLAMP,
    );

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.8, 1, 0.8],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ rotate: `${rotate}deg` }, { scale }],
    };
  });

  return (
    <View
      style={{ width }}
      className="flex-1 items-center justify-center px-8 pt-20"
    >
      {/* Icon Section */}
      <Animated.View style={iconAnimatedStyle} className="mb-8">
        <item.icon width={item.iconsize} height={item.iconsize} />
      </Animated.View>

      {/* Text Content */}
      <Animated.View style={contentAnimatedStyle} className="items-center">
        <H2 className="text-center mb-4 leading-tight">{item.title}</H2>
        <Body className="text-center px-4">{item.description}</Body>
      </Animated.View>
    </View>
  );
};

const BottomAnimator = ({
  data,
  scrollX,
  currentIndex,
  onDotPress,
  onNextPress,
}: any) => {
  const isLastSlide = currentIndex === data.length - 1;

  return (
    <View className="px-8 pb-12">
      {/* Pagination Dots */}
      <View className="flex-row justify-center items-center mb-8 gap-2">
        {data.map((_: any, index: number) => (
          <Dot
            key={index}
            index={index}
            scrollX={scrollX}
            currentIndex={currentIndex}
            onPress={() => onDotPress(index)}
          />
        ))}
      </View>

      {/* Next/Get Started Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#067BF9" }]}
        onPress={onNextPress}
        activeOpacity={0.8}
      >
        <View className="flex-row items-center justify-center gap-2">
          <Text style={styles.buttonText}>
            {isLastSlide ? "Get Started" : "Next"}
          </Text>
          <Ionicons
            name={isLastSlide ? "checkmark-circle" : "arrow-forward"}
            size={20}
            color="#FFFFFF"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Dot = ({ index, scrollX, currentIndex, onPress }: any) => {
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

    return {
      width: withSpring(dotWidth, { damping: 15, stiffness: 100 }),
      opacity: withTiming(opacity, { duration: 300 }),
    };
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Animated.View
        style={[
          styles.dot,
          animatedStyle,
          {
            backgroundColor: currentIndex === index ? "#067BF9" : "#E2E8F0",
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 8,
    borderRadius: 4,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default OnboardingScreen;
