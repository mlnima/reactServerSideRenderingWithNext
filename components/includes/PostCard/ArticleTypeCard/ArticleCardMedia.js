import React, {useEffect, useState, useContext, useRef} from 'react';
import {checkRemovedContent} from "../../../../_variables/ajaxPostsVariables";
import {clientSelfWidgetUpdate} from "../../../../_variables/_ajaxClientWidgetVariables";
import styled from "styled-components";

let ArticleCardMediaStyled = styled.div`
  .article-card-image {
    width: ${props =>props.postElementSize === 'list' ? '116.6px' : '100%'};
    height: calc(48vw / 1.777);
  }

  @media only screen and (min-width: 768px) {
    .article-card-image {
      width: ${props =>props.postElementSize === 'list' ? '116.6px' : `${props =>props.cardWidth}px`};

      height: calc(${props => props.cardWidth}px / 1.777);

    }
  }
`



const ArticleCardMedia = props => {
    const [gotError, setGotError] = useState(false)
    const [isReported, setIsReported] = useState(false)
    const [imageUrl, setImageUrl] = useState(() => {
        return props?.post.mainThumbnail ? props.post.mainThumbnail?.includes('http') ? props.post.mainThumbnail : process.env.NEXT_PUBLIC_PRODUCTION_URL + props.post.mainThumbnail : ''
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
        <ArticleCardMediaStyled className='article-card-media' postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
            <img className='article-card-image'
                 alt={props.mediaAlt}
                 src={!gotError ? imageUrl || props.noImageUrl : props.noImageUrl}
            />
        </ArticleCardMediaStyled>
    );
};
export default ArticleCardMedia;
    