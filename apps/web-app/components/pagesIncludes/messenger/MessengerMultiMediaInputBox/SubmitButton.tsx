import React, {FC} from "react";
import {ActionButtonStyle} from "@components/pagesIncludes/chatroom/ChatRoomTools/Styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons/faPaperPlane";

interface PropTypes {
    handleSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SubmitButton: FC<PropTypes> = ({handleSubmit}) => {

    return (
        <ActionButtonStyle type={'submit'} onClick={handleSubmit} >
            <FontAwesomeIcon icon={faPaperPlane} style={{width: 25, height: 25}}/>
        </ActionButtonStyle>
    )
};
export default SubmitButton;

