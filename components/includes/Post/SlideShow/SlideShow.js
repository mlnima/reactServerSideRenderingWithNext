import React, {useEffect, useState, useContext, useRef} from 'react';
import Image from 'next/image';

const SlideShow = props => {
    const [state, setState] = useState({
        activeImageIndex: 0,
        imagesArrayLength: 0
    });
    useEffect(() => {
        setState({
            ...state,
            imagesArrayLength: props.images.length
        })
    }, [props]);


    const nextImage = () => {
        setState({
            ...state,
            activeImageIndex: state.activeImageIndex + 1
        })
    }
    const previousImage = () => {
        setState({
            ...state,
            activeImageIndex: state.activeImageIndex - 1
        })
    }

    const NextBtn = () => {

        if (state.activeImageIndex >= state.imagesArrayLength - 1) {
            return null
        } else {
            return (
                <button className='product-slide-show-slide-btn product-slide-show-slide-btn-right' onClick={() => nextImage()}>&#11208; </button>
            )
        }
    }

    const PreviousBtn = () => {
        if (state.activeImageIndex > 0 && state.imagesArrayLength > 1) {
            return (
                <button className='product-slide-show-slide-btn product-slide-show-slide-btn-left' onClick={() => previousImage()}> &#11207; </button>
            )
        } else {
            return null
        }
    }

    const RenderImageElement = () => {
        const activeImageSrc = props.images.length > 0 ? props.images[state.activeImageIndex] : props.mainThumbnail

        if (activeImageSrc.includes('http')) {
            if (props.images.length > 0) {
                return (
                    <img className='active-image' src={activeImageSrc} alt="activeImageSrc"/>
                )
            } else {
                return (
                    <img className='active-image' src={activeImageSrc} alt="activeImageSrc"/>
                )
            }
        } else {

            let imageWidth = props.deviceWidth > 768 ? props.sidebar ? props.deviceWidth - 300 : props.deviceWidth : props.deviceWidth

            return (
                <Image src={activeImageSrc} alt="activeImageSrc"
                       width={imageWidth || 640} height={(imageWidth || 640) / 1.777}
                       quality={85}
                       loading='eager'
                       className='active-image'
                />
            )
        }

    }

    if (props.postType === 'product') {
        return (
            <div className='product-slide-show'>
                <PreviousBtn/>
                <div className='product-slide-show-image-area'>
                    <RenderImageElement/>
                </div>

                <NextBtn/>
            </div>
        );
    } else return null

};
export default SlideShow;
