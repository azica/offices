import type { FC, ChangeEvent } from "react";

import styles from "./RadioButton.module.scss";

const RadioButton: FC<RadioButton> = ({ option, selectedOption, onOptionChange }) => {
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newOption = event.target.value;
    onOptionChange(newOption);
  };

  return (
    <label className={styles.radioButton}>
      <input
        type="radio"
        name={option}
        className={styles.input}
        value={option}
        onChange={handleOptionChange}
        checked={option === selectedOption}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default RadioButton;
