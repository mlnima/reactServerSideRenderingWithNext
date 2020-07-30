import React, {useEffect, useState, useContext, useRef} from 'react';
import TextInputWithUploadBtn from '../../TextInputWithUploadBtn/TextInputWithUploadBtn'
import {fileUpload} from '../../../../_variables/ajaxVariables'

const ProductInformation = props => {
    const uploadInputElement = useRef(null)

    const [state, setState] = useState({
        images: [],
        imageFromUrl: ''
    });
    useEffect(() => {
        console.log(props)
    }, [props]);
    useEffect(() => {
        setState({
            ...state,
            images: props.postData.images || [],
            imageFromUrl: ''
        })
        // props.priceElement.current.value = props.postData.price || 1
        // props.priceTypeElement.current.value = props.postData.priceType || 'negotiable'
        // props.currencyElement.current.value = props.postData.currency
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
            <div className='product-information-image-preview'>
                <img src={image}/>
                <button className='image-remove-btn' onClick={() => onRemoveImageHandler()}>&#x2A2F;</button>
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
        fileUpload(filesData, 'test').then(res => {
            // labelOutputElement.current.value =res.data.path
            const e = {
                target: {
                    name: 'images',
                    value: [...props.postData.images, res.data.path.replace('./', '/')]
                }
            }
            props.onChangeHandler(e)
            // props.setFunction(props.name,res.data.path.replace('./','/'))

            console.log(res.data)
        }).catch(err => {
            console.log(err)

        })
    }


    const onChangeHandler = (e) => {
        props.setProductInfo({
            ...props.productInfo,
            [e.target.name]: e.target.value
        })
    }


    if (props.postData.postType === 'product') {
        return (
            <div className='product-information admin-widget'>
                <p>Add Image From Url Or Upload a Image :</p>
                <div className=' product-information-section product-information-add-image'>
                    <input value={state.imageFromUrl}
                           onChange={e => setState({...state, imageFromUrl: e.target.value})}/>
                    <button onClick={() => onAddImageFromUrlHandler()}>Add</button>
                    <input ref={uploadInputElement} type="file" style={{display: 'none'}}
                           onChange={e => onUploadHandler(e)}/>
                    <button onClick={() => uploadInputElement.current.click()}>Upload</button>
                </div>

                <div className='product-information-images-preview'>
                    {renderImagesPreview}
                </div>
                <br/>
                <div className='product-information-section'>
                    <p>Price :</p>
                    <input name='price' type='number' placeholder='Price' onChange={e => onChangeHandler(e)}
                           value={props.productInfo.price}/>
                    <select name='priceType' onChange={e => onChangeHandler(e)} value={props.productInfo.priceType}>
                        <option value='negotiable'>Negotiable</option>
                        <option value='last'>Last Price</option>
                        <option value='giveAway'>Give Away</option>
                    </select>
                    <p>Currency :</p>
                    <input name='currency' placeholder='currency' onChange={e => onChangeHandler(e)}
                           value={props.productInfo.currency}/>
                </div>

            </div>
        );
    } else return null

};
export default ProductInformation;
