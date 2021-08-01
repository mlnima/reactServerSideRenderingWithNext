import React, {useEffect, useState, useContext, useRef} from 'react';
import PostElementImage from "./PostElementImage";
import Link from "next/link";
import PostElementTitle from "./PostElementTitle";
import ImageRenderer from "../ImageRenderer/ImageRenderer";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const PromotionTypeCard = props => {

    return (
        <div className='post-element-link'>
            <style jsx>{`


                .post-element-link{
                 width:48vw;
                 height:calc( 48vw / 1.777 + 20px);
                 display: flex;
                 flex-direction: column;
                 justify-content: space-evenly;
                 border: ${props.mainThumbnail?'none':'solid .2px var(--post-element-text-color)'};
                }
                .no-image-title{
                     margin: 0;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color:var(--custom-green);
                    text-align: center;
                    overflow: hidden;
                    text-overflow: clip;
                }
                .post-element-link-internal{
                  color:var(--post-element-text-color);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                  height: 20px;
                  margin: 0;
                  .detail{
                   margin: 0 5px;
                   max-width: 80%;
                   font-size: .7rem;
                  }
                }
                
                 @media only screen and (min-width: 768px){
                 .post-element-link{
                 width: ${props.imageSize.width}px;
                 height:${props.imageSize.height + 20}px;
                }
               .post-element-link-internal{

                  .detail{
                  font-size: 1rem;
                  }
                }
                 
                 }
            `}</style>
            <a href={props.redirectLink}>
                {props.mainThumbnail ?
                    <ImageRenderer
                       imageUrl={props.mainThumbnail}
                       altValue={props.title || props.mainThumbnail}
                       hoverHandler={props.isHoverHandler}
                       title={props.title}
                       widgetId={props.widgetId}
                       loading={props.postElementImageLoaderType}
                       postElementSize={props.postElementSize}
                       imageSize={props.imageSize}
                       postElementImageLoader={props.postElementImageLoader}
                       layout='fill'
                       classNameValue='post-element-image'
                       contentId={props._id} />:
                     <p className='no-image-title'>{props.title}</p>}
            </a>
            <Link href={`/post/${props.postType}/${props._id}`} scroll={false}>
                <a rel='next' onClick={props.onClickLoadingHandler}  className='post-element-link-internal'>
                    <p className='detail'>more info about {props.title} </p>

                </a>
            </Link>
        </div>
    );
};
export default PromotionTypeCard;

// <FontAwesomeIcon style={{width: '20px', height: '20px', }} icon={faSearch} />