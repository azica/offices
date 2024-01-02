import cn from "classnames";
import { useEffect, useState, type ChangeEvent } from "react";

import { UserSquareIcon } from "@/assets/icons";

import styles from "./Uploader.module.scss";

const Uploader: Uploader = ({ isSuccess, multiple, size, onChange, accept }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    isSuccess && setSelectedFiles([]);
  }, [isSuccess]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;
  
    let newFiles: File[] = multiple ? [...selectedFiles] : [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const hasFile = newFiles.some((item) => item.name === file.name);
      if (!hasFile) {
        newFiles.push(file);
      }
    }
  
    if (!multiple && newFiles.length > 1) {
      newFiles = newFiles.slice(-1);
    }
    setSelectedFiles(newFiles);
    onChange && onChange(newFiles);
    setSelectedFiles([]);
  };
  

  return (
    <div className={cn(styles.uploader, size)}>
      <div className={cn(styles.button)}>
        <input type="file" accept={accept} onChange={onFileChange} multiple={multiple} className={styles.input} />

        <UserSquareIcon />
        <label className={styles.text}>Загрузить скан(ы)</label>
      </div>
    </div>
  );
};

export default Uploader;
