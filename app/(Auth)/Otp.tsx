// screens/Otp.tsx
import { Dimensions, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Backbutton } from "@/components/buttons/Backbutton";
import { H4 } from "@/components/ThemedText";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/store/themestore";
import { router } from "expo-router";
import { Numpad } from "@/components/buttons/Numpad";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");
const CODE_LENGTH = 6;
const RESEND_SECONDS = 30;
const BRAND_BLUE = "#067BF9";

export default function Otp() {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";
  const insets = useSafeAreaInsets();

  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState<string>("");
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [isVerifying, setIsVerifying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const codeRef = useRef<string[]>(code); // ← ref to read code in async context

  // keep ref in sync with state
  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  // ── timer ──────────────────────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current!);
    timerRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current!);
  }, []);

  // ── handlers ───────────────────────────────────────────────────────────────
  const handleResend = useCallback(() => {
    setCode(Array(CODE_LENGTH).fill(""));
    setError("");
    setSeconds(RESEND_SECONDS);
    startTimer();
  }, [startTimer]);

  const handleNumpad = useCallback((val: string) => {
    setError("");
    setCode((prev) => {
      const currentString = prev.join("");
      if (val === "del") {
        const newCode = currentString.slice(0, -1).split("");
        while (newCode.length < CODE_LENGTH) newCode.push("");
        return newCode;
      }
      if (currentString.length >= CODE_LENGTH) return prev;
      const newCode = (currentString + val).split("");
      while (newCode.length < CODE_LENGTH) newCode.push("");
      return newCode;
    });
  }, []);

  const handleVerify = useCallback(async () => {
    const full = codeRef.current.join("");
    if (full.length < CODE_LENGTH) {
      setError("Please enter the complete 6-digit code.");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsVerifying(false);
    if (full !== "123456") {
      setError("Invalid code. Please try again.");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setCode(Array(CODE_LENGTH).fill(""));
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push("/(Interest)");
  }, []);

  const isFull = code.every((v) => v !== "");

  return (
    <View className="flex-1 p-screen-edge">
      {/* ── top content ─────────────────────────────────────────────────── */}
      <View>
        {/* Header */}
        <View className="flex-row items-center justify-between relative">
          <View className="z-10">
            <Backbutton size={28} />
          </View>
          <View className="absolute left-0 right-0 items-center justify-center">
            <Text className="text-info font-inter-semibold text-lg">
              Briefly
            </Text>
          </View>
          <View style={{ width: 28 }} />
        </View>

        {/* Title */}
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400 }}
        >
          <View className="mt-10 items-center">
            <H4 className="font-bold">Verify Identity</H4>
            <Text className="text-main-text-secondary font-inter mt-2 text-center text-sm">
              Enter the 6-digit code sent to{"\n"}+1 (555) ***-**89
            </Text>
          </View>
        </MotiView>

        {/* OTP boxes */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400, delay: 100 }}
        >
          <View className="flex-row justify-center gap-3 mt-10">
            {code.map((digit, i) => (
              <MotiView
                key={i}
                animate={{
                  borderColor: error
                    ? "#ef4444"
                    : digit
                      ? BRAND_BLUE
                      : isDark
                        ? "#081931"
                        : "#e2e8f0",
                  scale: digit ? 1.05 : 1,
                }}
                transition={{ type: "timing", duration: 150 }}
                style={{
                  width: 48,
                  height: 58,
                  borderRadius: 14,
                  borderWidth: 1.5,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isDark ? "#13131a" : "#f8fafc",
                }}
              >
                {digit ? (
                  <Text
                    className="font-inter-bold text-xl"
                    style={{ color: isDark ? "#ECEDEE" : "#11181C" }}
                  >
                    {digit}
                  </Text>
                ) : (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: isDark ? "#334155" : "#cbd5e1",
                    }}
                  />
                )}
              </MotiView>
            ))}
          </View>

          {/* Error */}
          {error ? (
            <MotiView
              from={{ opacity: 0, translateY: -4 }}
              animate={{ opacity: 1, translateY: 0 }}
            >
              <Text className="text-error text-xs text-center mt-3 font-inter-medium">
                ⚑ {error}
              </Text>
            </MotiView>
          ) : null}

          {/* Resend */}
          <View className="flex-row justify-center items-center mt-4 gap-1">
            <Text className="text-main-text-secondary text-sm font-inter">
              Didn&apos;t receive a code?{" "}
            </Text>
            {seconds > 0 ? (
              <Text className="text-main-text-tertiary text-sm font-inter-medium">
                Resend in {seconds}s
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text className="text-info text-sm font-inter-semibold">
                  Resend
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </MotiView>

        {/* Verify button */}
        <MotiView
          animate={{ scale: isFull ? 1 : 0.97 }}
          transition={{ type: "spring", damping: 14 }}
          className="mt-8"
        >
          <TouchableOpacity
            onPress={handleVerify}
            disabled={!isFull || isVerifying}
            className="w-full p-4 rounded-3xl items-center active:opacity-80"
            style={{
              backgroundColor: isFull
                ? BRAND_BLUE
                : isDark
                  ? "#1c1c28"
                  : "#e2e8f0",
            }}
          >
            {isVerifying ? (
              <MotiView
                from={{ rotate: "0deg" }}
                animate={{ rotate: "360deg" }}
                transition={{ type: "timing", duration: 800, loop: true }}
              >
                <Ionicons name="reload-outline" size={22} color="#fff" />
              </MotiView>
            ) : (
              <Text
                className="font-inter-bold text-lg"
                style={{
                  color: isFull ? "#fff" : isDark ? "#334155" : "#94a3b8",
                }}
              >
                Verify Code
              </Text>
            )}
          </TouchableOpacity>
        </MotiView>
      </View>

      {/* ── numpad pinned to bottom ──────────────────────────────────────── */}
      <View className="flex-1 justify-end">
        <Numpad onPress={handleNumpad} />
      </View>
    </View>
  );
}
