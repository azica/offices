import { Link } from "react-router-dom";

import { LogoIcon } from "@/assets/icons";

import styles from "./Logo.module.scss";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link to="/offices" className={`${styles.logo} ${className}`}>
      <LogoIcon />
    </Link>
  );
};

export default Logo;
