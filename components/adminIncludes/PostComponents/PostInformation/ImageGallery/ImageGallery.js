import React, {useEffect, useState, useContext, useRef} from 'react';
import {uploadFiles} from "../../../../../_variables/ajaxVariables";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes, faUpload} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {useSelector} from "react-redux";
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
const ImageGallery = props => {
    const uploadInputElement = useRef(null)

    const post = useSelector((state) => state.adminPanelPosts.post);
    
    const [state, setState] = useState({
        images: [],
        imageFromUrl: ''
    });
    useEffect(() => {
        setState({
            ...state,
            images: post.images || [],
            imageFromUrl: ''
        })
    }, []);

    const renderImagesPreview = (post.images || []).map(image => {
        const onRemoveImageHandler = () => {
            const e = {
                target: {
                    name: 'images',
                    value: post.images.filter(i => i !== image)
                }
            }
            props.onChangeHandler(e)
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
                value: [...post.images, state.imageFromUrl]
            }
        }
        props.onChangeHandler(e)
    }


    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('uploadingFile', e.target.files[0])
        filesData.append('type', 'gallery')
        uploadFiles(filesData).then(res => {
            // labelOutputElement.current.value =res.data.path
            const e = {
                target: {
                    name: 'images',
                    value: [...post.images, res.data.path.replace('./', '/')]
                }
            }
            props.onChangeHandler(e)

        }).catch(err => {
            console.log(err)

        })
    }

    if (props.rendering) {
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
                    <styled className='product-information-images-preview'>
                        {renderImagesPreview}
                    </styled>
                </div>
            </>
        );
    } else return null
};
export default ImageGallery;
