import type { FC } from "react";

import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import { Datepicker } from "tw-elements";

import { formatDate } from "@/helpers/utils";

import styles from "./Datepicker.module.scss";

const DatePicker: FC<Input> = ({
  value,
  hasLabelMark,
  label,
  id,
  disabled,
  field,
  onChange,
  required,
  placeholder,
  className,
  inputSize,
  dateProps,
  invalid,
  helperText,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isInvalid, setIsInvalid] = useState(invalid ? invalid : false);
  const [errorMessage, setErrorMessage] = useState(helperText ? helperText : "");
  const myInput = useRef<HTMLInputElement>(null);

  const limitDateRange = (limitFutureMonths: number, limitPastMonths: number) => {
    const currentDate = new Date();
    let futureYear = currentDate.getFullYear();
    let futureMonth = currentDate.getMonth() + limitFutureMonths;

    if (futureMonth > 11) {
      futureMonth -= 12;
      futureYear += 1;
    }

    const min = new Date(currentDate.getFullYear(), currentDate.getMonth() - limitPastMonths, 1);
    const max = new Date(futureYear, futureMonth + 1, 0);

    return { min, max };
  };

  useEffect(() => {
    if (myInput.current !== null) {
      const { max, min } = limitDateRange(Number(dateProps?.limitFutureMonths), Number(dateProps?.limitPastMonths));
      const init = async () => {
        await new Datepicker(myInput.current, {
          monthsFull: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
          ],
          monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
          weekdaysNarrow: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
          weekdaysShort: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
          okBtnText: "Ok",
          clearBtnText: "Очистить",
          cancelBtnText: "Отменить",
          format: "dd.mm.yyyy",
          title: "Выберите дату",
          placeholder,
          disableFuture: Boolean(dateProps?.disableFuture),
          disablePast: Boolean(dateProps?.disablePast),
          max: new Date(max),
          min: new Date(min),
        });

        if (myInput.current !== null) {
          myInput.current.dispatchEvent(new Event("input", { bubbles: true }));

          myInput.current.addEventListener("dateChange.te.datepicker", (event: any) => {
            setCurrentValue(formatDate(event.date));
          });
        }
      };
      init();
    }
  }, []);

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
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (currentValue) {
      onChange({ field, value: currentValue, id });
    }
  }, [currentValue]);

  const datePickerClasses = cn(
    styles.datePicker,
    className && styles[className],
    className && className,
    inputSize && styles[inputSize],
  );

  return (
    <div className={datePickerClasses}>
      {label ? <label className={cn(styles.label, hasLabelMark && styles.labelMarked)}>{label}</label> : null}
      <div className={cn(styles.inputWrap, "fadeIn", isInvalid && styles.error)} data-te-input-wrapper-init ref={myInput}>
        <input
          type="text"
          name={field}
          value={currentValue}
          placeholder={String(placeholder)}
          required={required}
          disabled={disabled}
          className={styles.input}
          data-te-datepicker-toggle-ref
        />
      </div>
      {isInvalid && <span className={styles.errorText}>{errorMessage}</span>}
    </div>
  );
};

export default DatePicker;
