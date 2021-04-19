import {useEffect, useState} from 'react';
import Image from 'next/image';
import styled from "styled-components";
let StyledDiv = styled.div`${props => props.stylesData}`;


const SlideShow = ({images,sidebar,mainThumbnail,deviceWidth}) => {
    const [state, setState] = useState({
        activeImageIndex: 0,
        imagesArrayLength: 0
    });
    useEffect(() => {
        setState({
            ...state,
            imagesArrayLength: images.length
        })
    }, [images]);
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
        const activeImageSrc = images.length > 0 ? images[state.activeImageIndex] : mainThumbnail

        if (activeImageSrc.includes('http')) {
            if (images.length > 0) {
                return (
                    <img className='active-image' src={activeImageSrc} alt="activeImageSrc"/>
                )
            } else {
                return (
                    <img className='active-image' src={activeImageSrc} alt="activeImageSrc"/>
                )
            }
        } else {

            let imageWidth = deviceWidth > 768 ? sidebar ? deviceWidth - 300 : deviceWidth : deviceWidth

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

    return (
        <StyledDiv className='product-slide-show'>
            <PreviousBtn/>
            <div className='product-slide-show-image-area'>
                <RenderImageElement/>
            </div>
            <NextBtn/>
        </StyledDiv>
    );

};
export default SlideShow;
