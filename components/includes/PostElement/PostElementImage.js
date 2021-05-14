import React, {useEffect, useState, useContext, useRef} from 'react';
import ImageRenderer from "../ImageRenderer/ImageRenderer";
import BottomRight from "./BottomRight";
import BottomLeft from "./BottomLeft";
import TopRight from "./TopRight";
import TopLeft from "./TopLeft";
import {likeValueCalculator} from "../../../_variables/_variables";

const PostElementImage = ({postElementSize,isHover,mainThumbnail,isHoverHandler,_id,postType,views,duration,quality,likes,disLikes,price,videoTrailerUrl,title}) => {
    const imageWidth = postElementSize === 'list' ?
       `
      
       max-width:360px;
       width: 100%;
       `
        : 'width: 100%;'

    return (
        <div className={`post-element-image-data`} style={{position:'relative'}}>
        <style jsx>{`
        @keyframes opacityAnimationStart {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 100%;
            }
        }
        .post-element-image-data{
           
            ${imageWidth}
        }

        
        video {
            width: 100%;
            animation: opacityAnimationStart 2s alternate;
            aspect-ratio:16/9;
        }
        `}</style>
            {isHover && videoTrailerUrl ?
                <video
                   // ref={videoElement}
                    src={videoTrailerUrl}
                    autoPlay={true}
                    loop={true}
                /> :
                <ImageRenderer imageUrl={mainThumbnail}
                               altValue={title || mainThumbnail}
                               hoverHandler={isHoverHandler}
                               // imageWidth={imageWidth}
                               // imageHeight={imageWidth / 1.777}
                               quality={100}
                               loading='eager'
                               layout='fill'
                               classNameValue='post-element-image'
                               contentId={_id}

                />
            }
            {views > 1 && postType === ('video') && !isHover ? <BottomRight views={views}/> : null}
            {(postType === ('video') || postType === ('redirect') || postType === ('product')) && !isHover ?
                <BottomLeft type={postType} price={price} duration={duration} /> : null}
            {quality && postType === ('video') && !isHover ? <TopRight quality={quality}/> : null}
            {likes > 0 && rating !== 'disable' && !isHover ? <TopLeft rating={likeValueCalculator(likes, disLikes)} s/> : null}
        </div>

    );
};
export default PostElementImage;
