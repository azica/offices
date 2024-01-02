import classNames from "classnames";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";

import { ClosedEyeIcon, EyeIcon, SearchIcon, WarningIcon } from "@/assets/icons";
import { declinationOfNumber } from "@/helpers/index";

import styles from "./InputField.module.scss";

const InputField = ({
  id,
  mask,
  type,
  label,
  required,
  value,
  onChange,
  disabled,
  placeholder,
  className,
  minLength,
  maxLength,
  inputSize,
  hasLabelMark,
  iconLeft,
  field,
  invalid,
  helperText,
  name,
  isErrorTooltip,
  pattern,
  maskProps,
  autoComplete,
  readOnly,
}: Input) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [blured, setBlured] = useState<boolean>(false);
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
    disabled && styles.disabled,
    blured && styles.error,
    isInvalid && styles.error,
    inputSize && styles[inputSize],
  );

  const inputWrapClasses = classNames(
    styles.input,
    className && styles[className],
    className && className,
    inputSize && styles[inputSize],
  );

  const blurhandle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.value === "" ? setBlured(true) : setBlured(false);
  };
  const checkValidityOfLength = (value: string) => {
    const valueLength = value.length;
    if (valueLength > 0 && maxLength) {
      if (valueLength > maxLength) {
        const symbols = declinationOfNumber(maxLength, ["символ", "символа", "символов"]);
        const errorMessage = `Поле должно содержать не более ${maxLength} ${symbols}`;
        setErrorMessage(errorMessage);
        setIsInvalid(true);
      } else {
        helperText === "" ? setErrorMessage("") : setErrorMessage(String(helperText));
        setIsInvalid(false);
      }
    }
  };

  const checkValidityOfLetters = (value: string) => {
    const russianLettersWithSpaceRegex = /^[А-Яа-яЁё\s-]*$/;

    if (pattern === "letters" && value.trim() !== "") {
      if (!russianLettersWithSpaceRegex.test(value)) {
        setErrorMessage("Введите только буквы");
        setIsInvalid(true);
      }
    }
  };

  const checkValidityOfPassportCode = (value: string) => {
    const passportCodeRegex = /^\d{3}-\d{3}$/;
    if (pattern === "passportCode" && value.trim() !== "") {
      if (!passportCodeRegex.test(value)) {
        setErrorMessage("Введите правильный код подразделения");
        setIsInvalid(true);
      }
    }
  };

  useEffect(() => {
    checkValidityOfLength(`${value}`);
    checkValidityOfLetters(`${value}`);
    checkValidityOfPassportCode(`${value}`);
  }, [value]);

  const togglePasswordHandle = () => {
    setTogglePassword(!togglePassword);
  };

  const changeValue = (event: { target: { name: string; value: string; id: string | number } }) => {
    const { name, value, id } = event.target;
    setCurrentValue(value);
    onChange({ field: name, value, id });
  };

  return (
    <div className={inputWrapClasses}>
      {label && (
        <label className={`${styles.label} ${hasLabelMark && styles.labelMarked}`}>
          {label}
          {type === "password" && (
            <Link className={styles.labelPassword} to="/auth/password-recovery">
              Восстановить пароль
            </Link>
          )}
        </label>
      )}

      <div className={inputClasses}>
        {mask ? (
          <InputMask
            mask={mask}
            name={field ? field : name}
            value={currentValue}
            onChange={changeValue}
            maskChar={null}
            {...maskProps}
            placeholder={placeholder}
            className={styles.field}
            required={required}
            disabled={disabled}
          />
        ) : (
          <>
            <input
              type={type === "password" || type === "confirmPassowrd" ? (togglePassword ? "text" : "password") : type}
              name={field ? field : name}
              value={currentValue}
              onChange={changeValue}
              onBlur={blurhandle}
              onInput={() => setIsInvalid(false)}
              placeholder={placeholder}
              className={styles.field}
              minLength={minLength}
              maxLength={maxLength}
              required={required}
              disabled={disabled}
              id={id?.toString()}
              readOnly={readOnly}
              autoComplete={autoComplete}
            />
            {(type === "password" || type === "confirmPassowrd") && (
              <span onClick={togglePasswordHandle} className={styles.inputIcon}>
                {togglePassword ? <ClosedEyeIcon /> : <EyeIcon />}
              </span>
            )}
            {type === "search" && <SearchIcon className={`${iconLeft ? styles.left : styles.right}`} />}
          </>
        )}
      </div>
      {isInvalid && !isErrorTooltip && <span className={styles.errorText}>{errorMessage}</span>}
      {isInvalid && isErrorTooltip && (
        <span className={styles.errorTooltip}>
          <WarningIcon />
          <span className={styles.errorTextTooltip}> {errorMessage}</span>
        </span>
      )}
    </div>
  );
};

export default InputField;
