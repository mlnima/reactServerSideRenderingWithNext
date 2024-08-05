'use client';
import React, { MouseEventHandler, useState } from 'react';
import { ImageItem } from './ImageItem';
import { Post } from "@repo/typescript-types";
import { v4 as uuidv4 } from 'uuid';
import './ImageList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight, faCaretLeft, faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons';

export interface ImageListProps {

    editingPost: Post;
    setEditingPost: Function;
    removeImage: Function;
}

interface EditingPost {
    images?: { filePath: string }[];

    [key: string]: any;
}

export const ImageList: React.FC<ImageListProps> = ({ editingPost, setEditingPost, removeImage }) => {
    const indexReduce = (index: number) => {
        const newImages = [...(editingPost?.images || [])];
        if (index > 0 && index < newImages.length) {
            newImages.splice(index, 0, newImages.splice(index - 1, 1)[0]);
            setEditingPost((prevState: EditingPost) => {
                return {
                    ...prevState,
                    //@ts-ignore
                    mainThumbnail: newImages?.[0]?.filePath,
                    images: newImages,
                };
            });
        }
    };
    const indexIncrease = (index: number) => {
        const newImages = [...(editingPost?.images || [])];
        if (index < newImages.length - 1) {
            newImages.splice(index + 1, 0, newImages.splice(index, 1)[0]);
            setEditingPost((prevState: EditingPost) => {
                return {
                    ...prevState,
                    //@ts-ignore
                    mainThumbnail: newImages?.[0]?.filePath,
                    images: newImages,
                };
            });
        }
    };

    return (
        <div className={'imageList'}>
            {(editingPost?.images || []).map((image, index) => {
                return (
                    <div key={image?.filePath || image} className={'imageItem'}>
                        <div className={'imageActionButtons'}>
                            {index !== 0 && editingPost?.images?.length !== 1 && (
                                <FontAwesomeIcon onClick={() => indexReduce(index)} icon={faCaretLeft} />
                            )}

                            {index <= editingPost?.images?.length - 2 && (
                                <FontAwesomeIcon icon={faCaretRight} onClick={() => indexIncrease(index)} />
                            )}

                            <FontAwesomeIcon onClick={() => removeImage(index)} icon={faTimes} />
                        </div>

                        <img src={image?.filePath || image} alt="" />
                    </div>
                );
            })}
        </div>
    );
};

