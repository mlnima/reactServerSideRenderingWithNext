import React, {useRef, FC, useMemo} from 'react';
import dynamic from "next/dynamic";
import {Swiper, SwiperSlide} from 'swiper/react';
import {useRouter} from "next/router";
import styled from "styled-components";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/controller';
import 'swiper/css/effect-cards';
import 'swiper/css/scrollbar';
import "swiper/css/pagination";
import "swiper/css/navigation";
import {setLoading} from "@store/clientActions/globalStateActions";
import _shortNumber from "../../../../_variables/clientVariables/_shortNumber";
import ratingCalculator from "../../../../_variables/util/ratingCalculator";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
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

const ArticleCardToRender = dynamic(() => import('@components/includes/PostsRenderer/ArticleCardToRender'))
const LearnCardToRender = dynamic(() => import('@components/includes/PostsRenderer/LearnCardToRender'))
const VideoCardToRender = dynamic(() => import('@components/includes/PostsRenderer/VideoCardToRender'))
const PromotionCardToRender = dynamic(() => import('@components/includes/PostsRenderer/PromotionCardToRender'))
const DefaultTypeCard = dynamic(() => import('@components/includes/cards/desktop/DefaultTypeCard/DefaultTypeCard'))

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
        Lazy,
        EffectFlip,
        EffectFade,
        Parallax
    ]
);

interface PostSwiperComponentTypes {
    viewType?: string,
    _id?: string,
    posts?: PostTypes[],
    uniqueData?: {
        posts: PostTypes[],
        totalCount: number,
        // sliderEffect: "slide" | "fade" | "cube" | "coverflow" | "flip" | "creative" | "cards";

        // sliderSpeed: number,
        // spaceBetween: number,
        // navigation: boolean,
        // pagination: boolean,
        // centeredSlides: boolean,
        // paginationType: string,
        // slidesPerView: number | string,
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
    widgetId?: string,
    cardWidthDesktop?:  number ,
    isSidebar?: boolean,
    index?: number
}




let PostSwiperStyledDiv = styled.div`

  .swiper-slides-parent{
    z-index: 2!important;
    .swiper-button-prev,.swiper-button-next{
      color: var(--main-active-color,#f90)!important;
    }
    .swiper-pagination{
      bottom: 0;
      z-index: 3!important;
      span{
        background-color: var(--main-active-color,#f90)!important;
      }
    }
  }
`


const PostSwiper: FC<PostSwiperComponentTypes> =
    ({
         _id,
         posts,
         uniqueData,
         widgetId,
         cardWidthDesktop,
         isSidebar,
     }) => {
        const {locale} = useRouter()
        const dispatch = useDispatch()
        const swiperParent = useRef(null)

        const {elementSize,postsPerRawForMobile,isMobile,cardWidth} = useSelector((store: StoreTypes) => {
            const elementSize = cardWidthDesktop ? cardWidthDesktop : store.settings?.design?.cardWidthDesktop || 255
            return {
                elementSize,
                postsPerRawForMobile: 1,
                isMobile: store.settings?.isMobile,
                cardWidth:elementSize
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
                cardWidthDesktop: elementSize,
                widgetId,
                postsPerRawForMobile: postsPerRawForMobile,
                cardWidth: cardWidth,
                title,
                isMobile: isMobile,
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

        const swiperProps = useMemo(() => {
            const deviceTypeData = isMobile ? 'swiperConfigMobile' : 'swiperConfigDesktop'
            return {
                ...(uniqueData?.[deviceTypeData] || {}),
                modules: uniqueData?.[deviceTypeData]?.effect === 'cube' ? [EffectCube, Pagination] :
                    uniqueData?.[deviceTypeData]?.effect === 'flip' ? [EffectFlip, Pagination, Navigation] :
                        uniqueData?.[deviceTypeData]?.navigation === 'true' ? [Pagination, Navigation] : [],
            }
        }, [])


        return (
            <PostSwiperStyledDiv ref={swiperParent} className='swiper-content' >
                <Swiper className='swiper-slides-parent'{...swiperProps}>
                    {renderSlides}
                </Swiper>
            </PostSwiperStyledDiv>

        );
    };
export default PostSwiper;



