import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import { useDeviceDimensionsStore } from "@/store/themestore";

interface ErrorScreenProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorScreen = ({
  title = "Something went wrong",
  message = "We couldn't load your content. Check your connection and try again.",
  onRetry,
}: ErrorScreenProps) => {
  const { width } = useDeviceDimensionsStore();

  return (
    <View className="flex-1  items-center justify-center px-9 overflow-hidden">
      <MotiView
        style={{
          position: "absolute",
          width: width * 0.85,
          height: width * 0.85,
          borderRadius: width * 0.425,
          backgroundColor: "#FF3B30",
          top: -width * 0.2,
          right: -width * 0.2,
          opacity: 0.15,
        }}
        from={{ opacity: 0.15, scale: 1 }}
        animate={{ opacity: 0.3, scale: 1.15 }}
        transition={{
          type: "timing",
          duration: 3200,
          easing: Easing.inOut(Easing.sin),
          loop: true,
          repeatReverse: true,
        }}
      />
      <MotiView
        style={{
          position: "absolute",
          width: width * 0.7,
          height: width * 0.7,
          borderRadius: width * 0.35,
          backgroundColor: "#FF6B35",
          bottom: -width * 0.18,
          left: -width * 0.18,
          opacity: 0.1,
        }}
        from={{ opacity: 0.1, scale: 1 }}
        animate={{ opacity: 0.22, scale: 1.2 }}
        transition={{
          type: "timing",
          duration: 4100,
          easing: Easing.inOut(Easing.sin),
          loop: true,
          repeatReverse: true,
          delay: 600,
        }}
      />

      {/* Icon container */}
      <MotiView
        className="items-center justify-center mb-9"
        from={{ opacity: 0, translateY: 24, scale: 0.85 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        transition={{ type: "spring", damping: 18, stiffness: 120, delay: 100 }}
      >
        {/* Outer ring pulse */}
        <MotiView
          className="absolute w-[120px] h-[120px] rounded-full border-[1.5px] border-[#FF3B30]"
          from={{ opacity: 0.2, scale: 0.88 }}
          animate={{ opacity: 0, scale: 1.45 }}
          transition={{
            type: "timing",
            duration: 2000,
            easing: Easing.out(Easing.quad),
            loop: true,
            delay: 800,
          }}
        />
        {/* Inner ring pulse */}
        <MotiView
          className="absolute w-24 h-24 rounded-full border-[1.5px] border-[#FF3B30]"
          from={{ opacity: 0.3, scale: 0.9 }}
          animate={{ opacity: 0, scale: 1.25 }}
          transition={{
            type: "timing",
            duration: 2000,
            easing: Easing.out(Easing.quad),
            loop: true,
            delay: 1200,
          }}
        />

        {/* Icon circle */}
        <View className="w-[72px] h-[72px] rounded-full bg-[#1C1014] border-[1.5px] border-[#FF3B3066] items-center justify-center">
          {/* Exclamation bar */}
          <View className="w-[3px] h-[22px] rounded-sm bg-[#FF3B30] -mb-0.5" />
          {/* Exclamation dot */}
          <View className="w-1 h-1 rounded-sm bg-[#FF3B30] mt-1" />
        </View>
      </MotiView>

      {/* Title */}
      <MotiView
        from={{ opacity: 0, translateY: 18 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 520,
          delay: 320,
          easing: Easing.out(Easing.cubic),
        }}
      >
        <Text className="font-serif text-2xl font-bold text-[#F5F0EB] text-center tracking-tight mb-3">
          {title}
        </Text>
      </MotiView>

      {/* Message */}
      <MotiView
        from={{ opacity: 0, translateY: 14 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: "timing",
          duration: 520,
          delay: 450,
          easing: Easing.out(Easing.cubic),
        }}
      >
        <Text className="font-serif text-[15px] text-[#8A8480] text-center leading-6 tracking-wide">
          {message}
        </Text>
      </MotiView>

      {/* Divider */}
      <MotiView
        className="w-10 h-px bg-[#2A2420] my-7"
        from={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{
          type: "timing",
          duration: 600,
          delay: 560,
          easing: Easing.out(Easing.cubic),
        }}
      />

      {/* Retry button */}
      {onRetry && (
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 480,
            delay: 680,
            easing: Easing.out(Easing.cubic),
          }}
        >
          <TouchableOpacity
            className="py-[14px] px-10 rounded-[14px] bg-[#FF3B30]"
            style={{
              shadowColor: "#FF3B30",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.35,
              shadowRadius: 20,
              elevation: 10,
            }}
            onPress={onRetry}
            activeOpacity={0.78}
          >
            <Text className="font-serif text-[15px] font-bold text-white tracking-wide">
              Try again
            </Text>
          </TouchableOpacity>
        </MotiView>
      )}

      {/* Error code tag */}
      <MotiView
        className="absolute bottom-12 py-[5px] px-[10px] rounded-md bg-[#1A1214] border border-[#2A2020]"
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 500, delay: 900 }}
      >
        <Text
          style={{ fontFamily: "Courier New" }}
          className="text-[10px] text-[#4A3A38] tracking-[1.2px]"
        >
          ERR_LOAD_FAILED
        </Text>
      </MotiView>
    </View>
  );
};

export default ErrorScreen;
