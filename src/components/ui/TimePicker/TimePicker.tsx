import type { FC } from "react";

import cn from "classnames";
import { useEffect, useRef } from "react";
import { Input, Timepicker, initTE } from "tw-elements";

import styles from "./TimePicker.module.scss";

const TimePicker: FC<TimePicker> = ({ value, field, onChange, id, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      initTE({ Timepicker, Input }, { allowReinits: true });
      inputRef.current.addEventListener("input.te.timepicker", (event: any) => {
        onChange({ field, value: event.target?.value, id });
      });
    }
  }, [id, field, onChange]);

  return (
    <div
      id={`id_${id}`}
      className={cn(styles.timePicker, disabled ? styles.disabled : null)}
      data-te-with-icon="false"
      data-te-format24="true"
      data-te-timepicker-init
      data-te-input-wrapper-init
      data-te-cancel-label="Отменить"
      data-te-clear-label="Очистить"
      data-te-class-notch="group-data-[te-input-focused]:border-0">
      <input
        type="text"
        name={field}
        disabled={disabled}
        placeholder={String(value)}
        data-te-toggle={`id_${id}`}
        className={cn(styles.input)}
        ref={inputRef}
      />
    </div>
  );
};

export default TimePicker;
