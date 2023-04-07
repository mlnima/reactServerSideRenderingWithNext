import React, {FC} from "react";
import {ImagePreviewStyles} from "./styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import { useDrag } from "react-dnd";

interface PropTypes {
    file:any,
    index:number,
    handleRemoveFile:Function
}

const ImagePreview: FC<PropTypes> = ({file,index,handleRemoveFile}) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { id: index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <ImagePreviewStyles ref={drag} isDragging={isDragging}  draggable>
            <img src={URL.createObjectURL(file.file)} alt={`preview-${index}`}/>
            <FontAwesomeIcon onClick={() => handleRemoveFile(file.id)}
                             className={'remove-btn'}
                             icon={faXmark}
                             style={{width: 24, height: 24}}/>
        </ImagePreviewStyles>
    )
};

export default ImagePreview;
