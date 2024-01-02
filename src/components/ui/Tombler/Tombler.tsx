import type { ChangeEvent, FC } from "react";

import classNames from "classnames";

import styles from "./Tombler.module.scss";

const Tombler: FC<Checkbox> = (props) => {
  const { onChange, label, isChecked, id, field, isLabelRight, className } = props;
  const tomblerClasses = classNames(
    styles.tombler,
    isChecked ? styles.tomblerChecked : "",
    isLabelRight && styles.labelRight,
    className && className,
  );
  const idForInput = `${field}-${id}`;

  const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    onChange({ field: name, value: checked, id });
  };

  return (
    <div className={tomblerClasses}>
      {label && <span className={styles.tomblerLabelText}>{label}</span>}
      <div className={styles.tomblerInputGroup}>
        <input
          onChange={changeValue}
          type="checkbox"
          name={field}
          id={idForInput}
          checked={isChecked}
          className={styles.tomblerInput}
        />
        <label htmlFor={idForInput} className={styles.tomblerLabel}></label>
      </div>
    </div>
  );
};

export default Tombler;
