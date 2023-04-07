import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImages} from "@fortawesome/free-solid-svg-icons/faImages";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import { DndProvider,useDrag } from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend";
import {ImageUploaderStyles} from "./styles";
import ImagePreview from "./ImagePreview";

type FileList = Array<{
    file: File,
    id: number
}>;





const ImageUploader = () => {
    const inputRef = useRef(null)
    const [files, setFiles] = useState<FileList>([]);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<any>) => {
        event.preventDefault()
        //@ts-ignore
        const selectedFiles = event.target.files || event.dataTransfer.files;
        if (!!selectedFiles?.length) {
            const updatedFiles = [...files];
            for (let i = 0; i < selectedFiles.length; i++) {
                updatedFiles.push({
                    file: selectedFiles[i],
                    id: Date.now() + i
                });
            }
            setFiles(updatedFiles);
        }
    };

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        if (event.dataTransfer) {
            event.dataTransfer.setData('text/plain', String(index));
            setDraggedIndex(index);
        }

    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        event.preventDefault();
        if (draggedIndex !== null && draggedIndex !== index) {
            const updatedFiles = [...files];
            const draggedFile = updatedFiles[draggedIndex];
            updatedFiles.splice(draggedIndex, 1);
            updatedFiles.splice(index, 0, draggedFile);
            setFiles(updatedFiles);
            setDraggedIndex(index);
        }
    };

    const handleDrop = () => {
        setDraggedIndex(null);
    };

    const handleRemoveFile = (id: number) => {
        const updatedFiles = files.filter((file) => file.id !== id);
        setFiles(updatedFiles);
    };

    const onInputFileClickHandler = () => {
        if (inputRef?.current) {
            //@ts-ignore
            inputRef?.current?.click()
        }
    }

    // const [{ opacity }, dragRef] = useDrag(
    //     () => ({
    //         type: ItemTypes.CARD,
    //         item: { text },
    //         collect: (monitor) => ({
    //             opacity: monitor.isDragging() ? 0.5 : 1
    //         })
    //     }),
    //     []
    // )



    // const [{ isOver }, drop] = useDrop(() => ({
    //     accept: "image",
    //     drop: (item) => addImageToBoard(item.id),
    //     collect: (monitor) => ({
    //         isOver: !!monitor.isOver(),
    //     }),
    // }));
    return (
        <ImageUploaderStyles className={'images-container'}   onContextMenu={event => event.preventDefault()}>
            <input type="file"
                   accept="image/x-png,image/gif,image/jpeg,image/webp"
                   style={{display: 'none'}}
                   ref={inputRef}
                   multiple
                   onChange={handleFileUpload}/>

            <div className={'add-images-area'}
                 onDragOver={(event) => event.preventDefault()}
                 onDrop={handleFileUpload}
                 onClick={onInputFileClickHandler}>
                <FontAwesomeIcon className={'images'} icon={faImages} style={{width: 70, height: 70}}/>
            </div>
            <DndProvider backend={HTML5Backend}>
            {files.map((file, index) => (
                // <ImagePreview key={file.id}
                //               draggable
                //               isDragging={index === draggedIndex}
                //               onContextMenu={event => event.preventDefault()}
                //               onDragStart={(event) => handleDragStart(event, index)}
                //               //@ts-ignore
                //               onTouchMove={(event) => handleDragStart(event, index)}
                //               onDragOver={(event) => handleDragOver(event, index)}
                //               onTouchEnd={handleDrop}
                //               onDrop={handleDrop}
                //               >
                //
                //     <img src={URL.createObjectURL(file.file)} alt={`preview-${index}`}/>
                //     <FontAwesomeIcon onClick={() => handleRemoveFile(file.id)}
                //                      className={'remove-btn'}
                //                      icon={faXmark}
                //                      style={{width: 24, height: 24}}/>
                // </ImagePreview>
                <ImagePreview key={file.id}
                              index={index }
                              handleRemoveFile={handleRemoveFile}
                              file={file}/>
            ))}
            </DndProvider>

        </ImageUploaderStyles>
    );


};

export default ImageUploader;
