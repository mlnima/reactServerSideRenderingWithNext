import {useState} from 'react';
import Link from "next/link";
import PostElementTitle from "./PostElementTitle";
import PostElementImage from "./PostElementImage";
//import styled from "styled-components";
// let StyledArticle = styled.article`
//width: 48vw;
//.value-next-icon {
//  margin: 0 3px;
//}
//
//.post-element-info-logo {
//  font-size: 15px;
//  width: 15px;
//  height: 15px;
//}
//.post-element-link{
// width: 100%;
//}



//.post-element-medium,.post-element-small,.post-element-smaller{
//width: 48vw;
//}

//.post-element-medium,.post-element-small,.post-element-smaller {
//  //margin: 2px;
//  //border: none;
//  //background-color: var(--post-element-background-color);
//  //.post-element-link {
//  //  display: flex;
//  //  flex-direction: column;
//  //  justify-content: center;
//  //  align-items: flex-start;
//  //  margin: auto;
//  //}
//}
//@media only screen and (min-width: 768px) {
//max-width: 255px;



  //.post-element-medium{
  //  width: 320px;
  //  .post-element {
  //    width: 320px;
  //    h2 {
  //      width: 320px;
  //    }
  //  }
  //
  //}
  //.post-element-small{
  //  width: 255px;
  //  .post-element {
  //    width: 255px;
  //    h2 {
  //      width: 255px;
  //    }
  //  }
  //}
  //.post-element-smaller{
  //  width: 209.8px;
  //  .post-element {
  //    width: 209.8px;
  //    h2 {
  //      width: 209.8px;
  //    }
  //  }
  //}

  //.post-element-div {
  //  .post-element {
  //    image {
  //      .post-element-external-image {
  //        margin: auto;
  //        object-fit: contain;
  //      }
  //      .post-element-internal-image {
  //        margin: auto;
  //        object-fit: contain;
  //      }
  //    }
  //  }
  //}
// }
//
// `
//${props => props.stylesData}
const PostElement = ({title, imageWidth, viewType, postType, _id, postElementSize, videoTrailerUrl, views, likes, disLikes, quality, rating, price, duration, mainThumbnail, postElementStyle,onClickLoadingHandler}) => {

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


.post-element-medium,.post-element-small,.post-element-smaller,h2{
aspect-ratio:16/9;
width: 48vw;
margin: 2px;
border: none;
background-color: var(--post-element-background-color);
}

.post-element-list{
width: 100%;
}
.post-element-list>.post-element-link{
//display:grid;
//grid-template-columns: 6fr 3fr;
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
                            imageWidth={imageWidth}
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
                        />
                        <PostElementTitle title={title} postElementSize={postElementSize}/>
                </a>
            </Link>
        </article>
    );
};

export default PostElement;


// <div className="image" style={{position:'relative'}}>
//     {state.isHover && videoTrailerUrl ?
//         <video
//             ref={videoElement}
//             src={videoTrailerUrl}
//             autoPlay={true}
//             loop={true}
//         /> :
//         <ImageRenderer imageUrl={mainThumbnail}
//                        altValue={title || mainThumbnail}
//                        hoverHandler={isHoverHandler}
//                        imageWidth={imageWidth}
//                        imageHeight={imageWidth / 1.777}
//                        quality={100}
//                        loading='lazy'
//                        layout='intrinsic'
//                        classNameValue='post-element-internal-image'
//                        contentId={_id}
//
//         />
//     }
//     {views > 1 && postType === ('video') && !state.isHover ? <BottomRight views={views} svgDefaultStyle={svgDefaultStyle}/> : null}
//     {(postType === ('video') || postType === ('redirect') || postType === ('product')) && !state.isHover ?
//         <BottomLeft type={postType} price={price} duration={duration} svgDefaultStyle={svgDefaultStyle}/> : null}
//     {quality && postType === ('video') && !state.isHover ? <TopRight quality={quality} svgDefaultStyle={svgDefaultStyle}/> : null}
//     {likes > 0 && rating !== 'disable' && !state.isHover ? <TopLeft rating={likeValueCalculator(likes, disLikes)} svgDefaultStyle={svgDefaultStyle}/> : null}
// </div>

//@mixin opacityAnimationEnd {
//  animation: opacityAnimationEnd .5s alternate;
//  @keyframes opacityAnimationEnd {
//    0% {
//      opacity: 100%;
//    }
//    100% {
//      opacity: 0;
//    }
//  }
//}