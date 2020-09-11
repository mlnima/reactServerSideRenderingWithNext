import React, {useEffect, useState, useContext, useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination, Controller, Scrollbar, Thumbs, Keyboard, Autoplay, EffectCube, EffectCoverflow, Lazy} from 'swiper'
import 'swiper/swiper-bundle.css';
import './PostSwiper.scss';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";


SwiperCore.use([Navigation, Pagination, Scrollbar, Keyboard, Autoplay, Controller, EffectCube, EffectCoverflow, Lazy]);

const PostSwiper = props => {
    const contextData = useContext(AppContext);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [controlledSwiper, setControlledSwiper] = useState(null);

    const [state, setState] = useState({
        spaceBetween: 0,
        slidesPerView: 3
    });

    useEffect(() => {
        console.log(props)
    }, [props]);
    useEffect(() => {
        setState({
            ...state,
            spaceBetween: window.innerWidth >= 768 ? props.postSwiperSpaceBetweenDesktop || 0 : props.postSwiperSpaceBetweenMobile || 1,
            slidesPerView: window.innerWidth >= 768 ? props.postSwiperAmountDesktop || 3 : props.postSwiperAmountMobile || 1,
        })

    }, [props]);

    const renderSlides = props.posts.map(post => {

        return (
            <SwiperSlide tag="li" key={props.posts.indexOf(post)}>
                <Link href={{pathname: '/post', query: {id: post._id}}}
                      as={contextData.state.activeLanguage !== 'default' ? `/post/${post.translations ? post.translations[contextData.state.activeLanguage] ? post.translations[contextData.state.activeLanguage].title || post.title : post.title : post.title}?id=${post._id}&lang=${contextData.state.activeLanguage}` : `/post/${post.title}?id=${post._id}`}>
                    <a>
                        <img src={post.mainThumbnail} alt={`Thumbnail ${post.mainThumbnail}`}/>
                        <h3 style={{textAlign: 'center'}}>{post.translations ? post.translations[contextData.state.activeLanguage] ? post.translations[contextData.state.activeLanguage].title || post.title : post.title : post.title}</h3>
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
                autoplay
                speed={2000}


                navigation
                // pagination={{ clickable: true }}
                scrollbar={{draggable: true}}
                spaceBetween={state.spaceBetween || 0}
                slidesPerView={state.slidesPerView || 3}
            >
                {renderSlides}
            </Swiper>
        </div>

    );
};
export default PostSwiper;
//{/*{renderSlides}*/}
//
