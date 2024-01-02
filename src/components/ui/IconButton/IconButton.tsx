import { Link } from "react-router-dom";

import styles from "./IconButton.module.scss";

const IconButton: IconButton = ({ disabled, icon, href, onClick }) => {
  return (
    <>
      {href ? (
        <Link to={href} className={styles.btn}>
          {icon}
        </Link>
      ) : (
        <button type="button" disabled={disabled} className={styles.btn} onClick={onClick}>
          {icon}
        </button>
      )}
    </>
  );
};

export default IconButton;
