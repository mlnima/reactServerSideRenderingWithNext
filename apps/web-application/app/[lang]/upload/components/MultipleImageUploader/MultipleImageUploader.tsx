'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import './MultipleImageUploader.scss';
import { IPost } from '@repo/typescript-types';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

export interface MultipleImageUploaderProps {
  editingPost: IPost;
  setEditingPost: React.Dispatch<React.SetStateAction<IPost>>;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const MultipleImageUploader: React.FC<MultipleImageUploaderProps> = ({
  editingPost,
  setEditingPost,
  fileInputRef,
}) => {
  const [image, setImage] = useState<string | null>(null);

  const onChangeHandler = () => {
    if (!fileInputRef.current || !fileInputRef.current.files) {
      return;
    }
    const file = fileInputRef.current.files[0];
    if (file instanceof Blob) {
      setImage(URL.createObjectURL(file));
    }
  };

  const removeImage = async () => {
    // @ts-expect-error: it's fine
    setEditingPost((prevState) => ({
      ...prevState,
      mainThumbnail: 'null',
      thumbnail: null,
    }));
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={'multipleImageUploader'}>
      <input
        ref={fileInputRef}
        type="file"
        multiple={false}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onChangeHandler}
      />

      {!image &&
        !editingPost?.mainThumbnail &&
        !editingPost?.thumbnail?.filePath && (
          <>
            <div
              className={'add-images-area'}
              onClick={() => fileInputRef?.current?.click()}
            >
              <FontAwesomeIcon
                className={'camera'}
                icon={faCamera}
                style={{ width: 40, height: 40 }}
              />
              <FontAwesomeIcon
                className={'plus'}
                icon={faCirclePlus}
                style={{ width: 10, height: 10 }}
              />
            </div>
          </>
        )}

      {(!!image ||
        !!editingPost?.mainThumbnail ||
        !!editingPost?.thumbnail?.filePath) && (
        <div className={'imagePreview'}>
          <div className={'imageActionButtons'}>
            <FontAwesomeIcon onClick={() => removeImage()} icon={faTrash} />
          </div>
          <img
            src={
              image ||
              editingPost?.mainThumbnail ||
              `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${editingPost?.thumbnail?.filePath}`
            }
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default MultipleImageUploader;


//fileInputRef?.current?.files?.length === 0 && !image &&
// const onInputFileClickHandler = () => {
//     if (limit && editingPost?.images?.length < limit) {
//         if (fileInputRef?.current) {
//             fileInputRef?.current?.click();
//         }
//     } else {
//         dispatch(
//             setAlert({
//                 message: `${dictionary?.['Maximum'] || 'Maximum'} ${limit} ${dictionary?.['Image'] || 'Image'}`,
//                 type: 'success',
//             }),
//         );
//     }
// };

// const onSelectImageHandler = async (event: any) => {
//     const formData = new FormData();
//     const selectedImages = event.target.files || event.dataTransfer.files;
//     if (!selectedImages?.length) return;
//
//     for await (const image of selectedImages) {
//         try {
//             formData.append('images', await imageCanvasCompressor({ image, outputType: 'file' }));
//         } catch (error) {}
//     }
//
//     //append images data to form data
//     formData.append(
//         'imagesData',
//         JSON.stringify({
//             usageType: 'post',
//             postId: editingPost._id,
//         }),
//     );
//
//     //upload images
//     await clientAPIRequestUploadPostImages(formData).then((response: { data: any }) => {
//         if (response.data?.images?.length > 0) {
//             setEditingPost((prevState: React.SetStateAction<any>) => {
//                 try {
//                     const allImages = [...(prevState?.images || []), ...response.data?.images];
//                     return {
//                         ...prevState,
//                         mainThumbnail: allImages[0]?.filePath,
//                         images: allImages,
//                     };
//                 } catch (error) {
//                     console.log('error=> ', error);
//                 }
//             });
//         }
//     });
// };

// const onAddImagesHandler = async e => {
//     const selectedFiles = Array.from(e.target.files);
//     const newFiles = selectedFiles.map((file: Blob | MediaSource) => ({
//         file: imageCanvasCompressor({ file, outputType: 'file' }),
//         preview: URL.createObjectURL(file),
//         name: file.name,
//     }));
//
//     setFiles(prevFiles => [...prevFiles, ...newFiles]);
// };
