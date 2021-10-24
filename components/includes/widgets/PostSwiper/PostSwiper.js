import React, {useEffect, useState, useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {useRouter} from "next/router";
import Link from "next/link";
import styled from "styled-components";
import SwiperCore, {Navigation, Pagination, Controller, Scrollbar, Keyboard, Autoplay, EffectCube, EffectCoverflow, EffectFlip, EffectFade, Lazy, Parallax} from 'swiper'
import PostSwiperPostCardImage from "./PostSwiperPostCardImage";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/controller';
import 'swiper/css/effect-cards';
import 'swiper/css/scrollbar';



SwiperCore.use([Navigation, Pagination, Scrollbar, Keyboard, Autoplay, Controller, EffectCube, EffectCoverflow, Lazy, EffectFlip, EffectFade, Parallax]);

let PostSwiperStyledDiv = styled.div`
  margin: 10px auto;
  width: calc(100vw);
  .swiper {
    height: ${props => (props?.cardWidth / 1.777) + 65}px;
    .swiper-scrollbar {
      height: 10px;
      background-color: var(--post-element-text-color, #131314);
    }
    .swiper-wrapper {
      position: relative;
      margin: 0;
      .swiper-slide {
        background-color: var(--post-element-background-color, #131314);
        margin: 0 5px !important;
        width: ${props => props.cardWidth}px !important;
        a {
          img {
            width: ${props => props.cardWidth}px;
            object-fit: contain;
          }
          .post-slider-item-title {
            white-space: nowrap;
            overflow: hidden !important;
            text-overflow: ellipsis;
            display: block;
            font-size: small;
          }

          h2 {
            color: var(--post-element-text-color);
            width: ${props => props.cardWidth - 5}px;
          }
        }
      }
    }
  }


  @media only screen and (min-width: 768px) {
    width: calc(100vw - 340px);
  }
`

const PostSwiper = props => {
    const router = useRouter()
    const swiperContainer = useRef(null)
    const swiperParent = useRef(null)
    const [postsToRender, setPostsToRender] = useState(() => props.posts ? props.posts : [])
    const [controlledSwiper, setControlledSwiper] = useState(null)

    const cardWidth = props.postElementSize === 'listSmall' ? 320 :
        props.postElementSize === 'list' ? 116.6 :
            props.postElementSize === 'smaller' ? 209.8 :
                props.postElementSize === 'small' ? 255 :
                    props.postElementSize === 'medium' ? 320 : 255


    const removePostOnImageError = (id) => {
        setPostsToRender(prevPosts => prevPosts.filter(post => post._id !== id))
    }

    const renderSlides = postsToRender.map((post, index) => {
        return (
            <SwiperSlide tag="div" key={index} virtualIndex={index}>
                <Link href={{pathname: '/post', query: {id: post._id}}}
                      as={router.locale !== 'default' ? `/post/${post.translations ? post.translations[router.locale] ? post.translations[router.locale].title || post.title : post.title : post.title}?id=${post._id}&lang=${router.locale}` : `/post/${post.title}?id=${post._id}`}>
                    <a>
                        <PostSwiperPostCardImage post={post} removePostOnImageError={removePostOnImageError}/>
                        <h2 style={{textAlign: 'center'}} className='post-slider-item-title'>
                            {post?.translations?.[router.locale]?.title || post.title}
                        </h2>
                    </a>
                </Link>
            </SwiperSlide>
        )
    })

    useEffect(() => {
        if (typeof window !== 'undefined'){
            swiperContainer.current.style.maxWidth  = `${swiperParent.current.style.width - 50}px`
        }

    }, [props]);


    return (
        <PostSwiperStyledDiv ref={swiperParent} className='post-swiper-parent'  cardWidth={cardWidth} modules={[Controller]} controller={{ control: controlledSwiper }}>
            <Swiper
                ref={swiperContainer}
                //  thumbs={{swiper: thumbsSwiper}}
                controller={{control: controlledSwiper}}
                className='post-swiper'
                tag="div"
                wrapperTag="div"
                keyboard
                autoplay
                speed={props?.uniqueData?.speed || 1000}
                scrollbar={{draggable: true}}
                effect={props?.uniqueData?.sliderEffect || false}
                slidesPerView={window.innerWidth > 768 ? Math.floor(((window.innerWidth - 320) / cardWidth)) : Math.floor(window.innerWidth / cardWidth)}
                spaceBetween={props?.uniqueData?.spaceBetween || 10}

            >
                {renderSlides}
            </Swiper>
        </PostSwiperStyledDiv>

    );
};
export default PostSwiper;
