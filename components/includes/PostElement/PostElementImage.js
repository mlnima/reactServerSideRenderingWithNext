import ImageRenderer from "../ImageRenderer/ImageRenderer";
import BottomRight from "./BottomRight";
import BottomLeft from "./BottomLeft";
import TopRight from "./TopRight";
import TopLeft from "./TopLeft";
import {likeValueCalculator} from "../../../_variables/_variables";

const PostElementImage = ({postElementSize,widgetId,isHover,mainThumbnail,isHoverHandler,_id,postType,views,duration,quality,likes,disLikes,price,videoTrailerUrl,title,postElementImageLoaderType,postElementImageLoader,rating}) => {
    const imageWidthSize = postElementSize === 'list' ? 116.6 :
                           postElementSize === 'smaller' ? 209.8 :
                           postElementSize === 'small' ? 255 :
                           postElementSize === 'medium' ? 320 : 255

    const imageWidth = postElementSize === 'list' ?`max-width:116.6px;`:`width: 100%;`

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
                width: 48vw;
                height: 27vw;
                ${imageWidth}
            }
            video {
                width: 48vw;
                height: 27vw;
                animation: opacityAnimationStart 2s alternate;  
            }
            
            @media only screen and (min-width: 768px) {
                .post-element-image-data{
                    width: ${imageWidthSize}px;
                    height: ${imageWidthSize/1.777}px;
                    ${imageWidth}
                }
                video {
                    width: ${imageWidthSize}px;
                    height: ${imageWidthSize/1.777}px;
                    animation: opacityAnimationStart 2s alternate;  
                }
            }     
            
            `}</style>

            {isHover && videoTrailerUrl ?
                <video autoPlay={true} loop={true}>
                    <source src={videoTrailerUrl} />
                    Sorry, your browser doesn't support embedded videos.
                </video>
                :
                <ImageRenderer imageUrl={mainThumbnail}
                               altValue={title || mainThumbnail}
                               hoverHandler={isHoverHandler}
                               quality={100}
                               widgetId={widgetId}
                               loading={postElementImageLoaderType || 'eager'}
                               postElementSize={postElementSize}
                               postElementImageLoader={postElementImageLoader}
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
//type="video/webm; codecs=&quot;vp8, vorbis&quot;"