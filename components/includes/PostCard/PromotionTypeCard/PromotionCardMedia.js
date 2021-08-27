import React, {useEffect, useState, useContext, useRef} from 'react';
import {checkRemovedContent} from "../../../../_variables/ajaxPostsVariables";
import {clientSelfWidgetUpdate} from "../../../../_variables/_ajaxClientWidgetVariables";
import styled from "styled-components";

const PromotionCardMediaStyled = styled.div`
 
    width: ${props =>props.postElementSize === 'list' ? '116.6px' : '48vw'};
    height: calc(48vw / 1.777);

  .promotion-card-image{
    width: 100%;
    height: calc(48vw / 1.777);
  }

  @media only screen and (min-width: 768px) {
      width: ${props =>props.postElementSize === 'list' ? '116.6px' : '100%'};
      height: calc(${props =>props.cardWidth}px / 1.777);
    .promotion-card-image{
      width: ${props =>props.postElementSize === 'list' ? '116.6px' : '100%'};
      height: calc(${props =>props.cardWidth}px / 1.777);
    }
  }
`

const PromotionCardMedia = props => {
    const [gotError, setGotError] = useState(false)
    const [isReported, setIsReported] = useState(false)
    const [imageUrl, setImageUrl] = useState(() => {
        return props?.post.mainThumbnail ? props.post.mainThumbnail?.includes('http') ? props.post.mainThumbnail : process.env.REACT_APP_PRODUCTION_URL + props.post.mainThumbnail : ''
    })

    const onErrorHandler = e => {
        if (imageUrl) {
            setGotError(true)
            setIsReported(true)
            let data = {
                checkUrl: imageUrl,
                contentId: props.post._id,
                type: 'image'
            }
            setTimeout(() => {
                checkRemovedContent(data).then(() => {
                    if (props.widgetId) {
                        clientSelfWidgetUpdate(props.widgetId)
                    }
                })
            }, 1000)
        }
    }

    return (
        <PromotionCardMediaStyled className='promotion-card-media' postElementSize={props.postElementSize} cardWidth={props.cardWidth}>

            <img className='promotion-card-image'
                 alt={props.mediaAlt}
                 src={!gotError ? imageUrl || props.noImageUrl : props.noImageUrl}
                 onError={e => {
                     onErrorHandler(e)
                 }}/>
        </PromotionCardMediaStyled>
    );
};
export default PromotionCardMedia;

//
// <style jsx>{`
//               .promotion-card-image {
//                 width: ${props.postElementSize === 'list' ? '116.6px' : '100%'};
//                 height: calc(48vw / 1.777);
//               }
//
//               @media only screen and (min-width: 768px) {
//                 .promotion-card-image {
//                   width: ${props.postElementSize === 'list' ? '116.6px' : '100%'};
//                   height: calc(${props.cardWidth}px / 1.777);
//
//                 }
//               }
//             `}</style>