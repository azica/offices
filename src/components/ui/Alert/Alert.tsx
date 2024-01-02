import cn from "classnames";
import { useSnackbar, SnackbarContent } from "notistack";
import { useCallback, forwardRef } from "react";

import {
  AttentionIcon,
  CheckBoxSuccess,
  CloseCircleIcon,
  CloseIcon,
  RegisteredIcon,
  ScalesIcon,
  WarningIcon,
} from "@/assets/icons";

import styles from "./Alert.module.scss";

export const Alert = forwardRef<HTMLDivElement, Blocks.AlertProps>(({ id, variant, message, point = false }, ref) => {
  const { root, close, title, icon, pointItem } = styles;
  const { closeSnackbar } = useSnackbar();

  const handleClose = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  const iconMapping = {
    contora: <ScalesIcon />,
    success: <CheckBoxSuccess />,
    error: <CloseCircleIcon />,
    attention: <AttentionIcon />,
    registered: <RegisteredIcon />,
    warning: <WarningIcon />,
  };
  return (
    <SnackbarContent ref={ref}>
      <div className={cn(root, styles[variant])} onClick={handleClose}>
        <div onClick={handleClose} className={close}>
          <CloseIcon />
        </div>
        {point && <div className={pointItem} />}
        <div className={icon}> {iconMapping[variant]}</div>
        <div className={title}>{message}</div>
      </div>
    </SnackbarContent>
  );
});

Alert.displayName = "Alert";

export default Alert;
