import React, {useRef, FC, useMemo} from 'react';
import dynamic from "next/dynamic";
import {Swiper} from 'swiper/react';
import {useRouter} from "next/router";
import styled from "styled-components";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/controller';
import 'swiper/css/effect-cards';
import 'swiper/css/scrollbar';
import "swiper/css/pagination";
import "swiper/css/navigation";
import _shortNumber from "../../../../_variables/clientVariables/_shortNumber";
import ratingCalculator from "../../../../_variables/util/ratingCalculator";
import { useSelector} from "react-redux";
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


const ArticlePostCard = dynamic(() => import('@components/includes/cards/ArticlePostCard'))
const PromotionPostCard = dynamic(() => import('@components/includes/cards/PromotionPostCard'))
const LearnPostCard = dynamic(() => import('@components/includes/cards/LearnPostCard'))
const VideoPostCard = dynamic(() => import('@components/includes/cards/VideoPostCard'))


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
         cardWidthDesktop,
         isSidebar,
     }) => {
        const {locale} = useRouter()
        const swiperParent = useRef(null)

        const {postsPerRawForMobile,isMobileDevice,cardWidth} = useSelector((store: StoreTypes) => {
            const elementSize = cardWidthDesktop ? cardWidthDesktop : store.settings?.design?.cardWidthDesktop || 255
            return {
                postsPerRawForMobile: 1,
                isMobileDevice: store.settings?.isMobile,
                cardWidth:elementSize
            }
        })

        const isMobile = useMemo(()=>isMobileDevice,[])

        const renderSlides = (uniqueData?.posts || posts || []).map((post, index) => {

            const postProps = {
                views:_shortNumber(post.views || 0),
                cardWidth,
                postsPerRawForMobile,
                rating : post.likes || post.disLikes ? ratingCalculator(post.likes, post.disLikes) : null ,
                post,
                postUrl: post?.postType === 'out' ? post?.redirectLink || '#' :
                    `/post/${post?.postType}/${post._id}`,
                targetLink: post?.postType === 'out' || post?.outPostType === 'promotion' ? '_blank':'_self',
                title: process.env.NEXT_PUBLIC_DEFAULT_LOCAL === locale ?
                    post?.title :
                    post?.translations?.[locale as string]?.title || post?.title,
                isSidebar: isSidebar,
            }
            return (
                <div className={'slide'} key={index}>
                    {post?.postType === 'video' ? <VideoPostCard {...postProps} key={index} index={index}/> :
                        post?.postType === 'promotion' ? <PromotionPostCard {...postProps} index={index}/> :
                            post?.postType === 'article' ? <ArticlePostCard {...postProps} index={index}/> :
                                post?.postType === 'learn' ? <LearnPostCard {...postProps}  index={index}/> :
                                    null
                    }
                </div>
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



