import type { ChangeEvent, FC } from "react";

import { useState, useEffect } from "react";

import { CheckedArrowIcon } from "@/assets/icons";

import styles from "./Checkbox.module.scss";

const Checkbox: FC<Checkbox> = ({ isChecked, onChange, field, label, id }) => {
  const [checked, setChecked] = useState(isChecked);
  const idForInput = `${field}-${id}`;

  useEffect(() => {
    if (isChecked !== checked) {
      setChecked(isChecked);
    }
  }, [isChecked]);

  const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setChecked(checked);
    onChange({ field: name, value: checked, id: idForInput });
  };

  return (
    <label className={styles.checkbox} htmlFor={idForInput}>
      <input
        id={idForInput}
        type="checkbox"
        name={field}
        className={styles.checkboxInput}
        onChange={changeValue}
        checked={checked}
      />
      <span className={styles.checkboxCheckmark}>
        <CheckedArrowIcon />
      </span>
      <p>{label}</p>
    </label>
  );
};

export default Checkbox;
