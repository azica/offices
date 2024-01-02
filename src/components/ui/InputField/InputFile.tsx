import classNames from "classnames";
import { useState, type FC, useEffect } from "react";

import { LoadIcon } from "@/assets/icons";

import styles from "./InputField.module.scss";

const InputFile: FC<Input> = ({
  id,
  label,
  required,
  value,
  onChange,
  disabled,
  placeholder,
  className,
  inputSize,
  hasLabelMark,
  field,
  invalid,
  helperText,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isInvalid, setIsInvalid] = useState(invalid ? invalid : false);
  const [errorMessage, setErrorMessage] = useState(helperText ? helperText : "");

  useEffect(() => {
    if (invalid !== isInvalid && invalid !== undefined) {
      setIsInvalid(invalid);
    }
  }, [invalid]);

  useEffect(() => {
    if (helperText && helperText !== errorMessage) {
      setErrorMessage(helperText);
    }
    if (helperText && helperText.length > 0) {
      setIsInvalid(true);
    }
  }, [helperText]);

  useEffect(() => {
    if (value !== currentValue) {
      setCurrentValue(value);
    }
  }, [value]);
  const inputClasses = classNames(
    styles.wrap,
    styles.fileWrap,
    disabled && styles.disabled,
    inputSize && styles[inputSize],
  );

  const inputWrapClasses = classNames(
    styles.input,
    className && styles[className],
    className && className,
    inputSize && styles[inputSize],
  );

  const changeValue = (event: { target: { name: string; value: string; id: string | number } }) => {
    const { name, value, id } = event.target;
    setCurrentValue(value);
    onChange({ field: name, value, id });
  };

  return (
    <div className={inputWrapClasses}>
      {label && <label className={`${styles.label} ${hasLabelMark && styles.labelMarked}`}>{label}</label>}

      <div className={inputClasses}>
        <input
          type="file"
          name={field}
          onChange={changeValue}
          onInput={() => setIsInvalid(false)}
          className={styles.field}
          required={required}
          disabled={disabled}
          id={id?.toString()}
        />
        <LoadIcon />
        <label className={styles.placeholder}>{placeholder}</label>
      </div>
    </div>
  );
};

export default InputFile;
