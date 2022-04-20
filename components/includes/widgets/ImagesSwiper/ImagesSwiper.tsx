import {FC, useMemo, useState} from 'react';
import styled from "styled-components";
import parse from 'html-react-parser'
import Link from "next/link";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css/autoplay';
import 'swiper/css/controller';
import 'swiper/css/scrollbar';
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-flip";
import "swiper/css/effect-cube";
import "swiper/css/effect-cards";
import "swiper/css/effect-creative";
import "swiper/css/effect-coverflow";
import 'swiper/css';


import SwiperCore, {
    Navigation,
    Pagination,
    Controller,
    Scrollbar,
    Keyboard,
    Autoplay,
    EffectCube,
    EffectCoverflow,
    EffectCreative,
    EffectCards,
    EffectFlip,
    EffectFade,
    Lazy,
    Parallax
} from 'swiper'
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

SwiperCore.use(
    [
        Navigation,
        Pagination,
        Scrollbar,
        Keyboard,
        Autoplay,
        Controller,
        EffectCube,
        EffectCoverflow,
        EffectCreative,
        EffectCards,
        Lazy,
        EffectFlip,
        EffectFade,
        Parallax
    ]
);


let StyledDiv = styled.div`
  .swiper-slides-parent{
    z-index: 10!important;
    .swiper-button-prev,.swiper-button-next{
      color: var(--main-active-color,#f90)!important;
    }
    .swiper-pagination{
      span{
        background-color: var(--main-active-color,#f90)!important;
      }
    }
  }
`

interface ImagesSwiperPropTypes {
    uniqueData?: {
        imagesData: {
            imageUrl: string,
            imageAlt: string,
            targetUrl?: string,
            targetUrlType?: string,
            imageIndex?: number,
            imageId?: number,
        }[],
        moreDetailsButtonTextContent: string,
        details: string,
        swiperConfigDesktop:{
            effect: "slide" | "fade" | "cube" | "coverflow" | "flip" | "creative" | "cards";
            spaceBetween: number,
            navigation: boolean | {},
            pagination: boolean | {},
            centeredSlides: boolean,
            slidesPerView: number ,
        },
        swiperConfigMobile:{
            effect: "slide" | "fade" | "cube" | "coverflow" | "flip" | "creative" | "cards";
            spaceBetween: number,
            navigation: boolean | {},
            pagination: boolean | {},
            centeredSlides: boolean,
            slidesPerView: number ,
        },
    }

}


const ImagesSwiper: FC<ImagesSwiperPropTypes> = ({uniqueData}) => {

    const [showDetails, setShowDetails] = useState(false);
    const isMobile = useSelector((store: StoreTypes) => store.settings?.isMobile);

    const renderSlides = uniqueData?.imagesData?.sort((a, b) => a.imageIndex > b.imageIndex ? 1 : -1)
        ?.map((imageData, index) => {
            const key = imageData.imageIndex + imageData.imageId + index
            if (imageData.targetUrl) {
                return (
                    <SwiperSlide tag="div" key={key}>
                        <Link href={imageData.targetUrl}>
                            <a className='swiper-slide'>
                                <img src={imageData.imageUrl} alt={imageData.imageAlt}/>
                            </a>
                        </Link>
                    </SwiperSlide>
                )
            } else {
                return (
                    <SwiperSlide tag="div" key={key}>
                        <img src={imageData.imageUrl} alt={imageData.imageAlt}/>
                    </SwiperSlide>
                )
            }
        })

    const swiperProps = useMemo(() => {
        const deviceTypeData = isMobile ? 'swiperConfigMobile' : 'swiperConfigDesktop'
        return {
            ...(uniqueData?.[deviceTypeData] || {}),
            modules: uniqueData?.[deviceTypeData]?.effect === 'cube' ? [EffectCube, Pagination] :
                     uniqueData?.[deviceTypeData]?.effect === 'flip' ? [EffectFlip, Pagination, Navigation] :
                     uniqueData?.[deviceTypeData]?.navigation === 'true' ? [Pagination, Navigation] : [],
        }
    }, [uniqueData])

    return (
        <StyledDiv className={'swiper-content'}>

            <Swiper className={`swiper-slides-parent ${swiperProps?.effect || '' }`}
                    {...swiperProps}
            >
                {renderSlides}
            </Swiper>

            {uniqueData?.details ?
                <button onClick={() => setShowDetails(!showDetails)} className={'show-details-button'}>
                    {uniqueData?.moreDetailsButtonTextContent || 'Show More'}
                </button>
                : null
            }
            {uniqueData?.details ?
                <div className={'details'} style={{display: showDetails ? 'block' : 'none'}}>
                    {parse(uniqueData?.details,{trim:true})}
                </div>
                : null
            }
        </StyledDiv>

    );
};
export default ImagesSwiper;

//     tag="div"
//     wrapperTag="div"
//     controller={{control: controlledSwiper}}
//     keyboard
//     autoplay
// // speed={uniqueData?.sliderSpeed || 2}
//     navigation={uniqueData?.navigation || false}
//     effect={uniqueData?.sliderEffect}


// <div ref={sliderRef} className='keen-slider'>
//     {renderKeenSlides}
// </div>

