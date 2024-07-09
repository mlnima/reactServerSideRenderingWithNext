'use client';
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import './MultipleImageUploader.styles.scss';
import { clientAPIRequestDeletePostImage, clientAPIRequestUploadPostImages } from '@repo/api-requests';
import { imageCanvasCompressor } from '@repo/shared-util';
import { setAlert } from '@store/reducers/globalStateReducer';
import { useAppDispatch } from '@store/hooks';

import { ImageList } from './ImageList';
import { Post } from 'typescript-types';

export interface MultipleImageUploaderProps {
    editingPost: Post;
    setEditingPost: Function;
    limit: number;
    dictionary: {
        [key: string]: string;
    };
}

const MultipleImageUploader: React.FC<MultipleImageUploaderProps> = ({
    editingPost,
    setEditingPost,
    limit,
    dictionary,
    // onSelectImageHandler
}) => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const removeImage = async (index: number) => {
        const thumbnailToReplace =
            index === 0 && !!editingPost?.images?.[1]
                ? {
                      thumbnailToReplace: editingPost?.images?.[1]?.filePath,
                  }
                : {};
        const deleteImageRequestOptions = {
            postId: editingPost?._id,
            imageId: editingPost?.images?.[index]?._id,
            ...thumbnailToReplace,
        };

        //@ts-ignore
        await clientAPIRequestDeletePostImage(deleteImageRequestOptions).then(() => {
            const newFiles = [...(editingPost?.images || [])];
            newFiles.splice(index, 1);
            //@ts-ignore
            setEditingPost(prevState => ({
                ...prevState,
                images: newFiles,
            }));
        });
    };

    const onInputFileClickHandler = () => {
        if (limit && editingPost?.images?.length < limit) {
            if (inputRef?.current) {
                inputRef?.current?.click();
            }
        } else {
            dispatch(
                setAlert({
                    message: `${dictionary?.['Maximum'] || 'Maximum'} ${limit} ${dictionary?.['Image'] || 'Image'}`,
                    type: 'success',
                }),
            );
        }
    };

    const onSelectImageHandler = async (event: any) => {
        const formData = new FormData();
        const selectedImages = event.target.files || event.dataTransfer.files;
        if (!selectedImages?.length) return;

        for await (const image of selectedImages) {
            try {
                formData.append('images', await imageCanvasCompressor({ image, outputType: 'file' }));
            } catch (error) {}
        }

        //append images data to form data
        formData.append(
            'imagesData',
            JSON.stringify({
                usageType: 'post',
                postId: editingPost._id,
            }),
        );

        //upload images
        await clientAPIRequestUploadPostImages(formData).then((response: { data: any }) => {
            if (response.data?.images?.length > 0) {
                setEditingPost((prevState: React.SetStateAction<any>) => {
                    try {
                        const allImages = [...(prevState?.images || []), ...response.data?.images];
                        return {
                            ...prevState,
                            mainThumbnail: allImages[0]?.filePath,
                            images: allImages,
                        };
                    } catch (error) {
                        console.log('error=> ', error);
                    }
                });
            }
        });
    };

    return (
        <div className={'multipleImageUploader'}>
            {editingPost?.images?.length < limit && (
                <input
                    ref={inputRef}
                    type="file"
                    multiple={limit > 1}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={onSelectImageHandler}
                />
            )}

            {editingPost?.images?.length < limit && (
                <div className={'add-images-area'} onClick={onInputFileClickHandler}>
                    <FontAwesomeIcon className={'camera'} icon={faCamera} style={{ width: 40, height: 40 }} />
                    <FontAwesomeIcon className={'plus'} icon={faCirclePlus} style={{ width: 10, height: 10 }} />
                </div>
            )}

            <ImageList editingPost={editingPost} setEditingPost={setEditingPost} removeImage={removeImage} />
        </div>
    );
};

export default MultipleImageUploader;
