import React from "react";
import { MotiView } from "moti";
import Appicon from "../../assets/Svgs/Appicon.svg";

const FROM_BN_DOT = { opacity: 1, scale: 3 } as const;
const ANIM_BN_DOT = { opacity: 0.25, scale: 2 } as const;
const TIMING_PULSE_BN = {
  type: "timing",
  duration: 700,
  loop: true,
  repeatReverse: true,
} as const;

export const Preloader = () => {
  return (
    <MotiView
      from={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-transparent"
    >
      {/* Container for the icon and pulse effect */}
      <MotiView
        from={FROM_BN_DOT}
        animate={ANIM_BN_DOT}
        transition={TIMING_PULSE_BN}
        className="flex items-center justify-center"
      >
        <Appicon width={80} height={80} />
      </MotiView>
    </MotiView>
  );
};

export default Preloader;
