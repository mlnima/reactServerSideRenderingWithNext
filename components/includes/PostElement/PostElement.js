import React, {useState, useContext, useRef, useEffect} from 'react';
import withRouter from "next/dist/client/with-router";
import Link from "next/link";
import ProgressBar from "../ProgressBar/ProgressBar";
import {getLanguageQueryFromWindowLocationSearch, likeValueCalculator} from '../../../_variables/_variables'
import {AppContext} from "../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faEye} from "@fortawesome/free-regular-svg-icons";
import {faDollarSign, faEuroSign} from "@fortawesome/free-solid-svg-icons";
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
        titleElementStyle:{}
    });

    useEffect(() => {
        setState({
            ...state,
            extraClassName: props.viewType ? props.viewType : '',
            queries: {...getLanguageQueryFromWindowLocationSearch()}
        })
    }, [props]);

    useEffect(() => {
        setState({
            ...state,
            infoOnPostElementStyle:{
                ...state.infoOnPostElementStyle,
                color: contextData.siteDesign.postElementOnImageTextColor || 'white',
                backgroundColor: contextData.siteDesign.postElementOnImageTextBackgroundColor || 'rgba(0,0,0,0.5)'

            },
            titleElementStyle:{
                ...state.titleElementStyle,
                color: contextData.siteDesign.postElementTitleTextColor || 'white',
                backgroundColor: contextData.siteDesign.postElementBackgroundColor || 'transparent'
            }

        })
    }, [contextData.siteDesign]);


    let isHoverHandler = () => {
        if (props.state.videoTrailerUrl) {
            state.isHover ? setState({...state, isHover: false}) : setState({...state, isHover: true})
        }
    };

    const ImageContent = () => {
        let dataToRender = () => {
            if (state.isHover && props.state.videoTrailerUrl) {
                return (
                    <video ref={videoElement} src={props.state.videoTrailerUrl} autoPlay={true} loop={true}
                           onMouseOut={e => {
                               isHoverHandler()
                           }}
                    />)

            } else if (!state.isHover) {
                return (<img src={props.state.mainThumbnail} alt={props.state.title} onError={err => {
                    if (!props.state.mainThumbnail) {
                        // deletedVideoAutoRemover(props.state)
                        console.log('something wrong with image on ', props.state.title)
                    }
                }} onMouseEnter={() =>
                    isHoverHandler()
                }/>)
            } else {
                return (
                    <span>{props.state.title}</span>
                )
            }
        };
        return dataToRender()
    };


    const RenderProgressBar = () => {
        if (props.state.rating !== 'disable') {
            return (
                <ProgressBar
                    valueColor={contextData.siteDesign.postElementProgressBarValueColor}
                    progressBarColor={contextData.siteDesign.postElementProgressBarColor}
                    progressBarBackgroundColor={contextData.siteDesign.postElementProgressBarBackgroundColor}

                    value={likeValueCalculator(props.state.likes, props.state.disLikes)} percent={true}/>
            )
        } else return null
    }

    const BottomRight = () => {
        if (props.state) {
            switch (props.state.postType) {
                case 'video':
                    return (
                        <span ref={bottomRight} className='bottom-right' style={state.infoOnPostElementStyle}>
                            <FontAwesomeIcon icon='faEye' className='post-element-info-logo' />
                            <span className='view-count value-next-icon'>{props.state.views}</span>
                        </span>
                    )
                case 'product':
                    return (
                        <span ref={bottomRight} className='bottom-right' style={state.infoOnPostElementStyle}>

                            <FontAwesomeIcon icon='faEye' className='post-element-info-logo' />

                           <span className='view-count value-next-icon'> {props.state.views}</span>

                        </span>
                    )
                default :
                    break
            }
        } else return null

    }

    const BottomLeft = () => {
        if (props.state) {
            switch (props.state.postType) {
                case 'video':
                    return (
                        <span ref={bottomLeft} className='bottom-left' style={state.infoOnPostElementStyle}>
                             <FontAwesomeIcon icon={faClock} className='post-element-info-logo' color={contextData.siteDesign.postElementOnImageTextColor || 'white'}/>
                             <span className='value-next-icon'>  {props.state.duration}</span>
                        </span>
                    )
                case 'product':
                    return (
                        <span ref={bottomRight} className='bottom-left' style={state.infoOnPostElementStyle}>
                             <FontAwesomeIcon icon={props.state.currency === 'Usd' ? faDollarSign : faEuroSign} className='post-element-info-logo' color={contextData.siteDesign.postElementOnImageTextColor || 'white'}/>
                                    <span className='value-next-icon'>
                                        {props.state.price}
                                    </span>
                        </span>
                    )
                default :
                    break
            }
        } else return null

    }

    const TopRight = () => {
        if (props.state) {
            switch (props.state.postType) {
                case 'video':
                    return (
                        <span ref={qualityLabel} className='top-right' style={state.infoOnPostElementStyle}>{props.state.quality}</span>
                    )
                case 'product':
                    return null
                default :
                    break
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
        < div ref={element} className={'post-element-div ' + (props.viewType ? props.viewType : 'standard')}>
            <Link
                as={contextData.state.activeLanguage !== 'default' ? `/post/${props.state.translations ? props.state.translations[contextData.state.activeLanguage] ? props.state.translations[contextData.state.activeLanguage].title || props.state.title : props.state.title : props.state.title}?id=${props.state._id}&lang=${contextData.state.activeLanguage}` : `/post/${props.state.title}?id=${props.state._id}`}
                href={{
                    pathname: `/post`,
                    query: {
                        id: props.state._id,
                        ...state.queries
                    }
                }}>
                <a>
                    <div className='post-element' key={props.state.title}>
                        <div className="image">
                            <ImageContent/>
                            <RenderDataOnImage/>
                        </div>
                        <RenderProgressBar/>
                        <h3 style={state.titleElementStyle}>{props.state.translations ? props.state.translations[contextData.state.activeLanguage] ? props.state.translations[contextData.state.activeLanguage].title || props.state.title : props.state.title : props.state.title}</h3>
                    </div>
                </a>
            </Link>


        </div>
    );
};
//  props.state.title
export default withRouter(PostElement);


