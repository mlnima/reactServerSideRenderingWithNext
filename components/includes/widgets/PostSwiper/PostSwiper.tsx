import React, {useEffect, useState, useRef, FC} from 'react';
import dynamic from "next/dynamic";
import {Swiper, SwiperSlide} from 'swiper/react';
import {useRouter} from "next/router";
import styled from "styled-components";

const ArticleCardToRender = dynamic(() => import('@components/includes/PostsRenderer/ArticleCardToRender'))
const LearnCardToRender = dynamic(() => import('@components/includes/PostsRenderer/LearnCardToRender'))
const VideoCardToRender = dynamic(() => import('@components/includes/PostsRenderer/VideoCardToRender'))
const PromotionCardToRender = dynamic(() => import('@components/includes/PostsRenderer/PromotionCardToRender'))
const DefaultTypeCard = dynamic(() => import('@components/includes/cards/desktop/DefaultTypeCard/DefaultTypeCard'))

import SwiperCore, {
    Navigation,
    Pagination,
    Controller,
    Scrollbar,
    Keyboard,
    Autoplay,
    EffectCube,
    EffectCoverflow,
    EffectFlip,
    EffectFade,
    Lazy,
    Parallax
} from 'swiper'

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/controller';
import 'swiper/css/effect-cards';
import 'swiper/css/scrollbar';
import {setLoading} from "@store/clientActions/globalStateActions";
import _shortNumber from "../../../../_variables/clientVariables/_shortNumber";
import ratingCalculator from "../../../../_variables/util/ratingCalculator";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";


SwiperCore.use([Navigation, Pagination, Scrollbar, Keyboard, Autoplay, Controller, EffectCube, EffectCoverflow, Lazy, EffectFlip, EffectFade, Parallax]);

interface PostSwiperComponentTypes {
    viewType?: string,
    _id?: string,
    posts?: PostTypes[],
    uniqueData?: {
        sliderEffect: string;
        posts: PostTypes[],
        totalCount: number
    }
    widgetId?: string,
    postElementSize?: string,
    isSidebar?: boolean,
    index?:number
}


interface PostSwiperStyledDivPropTypes {
    cardWidth: number
}


let PostSwiperStyledDiv = styled.div`
  width: calc(100vw);

  .swiper {
    height: ${({cardWidth}: PostSwiperStyledDivPropTypes) => ((cardWidth || 255) / 1.777) + 65}px;
    padding-bottom: 50px;

    .swiper-scrollbar {
      height: 10px;
      background-color: var(--post-element-text-color, #131314);
    }

    .swiper-wrapper {
      position: relative;
      margin: 0;

      .swiper-slide {

      }
    }
  }


  @media only screen and (min-width: 768px) {
    width: calc(100vw - 340px);
    .swiper {
      padding-bottom: 10px;
    }
  }
`


const PostSwiper: FC<PostSwiperComponentTypes> =
    ({
         viewType,
         _id,
         posts,
         uniqueData,
         widgetId,
         postElementSize,
         isSidebar,
         index
     }) => {
        const {locale} = useRouter()
        const dispatch = useDispatch()
        const swiperContainer = useRef(null)
        const swiperParent = useRef(null)
        const [controlledSwiper, setControlledSwiper] = useState(null)

        const PostSwiperData = useSelector((store: StoreTypes) => {
            const elementSize = postElementSize ? postElementSize : store.settings?.design?.postElementSize
            return {
                elementSize,
                postsPerRawForMobile: 1,
                isMobile: store.settings?.isMobile,
                cardWidth: elementSize === 'listSmall' ? 320 :
                    elementSize === 'list' ? 116.6 :
                        elementSize === 'smaller' ? 209.8 :
                            elementSize === 'small' ? 255 :
                                elementSize === 'medium' ? 320 : 255
            }
        })


        const noImageUrl = '/static/images/noImage/no-image-available.png';

        const renderSlides = (uniqueData?.posts || posts || []).map((post, index) => {

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
                postElementSize: PostSwiperData.elementSize,
                widgetId,
                postsPerRawForMobile: PostSwiperData.postsPerRawForMobile,
                cardWidth: PostSwiperData.cardWidth,
                title,
                isMobile: PostSwiperData.isMobile,
                isSidebar: isSidebar,
                onActivateLoadingHandler: () => dispatch(setLoading(true))
            }
            return (
                <SwiperSlide tag="div" key={index} virtualIndex={index}>
                    {post?.postType === 'video' ? <VideoCardToRender postProps={postProps} key={index} index={index}/> :
                        post?.postType === 'promotion' ? <PromotionCardToRender postProps={postProps} key={index}/> :
                            post?.postType === 'article' ? <ArticleCardToRender postProps={postProps} key={index}/> :
                                post?.postType === 'learn' ? <LearnCardToRender postProps={postProps} key={index}/> :
                                    <DefaultTypeCard {...postProps} key={index}/>
                    }
                </SwiperSlide>
            )
        })

        // useEffect(() => {
        //     if (typeof window !== 'undefined') {
        //         swiperContainer.current.style.maxWidth = `${swiperParent.current.style.widths - 50}px`
        //     }
        //
        // }, []);


        return (
            <PostSwiperStyledDiv ref={swiperParent} className='post-swiper-parent' cardWidth={PostSwiperData.cardWidth}
                // @ts-ignore
                                 modules={[Controller]} controller={{control: controlledSwiper}}>
                <Swiper
                    ref={swiperContainer}
                    //  thumbs={{swiper: thumbsSwiper}}
                    controller={{control: controlledSwiper}}
                    className='post-swiper'
                    tag="div"
                    wrapperTag="div"
                    keyboard
                    autoplay
                    // @ts-ignore
                    speed={uniqueData?.speed || 1000}
                    // scrollbar={{draggable: false}}
                    // @ts-ignore
                    effect={uniqueData?.sliderEffect || false}
                    slidesPerView={window.innerWidth > 768 ? Math.floor(((window.innerWidth - 320) / PostSwiperData.cardWidth)) : Math.floor(window.innerWidth / PostSwiperData.cardWidth)}

                    // @ts-ignore
                    //spaceBetween={uniqueData?.spaceBetween || 10}
                >
                    {renderSlides}
                </Swiper>
            </PostSwiperStyledDiv>

        );
    };
export default PostSwiper;


//background-color: var(--post-element-background-color, #131314);
//margin: 0 5px !important;
// width: ${({cardWidth}: { cardWidth: number }) => cardWidth}px !important;

// a {
//   img {
//     width: ${({cardWidth}: { cardWidth: number }) => cardWidth}px;
//     object-fit: contain;
//   }
//
//   .post-slider-item-title {
//     white-space: nowrap;
//     overflow: hidden !important;
//     text-overflow: ellipsis;
//     display: block;
//     font-size: small;
//   }
//
//   h2 {
//     color: var(--post-element-text-color);
//     width: ${({cardWidth}: { cardWidth: number }) => cardWidth - 5}px;
//   }
// }