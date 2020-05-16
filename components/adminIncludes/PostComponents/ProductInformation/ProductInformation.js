import React, { useEffect, useState, useContext, useRef } from 'react';
import TextInputWithUploadBtn from '../../TextInputWithUploadBtn/TextInputWithUploadBtn'
import { fileUpload } from '../../../../_variables/ajaxVariables'

const ProductInformation = props => {
    const uploadInputElement = useRef(null)

    const [ state, setState ] = useState({
        images: [],
        imageFromUrl: ''
    });

    useEffect(() => {
        setState({
            ...state,
            images: props.postData.images || [],
            imageFromUrl: ''
        })
    }, [ props ]);

    const renderImagesPreview = state.images.map(image => {
        const onRemoveImageHandler = () => {
            const e = {
                target: {
                    name: 'images',
                    value: state.images.filter(i => i !== image)
                }
            }
            props.onChangeHandler(e)
        }

        return (
            <div className='product-information-image-preview'>
                <img src={ image }/>
                <button onClick={ () => onRemoveImageHandler() }>&#x2A2F;</button>
            </div>
        )
    });

    const onAddImageFromUrlHandler = () => {
        const e = {
            target: {
                name: 'images',
                value: [ ...props.postData.images, state.imageFromUrl ]
            }
        }
        props.onChangeHandler(e)
    }

    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('uploadingFile', e.target.files[0])
        fileUpload(filesData, 'test').then(res=>{
            // labelOutputElement.current.value =res.data.path
            const e = {
                target: {
                    name: 'images',
                    value: [ ...props.postData.images, res.data.path.replace('./','/') ]
                }
            }
            props.onChangeHandler(e)
            // props.setFunction(props.name,res.data.path.replace('./','/'))

            console.log( res.data)
        }).catch(err=>{
            console.log( err)

        })
    }



    if (props.postData.postType === 'product') {
        return (
            <div className='product-information'>
                <p>Add Image From Url Or Upload a Image :</p>
                <div className=' product-information-section product-information-add-image'>
                    <input value={ state.imageFromUrl } onChange={ e => setState({ ...state, imageFromUrl: e.target.value }) }/>
                    <button onClick={ () => onAddImageFromUrlHandler() }>Add</button>
                    <input ref={ uploadInputElement } type="file" style={ { display: 'none' } } onChange={ e => onUploadHandler(e) }/>
                    <button onClick={ () => uploadInputElement.current.click() }>Upload</button>
                </div>

                <div className='product-information-images-preview'>
                    { renderImagesPreview }
                </div>
                <br/>
                <div className='product-information-section'>
                    <p>Price :</p>
                    <input name='price' type='number' placeholder='Price' value={props.postData.price || 1} onChange={e=>props.onChangeHandler(e)}/>
                    <p>Currency :</p>
                    <input name='currency'  value={props.postData.currency || 'Euro'} onChange={e=>props.onChangeHandler(e)}/>
                </div>

            </div>
        );
    } else {
        return (
            <h3>This Post Type Does not Support this Feature </h3>
        )
    }

};
export default ProductInformation;
