import {useState} from 'react';
import Link from "next/link";
import PostElementTitle from "./PostElementTitle";
import PostElementImage from "./PostElementImage";
import {useRouter} from "next/router";
import PromotionTypeCard from "./PromotionTypeCard";

const PostElement = props => {
    const [hover,setHover]=useState(false)

    const [imageSize,setImageSize] = useState(()=>{
       return  props.postElementSize === 'list' ? {width:116.6,height:65.6} :
               props.postElementSize === 'smaller' ? {width:209.8,height:118}:
               props.postElementSize === 'small' ? {width:255.8,height:143.95}:
               props.postElementSize === 'medium' ? {width:320,height:180}:
               {width:255.8,height:143.95}
    })

    let [state, setState] = useState({
        isHover: false,
        isWatched: false,

    });

    let isHoverHandler = () => {
        if (props.videoTrailerUrl) {
            hover ? setHover(false) : setHover(true)
        }
        setTimeout(()=>{
            hover ? setHover(false) :null
        },10000)
    };

    const classNameForPostElement = props.postElementSize ? `post-element-${props.postElementSize}` : `post-element-small`

    return (
        <article className={classNameForPostElement} onMouseOut={isHoverHandler} onTouchCancel={isHoverHandler} >
        <style jsx>{`
            .${classNameForPostElement}{
                width: 48vw;
                margin: 2px;
                border: none;
                background-color: var(--post-element-background-color);
            }

            .value-next-icon {
                margin: 0 3px;
            }
            
            .post-element-info-logo {
                font-size: 15px;
                width: 15px;
                height: 15px;
            }
            //
            //.post-element-medium,.post-element-small,.post-element-smaller{
            //   width: 48vw;
            //   margin: 2px;
            //   border: none;
            //   background-color: var(--post-element-background-color);
            //}

            .post-element-list{
                width: 100%;
                margin: 5px 0;
                .post-element-link{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: row;
                }
            }

            .post-element-link {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                margin: auto;
                text-decoration: none;
                color:var(--main-text-color);
                a{
                    color:var(--main-text-color);
                }
            }
            @media only screen and (min-width: 768px){
                .post-element-smaller,.post-element-smaller>h2,.post-element-smaller>.post-element-link{
                    width: 209.8px;
                    max-width: 100%;
                }
                .post-element-small,.post-element-small>h2,.post-element-small>.post-element-link{
                    width: 255px;
                    max-width: 100%;
                }
                .post-element-medium,.post-element-medium>h2,.post-element-medium>.post-element-link{
                    width: 320px;
                    max-width: 100%;
                }
                .post-element-list,.post-element-list>h2,.post-element-list>.post-element-link{
                    width: 300px;
                    max-width: 100%;
                }
            }
        
        `}</style>

            {props.postType === 'promotion' ?
                <PromotionTypeCard
                    imageSize={imageSize}
                    mainThumbnail={props.mainThumbnail}
                    isHoverHandler={isHoverHandler}
                    _id={props._id}
                    postType={props.postType}
                    redirectLink={props.redirectLink}
                    widgetId={props.widgetId}
                    views={props.views}
                    duration={props.duration}
                    quality={props.quality}
                    likes={props.likes}
                    disLikes={props.disLikes}
                    price={props.price}
                    videoTrailerUrl={props.videoTrailerUrl}
                    title={props.title}
                    isHover={hover}
                    postElementSize={props.postElementSize}
                    postElementImageLoader={props.postElementImageLoader}
                    postElementImageLoaderType={props.postElementImageLoaderType}
                    rating={true}
                />:
                <Link href={`/post/${props.postType}/${props._id}`} scroll={false}>
                    <a rel='next' onClick={props.onClickLoadingHandler}  className='post-element-link'>
                        <PostElementImage
                            imageSize={imageSize}
                            mainThumbnail={props.mainThumbnail}
                            isHoverHandler={isHoverHandler}
                            _id={props._id}
                            postType={props.postType}
                            widgetId={props.widgetId}
                            views={props.views}
                            duration={props.duration}
                            quality={props.quality}
                            likes={props.likes}
                            disLikes={props.disLikes}
                            price={props.price}
                            videoTrailerUrl={props.videoTrailerUrl}
                            title={props.title}
                            isHover={hover}
                            postElementSize={props.postElementSize}
                            postElementImageLoader={props.postElementImageLoader}
                            postElementImageLoaderType={props.postElementImageLoaderType}
                            rating={true}
                        />
                        <PostElementTitle title={props.title} postElementSize={props.postElementSize}/>
                    </a>
                </Link>
            }
        </article>
    );
};

export default PostElement;

