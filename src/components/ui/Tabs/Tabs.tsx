import cn from "classnames";

import styles from "./Tabs.module.scss";

const Tabs = ({
  buttons,
  onChange,
  field,
  formId,
}: {
  buttons: InputData[];
  onChange: InputOnChange;
  field: string;
  formId: string;
}) => {
  const changeValue = (event: { target: { name: string; value: string | number; id: string | number } }) => {
    const { name, value, id } = event.target;
    onChange({ field, value, id });
  };

  return (
    <div className={styles.tabs}>
      {buttons.map((tab, idx) => (
        <div key={idx} className={cn(styles.tab, tab.disabled ? styles.disabled : null)}>
          <input
            type="radio"
            id={`${formId}__${tab.id}`}
            className={styles.input}
            name={field}
            checked={Boolean(tab.value)}
            onChange={changeValue}
            disabled={tab.disabled}
          />
          <label className={styles.label} htmlFor={`${formId}__${tab.id}`}>
            {" "}
            {/* Update 'htmlFor' to match the modified ID */}
            {tab.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
