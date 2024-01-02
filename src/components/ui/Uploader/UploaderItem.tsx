import type { FC } from "react";

import cn from "classnames";
import { useState, useEffect } from "react";

import { PdfIcon, DownloadIcon, DeleteIcon, CloseIcon } from "@/assets/icons";
import { formatBytes } from "@/helpers/utils";
import { IconButton, Modal } from "@/ui/index";

import styles from "./Uploader.module.scss";

type UploaderItemProps = FC<{
  scan?: Model.Scan;
  file?: File;
  handleFileDelete: (val: number) => void;
  id: number;
  delay: number;
}>;

const UploaderItem: UploaderItemProps = ({ scan, handleFileDelete, id, delay, file }) => {
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | File | null>(null);

  const fileType = scan && scan.file.endsWith(".pdf") ? "pdf" : "image";

  useEffect(() => {
    setTimeout(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 100));
    }, delay + 300);
  }, []);

  useEffect(() => {
    if (progress < 100 && progress > 0) {
      setTimeout(() => {
        setProgress((prevProgress) => prevProgress + 10);
      }, 100);
    }
  }, [progress]);

  useEffect(() => {
    if (!showModal) {
      const body = document.querySelector("body");
      if (body) {
        body.style.overflow = "inherit";
        body.style.paddingRight = "0";
      }
    }
  }, [showModal]);

  const handlePreviewImage = (file: string | File) => {
    setSelectedFile(file);
    setShowModal(true);
  };

  return (
    <div className={styles.file}>
      <div className={styles.imgWrap}>
        {scan && fileType === "pdf" ? (
          <a href={scan.file} target="_blank" rel="noreferrer">
            <PdfIcon />
          </a>
        ) : scan && fileType === "image" ? (
          <img src={scan.file} alt="Preview" onClick={() => handlePreviewImage(scan.file)} />
        ) : null}
        {file && file.type.startsWith("image/") ? (
          <img src={URL.createObjectURL(file)} alt="Preview" onClick={() => handlePreviewImage(file)} />
        ) : file ? (
          <a href={URL.createObjectURL(file)} target="_blank" rel="noreferrer">
            <PdfIcon />
          </a>
        ) : null}
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
          <p className={styles.name}>{scan?.name || file?.name}</p>
          <p className={styles.size}>{formatBytes(Number(scan?.size || file?.size))}</p>
        </div>

        <div className={cn(styles.progressBar, progress !== 100 && styles.show)}>
          <div className={styles.progressWrap}>
            <div className={styles.progress} style={{ width: `${progress}%` }}></div>
          </div>
          <div className={styles.procent}>{progress}%</div>
        </div>

        <button
          className={cn(styles.deleteIcon, progress !== 100 && styles.show)}
          onClick={() => handleFileDelete(Number(scan?.id || id))}>
          <CloseIcon />
        </button>

        <div className={cn(styles.buttons, progress === 100 && styles.showButton)}>
          <a
            className={styles.downLoadButton}
            href={String(scan?.file) || (file && URL.createObjectURL(file))}
            download={scan?.file || file?.name}
            rel="noopener noreferrer">
            <DownloadIcon />
          </a>
          <IconButton icon={<DeleteIcon />} onClick={() => handleFileDelete(id)} />
        </div>
      </div>
      {showModal ? (
        <Modal show={showModal} setShow={setShowModal} className={styles.modal} size="fullscreen">
          <div className={styles.modalImage}>
            <div className={styles.buttons}>
              {typeof selectedFile === "string" ? (
                <a className={styles.fileButton} href={selectedFile} download={selectedFile} rel="noopener noreferrer">
                  <DownloadIcon />
                </a>
              ) : (
                <a
                  className={styles.fileButton}
                  href={URL.createObjectURL(selectedFile as File)}
                  download={URL.createObjectURL(selectedFile as File)}
                  rel="noopener noreferrer">
                  <DownloadIcon />
                </a>
              )}

              <button type="button" className={styles.closeButton} onClick={() => setShowModal(false)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            {typeof selectedFile === "string" ? (
              <img src={selectedFile} />
            ) : (
              <img src={URL.createObjectURL(selectedFile as File)} />
            )}
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default UploaderItem;
