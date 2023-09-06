import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons/faPaperPlane";

interface PropTypes {
    handleSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SubmitButton: FC<PropTypes> = ({handleSubmit}) => {

    return (
        <button type={'submit'} onClick={handleSubmit} >
            <FontAwesomeIcon icon={faPaperPlane} style={{width: 25, height: 25}}/>
        </button>
    )
};
export default SubmitButton;

