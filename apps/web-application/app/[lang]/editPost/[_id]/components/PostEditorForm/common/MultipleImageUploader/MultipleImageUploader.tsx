'use client';
import React, {useRef} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {TouchBackend} from 'react-dnd-touch-backend';
import {ImageListWithPreview} from './ImageListWithPreview';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons/faCamera";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {touchDeviceDetector} from "custom-util";
import "./MultipleImageUploader.styles.scss";

export interface MultipleImageUploaderProps {
    editingPost: { [key: string]: any },
    setEditingPost: Function;
    onSelectImageHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const MultipleImageUploader: React.FC<MultipleImageUploaderProps> = (
    {
        editingPost,
        setEditingPost,
        onSelectImageHandler
    }) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const isTouchDevice = touchDeviceDetector()

    const removeImage = (index: number) => {
        const newFiles = [...(editingPost?.images || [])];
        newFiles.splice(index, 1);
        //@ts-ignore
        setEditingPost(prevState => ({
            ...prevState, images: newFiles
        }))
    };

    const onInputFileClickHandler = () => {
        if (inputRef?.current) {
            inputRef?.current?.click()
        }
    }

    return (

        <div className={'multipleImageUploader'}>
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
                {/*//@ts-ignore*/}
                <ImageListWithPreview editingPost={editingPost} setEditingPost={setEditingPost}
                                      removeImage={removeImage}/>
            </DndProvider>
        </div>

    );
};

export default MultipleImageUploader

