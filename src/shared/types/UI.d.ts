import type { ReactNode, SetStateAction } from "react";

export declare global {
  namespace UI {
    type Modal = {
      title?: string;
      children: ReactNode;
      show: boolean;
      setShow?: SetStateAction<any>;
      size?: "xl" | "lg" | "sm" | "fullscreen";
      className?: string;
      isScroll?: boolean;
      notCentered?: boolean;
    };
  }
}
