import React, {useEffect, useState, useContext, useRef} from 'react';
import {checkRemovedContent} from "../../../../_variables/ajaxPostsVariables";
import {clientSelfWidgetUpdate} from "../../../../_variables/_ajaxClientWidgetVariables";

const ArticleCardMedia = props => {
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
        <React.Fragment>
            <style jsx>{`
              .article-card-image {
                width: ${props.postElementSize === 'list' ? '116.6px' : '100%'};
                height: calc(48vw / 1.777);
              }

              @media only screen and (min-width: 768px) {
                .article-card-image {
                  width: ${props.postElementSize === 'list' ? '116.6px' : '100%'};
                  height: calc(${props.cardWidth}px / 1.777);

                }
              }
            `}</style>
            <img className='article-card-image'
                 alt={props.mediaAlt || props.classNameValue}
                 src={!gotError ? imageUrl || props.noImageUrl : props.noImageUrl}
                 onError={e => {
                     onErrorHandler(e)
                 }}/>
        </React.Fragment>
    );
};
export default ArticleCardMedia;
    