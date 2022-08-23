import React, {FC} from "react";

interface ImagePreviewPropTypes {
    isUploaded:boolean,
    imageUrl:string
}

const ImagePreview: FC<ImagePreviewPropTypes> = (props) => {
    return (
        <div>
            {/*<img src={URL.createObjectURL(editingPostImagesToUpload[imageToUpload])} alt={`image${index}`} key={index}/>*/}
        </div>
    )
};
export default ImagePreview
