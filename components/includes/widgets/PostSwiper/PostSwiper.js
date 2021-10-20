import React, {useEffect, useState, useContext, useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Controller, Scrollbar, Keyboard, Autoplay, EffectCube, EffectCoverflow, EffectFlip, EffectFade, Lazy, Parallax} from 'swiper'
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import styled from "styled-components";
import PostSwiperPostCardImage from "./PostSwiperPostCardImage";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/controller';
import 'swiper/css/effect-cards';
import 'swiper/css/scrollbar';


SwiperCore.use([Navigation, Pagination, Scrollbar, Keyboard, Autoplay, Controller, EffectCube, EffectCoverflow, Lazy, EffectFlip, EffectFade, Parallax]);

let PostSwiperStyledDiv = styled.div`
  margin: 10px 0;
  width: 100vw;
  
  .swiper{
    height: ${props => (props.cardWidth /1.777) + 65}px ;
    .swiper-scrollbar{
      //margin-top: 50px ;
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
    const contextData = useContext(AppContext);
    const [postsToRender, setPostsToRender] = useState(() => props.posts ? props.posts : [])
    const [controlledSwiper,setControlledSwiper] = useState(null)

    const cardWidth = props.postElementSize === 'listSmall' ? 320 :
        props.postElementSize === 'list' ? 116.6 :
            props.postElementSize === 'smaller' ? 209.8 :
                props.postElementSize === 'small' ? 255 :
                    props.postElementSize === 'medium' ? 320 : 255


    const removePostOnImageError = (id) => {
        setPostsToRender(prevPosts => prevPosts.filter(post => post._id !== id))
    }

    const renderSlides = postsToRender.map((post,index) => {
        return (
            <SwiperSlide tag="div" key={index} virtualIndex={index}>
                <Link href={{pathname: '/post', query: {id: post._id}}}
                      as={contextData.state.activeLanguage !== 'default' ? `/post/${post.translations ? post.translations[contextData.state.activeLanguage] ? post.translations[contextData.state.activeLanguage].title || post.title : post.title : post.title}?id=${post._id}&lang=${contextData.state.activeLanguage}` : `/post/${post.title}?id=${post._id}`}>
                    <a>
                        <PostSwiperPostCardImage post={post} removePostOnImageError={removePostOnImageError}/>
                        <h2 style={{textAlign: 'center'}} className='post-slider-item-title'>
                            {post?.translations?.[contextData.state.activeLanguage]?.title || post.title}
                        </h2>
                    </a>
                </Link>
            </SwiperSlide>
        )
    })

    return (
        <PostSwiperStyledDiv cardWidth={cardWidth}>
            <Swiper
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
                slidesPerView={window.innerWidth > 768 ? Math.floor(((window.innerWidth - 320) / cardWidth) - 1) : Math.floor(window.innerWidth / cardWidth)}
                spaceBetween={props?.uniqueData?.spaceBetween || 10}

            >
                {renderSlides}
            </Swiper>
        </PostSwiperStyledDiv>

    );
};
export default PostSwiper;
