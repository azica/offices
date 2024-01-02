import cn from "classnames";

import { LoadIcon } from "@/assets/icons";

import styles from "./Uploader.module.scss";

const UploadFromCard: Uploader = ({ size, onClick }) => {
  return (
    <div className={cn(styles.uploader, size)}>
      <div className={cn(styles.button)}>
        <input type="button" className={styles.input} onClick={onClick} />
        <LoadIcon />
        <label className={styles.text}>Загрузить из карточки</label>
      </div>
    </div>
  );
};

export default UploadFromCard;
