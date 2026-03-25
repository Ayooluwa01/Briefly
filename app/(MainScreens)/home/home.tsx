import { BodyLarge } from "@/components/ThemedText";
import { useFetchNews } from "@/hooks/Queries/useNews";
import { Ionicons } from "@expo/vector-icons";
import { memo, useCallback, useMemo } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView, MotiText, useAnimationState } from "moti";
import { router } from "expo-router";
import { HomeSkeleton } from "@/components/Reusables/skeletons";
import ErrorScreen from "@/components/errors/error";

interface Article {
  id: string;
  title: string;
  description: string;
  image?: string;
  source?: { name: string };
  publishedAt?: string;
}

// ── Stable transition objects (defined outside components to prevent recreation) ──
const SPRING_CARD = { type: "spring", damping: 20, stiffness: 200 } as const;
const SPRING_ARROW = { type: "spring", damping: 16, stiffness: 220 } as const;
const SPRING_SLOW = {
  type: "spring",
  damping: 18,
  stiffness: 120,
  delay: 100,
} as const;
const SPRING_BADGE = {
  type: "spring",
  damping: 14,
  stiffness: 180,
  delay: 350,
} as const;
const SPRING_SOURCE = {
  type: "spring",
  damping: 16,
  stiffness: 150,
  delay: 450,
} as const;
const SPRING_TITLE = {
  type: "spring",
  damping: 18,
  stiffness: 130,
  delay: 550,
} as const;
const SPRING_DESC = {
  type: "spring",
  damping: 18,
  stiffness: 130,
  delay: 650,
} as const;
const SPRING_FOOTER = {
  type: "spring",
  damping: 18,
  stiffness: 130,
  delay: 780,
} as const;
const SPRING_BN = {
  type: "spring",
  damping: 18,
  stiffness: 120,
  delay: 100,
} as const;
const SPRING_BN_BADGE = {
  type: "spring",
  damping: 16,
  stiffness: 160,
  delay: 250,
} as const;
const SPRING_BN_HEAD = {
  type: "spring",
  damping: 16,
  stiffness: 140,
  delay: 370,
} as const;
const TIMING_IMAGE = { type: "timing", duration: 600, delay: 200 } as const;
const TIMING_LINE = { type: "timing", duration: 400, delay: 500 } as const;
const TIMING_DIVIDER = { type: "timing", duration: 400, delay: 720 } as const;
const TIMING_PULSE = {
  type: "timing",
  duration: 750,
  loop: true,
  repeatReverse: true,
} as const;
const TIMING_PULSE_BN = {
  type: "timing",
  duration: 700,
  loop: true,
  repeatReverse: true,
} as const;

// Stable from/animate objects ──
const FROM_CARD = { opacity: 0, translateY: 24 } as const;
const ANIM_CARD = { opacity: 1, translateY: 0 } as const;
const FROM_IMAGE = { opacity: 1.05, scale: 1.06 } as const;
const ANIM_IMAGE = { opacity: 1, scale: 1 } as const;
const FROM_BADGE = { opacity: 0, scale: 0.8 } as const;
const ANIM_BADGE = { opacity: 1, scale: 1 } as const;
const FROM_SOURCE = { opacity: 0, translateX: 12 } as const;
const ANIM_SOURCE = { opacity: 1, translateX: 0 } as const;
const FROM_LINE = { width: 0, opacity: 0 } as const;
const ANIM_LINE = { width: 36, opacity: 1 } as const;
const FROM_TITLE = { opacity: 0, translateY: 14 } as const;
const ANIM_TITLE = { opacity: 1, translateY: 0 } as const;
const FROM_DESC = { opacity: 0, translateY: 10 } as const;
const FROM_DIVIDER = { opacity: 0, scaleX: 0 } as const;
const ANIM_DIVIDER = { opacity: 1, scaleX: 1 } as const;
const FROM_FOOTER = { opacity: 0, translateY: 8 } as const;
const FROM_DOT_PULSE = { opacity: 1, scale: 1 } as const;
const ANIM_DOT_PULSE = { opacity: 0.3, scale: 0.6 } as const;
const FROM_BN_BADGE = { opacity: 0, translateX: -10 } as const;
const ANIM_BN_BADGE = { opacity: 1, translateX: 0 } as const;
const FROM_BN_HEAD = { opacity: 0, translateY: 8 } as const;
const ANIM_BN_HEAD = { opacity: 1, translateY: 0 } as const;
const FROM_BN_DOT = { opacity: 1, scale: 1 } as const;
const ANIM_BN_DOT = { opacity: 0.25, scale: 0.55 } as const;

// ── Gradient arrays (
const GRADIENT_BN = ["#ff3b30", "#ef4444", "#dc2626"] as const;
const GRADIENT_CINEMATIC = [
  "transparent",
  "rgba(0,0,0,0.1)",
  "rgba(0,0,0,0.55)",
  "rgba(0,0,0,0.93)",
] as const;
const GRADIENT_THUMB = ["transparent", "rgba(0,0,0,0.28)"] as const;
const GRADIENT_LOCS = [0, 0.3, 0.62, 1] as const;
const GRADIENT_START = { x: 0, y: 0 } as const;
const GRADIENT_END = { x: 1, y: 1 } as const;

// ── Topicon ──
const Topicon = memo(() => {
  return (
    <View className="flex-row items-center justify-center relative">
      <View>
        <BodyLarge className="font-extrabold">
          <Text>Briefly.</Text>
        </BodyLarge>
      </View>
      <View className="right-0 absolute">
        <Ionicons name="search" size={24} color="black" />
      </View>
    </View>
  );
});
Topicon.displayName = "Topicon";

// ── BreakingNews ──
const BreakingNews = memo(() => {
  const cardState = useAnimationState({
    idle: { scale: 1 },
    pressed: { scale: 0.97 },
  });

  const arrowState = useAnimationState({
    idle: { translateX: 0 },
    pressed: { translateX: 5 },
  });

  const handlePressIn = useCallback(() => {
    cardState.transitionTo("pressed");
    arrowState.transitionTo("pressed");
    router.push("/home/reader");
  }, [cardState, arrowState]);

  const handlePressOut = useCallback(() => {
    cardState.transitionTo("idle");
    arrowState.transitionTo("idle");
  }, [cardState, arrowState]);

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <MotiView
        from={FROM_CARD}
        animate={ANIM_CARD}
        transition={SPRING_BN}
        state={cardState}
        style={{ marginVertical: 10, borderRadius: 20, overflow: "hidden" }}
      >
        <LinearGradient
          colors={GRADIENT_BN}
          start={GRADIENT_START}
          end={GRADIENT_END}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 18,
          }}
        >
          <View style={{ flex: 1, gap: 5 }}>
            <MotiView
              from={FROM_BN_BADGE}
              animate={ANIM_BN_BADGE}
              transition={SPRING_BN_BADGE}
              style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
            >
              <MotiView
                from={FROM_BN_DOT}
                animate={ANIM_BN_DOT}
                transition={TIMING_PULSE_BN}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: "white",
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "800",
                  color: "rgba(255,255,255,0.85)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                Breaking News
              </Text>
            </MotiView>

            <MotiText
              from={FROM_BN_HEAD}
              animate={ANIM_BN_HEAD}
              transition={SPRING_BN_HEAD}
              style={{
                fontSize: 15,
                fontWeight: "800",
                color: "white",
                lineHeight: 21,
                letterSpacing: -0.2,
                paddingRight: 12,
              }}
              numberOfLines={2}
            >
              Global Market Shift: Tech Stocks Rally
            </MotiText>
          </View>

          <MotiView state={arrowState} transition={SPRING_ARROW}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.35)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="arrow-forward" size={18} color="white" />
            </View>
          </MotiView>
        </LinearGradient>

        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: "rgba(255,255,255,0.3)",
          }}
        />
      </MotiView>
    </Pressable>
  );
});
BreakingNews.displayName = "BreakingNews";

// ── Topstory
const Topstory = memo(() => {
  const { data } = useFetchNews();

  const topArticle = data?.pages?.[0]?.articles?.[0];
  const cardState = useAnimationState({
    idle: { scale: 1 },
    pressed: { scale: 0.972 },
  });

  const arrowState = useAnimationState({
    idle: { translateX: 0 },
    pressed: { translateX: 6 },
  });

  const handlePressIn = useCallback(() => {
    cardState.transitionTo("pressed");
    arrowState.transitionTo("pressed");
  }, [cardState, arrowState]);

  const handlePressOut = useCallback(() => {
    cardState.transitionTo("idle");
    arrowState.transitionTo("idle");
  }, [cardState, arrowState]);

  if (!topArticle) return null;

  return (
    <MotiView
      from={FROM_CARD}
      animate={ANIM_CARD}
      transition={SPRING_SLOW}
      style={{ marginBottom: 24 }}
    >
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <MotiView
          state={cardState}
          transition={SPRING_CARD}
          style={{ borderRadius: 24, overflow: "hidden" }}
        >
          <View style={{ height: 420 }}>
            {topArticle.image ? (
              <MotiView style={{ width: "100%", height: "100%" }}>
                <Image
                  source={{ uri: topArticle.image }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </MotiView>
            ) : (
              <View style={{ flex: 1, backgroundColor: "#0f0f14" }} />
            )}

            <LinearGradient
              colors={GRADIENT_CINEMATIC}
              locations={GRADIENT_LOCS}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />

            {/* Badge row */}
            <View
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                right: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <MotiView
                from={FROM_BADGE}
                animate={ANIM_BADGE}
                transition={SPRING_BADGE}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#067BF9",
                  borderRadius: 100,
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                  gap: 6,
                }}
              >
                <MotiView
                  from={FROM_DOT_PULSE}
                  animate={ANIM_DOT_PULSE}
                  transition={TIMING_PULSE}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "white",
                  }}
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "800",
                    color: "white",
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                  }}
                >
                  Top Story
                </Text>
              </MotiView>

              {topArticle.source?.name && (
                <MotiView
                  from={FROM_SOURCE}
                  animate={ANIM_SOURCE}
                  transition={SPRING_SOURCE}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.14)",
                    borderRadius: 100,
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.22)",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "600",
                      color: "rgba(255,255,255,0.88)",
                      letterSpacing: 0.4,
                    }}
                  >
                    {topArticle.source.name}
                  </Text>
                </MotiView>
              )}
            </View>

            {/* Bottom content */}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: 24,
              }}
            >
              <MotiView
                from={FROM_LINE}
                animate={ANIM_LINE}
                transition={TIMING_LINE}
                style={{
                  height: 3,
                  backgroundColor: "#ef4444",
                  borderRadius: 2,
                  marginBottom: 14,
                }}
              />

              <MotiText
                from={FROM_TITLE}
                animate={ANIM_TITLE}
                transition={SPRING_TITLE}
                style={{
                  fontSize: 22,
                  fontWeight: "800",
                  color: "white",
                  lineHeight: 30,
                  marginBottom: 10,
                  letterSpacing: -0.3,
                }}
                numberOfLines={3}
              >
                {topArticle.title}
              </MotiText>

              {topArticle.description && (
                <MotiText
                  from={FROM_DESC}
                  animate={ANIM_TITLE}
                  transition={SPRING_DESC}
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.62)",
                    lineHeight: 20,
                    marginBottom: 20,
                  }}
                  numberOfLines={2}
                >
                  {topArticle.description}
                </MotiText>
              )}

              <MotiView
                from={FROM_DIVIDER}
                animate={ANIM_DIVIDER}
                transition={TIMING_DIVIDER}
                style={{
                  height: 1,
                  backgroundColor: "rgba(255,255,255,0.12)",
                  marginBottom: 16,
                  transformOrigin: "left",
                }}
              />

              <MotiView
                from={FROM_FOOTER}
                animate={ANIM_TITLE}
                transition={SPRING_FOOTER}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.38)",
                    letterSpacing: 0.3,
                  }}
                >
                  {topArticle.publishedAt
                    ? new Date(topArticle.publishedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )
                    : "Latest"}
                </Text>

                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "700",
                      color: "white",
                      letterSpacing: 0.6,
                      textTransform: "uppercase",
                    }}
                  >
                    Read Full Story
                  </Text>
                  <MotiView
                    state={arrowState}
                    transition={SPRING_ARROW}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="bg-blue-text"
                  >
                    <Ionicons name="arrow-forward" size={14} color="white" />
                  </MotiView>
                </View>
              </MotiView>
            </View>
          </View>
        </MotiView>
      </Pressable>
    </MotiView>
  );
});
Topstory.displayName = "Topstory";

// ── Article card
interface ArticleCardProps {
  item: Article;
  index: number;
}

const ArticleCard = memo(({ item, index }: ArticleCardProps) => {
  return (
    <Pressable>
      {({ pressed }) => (
        <MotiView
          animate={{ scale: pressed ? 0.972 : 1 }}
          transition={SPRING_CARD}
          style={{ flexDirection: "row", overflow: "hidden", marginBottom: 8 }}
        >
          {item.image && (
            <View style={{ width: 120, height: 120 }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: "100%", height: "100%", borderRadius: 0 }}
                resizeMode="cover"
              />
              <LinearGradient
                colors={GRADIENT_THUMB}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
            </View>
          )}

          <View
            style={{ flex: 1, padding: 6, justifyContent: "space-between" }}
          >
            {/* Source + date */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginBottom: 6,
              }}
            >
              {item.source?.name && (
                <View
                  style={{
                    backgroundColor: "#fef2f2",
                    borderRadius: 6,
                    paddingHorizontal: 7,
                    paddingVertical: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: "700",
                      color: "#024CF4",
                      letterSpacing: 0.8,
                      textTransform: "uppercase",
                    }}
                  >
                    {item.source.name}
                  </Text>
                </View>
              )}
              {item.publishedAt && (
                <Text
                  style={{ fontSize: 10, color: "#9ca3af", letterSpacing: 0.2 }}
                >
                  {new Date(item.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              )}
            </View>

            {/* Title */}
            <Text
              style={{
                fontSize: 13,
                fontWeight: "800",
                color: "#111827",
                lineHeight: 18,
                letterSpacing: -0.2,
                marginBottom: 5,
              }}
              numberOfLines={2}
            >
              {item.title}
            </Text>

            {/* Description */}
            <Text
              style={{ fontSize: 11, color: "#6b7280", lineHeight: 16 }}
              numberOfLines={2}
            >
              {item.description}
            </Text>

            {/* Read CTA */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
                marginTop: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  color: "#ef4444",
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                }}
              >
                Read
              </Text>
              <Ionicons name="arrow-forward" size={10} color="#ef4444" />
            </View>
          </View>
        </MotiView>
      )}
    </Pressable>
  );
});
ArticleCard.displayName = "ArticleCard";
// ListHeader
const ListHeader = memo(() => (
  <View>
    <Topicon />
    <BreakingNews />
    <View>
      <Topstory />
    </View>
  </View>
));
ListHeader.displayName = "ListHeader";

// Loading footer
const ListFooter = memo(
  ({ isFetchingNextPage }: { isFetchingNextPage: boolean }) => {
    if (!isFetchingNextPage) return null;
    return (
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 300 }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
          gap: 8,
        }}
      >
        {[0, 1, 2].map((i) => (
          <MotiView
            key={i}
            from={{ opacity: 0.2, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "timing",
              duration: 500,
              loop: true,
              repeatReverse: true,
              delay: i * 150,
            }}
            style={{
              width: 7,
              height: 7,
              borderRadius: 4,
              backgroundColor: "#ef4444",
            }}
          />
        ))}
      </MotiView>
    );
  },
);
ListFooter.displayName = "ListFooter";

// ── HomeScreen ──
export default function HomeScreen() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchNews();

  const articles = useMemo(
    () => data?.pages.flatMap((page) => page.articles) ?? [],
    [data],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Article; index: number }) => (
      <ArticleCard item={item} index={index} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Article) => item.id, []);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  if (isLoading) return <HomeSkeleton />;
  if (isError) return <ErrorScreen />;
  return (
    <FlashList
      data={articles as Article[]}
      keyExtractor={keyExtractor}
      className="p-screen-edge"
      renderItem={renderItem}
      ListHeaderComponent={<ListHeader />}
      ListFooterComponent={
        <ListFooter isFetchingNextPage={isFetchingNextPage} />
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.8}
    />
  );
}
