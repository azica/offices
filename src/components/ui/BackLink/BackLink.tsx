import { Link } from "react-router-dom";

import { ArrowLeftIcon } from "@/assets/icons";

import styles from "./BackLink.module.scss";

const BackLink = ({ to, onClick }: { to: string; onClick?: (e: React.MouseEvent<HTMLElement>) => void }) => {
  return (
    <Link to={to} className={styles.backLink} onClick={onClick}>
      <ArrowLeftIcon />
    </Link>
  );
};

export default BackLink;
