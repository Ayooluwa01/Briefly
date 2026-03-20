import { MotiView, View } from "moti";
import { memo } from "react";

export const SkeletonBox = memo(
  ({
    width,
    height,
    borderRadius = 6,
    style,
  }: {
    width: number | string;
    height: number;
    borderRadius?: number;
    style?: object;
  }) => (
    <MotiView
      from={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "timing",
        duration: 800,
        loop: true,
        repeatReverse: true,
      }}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "#e5e7eb",
        ...style,
      }}
    />
  ),
);
SkeletonBox.displayName = "SkeletonBox";

export const TopstorySkeleton = memo(() => (
  <MotiView
    from={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ type: "timing", duration: 400 }}
    style={{ marginBottom: 24, borderRadius: 24, overflow: "hidden" }}
  >
    {/* Image placeholder */}
    <SkeletonBox width="100%" height={420} borderRadius={0} />

    {/* Overlaid content placeholders */}
    <View style={{ position: "absolute", top: 20, left: 20, right: 20 }}>
      {/* Badge */}
      <SkeletonBox
        width={90}
        height={24}
        borderRadius={100}
        style={{ backgroundColor: "#cbd5e1" }}
      />
    </View>

    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
      }}
    >
      {/* Accent line */}
      <SkeletonBox
        width={36}
        height={3}
        borderRadius={2}
        style={{ marginBottom: 14, backgroundColor: "#cbd5e1" }}
      />
      {/* Title line 1 */}
      <SkeletonBox
        width="90%"
        height={18}
        style={{ marginBottom: 8, backgroundColor: "#cbd5e1" }}
      />
      {/* Title line 2 */}
      <SkeletonBox
        width="70%"
        height={18}
        style={{ marginBottom: 16, backgroundColor: "#cbd5e1" }}
      />
      {/* Description */}
      <SkeletonBox
        width="100%"
        height={13}
        style={{ marginBottom: 6, backgroundColor: "#94a3b8" }}
      />
      <SkeletonBox
        width="80%"
        height={13}
        style={{ marginBottom: 20, backgroundColor: "#94a3b8" }}
      />
      {/* Divider */}
      <SkeletonBox
        width="100%"
        height={1}
        style={{ marginBottom: 16, backgroundColor: "#cbd5e1" }}
      />
      {/* Footer */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SkeletonBox width={60} height={11} />
        <SkeletonBox
          width={120}
          height={28}
          borderRadius={14}
          style={{ backgroundColor: "#cbd5e1" }}
        />
      </View>
    </View>
  </MotiView>
));
TopstorySkeleton.displayName = "TopstorySkeleton";

export const ArticleCardSkeleton = memo(() => (
  <View style={{ flexDirection: "row", overflow: "hidden", marginBottom: 8 }}>
    {/* Thumbnail */}
    <SkeletonBox width={120} height={120} borderRadius={0} />

    {/* Right content */}
    <View style={{ flex: 1, padding: 6, justifyContent: "space-between" }}>
      {/* Source badge */}
      <SkeletonBox
        width={60}
        height={16}
        borderRadius={6}
        style={{ marginBottom: 6 }}
      />
      {/* Title line 1 */}
      <SkeletonBox width="95%" height={14} style={{ marginBottom: 5 }} />
      {/* Title line 2 */}
      <SkeletonBox width="75%" height={14} style={{ marginBottom: 8 }} />
      {/* Description */}
      <SkeletonBox width="100%" height={11} style={{ marginBottom: 4 }} />
      <SkeletonBox width="85%" height={11} style={{ marginBottom: 8 }} />
      {/* Read CTA */}
      <SkeletonBox width={40} height={10} borderRadius={4} />
    </View>
  </View>
));
ArticleCardSkeleton.displayName = "ArticleCardSkeleton";

export const HomeSkeleton = memo(() => (
  <View style={{ flex: 1, paddingHorizontal: 16 }}>
    {/* Topicon */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 12,
        position: "relative",
      }}
    >
      <SkeletonBox width={80} height={20} borderRadius={6} />
      <View style={{ position: "absolute", right: 0 }}>
        <SkeletonBox width={24} height={24} borderRadius={12} />
      </View>
    </View>

    {/* BreakingNews */}
    <SkeletonBox
      width="100%"
      height={80}
      borderRadius={20}
      style={{ marginVertical: 10 }}
    />

    {/* Topstory */}
    <TopstorySkeleton />

    {/* Article list */}
    {[...Array(4)].map((_, i) => (
      <ArticleCardSkeleton key={i} />
    ))}
  </View>
));
HomeSkeleton.displayName = "HomeSkeleton";
