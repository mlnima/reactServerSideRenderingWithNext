import React, { FC, useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './UserPreviewImage.scss'

interface IProps {
  imageUrl?: string;
  size: number;
}


const UserPreviewImage: FC<IProps> = ({ imageUrl, size = 77 }) => {
  const [gotError, setGotError] = useState(false);

  return (
    <div className={'userPreviewImage'}>
      {!!imageUrl && !gotError ? (
        <img
          className={'userPreviewImageInner'}
          src={imageUrl || "/asset/images/user/noGenderAvatar150.jpg"}
          onError={() => setGotError(true)}
          style={{ width: size, height: size }}
          alt="profile"
        />
      ) : (
        <FontAwesomeIcon
          icon={faUser}
          className={'userPreviewImageIcon'}
          style={{
            width: size,
            height: size,
            color: "var(--primary-text-color, #fff)",
          }}
        />
      )}
    </div>
  );
};

export default UserPreviewImage;