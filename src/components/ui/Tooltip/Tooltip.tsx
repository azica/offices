import { useState } from "react";

import { ArrowUpIcon } from "@/assets/icons";

import styles from "./Tooltip.module.scss";

const Tooltip = ({ text, children, className }: { text: string; children: React.ReactNode; className?: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    if (e.type === "mouseenter") {
      setShowTooltip(true);
    } else if (e.type === "mouseleave") {
      setShowTooltip(false);
    }
  };

  return (
    <div className={`${styles.tooltipContainer} ${className}`} onMouseEnter={handleMouse} onMouseLeave={handleMouse}>
      {children}
      {showTooltip && (
        <div className={`${styles.tooltip} ${showTooltip ? styles.show : ""}`}>
          <ArrowUpIcon />
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
