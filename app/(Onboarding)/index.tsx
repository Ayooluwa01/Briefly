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

const { width, height } = Dimensions.get("window");

const ONBOARDING_DATA = [
  {
    id: 1,
    title: "Discover\nYour Journey",
    description:
      "Embark on an experience designed to transform the way you interact with possibilities",
    color: "#0A0E27",
    accentColor: "#FF6B9D",
    icon: "✨",
  },
  {
    id: 2,
    title: "Connect\nSeamlessly",
    description:
      "Bridge the gap between imagination and reality with fluid, intuitive interactions",
    color: "#1A1F3A",
    accentColor: "#00D9FF",
    icon: "🌊",
  },
  {
    id: 3,
    title: "Create\nBoldly",
    description:
      "Unleash your potential and craft experiences that resonate with authentic expression",
    color: "#0D1B2A",
    accentColor: "#FFB800",
    icon: "🚀",
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const scrollViewRef = React.useRef(null);

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
    }
  };

  const goToPage = (index) => {
    scrollViewRef.current?.scrollTo({
      x: width * index,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
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

  const animatedStyle = useAnimatedStyle(() => {
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
      [-20, 0, 20],
      Extrapolate.CLAMP,
    );

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.6, 1.2, 0.6],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ rotate: `${rotate}deg` }, { scale }],
    };
  });

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      [width * 0.5, 0, -width * 0.5],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View style={[styles.page, { backgroundColor: item.color }]}>
      <Animated.View style={[styles.backgroundCircle, backgroundAnimatedStyle]}>
        <View style={[styles.circle, { backgroundColor: item.accentColor }]} />
      </Animated.View>

      <Animated.View style={[styles.content, animatedStyle]}>
        <Animated.Text style={[styles.icon, iconAnimatedStyle]}>
          {item.icon}
        </Animated.Text>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
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
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <Dot
            key={index}
            index={index}
            scrollX={scrollX}
            currentIndex={currentIndex}
            accentColor={data[currentIndex].accentColor}
            onPress={() => onDotPress(index)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: data[currentIndex].accentColor },
        ]}
        onPress={onNextPress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {currentIndex === data.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Dot = ({ index, scrollX, currentIndex, accentColor, onPress }: any) => {
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
            backgroundColor: currentIndex === index ? accentColor : "#ffffff40",
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0E27",
  },
  page: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundCircle: {
    position: "absolute",
    top: height * 0.15,
    right: -width * 0.3,
  },
  circle: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    opacity: 0.15,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 40,
    zIndex: 1,
  },
  icon: {
    fontSize: 120,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 56,
    letterSpacing: -1,
    fontFamily: "System",
  },
  description: {
    fontSize: 17,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 26,
    opacity: 0.8,
    fontWeight: "400",
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    gap: 32,
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  button: {
    paddingHorizontal: 48,
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: "#0A0E27",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
});

export default OnboardingScreen;
