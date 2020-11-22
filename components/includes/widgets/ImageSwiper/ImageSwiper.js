import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../context/AppContext";
import Image from 'next/image';
import './ImageSwiper.scss';
import Link from "next/link";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Controller, Thumbs, Scrollbar, Keyboard, Autoplay, EffectCube, EffectCoverflow, Lazy} from 'swiper'
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, Keyboard, Autoplay, Controller, EffectCube, EffectCoverflow, Lazy]);


const ImageSwiper = props => {
    const contextData = useContext(AppContext);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [controlledSwiper, setControlledSwiper] = useState(null);
    const [state, setState] = useState({
        imageSwiperData: [],
        slidesPerView: 3
    });

    const [imageSize, setImageSize] = useState({
        width: '300',
        height: '169'
    });

    useEffect(() => {
        console.log(state)

    }, [state]);
    // useEffect(() => {
    //     if (props.imageSwiperData) {
            // setState({
            //     ...state,
            //     imageSwiperData: props.imageSwiperData,
            //     // spaceBetween:props.deviceWidth >= 768 ? props.imageSwiperSpaceBetweenDesktop || 0 : props.imageSwiperSpaceBetweenMobile || 1,
            //     slidesPerView: props.deviceWidth >= 768 ? props.imageSwiperAmountDesktop || 3 : props.imageSwiperAmountMobile || 1,
            // })

        // }

        // if (props.deviceWidth > 768) {
        //     setImageSize({
        //         width: contextData.state.currentPageSidebar ? (props.deviceWidth - 300) / state.slidesPerView : props.deviceWidth / state.slidesPerView,
        //         height: contextData.state.currentPageSidebar ? ((props.deviceWidth - 300) / state.slidesPerView) / 1.777 : (props.deviceWidth / state.slidesPerView) / 1.777
        //     })
        // }else {
        //     setImageSize({
        //         width: props.deviceWidth / (props.imageSwiperAmountMobile || 1),
        //         height: (props.deviceWidth / (props.imageSwiperAmountMobile || 1)) / 1.777
        //     })
        // }


    // }, [props]);


    // const renderSlides = state.imageSwiperData.map(imageData => {
    //
    //     const RenderImageElement = ()=>{
    //         console.log(imageSize)
    //         if (imageData.imageUrl.includes('http')||imageData.imageUrl.includes(window.location.hostname)){
    //             return(
    //                 <img src={imageData.imageUrl} alr={`Thumbnail ${imageData.imageUrl}`}
    //                      width={imageSize.width} height={imageSize.width/1.777}/>
    //             )
    //         }else{
    //             return (
    //                 <Image src={imageData.imageUrl} alt={`Thumbnail ${imageData.imageUrl}`}
    //                        width={imageSize.width} height={imageSize.width/1.777} quality={50} loading='lazy'/>
    //             )
    //         }
    //     }
    //
    //      if(imageData.targetUrlType === 'internal'){
    //          return (
    //              <SwiperSlide tag="li" key={props.imageSwiperData.indexOf(imageData)}>
    //                  <Link href={imageData.targetUrl} as={imageData.targetUrlAs||imageData.targetUrl}>
    //                      <a>
    //                          {/*<img src={imageData.imageUrl} alr={`Thumbnail ${imageData.imageUrl}`}/>*/}
    //                          <RenderImageElement/>
    //                      </a>
    //                  </Link>
    //              </SwiperSlide>
    //          )
    //      }else if(imageData.targetUrlType === 'external'){
    //          return (
    //              <SwiperSlide tag="li" key={props.imageSwiperData.indexOf(imageData)}>
    //                  <a href={imageData.targetUrl}>
    //                      {/*<img src={imageData.imageUrl} alt={`Thumbnail ${imageData.imageUrl}`}/>*/}
    //                      <RenderImageElement/>
    //                  </a>
    //              </SwiperSlide>
    //          )
    //      }else return null
    //
    // })

    // if (state.imageSwiperData.length>0){
    //     return (
    //         <Swiper
    //             thumbs={{swiper: thumbsSwiper}}
    //             controller={{control: controlledSwiper}}
    //             className='image-swiper'
    //             tag="section"
    //             keyboard
    //             autoplay
    //             speed={2000}
    //             navigation
    //             // pagination
    //             spaceBetween={state.spaceBetween}
    //             slidesPerView={state.slidesPerView}
    //         >
    //             {renderSlides}
    //         </Swiper>
    //     );
    // }else return null


    useEffect(() => {
        console.log(props.deviceWidth)
        setState({
            ...state,
            spaceBetween: props.deviceWidth >= 768 ? parseInt(props.spaceBetweenAmountDesktop) || 1 : parseInt(props.spaceBetweenAmountMobile) || 1,
            slidesPerView: props.deviceWidth >= 768 ? parseInt(props.slideAmountInDesktop) || 3 : parseInt(props.slideAmountInMobile) || 1,
            // imageSwiperData: props.imageSwiperData,
            imageRatioWidth: parseInt(props.imageRatioWidth) || 16,
            imageRatioHeight: parseInt(props.imageRatioHeight) || 9,
        })

        if (props.deviceWidth > 768) {
            console.log(props.slideAmountInMobile)
            setImageSize({
                width: contextData.state.currentPageSidebar ? (props.deviceWidth - 300) / state.slidesPerView : props.deviceWidth / state.slidesPerView,
                height: contextData.state.currentPageSidebar ? ((props.deviceWidth - 300) / state.slidesPerView) / (state.imageRatioWidth / state.imageRatioHeight) : (props.deviceWidth / state.slidesPerView) / (state.imageRatioWidth / state.imageRatioHeight)
            })
        } else {

            setImageSize({
                width: props.deviceWidth / (props.slideAmountInMobile || 1),
                height: (props.deviceWidth / (props.slideAmountInMobile || 1)) / (state.imageRatioWidth / state.imageRatioHeight)
            })
        }
    }, [props]);




    const renderSlides = props.imageSwiperData.map(imageData => {

        // let width = props.deviceWidth > 768 ?
        //     contextData.state.currentPageSidebar ? (props.deviceWidth - 300) / state.slidesPerView : props.deviceWidth / state.slidesPerView :
        //     props.deviceWidth / (props.imageSwiperAmountMobile || 1);
        // let height = props.deviceWidth > 768 ? contextData.state.currentPageSidebar ? ((props.deviceWidth - 300) / state.slidesPerView) / 1.777 : (props.deviceWidth / state.slidesPerView) / 1.777 :
        //     (props.deviceWidth / (props.imageSwiperAmountMobile || 1)) / 1.777
        const RenderImageElement = () => {
            if (imageData.imageUrl.includes('http') || imageData.imageUrl.includes(window.location.hostname)) {
                return (
                    <img
                        src={imageData.imageUrl}
                        alt={`Thumbnail ${imageData.imageUrl}`}
                        style={{
                            width:imageSize.width,
                            height:imageSize.width / (state.imageRatioWidth / state.imageRatioHeight)
                        }}
                         />
                )
            } else {
                return (
                    <Image src={imageData.imageUrl} alt={`Thumbnail ${imageData.imageUrl}`}
                           width={imageSize.width}
                           height={imageSize.width / (state.imageRatioWidth / state.imageRatioHeight)} quality={50} loading='lazy'/>
                )
            }
        }
        if (imageData.targetUrlType === 'internal') {
            return (
                <SwiperSlide tag="li" key={props.imageSwiperData.indexOf(imageData)}>
                    <Link href={imageData.targetUrl} as={imageData.targetUrlAs || imageData.targetUrl}>
                        <a className='keen-slider__slide'>
                            <RenderImageElement/>
                        </a>
                    </Link>
                </SwiperSlide>

            )
        } else if (imageData.targetUrlType === 'external') {
            return (
                <SwiperSlide tag="li" key={props.imageSwiperData.indexOf(imageData)}>
                    <a href={imageData.targetUrl} className='keen-slider__slide'>

                        <RenderImageElement/>
                    </a>
                </SwiperSlide>
            )
        } else return null
    })


    return (
<div
//     style={{
//     width:props.deviceWidth <320 ? 320 :props.deviceWidth
// }}
>
        <Swiper
            // thumbs={{swiper: thumbsSwiper}}
            // controller={{control: controlledSwiper}}
            // className='image-swiper'
            // tag="section"
            // keyboard
            // autoplay
            // speed={2000}
            // navigation
            // scrollbar={{draggable: true}}
            // // pagination
            // // spaceBetween={state.spaceBetween || 1}
            // slidesPerView={state.slidesPerView || 3}
            thumbs={{swiper: thumbsSwiper}}
            controller={{control: controlledSwiper}}
            className='post-swiper'
            tag="section"
            keyboard
            autoplay={props.sliderAutoplay === 'true'}
            //  autoplay
            speed={parseInt(props.sliderSpeed) || 1000}
            navigation
            scrollbar={{draggable: true}}
            effect={props.sliderEffect || false}
            spaceBetween={props.deviceWidth >= 768 ? parseInt(props.spaceBetweenAmountDesktop) || 1 : parseInt(props.spaceBetweenAmountMobile) || 1}
            slidesPerView={props.deviceWidth >= 768 ? parseInt(props.slideAmountInDesktop) || 3 : parseInt(props.slideAmountInMobile) || 1}

        >
            {renderSlides}
        </Swiper>
</div>

    );
};
export default ImageSwiper;
// <div ref={sliderRef} className='keen-slider'>
//     {renderKeenSlides}
// </div>

