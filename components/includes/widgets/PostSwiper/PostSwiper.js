import React, {useEffect, useState, useContext, useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Controller, Scrollbar, Keyboard, Autoplay, EffectCube, EffectCoverflow, EffectFlip, EffectFade, Lazy, Parallax} from 'swiper'
import 'swiper/swiper-bundle.css';
import './PostSwiper.scss';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import Image from 'next/image'


SwiperCore.use([Navigation, Pagination, Scrollbar, Keyboard, Autoplay, Controller, EffectCube, EffectCoverflow, Lazy, EffectFlip, EffectFade, Parallax]);

const PostSwiper = props => {
    const contextData = useContext(AppContext);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [controlledSwiper, setControlledSwiper] = useState(null);

    const [imageSize, setImageSize] = useState({
        width: 300,
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

    useEffect(() => {
        // setState({
        //     ...state,
        //     spaceBetween: window.innerWidth > 768 ? parseInt(props.spaceBetweenAmountDesktop) || 3 : parseInt(props.spaceBetweenAmountMobile) || 1,
        //     slidesPerView: (window.innerWidth || 320) >= 768 ? parseInt(props.slideAmountInDesktop) || 3 : parseInt(props.slideAmountInMobile) || 1,
        //     imageRatioWidth: parseInt(props.imageRatioWidth) || 16,
        //     imageRatioHeight: parseInt(props.imageRatioHeight) || 9,
        // })

        // if (window.innerWidth > 768) {
        //     setImageSize({
        //         width: props.currentPageSidebar ? (window.innerWidth - 300) / state.slidesPerView : window.innerWidth / state.slidesPerView,
        //         height: props.currentPageSidebar ? ((window.innerWidth - 300) / state.slidesPerView) / (state.imageRatioWidth / state.imageRatioHeight) : (props.deviceWidth / state.slidesPerView) / (state.imageRatioWidth / state.imageRatioHeight)
        //     })
        // } else {
        //
        //     setImageSize({
        //         width: window.innerWidth / parseInt(props.slideAmountInMobile || 1),
        //         height: (window.innerWidth / parseInt(props.slideAmountInMobile || 1)) / (state.imageRatioWidth / state.imageRatioHeight)
        //     })
        // }

        //console.log(props.slideAmountInDesktop)
    }, [props]);

    // useEffect(() => {
    //     console.log(window.innerWidth)
    // }, []);


    const renderSlides = props.posts.map(post => {


        const RenderImageElement = () => {
            const slidePerView = ((window.innerWidth/100) * 95)  >= 768 ? parseInt(props.slideAmountInDesktop) || 3 : parseInt(props.slideAmountInMobile) || 1
            let imageWidth;
            let imageHeight;
            if (window.innerWidth > 768) {
                imageWidth = props.currentPageSidebar ? (((window.innerWidth/100) * 95) - 300) / slidePerView : (((window.innerWidth/100) * 95) - 300) / slidePerView
                imageHeight = props.currentPageSidebar ? ((((window.innerWidth/100) * 95) - 300) / slidePerView) / (state.imageRatioWidth / state.imageRatioHeight) : (((window.innerWidth/100) * 95)  / slidePerView) / (props.imageRatioWidth / props.imageRatioHeight)
            } else {
                imageWidth = ((window.innerWidth/100) * 95) / parseInt(props.slideAmountInMobile || 1)
                imageHeight = (((window.innerWidth/100) * 95) / parseInt(props.slideAmountInMobile || 1)) / (props.imageRatioWidth / props.imageRatioHeight)
            }

            console.log(imageWidth)
            console.log(imageHeight)
            // console.log(((((window.innerWidth/100) * 95) - 300) / slidePerView)/ (state.imageRatioWidth / state.imageRatioHeight))

            if (post.mainThumbnail.includes('http') || post.mainThumbnail.includes(window.location.hostname)) {
                return (
                        <img className='post-slider-item-external-image' src={post.mainThumbnail} alt={`Thumbnail ${post.mainThumbnail}`}/>
                )
            } else {
                return (

                    <Image
                        className='post-slider-item-internal-image'
                        src={post.mainThumbnail}
                        alt={`Thumbnail ${post.mainThumbnail}`}
                        width={imageWidth}
                        height={imageHeight}
                        quality={50}
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
                        <h3 style={{textAlign: 'center'}} className='post-slider-item-title'>
                            {post?.translations?.[contextData.state.activeLanguage]?.title || post.title}
                        </h3>
                    </a>
                </Link>
            </SwiperSlide>
        )
    })

    return (
        <div>
            <Swiper
                thumbs={{swiper: thumbsSwiper}}
                controller={{control: controlledSwiper}}
                className='post-swiper'
                tag="section"
                keyboard
                // autoplay={props.sliderAutoplay === 'true'}
                autoplay
                speed={parseInt(props.sliderSpeed) || 1000}
                navigation
                scrollbar={{draggable: true}}
                effect={props.sliderEffect || false}
                spaceBetween={window.innerWidth >= 768 ? parseInt(props.spaceBetweenAmountDesktop) || 1 : parseInt(props.spaceBetweenAmountMobile) || 1}
                slidesPerView={window.innerWidth >= 768 ? parseInt(props.slideAmountInDesktop) || 3 : parseInt(props.slideAmountInMobile) || 1}
                style={{
                    maxWidth: window.innerWidth >= 768 && props.currentPageSidebar ? '70vw' :
                        window.innerWidth >= 768 && !props.currentPageSidebar ? '95vw' :
                            '95vw',
                    // maxHeight: '500px'
                }}
            >
                {renderSlides}
            </Swiper>
        </div>

    );
};
export default PostSwiper;
//{/*{renderSlides}*/}
//
// pagination={{clickable: true}}