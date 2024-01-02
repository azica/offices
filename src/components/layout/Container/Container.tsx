import cn from "classnames";

import styles from "./Container.module.scss";

export const Container: Layout.Container = ({ children, overflow, className }) => {
  return <div className={cn(styles.wrapper, className, overflow ? styles.overflow : null)}>{children}</div>;
};

export default Container;
