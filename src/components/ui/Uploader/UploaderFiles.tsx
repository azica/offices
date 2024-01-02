import styles from "./Uploader.module.scss";
import UploaderItem from "./UploaderItem";

const UploaderFiles = ({ files, deleteHandle }: { files: Model.Scan[]; deleteHandle: (scanId: number) => void }) => {
  return (
    <div className={styles.files}>
      {files.map((file, index) => {
        const delay = index * 100;
        return <UploaderItem key={index} scan={file} handleFileDelete={deleteHandle} id={index} delay={delay} />;
      })}
    </div>
  );
};

export default UploaderFiles;
