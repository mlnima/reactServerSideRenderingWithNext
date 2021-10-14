import {useState} from 'react';
import Image from 'next/image';
import Link from "next/link";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Controller, Thumbs, Scrollbar, Keyboard, Autoplay, EffectCube, EffectCoverflow, Lazy} from 'swiper'
import 'swiper/css';

SwiperCore.use([Navigation, Pagination, Scrollbar, Keyboard, Autoplay, Controller, EffectCube, EffectCoverflow, Lazy]);
import styled from "styled-components";

let StyledDiv = styled.div`
.image-swiper{
  .swiper-wrapper{
    .swiper-slide{
      margin: auto;
      display: flex;
      justify-content: center;
      a{
        .image {
        }
        .image-slider-item-internal-image {
        }
        div {
          margin: auto;
          width: 100%;
          .image-slider-item-internal-image {
            margin: auto;
          }
        }
      }
    }
  }
}

`

const ImageSwiper = props => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [controlledSwiper, setControlledSwiper] = useState(null);
    const [state, setState] = useState({
        imageSwiperData: [],
        slidesPerView: 3
    });


    const renderSlides = props.imageSwiperData.map(imageData => {

        const RenderImageElement = () => {

            const slidePerView = ((window.innerWidth / 100) * 95) >= 768 ? parseInt(props.slideAmountInDesktop) || 3 : parseInt(props.slideAmountInMobile) || 1
            let imageWidth;
            let imageHeight;
            if (window.innerWidth > 768) {
                imageWidth = props.currentPageSidebar ? (((window.innerWidth / 100) * 95) - 320) / slidePerView : (((window.innerWidth / 100) * 95) - 320) / slidePerView
                imageHeight = props.currentPageSidebar ? ((((window.innerWidth / 100) * 95) - 320) / slidePerView) / (state.imageRatioWidth / state.imageRatioHeight) : (((window.innerWidth / 100) * 95) / slidePerView) / (props.imageRatioWidth / props.imageRatioHeight)
            } else {
                imageWidth = ((window.innerWidth / 100) * 95) / parseInt(props.slideAmountInMobile || 1)
                imageHeight = (((window.innerWidth / 100) * 95) / parseInt(props.slideAmountInMobile || 1)) / (props.imageRatioWidth / props.imageRatioHeight)
            }


            if (imageData.imageUrl.includes('http') || imageData.imageUrl.includes(window.location.hostname)) {
                return (
                    <img
                        src={imageData.imageUrl}
                        className='image-slider-item-external-image'
                        alt={`Thumbnail ${imageData.imageUrl}`}
                        style={{
                            width: imageWidth,
                            height: imageHeight
                        }}
                    />
                )
            } else {
                return (
                    <Image src={imageData.imageUrl} alt={`Thumbnail ${imageData.imageUrl}`}
                           className='image-slider-item-internal-image'
                           width={imageWidth}
                           height={imageHeight}
                           layout='intrinsic'
                           quality={85}
                           loading='lazy'/>
                )
            }
        }
        if (imageData.targetUrlType === 'internal') {
            return (
                <SwiperSlide tag="div" key={props.imageSwiperData.indexOf(imageData)}>
                    <Link href={imageData.targetUrl} as={imageData.targetUrlAs || imageData.targetUrl}>
                        <a className='swiper-slide'>
                            <RenderImageElement/>
                        </a>
                    </Link>
                </SwiperSlide>

            )
        } else if (imageData.targetUrlType === 'external') {
            return (
                <SwiperSlide tag="div" key={props.imageSwiperData.indexOf(imageData)}>
                    <a href={imageData.targetUrl}>

                        <RenderImageElement/>
                    </a>
                </SwiperSlide>
            )
        } else return null
    })


    return (
        <StyledDiv>
            <Swiper
                thumbs={{swiper: thumbsSwiper}}
                controller={{control: controlledSwiper}}
                className='image-swiper'
                tag="section"
                keyboard
                // autoplay={props.sliderAutoplay === 'true'}
                autoplay
                speed={parseInt(props.sliderSpeed) || 1000}
                navigation
                scrollbar={{draggable: true}}
                effect={props.sliderEffect || false}
                spaceBetween={window.innerWidth >= 768 ? parseInt(props.spaceBetweenAmountDesktop) || 1 : parseInt(props.spaceBetweenAmountMobile) || 1}
                slidesPerView={window.innerWidth >= 768 ? parseInt(props.slideAmountInDesktop) || 3 : parseInt(props.slideAmountInMobile) || 1}
                style={{
                    maxWidth: window.innerWidth >= 768 && props.currentPageSidebar ? '70vw' :
                        window.innerWidth >= 768 && !props.currentPageSidebar ? '95vw' :
                            '95vw',

                }}
            >
                {renderSlides}
            </Swiper>
        </StyledDiv>

    );
};
export default ImageSwiper;
// <div ref={sliderRef} className='keen-slider'>
//     {renderKeenSlides}
// </div>

