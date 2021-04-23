import {useState, useRef} from 'react';
import withRouter from "next/dist/client/with-router";
import Link from "next/link";
import {likeValueCalculator} from '../../../_variables/_variables'
import styled from "styled-components";
import ImageRenderer from "../ImageRenderer/ImageRenderer";
import BottomRight from "./BottomRight";
import BottomLeft from "./BottomLeft";
import TopRight from "./TopRight";
import TopLeft from "./TopLeft";
let StyledDiv = styled.article`${props => props.stylesData}`

const PostElement = ({title, imageWidth, svgDefaultStyle, viewType, postType, _id, postElementSize, videoTrailerUrl, views, likes, disLikes, quality, rating, price, duration, mainThumbnail, postElementStyle,onClickLoadingHandler}) => {

    let element = useRef(null)
    let videoElement = useRef(null)

    let [state, setState] = useState({
        isHover: false,
        isWatched: false,
        extraClassName: viewType ? viewType : '',
        queries: {},
        infoOnPostElementStyle: {},
        titleElementStyle: {},
    });

    let isHoverHandler = () => {
        if (videoTrailerUrl) {
            state.isHover ? setState({...state, isHover: false}) : setState({...state, isHover: true})
        }
    };

    const classNameForPostElement = `post-element-div ${viewType ? viewType : 'standard'} ${(postElementSize) ?
                                    `post-element-div-${postElementSize}` :
                                    'post-element-div-medium'}`
    return (
        < StyledDiv stylesData={postElementStyle} ref={element} className={classNameForPostElement}>
            <Link href={{
                pathname: `/post`,
                query: {
                    id: _id,
                    ...state.queries
                }
            }}
                  as={`/${postType || 'post'}/${title}?id=${_id}`}
                  scroll={false}
            >
                <a rel='next' onClick={onClickLoadingHandler}>
                    <div className={'post-element '} key={title}  onMouseOut={isHoverHandler} onTouchCancel={isHoverHandler}>
                        <div className="image">
                            {state.isHover && videoTrailerUrl ?
                                <video
                                    ref={videoElement}
                                    src={videoTrailerUrl}
                                    autoPlay={true}
                                    loop={true}
                                /> :
                                <ImageRenderer imageUrl={mainThumbnail}
                                               altValue={title || mainThumbnail}
                                               hoverHandler={isHoverHandler}
                                               imageWidth={imageWidth}
                                               imageHeight={imageWidth / 1.777}
                                               quality={100}
                                               loading='lazy'
                                               layout='intrinsic'
                                               classNameValue='post-element-internal-image'
                                               contentId={_id}

                                />
                            }
                            {views > 1 && postType === ('video') && !state.isHover ? <BottomRight views={views} svgDefaultStyle={svgDefaultStyle}/> : null}
                            {(postType === ('video') || postType === ('redirect') || postType === ('product')) && !state.isHover ?
                                <BottomLeft type={postType} price={price} duration={duration} svgDefaultStyle={svgDefaultStyle}/> : null}
                            {quality && postType === ('video') && !state.isHover ? <TopRight quality={quality} svgDefaultStyle={svgDefaultStyle}/> : null}
                            {likes > 0 && rating !== 'disable' && !state.isHover ? <TopLeft rating={likeValueCalculator(likes, disLikes)} svgDefaultStyle={svgDefaultStyle}/> : null}
                        </div>
                        <h2>{title}</h2>
                    </div>
                </a>
            </Link>
        </StyledDiv>
    );
};

export default withRouter(PostElement);

