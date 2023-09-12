'use client';
import React, {FC, useEffect, useState, useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import dynamic from 'next/dynamic';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {Post, Store} from 'typescript-types';
import {shortNumber, ratingCalculator} from 'custom-util';
import './PostsSliderWidget.styles.scss';
import { v4 as uuidv4 } from 'uuid';

const ArticlePostCard = dynamic(() => import('@components/cards/cardsComponents/ArticlePostCard/ArticlePostCard'));
const PromotionPostCard = dynamic(() => import('@components/cards/cardsComponents/PromotionPostCard/PromotionPostCard'));
const LearnPostCard = dynamic(() => import('@components/cards/cardsComponents/VideoPostCard/VideoPostCard'));
const VideoPostCard = dynamic(() => import('@components/cards/cardsComponents/VideoPostCard/VideoPostCard'));
const AdPostCard = dynamic(() => import('@components/cards/cardsComponents/AdPostCard/AdPostCard'));

interface PostsSliderPropsTypes {
    posts: Post[];
    uniqueData?: {
        posts: Post[];
        totalCount: number;
        sliderConfig?: {
            pagination?: boolean;
            navigation?: boolean;
        };
    };
    isSidebar?: boolean;
    locale: string;
    dictionary?: Record<string, string>;
}

const PostsSliderWidget: FC<PostsSliderPropsTypes> = ({posts, uniqueData, isSidebar, locale}) => {
    const options = {delay: 3000, stopOnInteraction: false};
    const autoplay = Autoplay(options);

    const [sliderRef, sliderApi] = useEmblaCarousel({
            loop: true,
            dragFree: false,
            skipSnaps: false,
        align:'center'
        },
        [
            autoplay
        ]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => sliderApi?.scrollPrev(), [sliderApi]);
    const scrollNext = useCallback(() => sliderApi?.scrollNext(), [sliderApi]);
    const scrollTo = useCallback((index: number) => sliderApi?.scrollTo(index), [sliderApi]);

    const onSelect = useCallback(() => {
        if (!sliderApi) return;
        setSelectedIndex(sliderApi.selectedScrollSnap());
        setPrevBtnEnabled(sliderApi.canScrollPrev());
        setNextBtnEnabled(sliderApi.canScrollNext());
    }, [sliderApi]);

    const {numberOfCardsPerRowInMobile, cardsWidthDesktop} = useSelector((store: Store) => ({
        numberOfCardsPerRowInMobile: store.settings?.initialSettings?.postCardsSettings?.numberOfCardsPerRowInMobile ?? 2,
        cardsWidthDesktop: store.settings?.initialSettings?.postCardsSettings?.cardsWidthDesktop ?? 255,
    }));

    useEffect(() => {
        if (!sliderApi) return;
        onSelect();
        sliderApi.on('select', onSelect);
    }, [sliderApi, onSelect]);

    const postsToRender = useMemo(() => uniqueData?.posts ?? posts ?? [], [uniqueData?.posts, posts]);
    const sliderPaginationItems = useMemo(() => Array.from({length: postsToRender.length}, (_, i) => i), [postsToRender]);

    const renderSlides = postsToRender.map((post, index) => {
        const postProps = {
            views: shortNumber(post.views || 0) as unknown as number,
            cardsWidthDesktop,
            numberOfCardsPerRowInMobile,
            //@ts-ignore
            rating: post?.likes || post?.disLikes ? ratingCalculator(post?.likes, post?.disLikes) : null,
            post,
            postUrl: post?.postType === 'out' ? post?.redirectLink || '#' :
                `/post/${post?.postType}/${post._id}`,
            targetLink: post?.postType === 'out' || post?.outPostType === 'promotion' ? '_blank' : '_self',
            title: process.env.NEXT_PUBLIC_DEFAULT_LOCALE === locale ?
                post?.title :
                post?.translations?.[locale as string]?.title || post?.title,
            isSidebar: isSidebar
        };

        return (
            <div key={uuidv4()} className='embla__slide postsSliderWidgetSlideResponsive'>
                {/*//@ts-ignore*/}
                {post?.postType === 'video' ? <VideoPostCard {...postProps} key={post?._id} index={index}/> :
                    //@ts-ignore
                    post?.postType === 'promotion' ? <PromotionPostCard {...postProps} key={post?._id} index={index}/> :
                        //@ts-ignore
                        post?.postType === 'article' ? <ArticlePostCard {...postProps} key={post?._id} index={index}/> :
                            //@ts-ignore
                            post?.postType === 'learn' ? <LearnPostCard {...postProps} key={post?._id} index={index}/> :
                                //@ts-ignore
                                null
                }
            </div>
        );
    });

    return (
        <div className='PostsSliderWidget'>
            <div className={'PostsSliderWidgetContent'}>

                {!!uniqueData?.sliderConfig?.navigation &&
                    <>
                        <button onClick={scrollPrev}
                                className={'prevBtn'}
                                disabled={!prevBtnEnabled}
                                aria-label={'previous slide'}>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </button>

                        <button onClick={scrollNext}
                                className={'nextBtn'}
                                disabled={!nextBtnEnabled}
                                aria-label={'next slide'}>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </button>
                    </>
                }

                <div className="embla" ref={sliderRef}>
                    <div className={'embla__container'}>
                        {renderSlides}
                    </div>
                </div>

                {(sliderPaginationItems?.length > 0 && !!uniqueData?.sliderConfig?.pagination) &&
                    <div className={'sliderPaginationItems'}>
                        {sliderPaginationItems.map((item: number) => {
                            return (
                                <button key={item}
                                        onClick={() => scrollTo(item)}
                                        aria-label={`slide ${item}`}
                                        className={`sliderPaginationItem ${item === selectedIndex ? 'is-selected' : ''}`}>
                                </button>
                            )
                        })}
                    </div>
                }
            </div>

        </div>
    );
};

export default PostsSliderWidget;


// import React, {FC, useCallback, useEffect, useMemo,  useState} from 'react';
// import useEmblaCarousel from 'embla-carousel-react'
// import dynamic from "next/dynamic";
// import {useSelector} from "react-redux";
// import {ratingCalculator} from "custom-util";
// import Autoplay from "embla-carousel-autoplay";
// import {Post,utils} from "typescript-types";
// import {shortNumber} from "custom-util";
// import './PostsSliderWidget.styles.scss';
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
//
// const ArticlePostCard = dynamic(() => import('@components/cards/cardsComponents/ArticlePostCard/ArticlePostCard'))
// const PromotionPostCard = dynamic(() => import('@components/cards/cardsComponents/PromotionPostCard/PromotionPostCard'))
// const LearnPostCard = dynamic(() => import('@components/cards/cardsComponents/VideoPostCard/VideoPostCard'))
// const VideoPostCard = dynamic(() => import('@components/cards/cardsComponents/VideoPostCard/VideoPostCard'))
// const AdPostCard = dynamic(() => import('@components/cards/cardsComponents/AdPostCard/AdPostCard'))
//
// interface PostsSliderPropsTypes {
//     postElementSize: number | string,
//     widgetId: string,
//     posts: Post[],
//     isSidebar?: boolean,
//     index?: number,
//     locale: string,
//     dictionary: {
//         [key: string]: string
//     }
//     uniqueData?: {
//         posts: Post[],
//         totalCount: number,
//         sliderConfig?: {
//             pagination?: boolean,
//             navigation?: boolean,
//         }
//
//     }
// }
//
//
// const PostsSliderWidget: FC<PostsSliderPropsTypes> =
//     ({
//
//          posts,
//          uniqueData,
//          isSidebar,
//          locale
//      }) => {
//
//         const options = {delay: 3000, stopOnInteraction: false}
//         const autoplay = Autoplay(options)
//
//         const [sliderRef, sliderApi] = useEmblaCarousel({
//             loop: true,
//             dragFree: true
//         }, [autoplay])
//
//         const [selectedIndex, setSelectedIndex] = useState(0);
//         const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
//         const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
//
//         const scrollPrev = useCallback(() => sliderApi && sliderApi.scrollPrev(), [sliderApi]);
//         const scrollNext = useCallback(() => sliderApi && sliderApi.scrollNext(), [sliderApi]);
//         const scrollTo = useCallback((index) => sliderApi && sliderApi.scrollTo(index), [
//             sliderApi
//         ]);
//
//         const onSelect = useCallback(() => {
//             if (!sliderApi) return;
//             setSelectedIndex(sliderApi.selectedScrollSnap());
//             setPrevBtnEnabled(sliderApi.canScrollPrev());
//             setNextBtnEnabled(sliderApi.canScrollNext());
//         }, [sliderApi, setSelectedIndex]);
//
//         const {numberOfCardsPerRowInMobile,cardsWidthDesktop} = useSelector(({settings}: utils) =>{
//             return{
//                 numberOfCardsPerRowInMobile:settings?.initialSettings?.postCardsSettings?.numberOfCardsPerRowInMobile || 2,
//                 cardsWidthDesktop:settings?.initialSettings?.postCardsSettings?.cardsWidthDesktop || 255,
//             }
//         })
//
//         useEffect(() => {
//             if (!sliderApi) return;
//             onSelect();
//             sliderApi.on("select", onSelect);
//         }, [sliderApi, onSelect]);
//
//         const postsToRender = useMemo(() => uniqueData?.posts || posts || [], [uniqueData?.posts, posts])
//         const sliderPaginationItems = useMemo(() => Array.from(Array(postsToRender.length).keys()), [postsToRender])
//
//         const renderSlides = postsToRender.map((post, index) => {
//
//             const postProps = {
//                 views: shortNumber(post.views || 0) as unknown as number,
//                 cardsWidthDesktop,
//                 numberOfCardsPerRowInMobile,
//                 //@ts-ignore
//                 rating: post?.likes || post?.disLikes ? ratingCalculator(post?.likes, post?.disLikes) : null,
//                 post,
//                 postUrl: post?.postType === 'out' ? post?.redirectLink || '#' :
//                     `/post/${post?.postType}/${post._id}`,
//                 targetLink: post?.postType === 'out' || post?.outPostType === 'promotion' ? '_blank':'_self',
//                 title: process.env.NEXT_PUBLIC_DEFAULT_LOCALE === locale ?
//                     post?.title :
//                     post?.translations?.[locale as string]?.title || post?.title,
//                 isSidebar: isSidebar,
//                 onActivateLoadingHandler: () => null
//             }
//
//
//             return (
//                 <div className={'slide'} key={index}>
//                     {/*//@ts-ignore*/}
//                     {post?.postType === 'video' ? <VideoPostCard {...postProps} key={index} index={index}/> :
//                         //@ts-ignore
//                         post?.postType === 'promotion' ? <PromotionPostCard {...postProps} index={index}/> :
//                             //@ts-ignore
//                             post?.postType === 'article' ? <ArticlePostCard {...postProps} index={index}/> :
//                                 //@ts-ignore
//                                 post?.postType === 'learn' ? <LearnPostCard {...postProps} index={index}/> :
//                                     //@ts-ignore
//                                     null
//                     }
//                 </div>
//             )
//         })
//
//
//         return (
//             <div className={'PostsSliderWidget'}>
//
//                 {uniqueData?.sliderConfig?.navigation ?
//                     <>
//                         <button onClick={scrollPrev} className={'prev-btn'} disabled={!prevBtnEnabled}
//                                 aria-label={'previous slide'}>
//                             <FontAwesomeIcon className={`view-icon`} icon={faChevronLeft}/>
//                         </button>
//
//                         <button onClick={scrollNext} className={'next-btn'} disabled={!nextBtnEnabled}
//                                 aria-label={'next slide'}>
//                             <FontAwesomeIcon className={`view-icon`} icon={faChevronRight}/>
//                         </button>
//                     </>
//                     : null
//                 }
//
//                 <div className="slider-parent" ref={sliderRef}>
//                     <div className={'slider-container'}>
//                         {renderSlides}
//                     </div>
//                 </div>
//
//                 {sliderPaginationItems?.length && uniqueData?.sliderConfig?.pagination ?
//                     <div className={'slider-pagination-items'}>
//                         {sliderPaginationItems.map((item: number) => {
//                             return <button key={item}
//                                            onClick={() => scrollTo(item)}
//                                            aria-label={`slide ${item}`}
//                                            className={`slider-pagination-item ${item === selectedIndex ? 'is-selected' : ''}`}>
//                             </button>
//                         })}
//                     </div>
//                     : null
//                 }
//
//             </div>
//         );
//     };
//
//
// export default PostsSliderWidget;
