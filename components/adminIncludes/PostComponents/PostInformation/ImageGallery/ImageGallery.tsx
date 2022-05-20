import React, {useEffect, useState, useRef, FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes, faUpload} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {fetchFileManagerUploadFile} from "@store_toolkit/adminReducers/adminPanelFileManagerReducer";

let StyledDiv = styled.div`
    display: flex;
    .product-information-image-preview{
      .image-remove-btn{
        border-radius: 50%;
        border: white .2px solid;
        width: 30px;
        height: 30px;
        padding: 0;
        margin: 0;
        svg{
          width: 20px;
          height: 20px;

        }
        &:hover{
          transform: scale(1.1);
          transition: .5s;
        }
      }
      &:hover{
        transform: scale(1.3);
        transition: .5s;
        z-index: 10;
      }
    }
`

interface ImageGalleryPropTypes {
    onChangeHandler: any,
    rendering: boolean
}

const ImageGallery:FC<ImageGalleryPropTypes> = ({onChangeHandler, rendering}) => {
    const dispatch = useDispatch()
    const uploadInputElement = useRef(null)

    const post = useSelector((store:StoreTypes) => store.adminPanelPosts.post);
    
    const [state, setState] = useState({
        images: [],
        imageFromUrl: ''
    });
    useEffect(() => {
        setState({
            ...state,
            //@ts-ignore
            images: post.images || [],
            imageFromUrl: ''
        })
    }, []);
    //@ts-ignore
    const renderImagesPreview = (post.images || []).map(image => {
        const onRemoveImageHandler = () => {
            const e = {
                target: {
                    name: 'images',
                    //@ts-ignore
                    value: post.images.filter(i => i !== image)
                }
            }
            onChangeHandler(e)
        }

        return (
            <div className='product-information-image-preview' key={image + Date.now()}>
                <img src={image}/>
                <button className='image-remove-btn' onClick={() => onRemoveImageHandler()}> <FontAwesomeIcon icon={faTimes} className='post-element-info-logo'/></button>
            </div>
        )
    });

    const onAddImageFromUrlHandler = () => {
        const e = {
            target: {
                name: 'images',
                //@ts-ignore
                value: [...post.images, state.imageFromUrl]
            }
        }
        onChangeHandler(e)
    }


    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('uploadingFile', e.target.files[0])
        filesData.append('type', 'gallery')


        dispatch(fetchFileManagerUploadFile({file: filesData, useType:'postImageGallery',postData:post}))
        // uploadFiles(filesData).then(res => {
        //     // labelOutputElement.current.value =res.data.path
        //     const e = {
        //         target: {
        //             name: 'images',
        //             value: [...post.images, res.data.path.replace('./', '/')]
        //         }
        //     }
        //     onChangeHandler(e)
        //
        // }).catch(err => {
        //
        // })
    }

    if (rendering) {
        return (
            <>
                <p>Add Image From Url Or Upload a Image :</p>
                <div className=' product-information-section product-information-add-image'>
                    <input value={state.imageFromUrl}
                           onChange={e => setState({...state, imageFromUrl: e.target.value})}/>
                    <button onClick={() => onAddImageFromUrlHandler()}><FontAwesomeIcon icon={faPlus} className='post-element-info-logo'/></button>
                    <input ref={uploadInputElement} type="file" style={{display: 'none'}}
                           onChange={e => onUploadHandler(e)}/>
                    <button onClick={() => uploadInputElement.current.click()}><FontAwesomeIcon icon={faUpload} className='post-element-info-logo'/></button>
                </div>
                <div className='post-information-section'>
                    <StyledDiv className='product-information-images-preview'>
                        {renderImagesPreview}
                    </StyledDiv>
                </div>
            </>
        );
    } else return null
};
export default ImageGallery;
