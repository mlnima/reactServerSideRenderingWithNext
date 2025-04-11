'use client';
import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons/faCamera";
import {IDraftMessage} from "../../interfaces";

interface IProps {
    imageInputRef: React.RefObject<HTMLInputElement>,
    setDraftMessage: React.Dispatch<React.SetStateAction<IDraftMessage>>;
}

const Component: FC<IProps> = ({imageInputRef,setDraftMessage}) => {

    const onSelectImageHandler = async (event:React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files){
            const file = event.target.files[0];
            const readerPromise = new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const MAX_WIDTH = 400;
                        const MAX_HEIGHT = 400;
                        let width = img.width;
                        let height = img.height;

                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        if (ctx){
                            ctx.drawImage(img, 0, 0, width, height);
                            const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                            resolve(dataUrl);
                        }
                    };
                    if (event.target){
                        img.src = event.target.result as string;
                    }
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
            try {
                const resizedImageBase64 = await readerPromise;
                // @ts-expect-error : types need to be fixed
                setDraftMessage((prevState) => ({
                    ...prevState,
                    imageContent: resizedImageBase64
                }))
                if (event.target){
                  event.target.value = '';
                }

            } catch (error) {
                console.error(error);
            }
        }

    };

    const onClickHandler = (event:React.FormEvent) => {
        event.preventDefault()
        if (imageInputRef?.current) {
            imageInputRef.current.click()
        }
    }

    return (
        <>
            <input ref={imageInputRef}
                   type="file"
                   accept="image/*"
                   style={{display: 'none'}}
                   onChange={onSelectImageHandler}/>
            <button type={'button'} className={'camera-button'} onClick={onClickHandler}>
                <FontAwesomeIcon icon={faCamera} style={{width: 25, height: 25}}/>
            </button>
        </>
    )
};
export default Component
