import React, {useState, useContext, useRef, useEffect} from 'react';
import withRouter from "next/dist/client/with-router";
import Link from "next/link";
import Image from 'next/image'
import ProgressBar from "../ProgressBar/ProgressBar";
import {getLanguageQueryFromWindowLocationSearch, likeValueCalculator} from '../../../_variables/_variables'
import {AppContext} from "../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faEye} from "@fortawesome/free-regular-svg-icons";
import {faDollarSign, faEuroSign} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";


let StyledDiv = styled.div`${props => props.stylesData}`

// import {deletedVideoAutoRemover} from "../../../variables/ajaxRequestVariables";

const PostElement = props => {
    const contextData = useContext(AppContext);
    let qualityLabel = useRef(null);
    let bottomLeft = useRef(null);
    let bottomRight = useRef(null);
    let element = useRef(null)
    let videoElement = useRef(null)

    let [state, setState] = useState({
        isHover: false,
        isWatched: false,
        extraClassName: '',
        queries: {},
        infoOnPostElementStyle: {},
        titleElementStyle: {},
        svgDefaultStyle:{
            maxWidth:'20px',
            maxHeight: '20px'
        }
    });

    useEffect(() => {
        setState({
            ...state,
            extraClassName: props.viewType ? props.viewType : '',
            queries: {...getLanguageQueryFromWindowLocationSearch()}
        })
    }, []);

    let isHoverHandler = () => {
        if (props.state.videoTrailerUrl) {
            state.isHover ? setState({...state, isHover: false}) : setState({...state, isHover: true})
        }
    };

    const ImageContent = () => {
        const imageWidth = 320
        let dataToRender = () => {
            if (state.isHover && props.state.videoTrailerUrl) {
                return (
                    <video
                        ref={videoElement}
                        src={props.state.videoTrailerUrl}
                        autoPlay={true}
                        loop={true}
                        onMouseOut={isHoverHandler}
                        onTouchCancel={isHoverHandler}
                        style={{
                            width:imageWidth,
                            height: imageWidth / 1.777
                        }}
                    />)

            } else if (!state.isHover) {
                const imageUrl = props.state.mainThumbnail ?? '/static/images/noImage/no-image-available.png'

                if (props.state?.mainThumbnail){
                    let renderNormalImageElement = props.state?.mainThumbnail.includes('http')
                    const imageURL= new URL(props.state?.mainThumbnail)
                    if (process.env.REACT_APP_ALLOWED_IMAGES_SOURCES.split(' ').includes(imageURL.hostname) ) {

                        return (
                            <Image src={props.state?.mainThumbnail} alt={props.state.title}
                                   onError={() =>renderNormalImageElement=true} onMouseEnter={isHoverHandler} onTouchStart={isHoverHandler}
                                   className='post-element-internal-image'
                                   layout='intrinsic'
                                   width={imageWidth}
                                   height={imageWidth / 1.777}
                                   quality={80}
                                   loading='lazy'
                                // lazy='true'
                            />
                        )

                    } else {
                        return (
                            <img src={props.state.mainThumbnail}
                                 onError={e=>e.currentTarget.src ='/static/images/noImage/no-image-available.png'}
                                 alt={props.state.title}
                                 onMouseEnter={isHoverHandler}
                                 onTouchStart={isHoverHandler}
                                 className='post-element-external-image'
                                 style={{
                                     width:imageWidth,
                                     height: imageWidth / 1.777
                                 }}/>
                        )
                    }
                }else  if (!props.state?.mainThumbnail) {
                    return (
                    <img src={imageUrl}
                         alt={props.state.title}
                         onMouseEnter={isHoverHandler}
                         onTouchStart={isHoverHandler}
                         className='post-element-external-image'
                         style={{
                             width:imageWidth,
                             height: imageWidth / 1.777
                         }}/>
                    )
                }else return null


            } else {
                return (
                    <span>{props.state.title}</span>
                )
            }
        };
        return dataToRender()
    };


    const RenderProgressBar = () => {
        if (props.state.rating !== 'disable' ) {
            return (
                <ProgressBar value={likeValueCalculator(props.state.likes, props.state.disLikes)} percent={true}/>
            )
        } else return null
    }

    const BottomRight = () => {
        if (props.state && props.state.views >1) {
            switch (props.state.postType ) {
                case 'video':
                case 'product':
                case 'standard':
                case 'article':
                case 'redirect':
                    return (
                        <span ref={bottomRight} className='bottom-right'>
                            <FontAwesomeIcon style={state.svgDefaultStyle} icon={faEye} className='post-element-info-logo'/>
                            <span className='view-count value-next-icon'>{props.state.views}</span>
                        </span>
                    )
                default :
                    return null
            }
        } else return null

    }

    const BottomLeft = () => {
        if (props.state) {
            switch (props.state.postType) {
                case 'video':
                case 'redirect':
                    if (props.state.duration){
                        return (
                            <span ref={bottomLeft} className='bottom-left'>
                             <FontAwesomeIcon style={state.svgDefaultStyle} icon={faClock} className='post-element-info-logo'/>
                             <span className='value-next-icon'>  {props.state.duration}</span>
                        </span>
                        )
                    }else return null
                case 'product':
                    return (
                        <span ref={bottomRight} className='bottom-left'>
                             <FontAwesomeIcon style={state.svgDefaultStyle} icon={props.state.currency === 'Usd' ? faDollarSign : faEuroSign} className='post-element-info-logo'/>
                             <span className='value-next-icon'>
                                        {props.state.price}
                             </span>
                        </span>
                    )
                default :
                    return null
            }
        } else return null

    }

    const TopRight = () => {
        if (props.state && props.state.quality) {
            switch (props.state.postType) {
                case 'video':
                case 'redirect':
                    return (
                        <span ref={qualityLabel} className='top-right'>{props.state.quality}</span>
                    )
                case 'product':
                    return null
                default :
                    return null
            }
        } else return null

    }

    const RenderDataOnImage = () => {
        if (state.isHover) {
            return null
        } else {
            return (
                <>
                    <TopRight/>
                    <BottomRight/>
                    <BottomLeft/>
                </>
            )
        }
    }

    return (
        < StyledDiv stylesData={   contextData.siteDesign.postElementStyle} ref={element} className={'post-element-div ' + (props.viewType ? props.viewType : 'standard')}>
            <Link
                as={contextData.state.activeLanguage !== 'default' ? `/post/${props.state.translations ? props.state.translations[contextData.state.activeLanguage] ? props.state.translations[contextData.state.activeLanguage].title || props.state.title : props.state.title : props.state.title}?id=${props.state._id}&lang=${contextData.state.activeLanguage}` : `/post/${props.state.title}?id=${props.state._id}`}
                href={{
                    pathname: `/post`,
                    query: {
                        id: props.state._id,
                        ...state.queries
                    }
                }}
            >
                <a >
                    <div className='post-element' key={props.state.title}>
                        <div className="image">
                            <ImageContent/>
                            <RenderDataOnImage/>
                        </div>
                        <RenderProgressBar/>
                        <h3>{props.state?.translations?.[contextData.state?.activeLanguage]?.title || props.state.title}</h3>
                    </div>
                </a>
            </Link>


        </StyledDiv>
    );
};
//  props.state.title
export default withRouter(PostElement);


