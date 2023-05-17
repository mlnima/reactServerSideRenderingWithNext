import React, {useRef} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {TouchBackend} from 'react-dnd-touch-backend';
import {ImageListWithPreview} from '@components/includes/PostEditorForm/common/MultipleImageUploader/ImageListWithPreview';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons/faCamera";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {touchDeviceDetector} from "custom-util";
import {MultipleImageUploaderStyle} from "@components/includes/PostEditorForm/common/MultipleImageUploader/Styles";
import {Post} from "typescript-types";

export interface MultipleImageUploaderProps {
    postData: Post,
    setPostData: (postData: any) => void;
    onSelectImageHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MultipleImageUploader: React.FC<MultipleImageUploaderProps> = (
    {
        postData,
        setPostData,
        onSelectImageHandler
    }) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const isTouchDevice = touchDeviceDetector()

    const removeImage = (index: number) => {
        const newFiles = [...(postData?.images || [])];
        newFiles.splice(index, 1);
        setPostData(prevState => ({...prevState, images: newFiles}))
    };

    const onInputFileClickHandler = () => {
        if (inputRef?.current) {
            inputRef?.current?.click()
        }
    }

    return (

        <MultipleImageUploaderStyle>
            <input ref={inputRef}
                   type="file"
                   multiple
                   accept="image/*"
                   style={{display: 'none'}}
                   onChange={onSelectImageHandler}/>

            <div className={'add-images-area'} onClick={onInputFileClickHandler}>
                <FontAwesomeIcon className={'camera'} icon={faCamera} style={{width: 40, height: 40}}/>
                <FontAwesomeIcon className={'plus'}
                                 icon={faCirclePlus}
                                 style={{width: 10, height: 10}}/>
            </div>

            <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
                <ImageListWithPreview postData={postData} setPostData={setPostData} removeImage={removeImage}/>
            </DndProvider>
        </MultipleImageUploaderStyle>

    );
};

export default MultipleImageUploader

//<button onClick={openFileSelector}>Select Images</button>
//  onDragOver={(event) => event.preventDefault()}
// //@ts-ignore
//  onDrop={handleFileSelect}