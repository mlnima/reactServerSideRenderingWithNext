import {useEffect, useState} from 'react';
import Image from 'next/image';
import styled from "styled-components";

let StyledDiv = styled.div`
  margin: 10px 0;
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;


  .product-slide-show-image-area {
    overflow: hidden;
    position: relative;
    padding-bottom: 56.30%;
    margin-bottom: 20px;
    height: 0;

    .active-image {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      margin-bottom: 50px;
      padding: 0 !important;
      border-radius: 10px;
      object-fit: contain;
    }
  }

  .product-slide-show-slide-btn {
    position: absolute;
    top: 50%;
    background-color: rgba(0, 0, 0, .5);
    border: none;
    outline: none;
    border-radius: 10px;
    font-size: large;
    padding: 10px;
    color: white;
    z-index: 17;
  }

  .product-slide-show-slide-btn-right {
    right: 1%;
  }

  .product-slide-show-slide-btn-left {
    left: 1%;
  }

  ${props => props.stylesData}
`;


const SlideShow = ({post, sidebar, deviceWidth}) => {
    const [state, setState] = useState({
        activeImageIndex: 0,
        imagesArrayLength: 0
    });
    useEffect(() => {
        setState({
            ...state,
            imagesArrayLength: post.images.length
        })
    }, [post.images]);
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
        const activeImageSrc = post.images.length > 0 ? post.images[state.activeImageIndex] : post.mainThumbnail

        if (activeImageSrc.includes('http')) {
            if (post.images.length > 0) {
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
