import type { FC } from "react";

import classNames from "classnames";

import styles from "./Status.module.scss";

const Status: FC<Status> = ({ type, size, name }) => {
  const statusClassNames = classNames(styles.status, type && styles[type], size && styles[size]);
  return <div className={statusClassNames}>{name}</div>;
};

export default Status;
