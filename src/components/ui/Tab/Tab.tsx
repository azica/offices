import classNames from "classnames";
import { type FC } from "react";
import { Link } from "react-router-dom";

import { TabIcon } from "@/assets/icons";

import styles from "./Tab.module.scss";

const Tab: FC<TabData> = ({ link, name, hasIcon, count, active, value, notific }) => {
  const tabClasses = classNames(
    styles.tab,
    { [styles.hasText]: name },
    { [styles.noText]: !name },
    { [styles.active]: active === value },
    { [styles.notific]: notific === name && count && count > 0 },
  );

  return (
    <Link to={link} className={tabClasses}>
      {Number(count) > 0 && hasIcon && <TabIcon />}
      {name && <span>{name} </span>}
      {Number(count) > 0 && <span className={styles.number}>{count}</span>}
    </Link>
  );
};

export default Tab;
