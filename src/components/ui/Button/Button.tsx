import type { FC } from "react";

import cn from "classnames";
import { Link } from "react-router-dom";

import styles from "./Button.module.scss";

const Button: FC<Button> = ({
  type = "button",
  size,
  disabled,
  children,
  bordered,
  variant = "primary",
  href,
  loader,
  notific,
  isFullWidth,
  ...props
}) => {
  const buttonClassNames = cn(
    styles.btn,
    size && styles[size],
    variant && styles[variant],
    bordered && styles.bordered,
    disabled && styles.disabled,
    loader && styles.loader,
    notific && styles.notific,
    isFullWidth && styles.fullWith,
  );

  return (
    <>
      {href ? (
        <Link className={buttonClassNames} to={href}>
          {children}
        </Link>
      ) : (
        <button className={buttonClassNames} type={type} {...props} disabled={disabled}>
          {loader !== undefined && <div className={styles.spiner} />}
          <div className={styles.content}>{children}</div>
        </button>
      )}
    </>
  );
};

export default Button;
