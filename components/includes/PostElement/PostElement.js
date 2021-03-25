import React, {useState, useContext, useRef, useEffect} from 'react';
import withRouter from "next/dist/client/with-router";
import Link from "next/link";
import ProgressBar from "../ProgressBar/ProgressBar";
import { likeValueCalculator} from '../../../_variables/_variables'
import {AppContext} from "../../../context/AppContext";
import styled from "styled-components";
import {useRouter} from "next/router";
import ImageRenderer from "../ImageRenderer/ImageRenderer";
import BottomRight from "./BottomRight";
import BottomLeft from "./BottomLeft";
import TopRight from "./TopRight";


let StyledDiv = styled.div`${props => props.stylesData}`

// import {deletedVideoAutoRemover} from "../../../variables/ajaxRequestVariables";

const PostElement = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    let element = useRef(null)
    let videoElement = useRef(null)

    const locale = (router.locale || router.query.locale) === process.env.REACT_APP_DEFAULT_LOCAL ? '' : router.locale || router.query.locale || ''
    const title = props.state?.translations?.[locale]?.title || props.state.title

    let [state, setState] = useState({
        isHover: false,
        isWatched: false,
        extraClassName: '',
        queries: {},
        infoOnPostElementStyle: {},
        titleElementStyle: {},

    });

    useEffect(() => {
        setState({
            ...state,
            extraClassName: props.viewType ? props.viewType : '',
            // queries: {...getLanguageQueryFromWindowLocationSearch()}
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
                            width: imageWidth,
                            height: imageWidth / 1.777
                        }}
                    />)

            } else if (!state.isHover) {
                return (
                    <ImageRenderer imageUrl={props.state?.mainThumbnail}
                                   altValue={title || props.state?.mainThumbnail }
                                   hoverHandler={isHoverHandler}
                                   imageWidth={imageWidth}
                                   imageHeight={imageWidth / 1.777}
                                   quality={100}
                                   loading='lazy'
                                   layout='intrinsic'
                                   classNameValue='post-element-internal-image'

                    />
                )
            } else {
                return (
                    <span>{props.state.title}</span>
                )
            }
        };
        return dataToRender()
    };


   //const linkAsForPostElement = process.env.REACT_APP_LOCALS.split(' ').includes(locale) ? `/${locale}/${props.state.postType ||'post'}/${title}?id=${props.state._id}` : `/${props.state.postType ||'post'}/${title}?id=${props.state._id}`
    const linkAsForPostElement =  `/${props.state.postType ||'post'}/${title}?id=${props.state._id}`
    const localeAttr = router.locale || router.query.locale ? (router.locale || router.query.locale) !== process.env.REACT_APP_DEFAULT_LOCAL ?{locale:router.locale || router.query.locale}:{}:{}

    return (
        < StyledDiv stylesData={contextData.siteDesign.postElementStyle} ref={element} className={'post-element-div ' + (props.viewType ? props.viewType : 'standard')}>
            <Link

                href={{
                    pathname:  `/post`,
                    query: {
                        id: props.state._id,
                        ...state.queries
                    }
                }}
                as={linkAsForPostElement}
                // shallow={true}
               //  local={router.locale || router.query.locale || false}
            >
                <a onClick={()=>contextData.dispatchState({...contextData.state,loading:true})}>
                    <div className='post-element' key={props.state.title}>
                        <div className="image">
                            <ImageContent/>
                            {props.state && props.state.views > 1 && props.state.postType === ('video') ? <BottomRight views={props.state.views}/> : null}
                            {props.state.postType === ('video') ||props.state.postType === ('redirect') || props.state.postType === ('product')? <BottomLeft type={props.state.postType} price={props.state.price} duration={props.state.duration}/> : null}
                            {props.state.quality && props.state.postType === ('video') ? <TopRight quality={props.state.quality}/> : null}
                        </div>
                        {
                            props.state.rating !== 'disable' && props.state.likes >0 ?
                                <ProgressBar value={likeValueCalculator(props.state.likes, props.state.disLikes)} percent={true}/> :
                                null
                        }
                        <h3>{title}</h3>
                    </div>
                </a>
            </Link>
        </StyledDiv>
    );
};

export default withRouter(PostElement);


