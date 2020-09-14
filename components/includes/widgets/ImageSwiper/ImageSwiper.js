import React, {useEffect, useState, useContext, useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Controller, Thumbs, Scrollbar, Keyboard, Autoplay, EffectCube, EffectCoverflow, Lazy} from 'swiper'
import 'swiper/swiper-bundle.css';
import './ImageSwiper.scss';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
// let swiper;
SwiperCore.use([Navigation, Pagination, Scrollbar, Keyboard, Autoplay, Controller, EffectCube, EffectCoverflow, Lazy]);
const ImageSwiper = props => {
    const contextData = useContext(AppContext);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [controlledSwiper, setControlledSwiper] = useState(null);

    const [state, setState] = useState({
        imageSwiperData:[]
    });

    //
    // useEffect(() => {
    //     console.log(state)
    // }, [state]);

    useEffect(() => {
        if (props.imageSwiperData) {
            setState({
                ...state,
                imageSwiperData: props.imageSwiperData,
                spaceBetween:contextData.state.isMobile ? props.imageSwiperSpaceBetweenMobile || 0: props.imageSwiperSpaceBetweenDeskTop || 0,
                slidesPerView:contextData.state.isMobile ? props.imageSwiperSpaceBetweenMobile || 1: props.imageSwiperSpaceBetweenDeskTop || 3
            })
        }
    }, [props.imageSwiperData,contextData.state.isMobile]);


    const renderSlides = state.imageSwiperData.map(imageData => {
         if(imageData.targetUrlType === 'internal'){
             return (
                 <SwiperSlide tag="li" key={props.imageSwiperData.indexOf(imageData)}>
                     <Link href={imageData.targetUrl} as={imageData.targetUrlAs||imageData.targetUrl}>
                         <a>
                             <img src={imageData.imageUrl} alr={`Thumbnail ${imageData.imageUrl}`}/>
                         </a>
                     </Link>

                 </SwiperSlide>
             )
         }else if(imageData.targetUrlType === 'external'){
             return (
                 <SwiperSlide tag="li" key={props.imageSwiperData.indexOf(imageData)}>
                     <a href={imageData.targetUrl}>
                         <img src={imageData.imageUrl} alr={`Thumbnail ${imageData.imageUrl}`}/>
                     </a>
                 </SwiperSlide>
             )
         }else return null

    })

    if (state.imageSwiperData.length>0){
        return (
            <Swiper
                thumbs={{swiper: thumbsSwiper}}
                controller={{control: controlledSwiper}}
                className='image-swiper'
                tag="section"
                keyboard
                autoplay
                speed={2000}

                navigation
                // pagination
                spaceBetween={state.spaceBetween}
                slidesPerView={state.slidesPerView}
            >
                {renderSlides}
            </Swiper>
        );
    }else return null

};
export default ImageSwiper;
