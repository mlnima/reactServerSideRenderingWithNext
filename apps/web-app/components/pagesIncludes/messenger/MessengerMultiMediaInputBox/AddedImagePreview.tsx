import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {Styles} from "./AddedImagePreview.styles";

interface IProps {
    onRemoveImageHandler: () => void,
    imageMessage: string
}

const AddedImagePreview: FC<IProps> = ({onRemoveImageHandler, imageMessage}) => {
    return (
        <Styles>
            <button type={'button'}>
                <FontAwesomeIcon icon={faXmark} style={{width: 25, height: 25}} onClick={onRemoveImageHandler}/>
            </button>
            <img src={imageMessage} alt="image"/>
        </Styles>
    )
};
export default AddedImagePreview
