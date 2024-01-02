import styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spiner}></div>
    </div>
  );
};

export default Loader;
