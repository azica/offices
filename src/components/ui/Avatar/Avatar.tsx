import type { ChangeEvent, FC } from "react";

import { CameraIcon } from "@heroicons/react/20/solid";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getInitials } from "@/helpers/index";
import { useActions, useUserId } from "@/store/hooks";
import { useUpdateImageMutation } from "@/store/services/employee.query";

import styles from "./Avatar.module.scss";

export const Avatar: FC<Model.Avatar> = ({ imageUrl, fullName, size, editable }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { officeId, employeeId } = useParams();
  const currentUserId = useUserId();
  const [updateImage, updatedImage] = useUpdateImageMutation();

  const { setUserAvatar } = useActions();

  useEffect(() => {
    if (updatedImage.isSuccess && updatedImage.data && "image" in updatedImage.data) {
      setUserAvatar(updatedImage.data.image);
    }
  }, [updatedImage]);

  const changeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      const formData = new FormData();
      formData.append("image", files[0]);
      updateImage({
        officeId: Number(officeId),
        employeeId: Number(employeeId),
        data: formData,
      });
    }
  };

  const handleHover = (shouldEdit: boolean) => {
    if (editable) {
      setIsEdit(shouldEdit);
    }
  };

  return (
    <label
      className={cn(
        styles.avatar,
        styles[size],
        editable && styles.editable,
        (imageUrl === null || !imageUrl) && styles.noImage,
      )}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}>
      {currentUserId === Number(employeeId) && isEdit ? (
        <>
          <input type="file" className={styles.avatarInput} onChange={changeHandle} />
          <CameraIcon className={styles.avatarSvg} />
        </>
      ) : imageUrl === null || !imageUrl ? (
        <div className={styles.avatarName}>{fullName && getInitials(fullName)}</div>
      ) : (
        <img className={styles.avatarImg} src={imageUrl} alt="Avatar" />
      )}
    </label>
  );
};
