import React, {useState, useContext, useRef, useEffect, useMemo} from 'react';
import withRouter from "next/dist/client/with-router";
import Link from "next/link";
import {likeValueCalculator} from '../../../_variables/_variables'
import {AppContext} from "../../../context/AppContext";
import styled from "styled-components";
import {useRouter} from "next/router";
import ImageRenderer from "../ImageRenderer/ImageRenderer";
import BottomRight from "./BottomRight";
import BottomLeft from "./BottomLeft";
import TopRight from "./TopRight";
import TopLeft from "./TopLeft";
let StyledDiv = styled.article`${props => props.stylesData}`

const PostElement = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const freezeProps = useMemo(() => props, [])
    const styleData = useMemo(() => contextData.siteDesign.postElementStyle, [contextData.siteDesign.postElementStyle])
    let element = useRef(null)
    let videoElement = useRef(null)
    const locale = (router.locale || router.query.locale) === process.env.REACT_APP_DEFAULT_LOCAL ? '' : router.locale || router.query.locale || ''
    const title = (props.state?.translations?.[locale]?.title || props.state.title).replace('#', '')

    let [state, setState] = useState({
        isHover: false,
        isWatched: false,
        extraClassName: props.viewType ? props.viewType : '',
        queries: {},
        infoOnPostElementStyle: {},
        titleElementStyle: {},
        imageWidth: 320
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) {
                setState({
                    ...state,
                    imageWidth: window.innerWidth,
                })
            }
        }
    }, []);

    let isHoverHandler = () => {
        if (props.state.videoTrailerUrl) {
            state.isHover ? setState({...state, isHover: false}) : setState({...state, isHover: true})
        }
    };

    const linkAsForPostElement = `/${props.state.postType || 'post'}/${title}?id=${props.state._id}`
   const classNameForPostElement =
       `post-element-div ${props.viewType ? props.viewType : 'standard'} ${(props.postElementSize || contextData.siteDesign.postElementSize) ? `post-element-div-${props.postElementSize || contextData.siteDesign.postElementSize}` : 'post-element-div-medium'}`
    return (
        < StyledDiv stylesData={styleData} ref={element} className={classNameForPostElement}>
            <Link href={{
                    pathname: `/post`,
                    query: {
                        id: props.state._id,
                        ...state.queries
                    }
                }}
                as={linkAsForPostElement}
                scroll={false}
            >
                <a rel='noreferrer'>
                    <div className={'post-element '} key={props.state.title}>
                        <div className="image">
                            {state.isHover && props.state.videoTrailerUrl?
                                <video
                                    ref={videoElement}
                                    src={props.state.videoTrailerUrl}
                                    autoPlay={true}
                                    loop={true}
                                    onMouseOut={isHoverHandler}
                                    onTouchCancel={isHoverHandler}
                                />:
                                    <ImageRenderer imageUrl={freezeProps.state?.mainThumbnail}
                                                   altValue={title || props.state?.mainThumbnail}
                                                   hoverHandler={isHoverHandler}
                                                   imageWidth={state.imageWidth}
                                                   imageHeight={state.imageWidth / 1.777}
                                                   quality={100}
                                                   loading='lazy'
                                                   layout='intrinsic'
                                                   classNameValue='post-element-internal-image'
                                                   contentId={props.state._id}

                                    />
                            }
                            {props.state && props.state.views > 1 && props.state.postType === ('video') && !state.isHover ? <BottomRight views={props.state.views}/> : null}
                            {(props.state.postType === ('video') || props.state.postType === ('redirect') || props.state.postType === ('product')) && !state.isHover ?
                                <BottomLeft type={props.state.postType} price={props.state.price} duration={props.state.duration}/> : null}
                            {props.state.quality && props.state.postType === ('video') && !state.isHover ? <TopRight quality={props.state.quality}/> : null}
                            {props.state.likes > 0 && props.state.rating !== 'disable' && !state.isHover ? <TopLeft rating={likeValueCalculator(props.state.likes, props.state.disLikes)}/> : null}
                        </div>
                        <h3>{title}</h3>
                    </div>
                </a>
            </Link>
        </StyledDiv>
    );
};

export default withRouter(PostElement);

