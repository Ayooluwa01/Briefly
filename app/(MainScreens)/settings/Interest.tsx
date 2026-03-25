import React, { memo, useCallback, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Body } from "@/components/ThemedText";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: "suggested",
    label: "SUGGESTED FOR YOU",
    interests: ["Politics", "Macroeconomics", "AI Technology", "Startups"],
  },
  {
    id: "global",
    label: "GLOBAL AFFAIRS",
    interests: ["Military", "Diplomacy", "Climate Policy", "Human Rights"],
  },
  {
    id: "business",
    label: "BUSINESS & TECH",
    interests: [
      "Fintech",
      "Venture Capital",
      "Crypto",
      "SaaS",
      "Consumer Tech",
    ],
  },
  {
    id: "culture",
    label: "CULTURE & LIFESTYLE",
    interests: ["Modern Art", "Travel", "Architecture", "Sports"],
  },
] as const;

const DEFAULT_SELECTED = new Set([
  "Politics",
  "AI Technology",
  "Diplomacy",
  "Fintech",
  "Venture Capital",
  "Sports",
]);

// ─── Header ───────────────────────────────────────────────────────────────────
const Header = memo(() => (
  <View className="flex-row items-center justify-center mb-section relative">
    <TouchableOpacity
      onPress={() => router.back()}
      className="absolute left-0"
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      activeOpacity={0.6}
    >
      <Ionicons name="arrow-back" size={24} color="#111827" />
    </TouchableOpacity>
    <Body>Interests</Body>
  </View>
));
Header.displayName = "Header";

// ─── Search Box --------
const SearchBox = memo(() => {
  const inputRef = useRef<TextInput | null>(null);

  return (
    <View className="flex-row items-center bg-white px-4 py-3 rounded-full mb-section border border-gray-100">
      <Ionicons name="search-outline" size={18} color="#9CA3AF" />
      <TextInput
        ref={inputRef}
        placeholder="Find new interests..."
        placeholderTextColor="#9CA3AF"
        className="flex-1 text-sm text-gray-900 ml-2"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        style={{ paddingVertical: 0 }}
      />
    </View>
  );
});
SearchBox.displayName = "SearchBox";

// ─── Interest Pill ────────────────────────────────────────────────────────────
interface PillProps {
  name: string;
  selected: boolean;
  onPress: (name: string) => void;
}

const InterestPill = memo(({ name, selected, onPress }: PillProps) => {
  const handlePress = useCallback(() => onPress(name), [name, onPress]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.75}
      className={`flex-row items-center px-4 py-2.5 rounded-full mr-2 mb-2.5 border ${
        selected ? "bg-blue-600 border-blue-600" : "bg-white border-gray-200"
      }`}
    >
      {selected ? (
        <Ionicons
          name="checkmark"
          size={14}
          color="#fff"
          style={{ marginRight: 5 }}
        />
      ) : (
        <Ionicons
          name="add"
          size={14}
          color="#6B7280"
          style={{ marginRight: 5 }}
        />
      )}
      <Text
        className={`text-sm font-medium ${
          selected ? "text-white" : "text-gray-700"
        }`}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
});
InterestPill.displayName = "InterestPill";

// ─── Section ──────────────────────────────────────────────────────────────────
interface SectionProps {
  label: string;
  interests: readonly string[];
  selected: Set<string>;
  onToggle: (name: string) => void;
}

const Section = memo(
  ({ label, interests, selected, onToggle }: SectionProps) => (
    <View className="mb-6">
      <Text className="text-[11px] font-bold text-gray-400 tracking-widest mb-2.5">
        {label}
      </Text>
      <View className="flex-row flex-wrap">
        {interests.map((name) => (
          <InterestPill
            key={name}
            name={name}
            selected={selected.has(name)}
            onPress={onToggle}
          />
        ))}
      </View>
    </View>
  ),
);
Section.displayName = "Section";

// ─── Save Button ──────────────────────────────────────────────────────────────
interface SaveButtonProps {
  onPress: () => void;
}

const SaveButton = memo(({ onPress }: SaveButtonProps) => (
  <View className="px-4 pb-8 pt-3 bg-gray-50">
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="bg-blue-600 rounded-full py-4 items-center"
      style={{
        shadowColor: "#3b82f6",
        shadowOpacity: 0.4,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 5 },
        elevation: 8,
      }}
    >
      <Text className="text-white font-bold text-base tracking-wide">
        Save Changes
      </Text>
    </TouchableOpacity>
  </View>
));
SaveButton.displayName = "SaveButton";

// ─── Screen ───────────────────────────────────────────────────────────────────
const Interest = () => {
  const [selected, setSelected] = useState<Set<string>>(DEFAULT_SELECTED);

  const handleToggle = useCallback((name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }, []);

  const handleSave = useCallback(() => {
    console.log("Saved interests:", [...selected]);
  }, [selected]);

  return (
    <View className="flex-1 ">
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-screen-edge"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Header />
        <SearchBox />
        {SECTIONS.map((section) => (
          <Section
            key={section.id}
            label={section.label}
            interests={section.interests}
            selected={selected}
            onToggle={handleToggle}
          />
        ))}
      </ScrollView>
      <SaveButton onPress={handleSave} />
    </View>
  );
};

export default Interest;
