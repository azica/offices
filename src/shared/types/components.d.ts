import type { NotificationEnum } from "@/types/enums";
import type { ReactNode, FC, SyntheticEvent } from "react";

declare global {
  namespace Model {
    type Pagination = {
      currentPage: number;
      totalPages: number;
      scrollTo?: () => void;
    };

    type MenuItem = {
      id: number | string;
      title: string;
      path: string;
      count?: number;
      pathName?: string;
    };

    type SidebarMenu = {
      menu: MenuItem[];
      children?: ReactNode;
      scrollbar?: boolean;
      isTabs?: boolean;
    };

    type Notification = {
      notificationType: `${NotificationEnum}`;
    };

    type Filter = {
      options: Option[];
      name?: string;
      field: string;
      id: number;
    };

    type Routes = {
      path: string;
      component: JSX.Element;
    };

    type Empty = {
      title: string;
      text: string;
      options: Option[];
    };

    type Avatar = {
      editable?: boolean;
      imageUrl?: string | undefined;
      fullName?: string;
      size: "big" | "medium" | "small" | "sx";
    };
  }

  namespace Layout {
    type Container = FC<{
      children: ReactNode;
      overflow?: boolean;
      size?: "md" | "lg" | "xl";
      className?: string;
    }>;
  }
}
