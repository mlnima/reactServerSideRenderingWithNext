import React, { useMemo} from 'react';
import useEmblaCarousel from 'embla-carousel-react'
import {setLoading} from "../../../../store/actions/globalStateActions";
import PromotionCardListSmall from "../../cards/PromotionTypeCard/PromotionCardListSmall";
import {useRouter} from "next/router";
import _shortNumber from "../../../../_variables/clientVariables/_shortNumber";
import {likeValueCalculator} from "../../../../_variables/_variables";
import dynamic from "next/dynamic";
import {useDispatch} from "react-redux";
const VideoTypeCard = dynamic(() => import('../../cards/VideoCardType/VideoTypeCard'))
const PromotionTypeCard = dynamic(() => import('../../cards/PromotionTypeCard/PromotionTypeCard'))
const ArticleTypeCard = dynamic(() => import('../../cards/ArticleTypeCard/ArticleTypeCard'))
import styled from "styled-components";
import {PostTypes} from "../../../../_variables/TypeScriptTypes/PostTypes";

const PostsSliderStyledDiv = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
  max-width: 100vw;
  .embla__container {
    display: flex;
    .embla__slide {
      width: ${(props:{cardWidth:number})=> props.cardWidth};
    }
  }

  @media only screen and (min-width: 768px) {
    max-width: 60vw;
  }
`



// @ts-ignore
interface PostsSliderPropsTypes{
    postElementSize:string,
    widgetId:string,
    posts:PostTypes[]
}

// @ts-ignore
const PostsSlider = (props:PostsSliderPropsTypes) => {
    const [emblaRef] = useEmblaCarousel()
    const router = useRouter()
    const dispatch = useDispatch()
    const locale = (router.locale || router.query.locale) === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? '' : router.locale || router.query.locale || '';
    const cardWidth = useMemo(() => {
        return props.postElementSize === 'listSmall' ? 320 :
            props.postElementSize === 'list' ? 116.6 :
                props.postElementSize === 'smaller' ? 209.8 :
                    props.postElementSize === 'small' ? 255 :
                        props.postElementSize === 'medium' ? 320 : 255
    }, [props.postElementSize])
    const noImageUrl = '/static/images/noImage/no-image-available.png';


    const renderPosts = props.posts.map(
        //@ts-ignore
        (post, index) => {

        const title = (post?.translations?.[locale as string]?.title || post?.title as string).replace('#', '');
        const dir = router.locale === 'fa' || router.locale === 'ar' && post?.translations?.[locale as string]?.title ? 'rtl' : 'ltr'
        const viewsNumber = post.views || 0
        const views = _shortNumber(viewsNumber)
        const rating = likeValueCalculator(post.likes, post.disLikes)

        const postProps = {
            dir,
            views,
            rating,
            noImageUrl,
            post,
            postElementSize: props.postElementSize,
            widgetId: props.widgetId,
            cardWidth,
            title

        }

        if (post.postType === 'video') {
            return (<div className={'embla__slide'}>
                    <VideoTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))} {...postProps} key={index}/>
                </div>
            )
        } else if (post.postType === 'promotion') {
            if (props.postElementSize === 'listSmall') {
                // @ts-ignore
                return (
                    <div className={'embla__slide'}>
                        {/* @ts-ignore */}
                        <PromotionCardListSmall onActivateLoadingHandler={() => dispatch(setLoading(true))} {...postProps} key={index}/>
                    </div>
                )
            } else {
                return (
                    <div className={'embla__slide'}>
                        <PromotionTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))} {...postProps} key={index}/>
                    </div>
                )

            }
        } else if (post.postType === 'article') {
            return (
                <div className={'embla__slide'}>
                    <ArticleTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))} {...postProps} key={index}/>
                </div>
            )
        } else return null
    })

    return (
        <PostsSliderStyledDiv className="embla" ref={emblaRef} cardWidth={cardWidth} >
            <div className={'embla__container'}>
                {renderPosts}
            </div>
        </PostsSliderStyledDiv>
    );
    // return null
};


export default PostsSlider;
