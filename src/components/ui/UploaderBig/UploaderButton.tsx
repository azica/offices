import type { FC, ChangeEvent } from "react";

import cn from "classnames";
import { useEffect, useState } from "react";

import { LoadIcon } from "@/assets/icons";

import styles from "./UploaderBig.module.scss";
import { Loader } from "../Loader";

const UploaderButton: FC<UploaderBig> = ({ multiple, accept, onChange, isSuccess, isLoading }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    isSuccess && setSelectedFiles([]);
  }, [isSuccess]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;

    let newFiles: File[] = multiple ? [...selectedFiles] : []; // Reset files if not multiple

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
    onChange(newFiles);
  };

  return (
    <div className={cn(styles.button)}>
      <input type="file" accept={accept} onChange={onFileChange} multiple={multiple} className={styles.input} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <LoadIcon />
          <label className={styles.text}>Загрузить скан(ы)</label>
        </>
      )}
    </div>
  );
};

export default UploaderButton;
