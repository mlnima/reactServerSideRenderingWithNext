import React, {useEffect, useState, useContext, useRef} from 'react';
import {uploadFiles} from "../../../../../_variables/ajaxVariables";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes, faUpload} from "@fortawesome/free-solid-svg-icons";

const ImageGallery = props => {
    const uploadInputElement = useRef(null)
    const [state, setState] = useState({
        images: [],
        imageFromUrl: ''
    });
    useEffect(() => {
        setState({
            ...state,
            images: props.postData.images || [],
            imageFromUrl: ''
        })
    }, []);

    const renderImagesPreview = (props.postData.images || []).map(image => {
        const onRemoveImageHandler = () => {
            const e = {
                target: {
                    name: 'images',
                    value: props.postData.images.filter(i => i !== image)
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
                value: [...props.postData.images, state.imageFromUrl]
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
                    value: [...props.postData.images, res.data.path.replace('./', '/')]
                }
            }
            props.onChangeHandler(e)
            console.log(res.data)
        }).catch(err => {
            console.log(err)

        })
    }


    // const onChangeHandler = (e) => {
    //     props.setProductInfo({
    //         ...props.productInfo,
    //         [e.target.name]: e.target.value
    //     })
    // }


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
                    <div className='product-information-images-preview'>
                        {renderImagesPreview}
                    </div>
                </div>
            </>
        );
    } else return null
};
export default ImageGallery;
