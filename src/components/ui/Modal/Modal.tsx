import { useEffect, type FC } from "react";
import { TEModal, TEModalDialog, TEModalContent } from "tw-elements-react";

import { CloseIcon } from "@/assets/icons";

import styles from "./Modal.module.scss";

export const Modal: FC<UI.Modal> = ({ isScroll, children, title, show, setShow, size, className, notCentered }) => {
  return (
    <div className={styles.modal}>
      <TEModal show={show} setShow={setShow} scrollable={Boolean(isScroll)}>
        <TEModalDialog centered={!notCentered} size={size}>
          <TEModalContent theme={{ wrapper: styles.content }} className={className && className}>
            {title && <h5 className={styles.title}>{title}</h5>}
            <button type="button" className={styles.close} onClick={() => setShow(false)} aria-label="Close">
              <CloseIcon />
            </button>
            {children}
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
};
