import type { FC } from "react";

import cn from "classnames";

import styles from "./Steps.module.scss";

const Steps: FC<StepsList> = ({ steps, activeStep, className }) => {
  const stepClasses = cn(styles.stepsItem, styles[`step${activeStep}`]);

  return (
    <div className={cn(styles.steps, className)}>
      {steps.map((step, idx) => (
        <div className={stepClasses} key={idx + 1}>
          <div className={styles.stepsNumber}>{step.step}</div>
          <div className={styles.stepsDescr}>{step.title}</div>
          {idx !== steps.length - 1 && <span className={styles.stepsLine}></span>}
        </div>
      ))}
    </div>
  );
};

export default Steps;
