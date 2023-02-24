// @ts-nocheck
import React, {FC, useCallback, useEffect, useMemo,  useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react'
import {useRouter} from "next/router";
// import _shortNumber from "@_variables/_clientVariables/clientVariables/_shortNumber";
import dynamic from "next/dynamic";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {ratingCalculator} from "custom-util";
import Autoplay from "embla-carousel-autoplay";
import {useAppDispatch} from "@store_toolkit/hooks";
import {Post,Store} from "typescript-types";
import shortNumber from "custom-util/src/math-util/shortNumber";

const ArticlePostCard = dynamic(() => import('../../cards/postsCards/ArticlePostCard'))
const PromotionPostCard = dynamic(() => import('../../cards/postsCards/PromotionPostCard'))
const LearnPostCard = dynamic(() => import('../../cards/postsCards/LearnPostCard'))
const VideoPostCard = dynamic(() => import('../../cards/postsCards/VideoPostCard'))

const PostsSliderStyledDiv = styled.div`
  position: relative;
  max-width: 98vw;
  margin: auto;
  .slider-parent {
    overflow: hidden;

    &:before {
      display: none;
      content: '{"draggable": true}';
    }

    .slider-container {
      display: flex;
      height: 100%;

      .slide {
        position: relative;
        flex: 0 0 100%;
        margin: 5px;
        max-width: 96vw;
        height: auto;
        background: var(--post-element-background, #131314);
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

          flex: 0 0 ${({cardWidth}: { cardWidth: number }) => `${cardWidth}px`};
        }
      }

    }

  }

`


interface PostsSliderPropsTypes {
    postElementSize: number | string,
    widgetId: string,
    posts: Post[],
    cardWidthDesktop?: number,
    isSidebar?: boolean,
    index?: number,
    uniqueData?: {
        posts: Post[],
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
         isSidebar,
     }) => {

        const options = {delay: 3000, stopOnInteraction: false}
        const autoplay = Autoplay(options)

        const [sliderRef, sliderApi] = useEmblaCarousel({
            loop: true,
            dragFree: true
        }, [autoplay])

        const {locale} = useRouter()
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

        const {
            postsPerRawForMobile,
            cardWidth,
        } = useSelector(({settings}: Store) => {
            const elementSize = cardWidthDesktop ? cardWidthDesktop : settings?.design?.cardWidthDesktop || 255
            return {
                postsPerRawForMobile: 1,
                cardWidth: elementSize,
            }
        })

        useEffect(() => {
            if (!sliderApi) return;
            onSelect();
            sliderApi.on("select", onSelect);
        }, [sliderApi, onSelect]);

        const postsToRender = useMemo(() => uniqueData?.posts || posts || [], [uniqueData?.posts, posts])
        const sliderPaginationItems = useMemo(() => Array.from(Array(postsToRender.length).keys()), [postsToRender])

        const renderSlides = postsToRender.map((post, index) => {

            const postProps = {
                views: shortNumber(post.views || 0) as unknown as number,
                cardWidth,
                postsPerRawForMobile,
                //@ts-ignore
                rating: post?.likes || post?.disLikes ? ratingCalculator(post?.likes, post?.disLikes) : null,
                post,
                postUrl: post?.postType === 'out' ? post?.redirectLink || '#' :
                    `/post/${post?.postType}/${post._id}`,
                targetLink: post?.postType === 'out' || post?.outPostType === 'promotion' ? '_blank':'_self',
                title: process.env.NEXT_PUBLIC_DEFAULT_LOCAL === locale ?
                    post?.title :
                    post?.translations?.[locale as string]?.title || post?.title,
                isSidebar: isSidebar,
                onActivateLoadingHandler: () => null
            }


            return (
                <div className={'slide'} key={index}>
                    {post?.postType === 'video' ? <VideoPostCard {...postProps} key={index} index={index}/> :
                        post?.postType === 'promotion' ? <PromotionPostCard {...postProps} index={index}/> :
                            post?.postType === 'article' ? <ArticlePostCard {...postProps} index={index}/> :
                                post?.postType === 'learn' ? <LearnPostCard {...postProps} index={index}/> :
                                    null
                    }
                </div>
            )
        })


        return (
            <PostsSliderStyledDiv cardWidth={cardWidth}>

                {uniqueData?.sliderConfig?.navigation ?
                    <>
                        <button onClick={scrollPrev} className={'prev-btn'} disabled={!prevBtnEnabled}
                                aria-label={'previous slide'}>
                            <svg className="prev-btn__svg" viewBox="137.718 -1.001 366.563 644">
                                <path
                                    d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z"/>
                            </svg>
                        </button>

                        <button onClick={scrollNext} className={'next-btn'} disabled={!nextBtnEnabled}
                                aria-label={'next slide'}>
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
                                           aria-label={`slide ${item}`}
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
