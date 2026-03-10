import React, { memo } from "react";
import Appicon from "../../assets/Svgs/Appicon.svg";

export const Logo = memo(
  ({ width = 170, height = 170 }: { width: number; height: number }) => {
    return (
      <Appicon
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
      />
    );
  },
);

Logo.displayName = "Logo";
