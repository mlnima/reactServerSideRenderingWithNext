import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import useEmblaCarousel , {
    EmblaCarouselType,
    EmblaOptionsType,
    EmblaPluginType,
    EmblaEventType,
    UseEmblaCarouselType,
}from 'embla-carousel-react'
import styled from "styled-components";
import Autoplay, {
    AutoplayType,
    AutoplayOptionsType,
} from "embla-carousel-autoplay";
import Link from "next/link";
import parse from "html-react-parser";

const ImagesSliderStyledDiv = styled.div`
  position: relative;

  .slider-parent {
    overflow: hidden;

    &:before {
      display: none;
      content: '{"draggable": true}';
    }

    .slider-container {
      display: flex;

      .slide {
        position: relative;
        flex: 0 0 100%;
        margin: 5px;
        width: 96vw;
        img{
          width: 100%;
        }
      }
    }
  }


  .prev-btn, .next-btn {
    position: absolute;
    top: 40%;
    z-index: 1;
    background-color: transparent;
    border: none;

    svg {
      width: 40px;
      height: 40px;
      fill: var(--main-active-color, #f90);
    }
  }


  .prev-btn {
    left: 0;
  }

  .next-btn {
    right: 0;
  }

  .slider-pagination-items {
    display: flex;
    list-style: none;
    justify-content: center;
    padding-top: 10px;
    flex-wrap: wrap;

    .slider-pagination-item {
      background-color: transparent;
      cursor: pointer;
      position: relative;
      padding: 0;
      outline: 0;
      border: 0;
      width: 20px;
      height: 20px;
      margin-right: 7.5px;
      margin-left: 7.5px;
      display: flex;
      align-items: center;
      opacity: .5;

      &:after {
        background-color: var(--main-active-color, #f90);
        width: 100%;
        height: 4px;
        border-radius: 2px;
        content: "";
      }
    }

    .is-selected {
      transform: scale(1.2);
      opacity: 1;
    }
  }

  @media only screen and (min-width: 768px) {
    .slider-parent {

      .slider-container {
        display: flex;

        .slide {
          position: relative;
           
          flex: 0 0 300px;
          img{
            width: 100%;
          }
        }
      }

    }

  }

`


interface PostsSliderPropsTypes {

    uniqueData?: {
        sliderConfig?: {
            pagination?: boolean,
            navigation?: boolean,
        },
        moreDetailsButtonTextContent: string,
        details: string,
        imagesData: {
            imageUrl: string,
            imageAlt: string,
            targetUrl?: string,
            targetUrlType?: string,
            imageIndex?: number,
            imageId?: number,
        }[]
    }
}


const ImagesSlider: FC<PostsSliderPropsTypes> = ({uniqueData}) => {

        const options = {delay: 3000, stopOnInteraction: false}
        const autoplay =  Autoplay(options)

        // const autoplay = useRef<AutoplayType>(
        //     Autoplay(
        //         ,
        //         (rootElement:any) => rootElement.parentElement
        //     )
        // );

        const [sliderRef, sliderApi] = useEmblaCarousel({
            loop: true,
            dragFree: true
        }, [autoplay])

        const [showDetails, setShowDetails] = useState(false);
        const [selectedIndex, setSelectedIndex] = useState(0);
        const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
        const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
        const scrollPrev = useCallback(() => sliderApi && sliderApi.scrollPrev(), [sliderApi]);
        const scrollNext = useCallback(() => sliderApi && sliderApi.scrollNext(), [sliderApi]);
        const scrollTo = useCallback((index) => sliderApi && sliderApi.scrollTo(index), [
            sliderApi
        ]);

        const onSelect = useCallback(() => {
            if (!sliderApi) return;
            setSelectedIndex(sliderApi.selectedScrollSnap());
            setPrevBtnEnabled(sliderApi.canScrollPrev());
            setNextBtnEnabled(sliderApi.canScrollNext());
        }, [sliderApi, setSelectedIndex]);

        useEffect(() => {
            if (!sliderApi) return;
            onSelect();
            sliderApi.on("select", onSelect);
        }, [sliderApi, onSelect]);


        const slidesToRender = useMemo(() => uniqueData?.imagesData || [], [uniqueData?.imagesData])
        const sliderPaginationItems = useMemo(() => Array.from(Array(slidesToRender?.length || 0).keys()) || [], [slidesToRender])

        const renderSlides = slidesToRender.map((imageData, index) => {

            if (imageData.targetUrl) {
                return <div className={'slide'} key={index}>
                    <Link href={imageData.targetUrl} className='swiper-slide'>
                            <img src={imageData.imageUrl} alt={imageData.imageAlt}/>
                    </Link>
                </div>
            } else {
                return <div className={'slide'} key={index}>
                    <img src={imageData.imageUrl} alt={imageData.imageAlt}/>
                </div>
            }
        })


        return (
            <ImagesSliderStyledDiv className={'image-slider-content'} >

                {uniqueData?.sliderConfig?.navigation ?
                    <>
                        <button onClick={scrollPrev} className={'prev-btn'} disabled={!prevBtnEnabled}>
                            <svg className="prev-btn__svg" viewBox="137.718 -1.001 366.563 644">
                                <path
                                    d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z"/>
                            </svg>
                        </button>

                        <button onClick={scrollNext} className={'next-btn'} disabled={!nextBtnEnabled}>
                            <svg className="next-btn__svg" viewBox="0 0 238.003 238.003">
                                <path
                                    d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z"/>
                            </svg>
                        </button>
                    </>
                    : null
                }


                <div className="slider-parent" ref={sliderRef}>
                    <div className={'slider-container'}>
                        {renderSlides}
                    </div>
                </div>

                {sliderPaginationItems?.length && uniqueData?.sliderConfig?.pagination ?

                    <div className={'slider-pagination-items'}>
                        {sliderPaginationItems.map((item: number) => {
                            return <button key={item}
                                           onClick={() => scrollTo(item)}
                                           className={`slider-pagination-item ${item === selectedIndex ? 'is-selected' : ''}`}>
                            </button>
                        })}
                    </div>

                    : null
                }

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

            </ImagesSliderStyledDiv>
        );
    };


export default ImagesSlider;
