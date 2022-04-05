import {FC, useMemo, useState} from 'react';
import styled from "styled-components";
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

import Link from "next/link";
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
  max-height: 80vh;

  .image-swiper {
    .swiper-wrapper {
      .swiper-slide {
      }
    }
  }

`

interface ImageSwiperPropTypes {
    uniqueData?: {
        imageSwiperData: {
            imageUrl: string,
            imageAlt: string,
            targetUrl?: string,
            targetUrlType?: string,
            imageIndex?: number,
            imageId?: number,
        }[],
        moreDetailsButtonTextContent: string,
        details: string,
        swiperConfig:{
            effect: "slide" | "fade" | "cube" | "coverflow" | "flip" | "creative" | "cards";
            spaceBetween: number,
            navigation: boolean | {},
            pagination: boolean | {},
            centeredSlides: boolean,
            slidesPerView: number ,
        },
    }

}


const ImageSwiper: FC<ImageSwiperPropTypes> = ({uniqueData}) => {

    const [showDetails, setShowDetails] = useState(false);
    //const isMobile = useSelector((store: StoreTypes) => store.settings?.isMobile);

    const renderSlides = uniqueData?.imageSwiperData?.sort((a, b) => a.imageIndex > b.imageIndex ? 1 : -1)
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
        return {
            ...uniqueData.swiperConfig,
            modules: uniqueData?.swiperConfig?.effect === 'cube' ? [EffectCube, Pagination] :
                     uniqueData?.swiperConfig?.effect === 'flip' ? [EffectFlip, Pagination, Navigation] :
                     uniqueData?.swiperConfig?.navigation === 'true' ? [Pagination, Navigation] : [],
        }
    }, [])

    return (
        <StyledDiv className={'image-swiper-content'}>

            <Swiper className={`image-swiper ${uniqueData?.swiperConfig?.effect ? uniqueData?.swiperConfig?.effect : ''}`}
                    {...swiperProps}
            >
                {renderSlides}
            </Swiper>

            {uniqueData?.details ?
                <button onClick={() => setShowDetails(!showDetails)}>
                    {uniqueData?.moreDetailsButtonTextContent || 'Show More'}
                </button>
                : null
            }
            {uniqueData?.details ?
                <div className={'details'} style={{display: showDetails ? 'block' : 'none'}}>
                    {uniqueData?.details}
                </div>
                : null
            }
        </StyledDiv>

    );
};
export default ImageSwiper;

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

