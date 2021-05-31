import {useState} from 'react';
import Link from "next/link";
import PostElementTitle from "./PostElementTitle";
import PostElementImage from "./PostElementImage";

const PostElement = ({title, imageWidth, viewType, postType, _id, postElementSize, videoTrailerUrl, views, likes, disLikes, quality, rating, price, duration, mainThumbnail, postElementStyle,onClickLoadingHandler,postElementImageLoaderType,postElementImageLoader}) => {

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

    const classNameForPostElement = postElementSize ? `post-element-${postElementSize}` : `post-element-small`

    return (
        <article className={classNameForPostElement} onMouseOut={isHoverHandler} onTouchCancel={isHoverHandler} >
<style jsx>{`
.value-next-icon {
margin: 0 3px;
}

.post-element-info-logo {
font-size: 15px;
width: 15px;
height: 15px;
}

.post-element-medium,.post-element-small,.post-element-smaller{
width: 48vw;
margin: 2px;
border: none;
background-color: var(--post-element-background-color);
}


.post-element-list{

width: 100%;
}
.post-element-list>.post-element-link{

width: 100%;

display: flex;
flex-direction: row;

}


.post-element-link {
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
margin: auto;
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
width: 240px;
max-width: 100%;
}
}

`}</style>
            <Link href={{pathname: `/post`,query: {id: _id,...state.queries}}}
                  as={`/${postType || 'post'}/${title}?id=${_id}`}
                  scroll={false}
            >
                <a rel='next' onClick={onClickLoadingHandler} style={{textDecoration:'none'}} className='post-element-link'>
                        <PostElementImage
                            mainThumbnail={mainThumbnail}
                            isHoverHandler={isHoverHandler}
                            _id={_id}
                            postType={postType}
                            views={views}
                            duration={duration}
                            quality={quality}
                            likes={likes}
                            disLikes={disLikes}
                            price={price}
                            videoTrailerUrl={videoTrailerUrl}
                            title={title}
                            isHover={state.isHover}
                            postElementSize={postElementSize}
                            postElementImageLoader={postElementImageLoader}
                            postElementImageLoaderType={postElementImageLoaderType}
                            rating={true}
                        />
                        <PostElementTitle title={title} postElementSize={postElementSize}/>
                </a>
            </Link>
        </article>
    );
};

export default PostElement;

