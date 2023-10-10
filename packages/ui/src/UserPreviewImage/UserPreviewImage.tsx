import React, {FC, useState} from "react";
import styled from "styled-components";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .user-preview-image {
    border-radius: 50%;
    box-sizing: border-box;
    object-fit: cover;
    cursor: pointer;
  }

  .user-preview-image-icon {
    cursor: pointer;
  }
`;

interface PropTypes {
    imageUrl: any,
    size: number
}

const UserPreviewImage: FC<PropTypes> = ({imageUrl,size=77}) => {
    const [gotError, setGotError] = useState(false)
    return (
        <Style>
            {!!imageUrl && !gotError ?
                <img className={'user-preview-image'} src={imageUrl || '/asset/images/user/noGenderAvatar150.jpg'}
                     onError={() => setGotError(true)}
                     style={{width:size,height:size}}
                     alt={'profile image'}/>:
                <FontAwesomeIcon icon={faUser}
                                 className={'user-preview-image-icon'}
                                 style={{width:size,height:size, color:' var(--primary-text-color,#fff)'}}/>
            }

        </Style>
    )
};
export default UserPreviewImage;
