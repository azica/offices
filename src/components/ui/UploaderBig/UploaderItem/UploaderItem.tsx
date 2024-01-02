import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CloseIcon, DeleteIcon, DownloadIcon, PdfIcon } from "@/assets/icons";
import { IconButton, Modal } from "@/ui/index";

import styles from "./UploaderItem.module.scss";

const UploaderItem = ({
  file,
  name,
  id,
  handleDelete,
}: {
  file: string;
  name: string;
  id: number;
  handleDelete: (id: number) => void;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>("");

  const fileType = file.endsWith(".pdf") ? "pdf" : "image";

  useEffect(() => {
    if (!showModal) {
      const body = document.querySelector("body");
      if (body) {
        body.style.overflow = "inherit";
        body.style.paddingRight = "0";
      }
    }
  }, [showModal]);

  const handlePreviewImage = (file: string) => {
    setSelectedFile(file);
    setShowModal(true);
  };

  return (
    <>
      <div className={styles.item}>
        <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(id)} />
        {fileType === "pdf" ? (
          <Link className={styles.pdfWrap} to={file} target="_blank">
            <PdfIcon />
          </Link>
        ) : (
          <img src={file} alt={name} onClick={() => handlePreviewImage(file)} />
        )}

        <div className={styles.name}>{name}</div>
      </div>
      {showModal ? (
        <Modal show={showModal} setShow={setShowModal} className={styles.modal} size="fullscreen">
          <div className={styles.modalImage}>
            <div className={styles.buttons}>
              <a className={styles.fileButton} href={file} download={name} rel="noopener noreferrer">
                <DownloadIcon />
              </a>

              <button type="button" className={styles.closeButton} onClick={() => setShowModal(false)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            {selectedFile ? <img src={selectedFile} /> : null}
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default UploaderItem;
