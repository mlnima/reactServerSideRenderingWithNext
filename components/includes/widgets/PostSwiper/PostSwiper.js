import React, {useEffect, useState, useContext, useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Controller, Scrollbar, Keyboard, Autoplay, EffectCube, EffectCoverflow, EffectFlip, EffectFade, Lazy, Parallax} from 'swiper'
import 'swiper/swiper-bundle.css';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import Image from 'next/image'
import styled from "styled-components";
let StyledDiv = styled.div`
  .swiper-wrapper {
    .swiper-slide {
      margin: 0 20px;
      display: flex;
      justify-content: center;
      place-items: center;
      background-color: var(--post-element-background-color);
      margin: 10px 0;
      a {
        .post-slider-item-title {
          white-space: nowrap;
          overflow: hidden !important;
          text-overflow: ellipsis;
          display: block;
          max-width: 95%;
          font-size: small;
        }
          .post-slider-item-external-image {
            min-width: 20vw;
            object-fit: contain;
          }
          .post-slider-item-internal-image {
            min-width: 20vw;
            object-fit: contain;

          }
        div {
          margin: auto;
          .post-slider-item-internal {
            margin: auto;
            object-fit: scale-down;
          }
        }
        h2{
          width: 255px;
          font-size: 1rem;
          max-width: 95vh;
          color: var(--post-element-text-color);
          //text-align: center;
          margin:  auto;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    width: 100vw;
    place-items: center;
    .swiper-wrapper {
      place-items: center;

      .swiper-slide {
        margin: 0 ;
        place-items: center;
        width: 100vw;
        a{
          width: 100%;
          display: grid;
          place-items: center;
          .post-slider-item-external-image,.post-slider-item-internal-image {
            width: 100%;
            object-fit: contain;
          }
        }
      }
    }
}
`


SwiperCore.use([Navigation, Pagination, Scrollbar, Keyboard, Autoplay, Controller, EffectCube, EffectCoverflow, Lazy, EffectFlip, EffectFade, Parallax]);

const PostSwiper = props => {
    const contextData = useContext(AppContext);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [controlledSwiper, setControlledSwiper] = useState(null);

    const [imageSize, setImageSize] = useState({
        width: 320,
        height: 169
    });

    const [state, setState] = useState({
        spaceBetween: 0,
        slidesPerView: 3,
        autoplay: true,
        effect: false,
        navigation: true,
        speed: 1000,
        imageRatioWidth: 16,
        imageRatioHeight: 10,
    });


    const renderSlides = props.posts.map(post => {
        const RenderImageElement = () => {
            const slidePerView = ((window.innerWidth/100) * 95)  >= 768 ? parseInt(props.slideAmountInDesktop) || 3 : parseInt(props.slideAmountInMobile) || 1
            let imageWidth;
            let imageHeight;
            if (window.innerWidth > 768) {
                imageWidth = props.currentPageSidebar ? (((window.innerWidth/100) * 95) - 320) / slidePerView : (((window.innerWidth/100) * 95) - 320) / slidePerView
                imageHeight = props.currentPageSidebar ? ((((window.innerWidth/100) * 95) - 320) / slidePerView) / (state.imageRatioWidth / state.imageRatioHeight) : (((window.innerWidth/100) * 95)  / slidePerView) / (props.imageRatioWidth / props.imageRatioHeight)
            } else {
                imageWidth = ((window.innerWidth/100) * 95) / parseInt(props.slideAmountInMobile || 1)
                imageHeight = (((window.innerWidth/100) * 95) / parseInt(props.slideAmountInMobile || 1)) / (props.imageRatioWidth / props.imageRatioHeight)
            }
            if (post.mainThumbnail.includes('http') || post.mainThumbnail.includes(window.location.hostname)) {
                return (
                        <img className='post-slider-item-external-image'
                             src={post.mainThumbnail}
                             alt={`Thumbnail ${post.mainThumbnail}`}/>
                )
            } else {
                return (
                    <Image
                        className='post-slider-item-internal-image'
                        src={post.mainThumbnail}
                        alt={`Thumbnail ${post.mainThumbnail}`}
                        width={imageWidth}
                        height={imageHeight}
                        quality={100}
                        layout='intrinsic'
                        loading='lazy'
                    />
                )
            }
        }

        return (
            <SwiperSlide tag="div" key={props.posts.indexOf(post)} virtualIndex={props.posts.indexOf(post)}    >
                <Link href={{pathname: '/post', query: {id: post._id}}}
                      as={contextData.state.activeLanguage !== 'default' ? `/post/${post.translations ? post.translations[contextData.state.activeLanguage] ? post.translations[contextData.state.activeLanguage].title || post.title : post.title : post.title}?id=${post._id}&lang=${contextData.state.activeLanguage}` : `/post/${post.title}?id=${post._id}`}>
                    <a>
                        <RenderImageElement/>
                        <h2 style={{textAlign: 'center'}} className='post-slider-item-title'>
                            {post?.translations?.[contextData.state.activeLanguage]?.title || post.title}
                        </h2>
                    </a>
                </Link>
            </SwiperSlide>
        )
    })

    return (
        <StyledDiv>
            <Swiper
                thumbs={{swiper: thumbsSwiper}}
                controller={{control: controlledSwiper}}
                className='post-swiper'
                tag="section"
                keyboard
                // autoplay={props.sliderAutoplay === 'true'}
                autoplay
                speed={parseInt(props.sliderSpeed) || 1000}
               // navigation
                scrollbar={{draggable: true}}
                effect={props.sliderEffect || false}
                spaceBetween={window.innerWidth > 768 ? parseInt(props.spaceBetweenAmountDesktop) || 1 : parseInt(props.spaceBetweenAmountMobile) || 1}
                slidesPerView={window.innerWidth > 768 ? parseInt(props.slideAmountInDesktop) || 3 : parseInt(props.slideAmountInMobile) || 1}
                style={{
                    maxWidth: window.innerWidth >= 768 && props.currentPageSidebar ? '70vw' :
                        window.innerWidth >= 768 && !props.currentPageSidebar ? '95vw' :
                            '95vw',

                }}
            >
                {renderSlides}
            </Swiper>
        </StyledDiv>

    );
};
export default PostSwiper;
//{/*{renderSlides}*/}
//
// pagination={{clickable: true}}