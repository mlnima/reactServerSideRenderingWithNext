import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react'
import {setLoading} from "@store/clientActions/globalStateActions";
import {useRouter} from "next/router";
import _shortNumber from "@_variables/clientVariables/_shortNumber";
import dynamic from "next/dynamic";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import ratingCalculator from "@_variables/util/ratingCalculator";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import Autoplay from "embla-carousel-autoplay";


const ArticleCardToRender = dynamic(() => import('@components/includes/PostsRenderer/ArticleCardToRender'))
const LearnCardToRender = dynamic(() => import('@components/includes/PostsRenderer/LearnCardToRender'))
const VideoCardToRender = dynamic(() => import('@components/includes/PostsRenderer/VideoCardToRender'))
const PromotionCardToRender = dynamic(() => import('@components/includes/PostsRenderer/PromotionCardToRender'))
const DefaultTypeCard = dynamic(() => import('@components/includes/cards/desktop/DefaultTypeCard/DefaultTypeCard'))


const PostsSliderStyledDiv = styled.div`
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
        max-width: 96vw;

        .mobile-card {
          background-color: var(--post-element-background-color, #131314);
          width: 100%;
          font-size: 14px;
          margin: auto;
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
            //flex: 0 0 ${({cardWidth}: { cardWidth: number }) => `${100 / cardWidth}vw`};
          flex: 0 0 ${({cardWidth}: { cardWidth: number }) => `${cardWidth}px`};
        }
      }

    }

  }

`


interface PostsSliderPropsTypes {
    postElementSize: number | string,
    widgetId: string,
    posts: PostTypes[],
    cardWidthDesktop?: number,
    isSidebar?: boolean,
    index?: number,
    uniqueData?: {
        posts: PostTypes[],
        totalCount: number,
        sliderConfig?: {
            pagination?: boolean,
            navigation?: boolean,
        }

    }
}


const PostsSlider: FC<PostsSliderPropsTypes> =
    ({
         cardWidthDesktop,
         posts,
         uniqueData,
         widgetId,
         isSidebar,
     }) => {

        const autoplay = useRef(
            Autoplay(
                {delay: 3000, stopOnInteraction: false},
                (rootElement) => rootElement.parentElement
            )
        );

        const [sliderRef, sliderApi] = useEmblaCarousel({
            loop: true,
            dragFree: true
        }, [autoplay.current])


        const {locale} = useRouter()
        const dispatch = useDispatch()
        const [selectedIndex, setSelectedIndex] = useState(0);
        const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
        const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
        // const [scrollSnaps, setScrollSnaps] = useState([]);
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

        const {
            elementSize,
            postsPerRawForMobile,
            isMobile,
            cardWidth,
            isAppleMobileDevice
        } = useSelector(({settings}: StoreTypes) => {
            const elementSize = cardWidthDesktop ? cardWidthDesktop : settings?.design?.cardWidthDesktop || 255
            return {
                elementSize,
                postsPerRawForMobile: 1,
                isMobile: settings?.isMobile,
                cardWidth: elementSize,
                isAppleMobileDevice: settings?.isAppleMobileDevice
            }
        })

        useEffect(() => {
            if (!sliderApi) return;
            onSelect();
            // setScrollSnaps(sliderApi.scrollSnapList());
            sliderApi.on("select", onSelect);
        }, [sliderApi, onSelect]);
          //setScrollSnaps,
        const noImageUrl = '/static/images/noImage/no-image-available.png';

        const postsToRender = useMemo(() => uniqueData?.posts || posts || [], [uniqueData?.posts, posts])
        const sliderPaginationItems = useMemo(() => Array.from(Array(postsToRender.length).keys()), [postsToRender])

        const renderSlides = postsToRender.map((post, index) => {

            const title = process.env.NEXT_PUBLIC_DEFAULT_LOCAL === locale ? post?.title?.replace('#', '') :
                post?.translations?.[locale as string]?.title ? post?.translations?.[locale as string]?.title?.replace('#', '') :
                    post?.title?.replace('#', '');

            const dir = locale === 'fa' || locale === 'ar' && post?.translations?.[locale as string]?.title ?
                'rtl' : 'ltr'

            const viewsNumber = post.views || 0
            const views = _shortNumber(viewsNumber)
            const rating = post.likes || post.disLikes ? ratingCalculator(post.likes, post.disLikes) : null
            const postProps = {
                dir,
                views,
                rating,
                noImageUrl,
                post,
                cardWidthDesktop: elementSize,
                widgetId,
                postsPerRawForMobile: postsPerRawForMobile,
                cardWidth: cardWidth,
                title,
                isMobile: isMobile,
                isSidebar: isSidebar,
                isAppleMobileDevice,
                onActivateLoadingHandler: () => dispatch(setLoading(true))
            }


            return (
                <div className={'slide'} key={index}>
                    {post?.postType === 'video' ? <VideoCardToRender postProps={postProps} key={index} index={index}/> :
                        post?.postType === 'promotion' ? <PromotionCardToRender postProps={postProps} index={index}/> :
                            post?.postType === 'article' ? <ArticleCardToRender postProps={postProps} index={index}/> :
                                post?.postType === 'learn' ? <LearnCardToRender postProps={postProps} index={index}/> :
                                    <DefaultTypeCard {...postProps} key={index}/>
                    }
                </div>
            )
        })


        return (
            <PostsSliderStyledDiv cardWidth={cardWidth}>

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

            </PostsSliderStyledDiv>
        );
        // return null
    };


export default PostsSlider;
